export type CaseScreenshot = {
  src: string;
  alt: { nl: string; en: string };
};

export type CaseMedia = {
  projectUrl?: string;
  screenshots: CaseScreenshot[];
};

export const caseMedia: Record<string, CaseMedia> = {
  treepin: {
    projectUrl: "https://treepin.vercel.app",
    screenshots: [
      {
        src: "/cases/treepin/01-hero.jpg",
        alt: {
          nl: "Treepin marketingpagina — hero met positionering als digitale standaard voor boombeheer",
          en: "Treepin marketing page — hero positioning it as the digital standard for tree management",
        },
      },
      {
        src: "/cases/treepin/02-hoe-het-werkt.jpg",
        alt: {
          nl: "Treepin — sectie Hoe het werkt met inventariseer, inspecteer en rapporteer",
          en: "Treepin — How it works section with inventory, inspect, and report steps",
        },
      },
    ],
  },
  "studio-huis": {
    projectUrl: "https://www.studiohuis.be",
    screenshots: [
      {
        src: "/cases/studio-huis/01-hero.jpg",
        alt: {
          nl: "Studio Huis website — hero ‘Slim renoveren begint hier’",
          en: "Studio Huis website — hero ‘Smart renovating starts here’",
        },
      },
      {
        src: "/cases/studio-huis/02-diensten.jpg",
        alt: {
          nl: "Studio Huis — overzicht van diensten en aanpak",
          en: "Studio Huis — services and approach overview",
        },
      },
    ],
  },
  "greenlight-beheer": {
    projectUrl: "https://www.greenlightbeheer.be",
    screenshots: [
      {
        src: "/cases/greenlight-beheer/01-hero.jpg",
        alt: {
          nl: "Greenlight Beheer website — hero met studie- & adviesbureau positionering",
          en: "Greenlight Beheer website — hero positioning the study & consultancy practice",
        },
      },
      {
        src: "/cases/greenlight-beheer/02-section.jpg",
        alt: {
          nl: "Greenlight Beheer — dienstenoverzicht op de website",
          en: "Greenlight Beheer — services overview on the website",
        },
      },
    ],
  },
  multiplugin: {
    screenshots: [
      {
        src: "/cases/multiplugin/01-box-naar-corpus.jpg",
        alt: {
          nl: "Multiplugin platform — Box naar corpus: massabox-afmetingen en materiaalkeuze in SketchUp",
          en: "Multiplugin platform — Box to corpus: mass-box dimensions and material choice in SketchUp",
        },
      },
      {
        src: "/cases/multiplugin/02-multitag-filter.jpg",
        alt: {
          nl: "Multiplugin platform — Multitag-filter met onderdelen, m² en lm voor materiaallijst",
          en: "Multiplugin platform — Multitag filter with parts, m² and lm for the material list",
        },
      },
    ],
  },
};
