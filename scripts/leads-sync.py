#!/usr/bin/env python3
"""Sync Web3Forms lead emails into the H&S Insulation leads Google Sheet.

Connects to jamil@thereadyconsult.com via IMAP, finds new Web3Forms
submission emails for H&S (by subject), parses the fields, appends to the
H&S leads sheet, and tags the email with a 'Synced-HSLeads' label so we
don't process it twice. Idempotent, safe on a 15 minute cron.

Cloned from the canonical Gina pattern (2026-06-09).
"""

import email
import imaplib
import json
import os
import re
import sys
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

IMAP_HOST = "imap.gmail.com"
IMAP_USER = "jamil@thereadyconsult.com"
GMAIL_LABEL = "Synced-HSLeads"

SHEET_ID = "TODO_HS_LEADS_SHEET_ID"  # set when the H&S leads sheet is created
SHEET_TAB = "Sheet1"

# Subjects we recognize as H&S leads (Web3Forms sets the subject from the form)
SUBJECT_PATTERNS = [
    re.compile(r"H&S Insulation", re.IGNORECASE),
    re.compile(r"hernandezinsulation", re.IGNORECASE),
]


def main() -> int:
    pw = os.environ.get("GMAIL_APP_PASSWORD")
    sa_json = os.environ.get("GCP_SA_KEY_JSON")
    if not pw or not sa_json:
        print("ERROR: GMAIL_APP_PASSWORD and GCP_SA_KEY_JSON must both be set", file=sys.stderr)
        return 2
    if SHEET_ID.startswith("TODO"):
        print("ERROR: SHEET_ID not configured yet", file=sys.stderr)
        return 2

    import gspread  # type: ignore
    from google.oauth2.service_account import Credentials  # type: ignore

    creds = Credentials.from_service_account_info(
        json.loads(sa_json), scopes=["https://www.googleapis.com/auth/spreadsheets"]
    )
    gc = gspread.authorize(creds)
    ws = gc.open_by_key(SHEET_ID).worksheet(SHEET_TAB)
    existing_rows = ws.get_all_values()
    existing_dates = {row[0] for row in existing_rows[1:] if row}

    imap = imaplib.IMAP4_SSL(IMAP_HOST)
    try:
        imap.login(IMAP_USER, pw)
    except imaplib.IMAP4.error as e:
        print(f"ERROR: Gmail IMAP login failed: {e}", file=sys.stderr)
        return 3

    try:
        imap.create(GMAIL_LABEL)
        imap.select('"[Gmail]/All Mail"')
        typ, data = imap.search(None, 'FROM', '"notify@web3forms.com"',
                                'NOT', 'X-GM-LABELS', GMAIL_LABEL, 'SINCE', '01-Jun-2026')
        if typ != "OK":
            print(f"ERROR: Gmail search failed: {data}", file=sys.stderr)
            return 4

        ids = data[0].split()
        print(f"Found {len(ids)} candidate emails to inspect")
        appended = skipped = 0
        for msg_id in ids:
            typ, msg_data = imap.fetch(msg_id, "(RFC822 X-GM-MSGID)")
            if typ != "OK":
                continue
            raw = next((p[1] for p in msg_data if isinstance(p, tuple) and len(p) >= 2), None)
            if not raw:
                continue
            msg = email.message_from_bytes(raw)
            subject = msg.get("Subject", "")
            if not any(p.search(subject) for p in SUBJECT_PATTERNS):
                continue

            try:
                dt = parsedate_to_datetime(msg.get("Date", "")).astimezone(timezone.utc)
                date_str = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
            except Exception:
                date_str = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

            if date_str in existing_dates:
                skipped += 1
                _label(imap, msg_id, GMAIL_LABEL)
                continue

            fields = _parse_web3forms_body(_extract_body(msg))
            row = [date_str, fields.get("name", ""), fields.get("phone", ""),
                   fields.get("email", ""), fields.get("city", ""),
                   fields.get("service", ""), fields.get("message", "")]
            ws.append_row(row, value_input_option="USER_ENTERED")
            existing_dates.add(date_str)
            _label(imap, msg_id, GMAIL_LABEL)
            appended += 1
            print(f"Appended: {row[1]!r} <{row[3]}> @ {date_str}")

        print(f"Done. Appended {appended}, skipped {skipped}.")
        return 0
    finally:
        try:
            imap.logout()
        except Exception:
            pass


def _label(imap, msg_id, label):
    try:
        imap.store(msg_id, "+X-GM-LABELS", label)
    except Exception as e:
        print(f"WARN: could not label {msg_id!r}: {e}", file=sys.stderr)


def _extract_body(msg) -> str:
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                try:
                    return part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", errors="replace")
                except Exception:
                    return part.get_payload(decode=True).decode("utf-8", errors="replace")
        for part in msg.walk():
            if part.get_content_type().startswith("text/"):
                return part.get_payload(decode=True).decode("utf-8", errors="replace")
    else:
        try:
            return msg.get_payload(decode=True).decode(msg.get_content_charset() or "utf-8", errors="replace")
        except Exception:
            return msg.get_payload(decode=True).decode("utf-8", errors="replace")
    return ""


# Web3Forms plaintext body: one field per line, "label : value".
FIELD_ALIASES = {
    "name": ["name", "full name", "fullname"],
    "email": ["email", "e-mail"],
    "phone": ["phone", "phone number", "phonenumber"],
    "city": ["city", "town", "location"],
    "service": ["service", "service needed", "service-needed"],
    "message": ["message", "notes", "details", "how can we help", "comments"],
}


def _parse_web3forms_body(body: str) -> dict:
    fields = {}
    for line in body.splitlines():
        if ":" not in line:
            continue
        label, _, value = line.partition(":")
        label, value = label.strip().lower(), value.strip()
        if not label or not value:
            continue
        for key, aliases in FIELD_ALIASES.items():
            if label in aliases:
                fields[key] = value
                break
    return fields


if __name__ == "__main__":
    sys.exit(main())
