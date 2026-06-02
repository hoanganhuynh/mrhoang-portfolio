export interface Project {
  slug: string;
  name: string;
  category: string;
  filterTag: string;
  role: string;
  timeframe: string;
  team: string[];
  description: string;
  painPoint: string;
  pmContribution: string;
  outcomes: string[];
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "ss-group",
    name: "S&S Group",
    category: "Luxury Retail / Product Experience",
    filterTag: "Product Experience",
    role: "Product Design Lead",
    timeframe: "03 months",
    team: [
      "Product Design Lead x1",
      "Business Analyst x1",
      "UI/UX Designer x2",
      "Implementation partner collaboration",
    ],
    description:
      "A premium digital experience for a luxury retail ecosystem in Vietnam, balancing brand refinement, sales clarity, and internal product usability.",
    painPoint:
      "The experience needed to feel elevated for luxury customers while helping internal teams understand products, orders, and sales flows with less friction.",
    pmContribution:
      "Defined the product experience direction, shaped core user flows, translated luxury brand expectations into interface behavior, and aligned the visual system with practical sales journeys.",
    outcomes: [
      "Created a clearer luxury-facing product journey",
      "Improved usability around product discovery and sales handling",
      "Reduced ambiguity between brand expectations and interface decisions",
      "Established a more consistent visual language across customer and internal touchpoints",
    ],
    images: [
      "/assets/projects/ss-group/01.jpg",    // ảnh 1
      "/assets/projects/ss-group/mockup-5.jpg", // mockup 1
      "/assets/projects/ss-group/1.jpg",     // ảnh 2
      "/assets/projects/ss-group/mockup-6.jpg", // mockup 2
      "/assets/projects/ss-group/2.jpg",     // ảnh 3
      "/assets/projects/ss-group/3.jpg",     // ảnh 4
      "/assets/projects/ss-group/4.jpg",     // ảnh 5
    ],
  },
  {
    slug: "fpt-techday",
    name: "FPT Techday 2021",
    category: "Virtual Event / Interactive Experience",
    filterTag: "Event Experience",
    role: "Product Design Lead",
    timeframe: "02 months",
    team: [
      "Product Design Lead x1",
      "Business Analyst x1",
      "UI/UX Designer x2",
      "3D Artist/Motion x1",
      "Implementation partner collaboration",
    ],
    description:
      "A virtual event product experience for one of the largest online innovation events during the COVID period, designed for orientation, participation, and credibility at scale.",
    painPoint:
      "The audience needed to navigate a large digital event without feeling lost, while organizers needed a polished interface that could make sessions, content, and interactive moments easy to understand.",
    pmContribution:
      "Mapped the event journey, shaped key experience flows, guided UI direction, and aligned interactive moments with the event narrative and user attention patterns.",
    outcomes: [
      "Created a structured digital journey for a large online audience",
      "Improved clarity across session discovery and event participation",
      "Aligned 3D, motion, and interface direction into one coherent experience",
      "Supported a smoother audience flow during high-attention event moments",
    ],
    images: ["/assets/projects/fpt-techday/01.jpg"],
  },
  {
    slug: "rav",
    name: "Restaurant Association of Vietnam",
    category: "F&B Community / Digital Ecosystem",
    filterTag: "Community Experience",
    role: "UX Strategy / Product Design",
    timeframe: "2019 — 2025",
    team: [
      "UX Strategy x1",
      "Branding Manager x1",
      "UI/UX Designer x1",
      "Partner experience collaboration",
    ],
    description:
      "A long-term digital ecosystem for Vietnam's F&B community, connecting campaigns, events, partner communication, and public-facing storytelling.",
    painPoint:
      "The association needed a clearer way to organize community content, partner visibility, campaign stories, and event touchpoints into one recognizable experience.",
    pmContribution:
      "Shaped the UX strategy, content structure, campaign experience, partner-facing touchpoints, and digital presence for a multi-year community platform.",
    outcomes: [
      "Improved partner visibility across campaigns and events",
      "Strengthened the association's digital storytelling system",
      "Created clearer pathways between events, content, and community engagement",
      "Supported a more consistent public-facing experience for F&B stakeholders",
    ],
    images: [
      "/assets/projects/rav/01.jpg",       // ảnh 1
      "/assets/projects/rav/mockup1.jpg",  // mockup 1
      "/assets/projects/rav/7.jpg",        // ảnh 2
      "/assets/projects/rav/mockup2.jpg",  // mockup 2
      "/assets/projects/rav/8.jpg",        // ảnh 3
      "/assets/projects/rav/9.jpg",        // ảnh 4
      "/assets/projects/rav/10.jpg",       // ảnh 5
    ],
  },
  {
    slug: "emotico",
    name: "Emotico",
    category: "Mental Wellness / Student Product",
    filterTag: "Wellness Product",
    role: "Product Designer / Founder",
    timeframe: "Long-term / Ongoing",
    team: [
      "Project Owner x1",
      "Product Designer x1",
      "UI/UX Designer x1",
      "Implementation partner collaboration",
    ],
    description:
      "A mental wellness product for students, built around self-care, emotional awareness, and psychology-informed interaction design.",
    painPoint:
      "Students often lack accessible, age-appropriate tools that help them recognize emotions, reflect safely, and build self-care habits without feeling judged.",
    pmContribution:
      "Defined the product concept, translated psychological principles into feature journeys, designed the UX structure, and shaped content logic for student-friendly emotional support.",
    outcomes: [
      "Built a clear foundation for a psychology-informed wellness product",
      "Improved the connection between mental health content and user journeys",
      "Created a safer, more approachable product logic for student self-reflection",
      "Established a design framework for future feature iteration and school adoption",
    ],
    images: [
      "/assets/projects/emotico/01.jpg",      // ảnh 1
      "/assets/projects/emotico/mockup1.jpg", // mockup 1
      "/assets/projects/emotico/11.jpg",      // ảnh 2
      "/assets/projects/emotico/mockup2.jpg", // mockup 2
      "/assets/projects/emotico/12.jpg",      // ảnh 3
    ],
  },
  {
    slug: "vinamilk",
    name: "Vinamilk",
    category: "Corporate Website / Brand Experience",
    filterTag: "Brand Experience",
    role: "UIUX Design Lead",
    timeframe: "04 months",
    team: [
      "UIUX Design Lead x1",
      "UI/UX Designer x2",
      "Implementation partner collaboration",
    ],
    description:
      "A corporate website experience for a major Vietnamese brand, focused on clearer content hierarchy, modern interface standards, and consistent brand expression.",
    painPoint:
      "The website needed to present a large amount of brand and business information clearly while keeping the visual experience consistent, modern, and easy to scan.",
    pmContribution:
      "Guided the UIUX direction, shaped page structure, supported design system consistency, and translated corporate communication into a more usable digital interface.",
    outcomes: [
      "Improved brand consistency across digital pages",
      "Supported clearer content hierarchy and navigation",
      "Strengthened alignment between corporate messaging and interface design",
      "Reduced visual fragmentation through reusable UI patterns",
    ],
    images: [
      "/assets/projects/vinamilk/01.jpg",      // ảnh 1
      "/assets/projects/vinamilk/mockup1.jpg", // mockup 1
      "/assets/projects/vinamilk/1.jpg",       // ảnh 2
      "/assets/projects/vinamilk/2.jpg",       // ảnh 3
      "/assets/projects/vinamilk/3.jpg",       // ảnh 4
      "/assets/projects/vinamilk/4.jpg",       // ảnh 5
    ],
  },
  {
    slug: "bcnv",
    name: "BCNV",
    category: "Nonprofit Website / Awareness Experience",
    filterTag: "Awareness Experience",
    role: "UIUX Design Lead",
    timeframe: "04 months",
    team: [
      "UIUX Design Lead x1",
      "3D Artist x1",
      "UI/UX Designer x1",
      "Implementation partner collaboration",
    ],
    description:
      "A website and campaign experience for Vietnam's breast cancer network, focused on emotional clarity, public awareness, and user-friendly access to campaign information.",
    painPoint:
      "The campaign needed to communicate a sensitive health-related message with emotional care, credibility, and accessible information architecture.",
    pmContribution:
      "Shaped the emotional design direction, campaign structure, website UX, visual identity alignment, and information architecture for sensitive public communication.",
    outcomes: [
      "Improved campaign storytelling consistency",
      "Supported better user access to campaign information",
      "Created a more emotionally appropriate visual experience",
      "Aligned nonprofit communication with a more careful and practical user journey",
    ],
    images: [
      "/assets/projects/bcnv/01.jpg",
      "/assets/projects/bcnv/02.jpg",
      "/assets/projects/bcnv/03.jpg",
      "/assets/projects/bcnv/04.jpg",
      "/assets/projects/bcnv/05.jpg",
      "/assets/projects/bcnv/06.jpg",
    ],
  },
  {
    slug: "sacombank-vr",
    name: "Sacombank VR",
    category: "Banking Innovation / VR Experience",
    filterTag: "Banking Innovation",
    role: "Art Director / UI/UX Designer",
    timeframe: "02 months",
    team: [
      "Art Director x1",
      "UI/UX Designer x1",
      "Immersive experience partner collaboration",
    ],
    description:
      "A VR banking concept designed to explore future-facing financial interaction, retirement planning, and immersive customer education.",
    painPoint:
      "Banking products are often difficult to explain through conventional interfaces, especially when the subject involves long-term planning and abstract financial scenarios.",
    pmContribution:
      "Structured the immersive user journey, designed interaction flows, guided visual direction, and translated financial education goals into a spatial product experience.",
    outcomes: [
      "Improved exploration of immersive banking interaction concepts",
      "Supported future product communication through visual prototyping",
      "Helped stakeholders understand abstract financial scenarios through spatial UX",
      "Connected financial education with a more tangible customer experience",
    ],
    images: ["/assets/projects/sacombank-vr/01.jpg"],
  },
  {
    slug: "cosmo-club",
    name: "COSMO Club",
    category: "Luxury Gaming / Digital Product Ecosystem",
    filterTag: "Digital Product",
    role: "Product Design Lead",
    timeframe: "05 months",
    team: [
      "Product Design Lead x1",
      "Business Analyst x1",
      "UI/UX Designer x2",
    ],
    description:
      "A luxury digital ecosystem for a casino and hospitality brand, including website experience, mobile app direction, and high-end brand identity execution.",
    painPoint:
      "The brand required a premium digital presence that could communicate exclusivity, usability, and visual consistency across website, mobile app, and brand materials.",
    pmContribution:
      "Led UX/UI direction, aligned brand identity with product structure, shaped multi-channel experience logic, and supported premium interaction consistency.",
    outcomes: [
      "Improved digital brand consistency",
      "Supported clearer product and brand alignment",
      "Created a more coherent website and mobile app experience",
      "Reduced ambiguity across visual, content, and interaction requirements",
    ],
    images: ["/assets/projects/cosmo-club/01.jpg"],
  },
];

export const additionalProjects = [
  {
    name: "Ho Chi Minh City Tourism Website",
    category: "Tourism / Civic Experience",
    year: "2023",
  },
  {
    name: "Food Hospitality Vietnam",
    category: "F&B / Event Experience",
    year: "2022",
  },
  {
    name: "Informa Market",
    category: "Exhibition / Product Experience",
    year: "2023",
  },
  {
    name: "Carebox by Hung Thinh Land",
    category: "Real Estate / Service Experience",
    year: "2024",
  },
];

export const filterTags = [
  "All",
  "Digital Product",
  "Product Experience",
  "Brand Experience",
  "Community Experience",
  "Wellness Product",
  "Banking Innovation",
  "Event Experience",
  "Awareness Experience",
];
