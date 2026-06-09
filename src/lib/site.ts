// Single source of truth for business facts, nav, services, and service areas.

export const site = {
  brand: "H&S Insulation",
  legalName: "New Vision",
  tagline: "NorCal insulation, done clean.",
  since: "2020",
  region: "Northern California",
  baseCity: "Yuba City",
  state: "CA",
  zip: "95991",
  phone: "+1 (916) 912-2080",
  phoneHref: "tel:+19169122080",
  email: "Emprendedornewvision@gmail.com",
  emailHref: "mailto:Emprendedornewvision@gmail.com",
  domain: "hernandezinsulation.com",
  url: "https://hernandezinsulation.com",
  owner: "Heradio Hernandez",
  hours: "Mon–Sat, 7:00 AM – 6:00 PM",
  bilingual: true,
  social: {
    facebook: "",
    instagram: "",
  },
  gaId: "G-XXXXXXXXXX", // TODO: replace with real GA4 ID
  web3formsKey: "YOUR_ACCESS_KEY", // TODO: replace with real Web3Forms access key
  formRouteEmail: "jamil@thereadyconsult.com", // forms route to TRC, then forward to client
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  image: string;
  benefits: string[];
  bestFor: string;
  body: { heading: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "spray-foam-insulation",
    name: "Spray Foam Insulation",
    short: "Spray Foam",
    blurb:
      "High-performance closed- and open-cell spray foam that seals air leaks and insulates in one step — the gold standard for energy efficiency.",
    image: "/images/services/spray-foam.svg",
    bestFor: "Attics, walls, rim joists, and crawl spaces where air sealing matters most.",
    benefits: [
      "Air-seals and insulates in a single application",
      "Highest R-value per inch of any common insulation",
      "Blocks drafts, moisture, and outside noise",
      "Adds structural rigidity to walls and roof decks",
    ],
    body: [
      {
        heading: "What spray foam does",
        text: "Spray foam expands on contact to fill every gap, crack, and cavity — the places batt insulation can't reach. That seal is what stops the drafts and uneven temperatures most NorCal homes struggle with.",
      },
      {
        heading: "Open-cell vs. closed-cell",
        text: "We help you pick the right product for the job: open-cell for sound dampening and interior walls, closed-cell for maximum R-value, moisture resistance, and crawl spaces. We'll walk you through the trade-offs and never upsell you on foam you don't need.",
      },
    ],
  },
  {
    slug: "blown-in-insulation",
    name: "Blown-In Insulation",
    short: "Blown-In",
    blurb:
      "Fast, even attic coverage with blown-in cellulose or fiberglass — the most cost-effective way to bring an older attic up to today's energy standards.",
    image: "/images/services/blown-in.svg",
    bestFor: "Attic floors, hard-to-reach cavities, and topping up thin existing insulation.",
    benefits: [
      "Even coverage with no gaps or seams",
      "Great value for attic floors and retrofits",
      "Fills around wiring, joists, and obstructions",
      "Noticeable comfort gain in summer and winter",
    ],
    body: [
      {
        heading: "Built for attics",
        text: "Blown-in insulation settles into an even, continuous blanket across your attic floor, eliminating the gaps that let conditioned air escape. It's the fastest way to raise an under-insulated attic to a modern R-value.",
      },
      {
        heading: "Clean install, every time",
        text: "We mask off living spaces, control the dust, and measure depth as we go so you get the coverage you paid for — verified, not guessed.",
      },
    ],
  },
  {
    slug: "batt-insulation",
    name: "Batt Insulation",
    short: "Batt",
    blurb:
      "Precision-fit fiberglass and mineral wool batts for walls, floors, and new construction — reliable R-value installed the right way.",
    image: "/images/services/batt.svg",
    bestFor: "Open walls, new construction, garages, and between-floor sound control.",
    benefits: [
      "Cost-effective for open wall cavities",
      "Cut and fit snug — no compression, no gaps",
      "Mineral wool options for fire and sound",
      "Ideal for new builds and remodels",
    ],
    body: [
      {
        heading: "Done right or not at all",
        text: "Batt insulation only performs when it's cut to fit and installed without gaps or compression. Most underperforming walls aren't the material's fault — they're the install. We fit every cavity tight, around every outlet and pipe.",
      },
      {
        heading: "The right material for the room",
        text: "We use fiberglass where it makes sense and step up to mineral wool when you need extra fire resistance or sound dampening between rooms and floors.",
      },
    ],
  },
  {
    slug: "insulation-removal",
    name: "Old Insulation Removal",
    short: "Vacuum Removal",
    blurb:
      "Complete vacuum removal of old, damaged, or contaminated insulation — a clean slate before we install new, so you're not trapping rodents, mold, or dust in your attic.",
    image: "/images/services/vacuum-removal.svg",
    bestFor: "Attics with pest damage, water damage, mold, or decades-old settled insulation.",
    benefits: [
      "Removes rodent-soiled or water-damaged material",
      "Clears the way for a clean, full-value reinstall",
      "Improves air quality and removes odors",
      "Sealed disposal — no mess left behind",
    ],
    body: [
      {
        heading: "Start clean",
        text: "Old insulation collects dust, allergens, and — too often — rodent droppings and moisture. Adding new insulation on top of that just seals the problem in. We vacuum it all out and haul it away first.",
      },
      {
        heading: "Then we air-seal",
        text: "With the attic clear, we seal the gaps and penetrations that were hidden underneath, then install fresh insulation that actually performs from day one.",
      },
    ],
  },
];

