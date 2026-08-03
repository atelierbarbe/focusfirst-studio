export type Locale = "nl" | "en";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type LocalizedPost = {
  title: string;
  description: string;
  /** Short hook for LinkedIn / newsletter reuse */
  socialSnippet: string;
  sections: BlogSection[];
};

export type BlogPost = {
  slug: string;
  publishedAt: string;
  tags: string[];
  /** Optional cover image under /public */
  coverImage?: string;
  nl: LocalizedPost;
  en: LocalizedPost;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-helpt-je-sneller-groeien",
    publishedAt: "2026-08-03",
    tags: ["ai", "poc", "growth"],
    coverImage: "/blog/ai-helpt-je-sneller-groeien.jpg",
    nl: {
      title: "AI helpt je sneller groeien — door ideeën vroeg te testen",
      description:
        "De meeste digitale projecten mislukken niet omdat het idee slecht was. Ze mislukken omdat er te veel gebouwd werd vóór iemand de echte vraag beantwoordde. AI verkort die weg.",
      socialSnippet:
        "Niet meer bouwen — eerder weten. AI verkleint de afstand tussen ‘we denken dat dit werkt’ en ‘laten we het uitzoeken’. Dat is het groeivoordeel.",
      sections: [
        {
          paragraphs: [
            "De meeste digitale projecten mislukken niet omdat het idee slecht was. Ze mislukken omdat er te veel gebouwd werd vóór iemand de échte vraag beantwoordde: werkt dit ook voor de mensen voor wie het bedoeld is? Op het moment dat je dat weet, heb je al maanden geïnvesteerd — en is het originele idee zo bedekt met features en compromissen dat je niet meer kunt zien wat er precies niet klopte.",
            "AI helpt dat patroon doorbreken. Niet door na te denken in jouw plaats, maar door de afstand tussen ‘we denken dat dit werkt’ en ‘laten we het uitzoeken’ een stuk kleiner te maken.",
          ],
        },
        {
          heading: "Compact starten is een groeivoordeel",
          paragraphs: [
            "Een klein team zonder zware IT-structuur heeft één serieus voordeel: je kunt bijsturen zonder dat het een reorganisatie wordt. Kortere beslissingslijnen, minder sunk cost, sneller iets anders proberen. Dat voordeel verdwijnt zodra je te vroeg te veel bouwt — dan draag je mee aan hetzelfde gewicht als grotere spelers, maar zonder hun reserves.",
            "Vroeg testen is een manier om dat voordeel te bewaren. Je kiest één aanname, maakt die zichtbaar voor echte gebruikers, en leert van wat je ziet — vóór je er een volledig platform omheen bouwt.",
          ],
        },
        {
          heading: "Wat vroeg testen oplevert — een voorbeeld",
          paragraphs: [
            "Een zorgorganisatie wilde een digitaal intakeplatform bouwen — minder papier, snellere koppeling van cliënten aan begeleiders. Geschatte bouwtijd: vier maanden. Budget: aanzienlijk.",
            "Focus First was er van bij het begin. Niet om het platform te bouwen, maar om eerst de juiste vraag te stellen: wat moet bewezen zijn voordat die investering zin heeft? Vanuit die vraag werd de scope bepaald, het experiment opgezet en de testomgeving gebouwd.",
            "Geen vereenvoudigde versie, geen prototype op papier — een professionele digitale omgeving met een intake-flow, automatische opvolging en een werkend paneel voor de coördinator. Gebouwd om echte aanmeldingen te verwerken en te meten wat er gebeurde.",
            "Wat er gebeurde, stond niet in de spec. Families doorliepen de intake vlot, maar kwamen daarna terug — telefonisch, ongerust. Niet omdat er iets misging, maar omdat ze niets hoorden. De wachttijd was niet het probleem. De stilte was het probleem.",
            "Tegelijk toonde de data iets anders: de matchinglogica die de coördinator dagelijks handmatig uitvoerde, bleek volledig automatiseerbaar. Een AI-functie nam dat over. De coördinator volgde niet langer aanmeldingen op — die tijd ging naar de gesprekken die je niet kunt automatiseren.",
            "Het platform dat uiteindelijk gebouwd werd, zag er anders uit dan gepland. Eenvoudiger op sommige vlakken, slimmer op andere. Maar het klopte — omdat de testfase had uitgewezen wat echt telde.",
          ],
        },
        {
          heading: "Betaalbaar testen, bewust opschalen",
          paragraphs: [
            "Een gerichte proof of concept kost een fractie van een volledige build. Maar het is geen besparing — het is een aankoop. Je koopt duidelijkheid: kloppen de aannames, begrijpen gebruikers wat je aanbiedt, is er iets wat je gemist hebt? Pas als je dat weet, is investeren in een bredere build een bewuste keuze in plaats van een gok.",
            "Als blijkt dat de kern niet klopt, heb je dat ontdekt voor een prijs die je de ruimte geeft om bij te sturen — of zelfs te stoppen. Dat is geen mislukking. Het is precies waar het om gaat.",
          ],
        },
        {
          heading: "Focus houden terwijl je groeit",
          paragraphs: [
            "Sneller kunnen bouwen vergroot ook de verleiding om méér te bouwen. AI verlaagt de drempel — dat is fijn, maar het vergroot ook het risico dat de scope opzwelt voordat er bewijs is. Daarom bewaken wij de focus actief: één aanname per cyclus, één belofte per oplevering.",
            "Bij Focus First gebruiken we AI als versneller binnen die discipline: klein starten, iets zichtbaars neerzetten, leren van wat je ziet, en dan groeien op wat overtuigt. Elk idee — en elke bedenker — krijgt zo een eerlijke kans om te bewijzen dat opschalen de moeite waard is.",
          ],
        },
      ],
    },
    en: {
      title: "AI helps you grow faster — by testing ideas early",
      description:
        "Most digital projects don’t fail because the idea was bad. They fail because too much was built before anyone answered the real question. AI shortens that path.",
      socialSnippet:
        "Not more building — knowing sooner. AI shrinks the gap between ‘we think this works’ and ‘let’s find out’. That’s the growth advantage.",
      sections: [
        {
          paragraphs: [
            "Most digital projects don’t fail because the idea was bad. They fail because too much was built before anyone answered the real question: does this actually work for the people it’s meant for? By the time you find out, you’ve already spent months — and the original idea has been buried under so many features and compromises that it’s hard to see what actually went wrong.",
            "AI helps break that pattern. Not by thinking for you, but by making the gap between ‘we think this works’ and ‘let’s find out’ a lot shorter.",
          ],
        },
        {
          heading: "Starting compact is a growth advantage",
          paragraphs: [
            "A small team without heavy IT infrastructure has one serious advantage: you can change course without it becoming a reorganization. Shorter decision lines, less sunk cost, faster iteration. That advantage disappears the moment you build too much too early — then you’re carrying the same weight as larger players, without their reserves.",
            "Testing early is how you preserve that advantage. Pick one assumption, make it visible to real users, and learn from what you see — before you build a full platform around it.",
          ],
        },
        {
          heading: "What early testing actually delivers — a real example",
          paragraphs: [
            "A care organization wanted to build a digital intake platform — less paperwork, faster matching of clients to caregivers. Estimated build time: four months. Budget: significant.",
            "Focus First was involved from the very start. Not to build the platform, but to ask the right question first: what needs to be proven before that investment makes sense? From that question, the scope was defined, the experiment set up, and the test environment built.",
            "Not a simplified version, not a paper prototype — a professional digital environment with an intake flow, automated follow-up, and a working panel for the coordinator. Built to process real registrations and measure what actually happened.",
            "What happened wasn't in the spec. Families moved through the intake without trouble, then called back — anxious, uncertain. Not because something had gone wrong, but because they hadn't heard anything. The wait wasn't the problem. The silence was.",
            "The data also revealed something else: the matching logic the coordinator handled manually every day was fully automatable. An AI function took it over. The coordinator stopped tracking registrations — that time went to the conversations you can't automate.",
            "The platform that was eventually built looked different from what had been planned. Simpler in some ways, smarter in others. But it was right — because the test phase had shown what actually mattered.",
          ],
        },
        {
          heading: "Affordable testing, deliberate scaling",
          paragraphs: [
            "A focused proof of concept costs a fraction of a full build. But it isn’t a saving — it’s a purchase. You’re buying clarity: do the assumptions hold, do users understand what you’re offering, is there something you missed? Only once you know that is investing in a broader build a deliberate decision rather than a gamble.",
            "If the core turns out not to work, you’ve found that out at a cost that still leaves you room to adjust — or even stop. That isn’t failure. That’s the whole point.",
          ],
        },
        {
          heading: "Stay focused while you grow",
          paragraphs: [
            "Being able to build faster also increases the temptation to build more. AI lowers the barrier — which is useful, but it also raises the risk of scope expanding before there’s any evidence to support it. That’s why we actively protect focus: one assumption per cycle, one promise per delivery.",
            "At Focus First we use AI as an accelerator inside that discipline: start small, ship something visible, learn from what you see, then grow on what actually convinces. Every idea — and every person behind one — gets a fair shot at proving that scaling is worth it.",
          ],
        },
      ],
    },
  },
  {
    slug: "ideeen-sneller-conceptualiseren",
    publishedAt: "2026-08-02",
    tags: ["focus", "poc", "process"],
    nl: {
      title: "Ideeën sneller conceptualiseren",
      description:
        "Van vaag idee naar scherpe scope in dagen, niet maanden — met een proof of concept als anker.",
      socialSnippet:
        "Een idee hoeft niet maanden te rijpen. Met een gerichte POC maak je in dagen zichtbaar wat werkt — en wat je bewust laat liggen.",
      sections: [
        {
          paragraphs: [
            "De meeste digitale ideeën sterven niet door gebrek aan ambitie, maar door te veel open vragen tegelijk. Je wil iets bouwen, maar scope, gebruikers, techniek en budget lopen door elkaar. Het resultaat: eindeloos overleg, weinig concreets.",
            "Sneller conceptualiseren betekent niet slordiger werken. Het betekent vroeg een scherpe kern kiezen en die zichtbaar maken — in een werkend stukje product, niet in een dikke presentatie.",
          ],
        },
        {
          heading: "Begin bij één beslissing",
          paragraphs: [
            "Vraag niet: “Wat kan dit allemaal worden?” Vraag: “Welke ene aanname moeten we deze week testen?” Dat dwingt focus. Alles wat die aanname niet helpt bewijzen of ontkrachten, blijft tijdelijk buiten scope.",
            "Die ene aanname wordt je anker. Gebruikersflow, data, UI en integraties dienen die test — niet andersom.",
          ],
        },
        {
          heading: "Een POC is een anker, geen mini-platform",
          paragraphs: [
            "Een proof of concept toont of de kern werkt voor echte mensen in een echte context. Het is geen verkleinde versie van het eindproduct. Minder schermen, minder edge cases, meer helderheid.",
            "Als de POC overtuigt, weet je wáár je mag investeren. Als hij dat niet doet, heb je goedkoop geleerd — en je idee is scherper geworden, niet waziger.",
          ],
        },
        {
          heading: "Hoe wij dat versnellen",
          paragraphs: [
            "Bij Focus First combineren we analyse, korte bouwcycli en AI als accelerator. We houden de kern vast, snijden ruis weg, en leveren iets werkends waarmee je kunt beslissen — meestal in weken, niet kwartalen.",
            "Heb je een idee dat te lang in het hoofd blijft hangen? Dan is het moment om het te conceptualiseren — scherp, zichtbaar, en testbaar.",
          ],
        },
      ],
    },
    en: {
      title: "Conceptualize ideas faster",
      description:
        "From fuzzy idea to sharp scope in days, not months — with a proof of concept as the anchor.",
      socialSnippet:
        "An idea doesn’t need months to mature. A focused POC makes what’s working — and what you’re leaving out — visible in days.",
      sections: [
        {
          paragraphs: [
            "Most digital ideas don’t die from a lack of ambition, but from too many open questions at once. You want to build something, yet scope, users, tech, and budget blur together. The result: endless alignment, little that’s concrete.",
            "Conceptualizing faster doesn’t mean working sloppily. It means choosing a sharp core early and making it visible — in a working slice of product, not a thick deck.",
          ],
        },
        {
          heading: "Start with one decision",
          paragraphs: [
            "Don’t ask: “What could this become?” Ask: “Which one assumption do we need to test this week?” That forces focus. Anything that doesn’t help prove or disprove that assumption stays out of scope — for now.",
            "That single assumption becomes your anchor. Flows, data, UI, and integrations serve that test — not the other way around.",
          ],
        },
        {
          heading: "A POC is an anchor, not a mini-platform",
          paragraphs: [
            "A proof of concept shows whether the core works for real people in a real context. It isn’t a shrunken final product. Fewer screens, fewer edge cases, more clarity.",
            "If the POC convinces, you know where to invest. If it doesn’t, you learned cheaply — and your idea got sharper, not fuzzier.",
          ],
        },
        {
          heading: "How we accelerate that",
          paragraphs: [
            "At Focus First we combine analysis, short build cycles, and AI as an accelerator. We hold the core, cut noise, and ship something working you can decide on — usually in weeks, not quarters.",
            "Got an idea that’s lived in your head too long? That’s the moment to conceptualize it — sharp, visible, and testable.",
          ],
        },
      ],
    },
  },
  {
    slug: "focus-op-je-idee-behouden",
    publishedAt: "2026-08-02",
    tags: ["focus", "product", "strategy"],
    nl: {
      title: "Focus First: houd focus op je idee",
      description:
        "Bijkomende info en obstakels maken een concept wazig. Wij bewaren de focus zodat je kernidee helder blijft.",
      socialSnippet:
        "Elke extra feature, stakeholder-wens of ‘misschien later’-idee kan je kern wazig maken. Focus bewaren is een discipline — daarvoor zijn wij er.",
      sections: [
        {
          paragraphs: [
            "Een sterk idee begint meestal simpel. Daarna komen de lagen: uitzonderingen, integraties, politieke wensen, toekomstige modules. Elk apart begrijpelijk. Samen maken ze het originele inzicht onzichtbaar.",
            "Focus First betekent: het kernidee blijft leidend. Wij zijn er om die focus te bewaren wanneer alles eromheen trekt.",
          ],
        },
        {
          heading: "Wazigheid is zelden een gebrek aan slimheid",
          paragraphs: [
            "Teams worden wazig omdat ze te veel tegelijk serieus nemen. Een nieuw inzicht voelt alsof je het nú moet meenemen. Een obstakel voelt alsof je het ontwerp moet verbreden. Voor je het weet optimaliseer je voor alles — en voor niemands echte probleem.",
            "Helderheid komt van weglaten. Niet permanent, maar bewust: wat hoort bij deze fase, en wat bewaren we voor later?",
          ],
        },
        {
          heading: "Hoe wij focus bewaken",
          paragraphs: [
            "We vertalen je idee naar een scherpe probleemstelling en een minimale scope die die stelling kan bewijzen. Bij elke nieuwe wens vragen we: versterkt dit de kern, of verwatert het die?",
            "Obstakels negeren we niet — we parkeren ze zichtbaar. Zo blijft het gesprek eerlijk zonder dat het product opzwelt. De roadmap groeit; de eerste oplevering blijft lean.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Jij houdt grip op wat je wilde bouwen. Stakeholders zien sneller iets concreets. En AI gebruiken we om sneller te bouwen — niet om sneller af te dwalen.",
            "Wil je een idee dat helder begon, ook helder laten landen? Dan begint het bij focus — en iemand die die focus met je bewaakt.",
          ],
        },
      ],
    },
    en: {
      title: "Focus First: keep focus on your idea",
      description:
        "Extra noise and obstacles blur a concept. We protect focus so your core idea stays clear.",
      socialSnippet:
        "Every extra feature, stakeholder wish, or “maybe later” idea can blur your core. Keeping focus is a discipline — that’s what we’re here for.",
      sections: [
        {
          paragraphs: [
            "A strong idea usually starts simple. Then the layers arrive: exceptions, integrations, political asks, future modules. Each one makes sense alone. Together they hide the original insight.",
            "Focus First means: the core idea stays in the lead. We’re here to protect that focus when everything around it pulls.",
          ],
        },
        {
          heading: "Blur rarely comes from a lack of smarts",
          paragraphs: [
            "Teams get fuzzy because they take too much seriously at once. A new insight feels like it must be included now. An obstacle feels like the design must widen. Before long you’re optimizing for everything — and for no one’s real problem.",
            "Clarity comes from leaving things out. Not forever, but deliberately: what belongs in this phase, and what do we save for later?",
          ],
        },
        {
          heading: "How we guard focus",
          paragraphs: [
            "We turn your idea into a sharp problem statement and a minimal scope that can prove it. For every new request we ask: does this strengthen the core, or dilute it?",
            "We don’t ignore obstacles — we park them in the open. The conversation stays honest without the product bloating. The roadmap can grow; the first delivery stays lean.",
          ],
        },
        {
          heading: "The outcome",
          paragraphs: [
            "You keep grip on what you set out to build. Stakeholders see something concrete sooner. And we use AI to build faster — not to drift faster.",
            "Want an idea that started clear to land clear too? It starts with focus — and someone who helps you protect it.",
          ],
        },
      ],
    },
  },
  {
    slug: "financiele-voordelen-digitale-poc",
    publishedAt: "2026-08-02",
    tags: ["poc", "roi", "business"],
    nl: {
      title: "Financiële voordelen van een digitale proof of concept",
      description:
        "Een gerichte POC beperkt risico, versnelt beslissingen en vermijdt te vroege full-build investeringen.",
      socialSnippet:
        "Een POC is geen extra kost — het is vaak de goedkoopste manier om te ontdekken of je wél of niet groot moet investeren.",
      sections: [
        {
          paragraphs: [
            "Digitale projecten worden duur als je te vroeg te breed bouwt. Teams, licenties, integraties en maanden planning stapelen zich op — nog vóór iemand bewezen heeft dat de kern waarde levert.",
            "Een gerichte proof of concept draait die logica om: eerst een beperkt budget om zekerheid te kopen, daarna pas de grotere investering.",
          ],
        },
        {
          heading: "Risico naar voren halen (waar het goedkoop is)",
          paragraphs: [
            "De duurste fout is ontdekken dat je verkeerde aanname had ná een full build. Een POC haalt die onzekerheid naar voren: werkt de flow? Begrijpen gebruikers het? Is de data bruikbaar? Is er echt vraag?",
            "Je betaalt een gecontroleerd bedrag om een ja/nee of “anders zo”-antwoord te krijgen — in plaats van een open cheque voor een platform dat misschien niemand nodig heeft.",
          ],
        },
        {
          heading: "Snellere, betere beslissingen",
          paragraphs: [
            "Met iets werkends op tafel beslissen stakeholders sneller. Discussies gaan over wat ze zien, niet over abstracte slides. Dat verkort overlegcycli en voorkomt parallelle “misschien”-sporen die budget opslokken.",
            "Voor publieke én private organisaties geldt hetzelfde: een zichtbare POC maakt prioriteiten meetbaar — en stoppen of bijsturen wordt een bewuste keuze, geen mislukking.",
          ],
        },
        {
          heading: "Wat je concreet bespaart",
          paragraphs: [
            "Minder scope creep in fase 1. Minder herwerk omdat de kern al getest is. Minder kans dat je een team aanneemt of een vendor kiest vóór het probleem scherp is. En vaak: een sterker dossier voor interne goedkeuring of investeerders, omdat je bewijs hebt in plaats van alleen een pitch.",
            "Bij Focus First mikken we op betaalbare trajecten (van enkele weken tot een POC in 6–8 weken) zodat de financiële drempel laag blijft — en de focus hoog.",
          ],
        },
      ],
    },
    en: {
      title: "Financial benefits of a digital proof of concept",
      description:
        "A focused POC reduces risk, speeds decisions, and avoids premature full-build investment.",
      socialSnippet:
        "A POC isn’t an extra cost — it’s often the cheapest way to learn whether you should invest big, or not.",
      sections: [
        {
          paragraphs: [
            "Digital projects get expensive when you build too wide too early. Teams, licenses, integrations, and months of planning stack up — before anyone has proven the core delivers value.",
            "A focused proof of concept flips that logic: spend a limited budget first to buy certainty, then make the larger investment.",
          ],
        },
        {
          heading: "Pull risk forward (where it’s cheap)",
          paragraphs: [
            "The costliest mistake is discovering a wrong assumption after a full build. A POC pulls that uncertainty forward: does the flow work? Do users get it? Is the data usable? Is there real demand?",
            "You pay a controlled amount for a yes/no or “do it this way instead” answer — instead of writing a blank check for a platform nobody may need.",
          ],
        },
        {
          heading: "Faster, better decisions",
          paragraphs: [
            "With something working on the table, stakeholders decide faster. Conversations are about what they see, not abstract slides. That shortens alignment cycles and prevents parallel “maybe” tracks that burn budget.",
            "For public and private organizations alike: a visible POC makes priorities measurable — and stopping or steering becomes a deliberate choice, not a failure.",
          ],
        },
        {
          heading: "What you save in practice",
          paragraphs: [
            "Less scope creep in phase one. Less rework because the core is already tested. Less chance you hire a team or pick a vendor before the problem is sharp. And often: a stronger case for internal approval or investors, because you have evidence — not just a pitch.",
            "At Focus First we aim for affordable tracks (from a few weeks to a POC in 6–8 weeks) so the financial bar stays low — and focus stays high.",
          ],
        },
      ],
    },
  },
];
