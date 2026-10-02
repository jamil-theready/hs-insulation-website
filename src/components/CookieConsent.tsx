"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONSENT_OPEN_EVENT,
  isEuLikeTimezone,
  readConsent,
  writeConsent,
} from "@/lib/consent";

/** The site's shared grid shell, so the banner keeps the one-grid left edge. */
const CONTAINER = "container-x";
const PRIVACY_HREF = "/privacy-policy";

const COPY = {
  title: "Cookies on this site",
  body: "We use Google Analytics to understand how visitors find and use this site. No advertising or cross-site tracking.",
  privacy: "Privacy Policy",
  accept: "Accept",
  decline: "Decline",
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [blocking, setBlocking] = useState(
    () => typeof window !== "undefined" && isEuLikeTimezone(),
  );
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (readConsent()) return;

    // EU-like regions stay behind the stricter Consent Mode guard. Elsewhere, let
    // people begin reading before presenting the lightweight choice prompt.
    const delay = isEuLikeTimezone() ? 0 : 10_000;
    const promptTimer = window.setTimeout(() => setOpen(true), delay);

    // Footer "Cookie Settings" reopens the banner for an existing choice.
    const reopen = () => {
      setBlocking(false);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(promptTimer);
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  // Under a scrim the banner is the only thing on screen, so it takes focus.
  useEffect(() => {
    if (open && blocking) acceptRef.current?.focus();
  }, [open, blocking]);

  const choose = useCallback((analytics: boolean) => {
    writeConsent(analytics);
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <>
      {blocking && <div className="trc-cc-scrim" aria-hidden="true" />}
      <div
        role="dialog"
        aria-modal={blocking}
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-body"
        className="trc-cc"
      >
        <div className={`${CONTAINER} trc-cc__row`}>
          <div>
            <h2 id="cookie-consent-title" className="trc-cc__title">
              {COPY.title}
            </h2>
            <p id="cookie-consent-body" className="trc-cc__body">
              {COPY.body}{" "}
              <Link href={PRIVACY_HREF}>{COPY.privacy}</Link>.
            </p>
          </div>

          <div className="trc-cc__actions">
            <button
              type="button"
              onClick={() => choose(false)}
              className="trc-cc__btn trc-cc__btn--ghost"
            >
              {COPY.decline}
            </button>
            <button
              ref={acceptRef}
              type="button"
              onClick={() => choose(true)}
              className="trc-cc__btn trc-cc__btn--primary"
            >
              {COPY.accept}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
