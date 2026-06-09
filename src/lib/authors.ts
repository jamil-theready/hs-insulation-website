import { site } from "./site";

export type Author = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  credentials: string[];
  sameAs: string[];
};

export const authors: Author[] = [
  {
    slug: "heradio-hernandez",
    name: "Heradio Hernandez",
    role: "Owner & Lead Installer",
    avatar: "/images/team/heradio-avatar.svg",
    bio: `Heradio is the owner and lead installer at ${site.brand}. He founded the company in ${site.since} to bring honest, professional insulation work to ${site.region} homeowners, the kind of straight answers and clean job sites he'd want for his own family. He works hands-on in attics and crawl spaces across the valley and foothills, and he writes here to help homeowners understand what their homes actually need. Heradio serves both English- and Spanish-speaking families.`,
    credentials: [
      `Owner-operator since ${site.since}`,
      "Spray foam, blown-in, batt & removal specialist",
      "Serves English- and Spanish-speaking homeowners",
      `Based in ${site.baseCity}, ${site.state}`,
    ],
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
  },
  {
    slug: "hs-insulation-team",
    name: "H&S Insulation Team",
    role: "Insulation Crew",
    avatar: "/images/team/team-avatar.svg",
    bio: `The ${site.brand} crew brings years of hands-on insulation experience to every home across ${site.region}. We share what we learn on the job to help homeowners make smart, confident decisions about their insulation.`,
    credentials: [
      `Serving ${site.region} since ${site.since}`,
      "Spray foam · blown-in · batt · removal",
      "Clean, professional installs",
    ],
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
  },
];

export function authorByName(name: string): Author {
  return authors.find((a) => a.name === name) ?? authors[0];
}

export function authorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