export type ServiceArea = {
  slug: string;
  city: string;
  county?: string;
  blurb: string;
  note: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "yuba-city",
    city: "Yuba City",
    county: "Sutter County",
    blurb:
      "Our home base. From the older homes near downtown to new builds out toward the bypass, we keep Yuba City comfortable through hot valley summers and cold winters.",
    note: "Same-week estimates for Yuba City homeowners.",
  },
  {
    slug: "marysville",
    city: "Marysville",
    county: "Yuba County",
    blurb:
      "Just across the river, Marysville's historic housing stock is often badly under-insulated. We bring those attics up to modern standards without the runaround.",
    note: "Free, no-pressure estimates across Marysville.",
  },
  {
    slug: "sutter-county",
    city: "Sutter County",
    blurb:
      "We serve homeowners throughout Sutter County — Live Oak, Sutter, and the surrounding rural properties where energy bills hit hardest.",
    note: "Rural and acreage properties welcome.",
  },
  {
    slug: "grass-valley",
    city: "Grass Valley",
    county: "Nevada County",
    blurb:
      "Up in the foothills, insulation is about holding heat through real winters. We help Grass Valley homes stay warm and cut heating costs.",
    note: "Foothill homes and cabins covered.",
  },
  {
    slug: "auburn",
    city: "Auburn",
    county: "Placer County",
    blurb:
      "Auburn's mix of historic and modern homes both benefit from a proper attic and wall insulation upgrade. We handle the corridor up Highway 49 and I-80.",
    note: "Serving Auburn and the I-80 corridor.",
  },
  {
    slug: "truckee",
    city: "Truckee",
    county: "Nevada County",
    blurb:
      "Mountain homes demand serious insulation. We help Truckee homeowners and cabin owners keep the heat in and the snow-season bills down.",
    note: "High-country builds and second homes.",
  },
  {
    slug: "lake-tahoe",
    city: "Lake Tahoe",
    blurb:
      "From lakeside homes to rentals, Tahoe properties live or die on insulation. We bring spray foam and blown-in solutions built for alpine conditions.",
    note: "Tahoe basin homes and short-term rentals.",
  },
];

export const trustPoints = [
  { stat: "Since 2020", label: "Serving NorCal homeowners" },
  { stat: "4 services", label: "Spray foam, blown-in, batt & removal" },
  { stat: "EN / ES", label: "English & Spanish, every step" },
  { stat: "Free", label: "No-pressure estimates" },
];

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function areaBySlug(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}
