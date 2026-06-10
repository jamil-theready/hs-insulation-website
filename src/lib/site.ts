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
  hours: "Monday to Saturday, 7:00 AM to 6:00 PM",
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
      "High-performance closed- and open-cell spray foam that seals air leaks and insulates in one step, the gold standard for energy efficiency.",
    image: "/images/services/spray-foam.jpg",
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
        text: "Spray foam expands on contact to fill every gap, crack, and cavity, the places batt insulation can't reach. That seal is what stops the drafts and uneven temperatures most NorCal homes struggle with.",
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
      "Fast, even attic coverage with blown-in cellulose or fiberglass, the most cost-effective way to bring an older attic up to today's energy standards.",
    image: "/images/services/blown-in.jpg",
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
        text: "We mask off living spaces, control the dust, and measure depth as we go so you get the coverage you paid for, verified, not guessed.",
      },
    ],
  },
  {
    slug: "batt-insulation",
    name: "Batt Insulation",
    short: "Batt",
    blurb:
      "Precision-fit fiberglass and mineral wool batts for walls, floors, and new construction, reliable R-value installed the right way.",
    image: "/images/services/batt.jpg",
    bestFor: "Open walls, new construction, garages, and between-floor sound control.",
    benefits: [
      "Cost-effective for open wall cavities",
      "Cut and fit snug, no compression, no gaps",
      "Mineral wool options for fire and sound",
      "Ideal for new builds and remodels",
    ],
    body: [
      {
        heading: "Done right or not at all",
        text: "Batt insulation only performs when it's cut to fit and installed without gaps or compression. Most underperforming walls aren't the material's fault, they're the install. We fit every cavity tight, around every outlet and pipe.",
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
      "Complete vacuum removal of old, damaged, or contaminated insulation, a clean slate before we install new, so you're not trapping rodents, mold, or dust in your attic.",
    image: "/images/services/vacuum-removal.jpg",
    bestFor: "Attics with pest damage, water damage, mold, or decades-old settled insulation.",
    benefits: [
      "Removes rodent-soiled or water-damaged material",
      "Clears the way for a clean, full-value reinstall",
      "Improves air quality and removes odors",
      "Sealed disposal, no mess left behind",
    ],
    body: [
      {
        heading: "Start clean",
        text: "Old insulation collects dust, allergens, and, too often, rodent droppings and moisture. Adding new insulation on top of that just seals the problem in. We vacuum it all out and haul it away first.",
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
  elevation: string;
  climate: string;
  housing: string;
  emphasis: string;
  neighborhoods: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "yuba-city",
    city: "Yuba City",
    county: "Sutter County",
    blurb:
      "Our home base. From the older homes near downtown to new builds out toward the bypass, we keep Yuba City comfortable through hot valley summers and cold winters.",
    note: "Same-week estimates for Yuba City homeowners.",
    elevation: "~60 ft · valley floor",
    climate:
      "Yuba City summers regularly push past 100°F, and that heat pours straight into an under-insulated attic and radiates down into your living space all afternoon. A properly insulated attic is the single biggest thing standing between that valley heat and your AC bill.",
    housing:
      "We see everything here, postwar homes near downtown and Gray Avenue that have never had their original insulation touched, and newer subdivisions out toward Tierra Buena and the bypass that were built to a minimum code and could use a top-up.",
    emphasis:
      "For most Yuba City homes, a blown-in attic top-up paired with air sealing gives the fastest comfort and bill improvement. Older homes with damaged or pest-affected insulation get a full removal first.",
    neighborhoods: ["Downtown / Gray Avenue", "Tierra Buena", "Richland", "Bridge Street corridor", "newer bypass subdivisions"],
  },
  {
    slug: "marysville",
    city: "Marysville",
    county: "Yuba County",
    blurb:
      "Just across the river, Marysville's historic housing stock is often badly under-insulated. We bring those attics up to modern standards without the runaround.",
    note: "Free, no-pressure estimates across Marysville.",
    elevation: "~63 ft · Feather River lowland",
    climate:
      "Sitting in the floodplain where the Yuba meets the Feather, Marysville gets the full valley swing, triple-digit summers and damp, chilly winters. Old, settled insulation does almost nothing against either.",
    housing:
      "Marysville has some of the oldest housing stock in the region, many homes date to the 1800s and early 1900s. The original insulation (if there ever was any) is usually thin, compressed, and overdue for replacement.",
    emphasis:
      "Historic Marysville homes almost always benefit from a full removal and reinstall. We clear out the old material, air-seal the gaps that were hidden underneath, and install fresh insulation to a modern R-value.",
    neighborhoods: ["Historic Downtown", "D Street", "Cotton Rosser area", "Ellis Lake neighborhoods"],
  },
  {
    slug: "sutter-county",
    city: "Sutter County",
    blurb:
      "We serve homeowners throughout Sutter County, Live Oak, Sutter, and the surrounding rural properties where energy bills hit hardest.",
    note: "Rural and acreage properties welcome.",
    elevation: "~50 to 2,000 ft · valley & Buttes",
    climate:
      "From the orchards on the valley floor to homes tucked against the Sutter Buttes, the county sees scorching summers and cold tule-fog winters. Rural homes on propane or electric heat feel every gap in their insulation on the monthly bill.",
    housing:
      "Sutter County is farmhouses, acreage properties, and small-town homes in Live Oak and Sutter. Many have large, hard-to-reach attics and crawl spaces that were never properly insulated.",
    emphasis:
      "Big rural attics are ideal for blown-in insulation, fast, even coverage at a great value. Crawl spaces and rim joists on older farmhouses often call for spray foam to stop drafts and moisture.",
    neighborhoods: ["Live Oak", "Sutter", "Yuba City outskirts", "Sutter Buttes properties", "rural acreage"],
  },
  {
    slug: "grass-valley",
    city: "Grass Valley",
    county: "Nevada County",
    blurb:
      "Up in the foothills, insulation is about holding heat through real winters. We help Grass Valley homes stay warm and cut heating costs.",
    note: "Foothill homes and cabins covered.",
    elevation: "~2,400 ft · Sierra foothills",
    climate:
      "At 2,400 feet, Grass Valley gets genuine cold, frosty nights, the occasional snow, and long heating seasons. Here, insulation is about keeping the heat you paid for from escaping through the roof and walls.",
    housing:
      "Grass Valley is full of character homes, Gold Rush-era Victorians, foothill cabins, and custom builds on wooded lots. Many rely on wood or propane heat and lose far too much of it to thin insulation.",
    emphasis:
      "Foothill homes benefit most from serious air sealing and high R-value. Spray foam in the attic and rim joists, backed by blown-in coverage, makes a dramatic difference on cold-weather heating bills.",
    neighborhoods: ["Downtown Grass Valley", "Alta Sierra", "Cedar Ridge", "Glenbrook Basin"],
  },
  {
    slug: "auburn",
    city: "Auburn",
    county: "Placer County",
    blurb:
      "Auburn's mix of historic and modern homes both benefit from a proper attic and wall insulation upgrade. We handle the corridor up Highway 49 and I-80.",
    note: "Serving Auburn and the I-80 corridor.",
    elevation: "~1,200 ft · Sierra foothills",
    climate:
      "Auburn sits at the gateway to the Sierra, with hot, dry summers and cool, wet winters. Homes here fight heat gain half the year and heat loss the other half, so balanced, whole-home insulation pays off year-round.",
    housing:
      "Auburn blends Old Town's historic homes with newer hillside developments and custom builds. Older homes often need removal and reinstall, while newer ones usually just need a top-up to reach modern levels.",
    emphasis:
      "We take a whole-home approach in Auburn, attic blown-in for the heat, spray foam where air sealing matters, and batt in any open walls during remodels.",
    neighborhoods: ["Old Town Auburn", "North Auburn", "Christian Valley", "Bowman", "Lake of the Pines area"],
  },
  {
    slug: "truckee",
    city: "Truckee",
    county: "Nevada County",
    blurb:
      "Mountain homes demand serious insulation. We help Truckee homeowners and cabin owners keep the heat in and the snow-season bills down.",
    note: "High-country builds and second homes.",
    elevation: "~5,800 ft · high Sierra",
    climate:
      "Truckee is true alpine, heavy snow, sub-freezing nights, and one of the coldest climates in California. Insulation here isn't a comfort upgrade, it's the difference between a warm home and frozen pipes.",
    housing:
      "Truckee is mountain cabins, custom homes, and second homes built to handle snow load. The ones that struggle are usually older builds with under-spec insulation that can't keep up with deep-winter cold.",
    emphasis:
      "High-country homes need maximum R-value and airtight sealing. Closed-cell spray foam is our go-to here, it delivers the highest R-value per inch and resists moisture from snow and ice.",
    neighborhoods: ["Downtown Truckee", "Tahoe Donner", "Glenshire", "Donner Lake", "Northstar area"],
  },
  {
    slug: "lake-tahoe",
    city: "Lake Tahoe",
    blurb:
      "From lakeside homes to rentals, Tahoe properties live or die on insulation. We bring spray foam and blown-in solutions built for alpine conditions.",
    note: "Tahoe basin homes and short-term rentals.",
    elevation: "~6,225 ft · Tahoe basin",
    climate:
      "The Tahoe basin sees brutal winters, intense sun at altitude, and constant freeze-thaw cycles. Poorly insulated homes bleed heat, run up enormous propane bills, and risk ice dams and frozen pipes.",
    housing:
      "Tahoe is a mix of full-time residences, vacation homes, and short-term rentals. For rental owners especially, efficient insulation means lower operating costs and more comfortable guests through ski season.",
    emphasis:
      "We build for alpine conditions: closed-cell spray foam for airtight, high-R sealing, plus blown-in for attic coverage. Rental-ready efficiency that holds up to Tahoe winters.",
    neighborhoods: ["Kings Beach", "Tahoe City", "Tahoma", "Incline-adjacent west shore", "rental properties basin-wide"],
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
