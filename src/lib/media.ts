// Image manifest. Every visual slot maps to a file in /public/images.
// These are on-brand placeholder panels today. To upgrade a slot with a real
// (or AI-generated) photo: drop a file at the same path and change `.svg` -> the
// new extension here. One line per slot, nothing else to touch.

export const media = {
  heroPrimary: "/images/hero/hero-attic-sprayfoam.jpg",
  // First frame of /videos/hero-insulation.mp4 — keeps the video load seamless.
  heroVideoPoster: "/images/hero/video-poster.jpg",
  // Looping hero background video (watermark-free, muted, ~1 MB each).
  // Set to null to fall back to the poster image without 404ing.
  heroVideo: {
    webm: "/videos/hero-insulation.webm",
    mp4: "/videos/hero-insulation.mp4",
  } as { webm?: string; mp4?: string } | null,
  heroTruck: "/images/hero/hero-truck.svg",
  atticBefore: "/images/before-after/attic-before.jpg",
  atticAfter: "/images/before-after/attic-after.jpg",
  finishedBeauty: "/images/services/finished-beauty.jpg",
  crew: "/images/team/crew-action.jpg",
  textureFoam: "/images/textures/sprayfoam-closeup.jpg",
  textureBatt: "/images/textures/batt-rolls.jpg",
  og: "/images/og/og-image.jpg",
} as const;

// Whether the photo slots are still branded placeholders (true) or real photos.
// Used to optionally show a subtle "representative image" treatment.
export const usingPlaceholders = true;
