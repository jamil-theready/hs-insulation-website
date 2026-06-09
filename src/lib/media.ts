// Image manifest. Every visual slot maps to a file in /public/images.
// These are on-brand placeholder panels today. To upgrade a slot with a real
// (or AI-generated) photo: drop a file at the same path and change `.svg` -> the
// new extension here. One line per slot, nothing else to touch.

export const media = {
  heroPrimary: "/images/hero/hero-attic-sprayfoam.svg",
  heroTruck: "/images/hero/hero-truck.svg",
  atticBefore: "/images/before-after/attic-before.svg",
  atticAfter: "/images/before-after/attic-after.svg",
  finishedBeauty: "/images/services/finished-beauty.svg",
  crew: "/images/team/crew-action.svg",
  textureFoam: "/images/textures/sprayfoam-closeup.svg",
  textureBatt: "/images/textures/batt-rolls.svg",
  og: "/images/og/og-image.svg",
} as const;

// Whether the photo slots are still branded placeholders (true) or real photos.
// Used to optionally show a subtle "representative image" treatment.
export const usingPlaceholders = true;
