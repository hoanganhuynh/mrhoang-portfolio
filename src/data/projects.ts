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
  techStack: string[];
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "ss-group",
    name: "S&S Group",
    category: "Luxury Distribution / Internal Sales System",
    filterTag: "Enterprise Website",
    role: "Project Manager",
    timeframe: "03 months",
    team: [
      "Project Manager x1",
      "Business Analyst x1",
      "Senior Developer x2",
      "UI/UX Designer x2",
    ],
    description:
      "A premium distribution ecosystem for luxury products in Vietnam, requiring a refined digital experience and a reliable internal sales operation.",
    painPoint:
      "The client needed a luxury-grade sales and brand experience while also improving internal order handling, sales coordination, and operational transparency.",
    pmContribution:
      "Managed project scope, translated luxury brand expectations into technical requirements, coordinated business analysis and design direction, and aligned internal workflow with system delivery.",
    outcomes: [
      "Improved internal sales handling workflow",
      "Reduced ambiguity between business, design, and development teams",
      "Created a more consistent luxury-facing digital journey",
      "Supported smoother partner communication through clearer project documentation",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Go",
      "Node.js",
      "Next.js",
      "Tailwind CSS",
      "Redis",
      "MySQL",
      "MongoDB",
      "Docker",
    ],
    images: ["/assets/project image/SSGroup.jpg"],
  },
  {
    slug: "fpt-techday",
    name: "FPT Techday 2021",
    category: "Virtual Event Platform / High Concurrency Experience",
    filterTag: "Event Platform",
    role: "Project Manager",
    timeframe: "02 months",
    team: [
      "Project Manager x1",
      "Business Analyst x1",
      "Senior Developer x2",
      "UI/UX Designer x2",
      "3D Artist/Motion x1",
    ],
    description:
      "A virtual event platform for one of the largest online technology events during the COVID period, designed to support high traffic and interactive participation.",
    painPoint:
      "The event required an online environment capable of handling large-scale participation while maintaining a smooth, engaging, and credible experience.",
    pmContribution:
      "Coordinated design, development, and 3D visual production; managed the delivery roadmap; aligned event objectives with user experience requirements; and supported high-concurrency planning.",
    outcomes: [
      "Supported event readiness under tight delivery constraints",
      "Improved coordination between event, creative, and technical teams",
      "Created a structured digital experience for a large online audience",
      "Helped reduce risk during peak traffic moments through early technical planning",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Blender",
    ],
    images: ["/assets/project image/FPT techday.jpg"],
  },
  {
    slug: "rav",
    name: "Restaurant Association of Vietnam",
    category: "F&B Community Ecosystem / Digital Campaign",
    filterTag: "Community Platform",
    role: "Vice President / Project Manager",
    timeframe: "2019 — 2025",
    team: [
      "Project Manager x1",
      "Branding Manager x1",
      "UI/UX Designer x1",
      "Partner web team collaboration",
    ],
    description:
      "A long-term ecosystem-building initiative supporting F&B community development, campaigns, events, digital presence, and partner collaboration.",
    painPoint:
      "The F&B community needed stronger digital infrastructure, partner communication, campaign visibility, and a more structured way to connect events, content, and stakeholders.",
    pmContribution:
      "Led ecosystem coordination, campaign planning, website and communication direction, partner alignment, content operations, and community growth initiatives.",
    outcomes: [
      "Improved partner visibility across campaigns and events",
      "Strengthened community engagement",
      "Supported association-level communication consistency",
      "Created clearer pathways between event planning, digital content, and public-facing communication",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Blender",
    ],
    images: ["/assets/project image/RAV.jpg"],
  },
  {
    slug: "emotico",
    name: "Emotico",
    category: "Mental Wellness Platform / EdTech / Mobile App",
    filterTag: "Wellness Tech",
    role: "Project Owner",
    timeframe: "Long-term / Ongoing",
    team: [
      "Project Owner x1",
      "Mobile App Developer x2",
      "UI/UX Designer x1",
    ],
    description:
      "A mental wellness platform for students, built around self-care, emotional awareness, and psychology-informed product experiences.",
    painPoint:
      "Adolescents and students often lack accessible, structured, and engaging tools to recognize emotions and practice mental self-care in a safe and age-appropriate way.",
    pmContribution:
      "Defined product direction, translated psychological principles into product features, coordinated UX structure, supported content logic, and guided long-term product development.",
    outcomes: [
      "Built a scalable foundation for a psychology-informed wellness platform",
      "Improved clarity between mental health content, user journeys, and product features",
      "Supported future school and partner adoption through structured platform logic",
      "Created a clearer internal framework for product iteration",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Blender",
    ],
    images: ["/assets/project image/eMotico.jpg"],
  },
  {
    slug: "vinamilk",
    name: "Vinamilk",
    category: "Corporate Brand Website / Enterprise Digital Experience",
    filterTag: "Enterprise Website",
    role: "Project Manager",
    timeframe: "04 months",
    team: [
      "Project Manager x1",
      "UI/UX Designer x2",
      "Partner technology team collaboration",
    ],
    description:
      "A corporate website experience for a major Vietnamese brand, focused on brand consistency, modern interface standards, and a more refined digital identity.",
    painPoint:
      "The brand needed a modern corporate website experience that could present business information clearly while keeping the visual language consistent and premium.",
    pmContribution:
      "Managed the design direction, coordinated with technical partners, supported design system consistency, and helped translate corporate communication into a structured digital interface.",
    outcomes: [
      "Improved brand consistency across digital pages",
      "Supported clearer content governance",
      "Strengthened communication between design and partner development teams",
      "Reduced visual fragmentation through reusable UI patterns",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Blender",
    ],
    images: ["/assets/project image/Vinamilk.jpg"],
  },
  {
    slug: "bcnv",
    name: "BCNV",
    category: "Nonprofit Website / Awareness Campaign",
    filterTag: "Community Platform",
    role: "Project Manager",
    timeframe: "04 months",
    team: [
      "Project Manager x1",
      "3D Artist x1",
      "Senior Developer x1",
      "UI/UX Designer x1",
    ],
    description:
      "A website and campaign experience for Vietnam's breast cancer network, focused on emotional clarity, public awareness, and user-friendly access to campaign information.",
    painPoint:
      "The campaign needed to communicate a sensitive health-related message with emotional care, credibility, and accessible information architecture.",
    pmContribution:
      "Coordinated emotional design direction, campaign structure, website UX, visual identity alignment, and partner communication to ensure the experience remained both sensitive and practical.",
    outcomes: [
      "Improved campaign storytelling consistency",
      "Supported better user access to campaign information",
      "Created a more emotionally appropriate visual experience",
      "Helped align nonprofit communication, design, and technical delivery",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Blender",
    ],
    images: ["/assets/project image/BCNV.jpg"],
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
      "Technology partner collaboration",
    ],
    description:
      "A VR banking concept designed to explore future-facing financial interaction, retirement planning, and immersive customer education.",
    painPoint:
      "Banking products are often difficult to explain through conventional interfaces, especially when the subject involves long-term planning and abstract financial scenarios.",
    pmContribution:
      "Helped structure the immersive user journey, designed interaction flows, coordinated visual direction, and translated financial education goals into a spatial experience.",
    outcomes: [
      "Improved internal exploration of immersive banking concepts",
      "Supported future product communication through visual prototyping",
      "Helped stakeholders understand abstract financial scenarios through spatial UX",
      "Strengthened collaboration between design, innovation, and technology teams",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Blender",
      "Unity",
    ],
    images: ["/assets/project image/Sacombank VR.jpg"],
  },
  {
    slug: "cosmo-club",
    name: "COSMO Club",
    category: "Luxury Casino / E-Gaming Digital Ecosystem",
    filterTag: "Digital Product",
    role: "Project Manager",
    timeframe: "05 months",
    team: [
      "Project Manager x1",
      "Business Analyst x1",
      "UI/UX Designer x2",
    ],
    description:
      "A luxury digital ecosystem for a casino and hospitality brand, including website, mobile app direction, and high-end brand identity execution.",
    painPoint:
      "The brand required a premium digital presence that could communicate exclusivity, usability, and visual consistency across website, mobile app, and brand materials.",
    pmContribution:
      "Managed UX/UI direction, coordinated business analysis, aligned brand identity with product structure, and supported multi-channel design consistency.",
    outcomes: [
      "Improved digital brand consistency",
      "Supported smoother business-design alignment",
      "Created a more coherent website and mobile app experience",
      "Helped reduce ambiguity in visual and functional requirements",
    ],
    techStack: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
    ],
    images: ["/assets/project image/Cosmo.jpg"],
  },
];

export const additionalProjects = [
  {
    name: "Ho Chi Minh City Tourism Website",
    category: "Government / Tourism",
    year: "2023",
  },
  {
    name: "Food Hospitality Vietnam",
    category: "F&B / Event Platform",
    year: "2022",
  },
  {
    name: "Informa Market",
    category: "Enterprise / Exhibition",
    year: "2023",
  },
  {
    name: "Carebox by Hung Thinh Land",
    category: "PropTech / Real Estate",
    year: "2024",
  },
];

export const filterTags = [
  "All",
  "Digital Product",
  "Enterprise Website",
  "Community Platform",
  "Wellness Tech",
  "Banking Innovation",
  "Event Platform",
  "Brand Ecosystem",
];
