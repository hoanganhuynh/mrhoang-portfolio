"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";
import { FeatureGridBackground } from "@/components/blocks/grid-feature-cards";

const groups = [
  {
    icon: "/assets/icons/project-general-info/Thời gian thực hiện.png",
    title: "Project & Product Management",
    items: ["Project roadmap", "Scope definition", "Stakeholder alignment", "Agile coordination", "QA planning", "Documentation", "Handover process", "Partner communication"],
  },
  {
    icon: "/assets/icons/Brand Archetypes/The Sage (Nhà hiền triết).png",
    title: "Psychology & Business",
    items: ["User behavior analysis", "Decision-making insight", "Customer journey thinking", "Business psychology", "Motivation and engagement", "Mental wellness product logic"],
  },
  {
    icon: "/assets/icons/Brand Archetypes/The Creator (Người kiến tạo).png",
    title: "Design & Creative Direction",
    items: ["UX/UI direction", "Design system thinking", "Brand identity", "Creative strategy", "Motion / 3D direction", "Digital campaign experience"],
  },
  {
    icon: "/assets/icons/project-general-info/Công nghệ sử dụng.png",
    title: "Technical Understanding",
    items: ["Front-end architecture awareness", "CMS logic", "API and backend coordination", "Performance awareness", "Scalability discussion", "Technical feasibility planning"],
  },
];

export default function Capabilities() {
  return (
    <SectionWrapper>
      <FadeIn>
        <SectionTitle className="max-w-xl">
          <span className="text-gold">Technical</span> &amp; Creative Range
        </SectionTitle>
      </FadeIn>

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] md:mt-14 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-5">
        {groups.map((group, i) => (
          <FadeIn key={group.title} delay={0.08 * i} className="w-[77vw] min-w-[77vw] snap-start sm:w-auto sm:min-w-0">
            <div className="group relative overflow-hidden rounded-xl border border-line bg-surface p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong">
              <FeatureGridBackground />
              <div className="relative z-10 mb-5">
                <Image src={group.icon} alt="" width={56} height={56} className="h-14 w-14 object-contain transition duration-500 group-hover:scale-110" />
              </div>
              <h3 className="relative z-10 font-heading font-semibold text-[16px] text-text-primary tracking-tight mb-5">
                {group.title}
              </h3>
              <div className="relative z-10 flex flex-col gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[13px] text-text-muted leading-relaxed"
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
