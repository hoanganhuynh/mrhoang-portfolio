"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";

const groups = [
  {
    icon: "/assets/icons/project-general-info/Thời gian thực hiện.webp",
    title: "Product Thinking",
    items: ["Product discovery", "Problem framing", "Feature prioritization", "Journey mapping", "User stories", "Experience principles", "MVP definition", "Stakeholder alignment"],
  },
  {
    icon: "/assets/icons/Brand Archetypes/The Sage (Nhà hiền triết).webp",
    title: "UX Research & Psychology",
    items: ["User behavior analysis", "Decision-making insight", "Research synthesis", "Persona thinking", "Motivation mapping", "Usability review", "Mental wellness logic", "Insight storytelling"],
  },
  {
    icon: "/assets/icons/Brand Archetypes/The Creator (Người kiến tạo).webp",
    title: "UI & Interaction Design",
    items: ["UX/UI direction", "Wireframes", "High-fidelity interfaces", "Design systems", "Interaction patterns", "Prototype logic", "Motion direction", "Visual QA"],
  },
  {
    icon: "/assets/icons/project-general-info/Công nghệ sử dụng.webp",
    title: "Product Delivery",
    items: ["Design handoff", "Acceptance criteria", "Cross-functional critique", "Launch readiness", "Content structure", "Design documentation", "Iteration loops", "Quality alignment"],
  },
];

export default function Capabilities() {
  return (
    <SectionWrapper>
      <FadeIn>
        <SectionTitle className="max-w-xl">
          <span className="text-gold">Product</span> & Design Range
        </SectionTitle>
      </FadeIn>

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] md:mt-14 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-5">
        {groups.map((group, i) => (
          <FadeIn key={group.title} delay={0.08 * i} className="w-[70vw] min-w-[70vw] snap-start sm:w-auto sm:min-w-0">
            <div className="group relative overflow-hidden rounded-xl border border-line bg-surface p-4 md:p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong">
              <div className="mb-4">
                <Image src={group.icon} alt="" width={56} height={56} sizes="56px" className="h-14 w-14 object-contain transition duration-500 group-hover:scale-110" />
              </div>
              <h3 className="font-heading font-semibold text-[16px] text-text-primary tracking-tight mb-4">
                {group.title}
              </h3>
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[15px] text-text-muted leading-relaxed"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
