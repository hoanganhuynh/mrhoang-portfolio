"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";

const steps = [
  { icon: "/assets/icons/project-general-info/Thời gian thực hiện.png", num: "01", title: "Diagnose", description: "Business goals, market context, user behavior, operational pain points, internal constraints." },
  { icon: "/assets/icons/Brand Archetypes/The Ruler (Người kiểm soát).png", num: "02", title: "Structure", description: "Roadmap, scope, roles, milestones, UX direction, and technical feasibility." },
  { icon: "/assets/icons/project-general-info/Thành viên tham gia.png", num: "03", title: "Coordinate", description: "Stakeholders, designers, developers, partners, and internal teams through transparent communication." },
  { icon: "/assets/icons/project-general-info/Công nghệ sử dụng.png", num: "04", title: "Sustain", description: "Handover, documentation, QA, training, iteration loops, and internal adoption." },
];

const painChips = [
  "Fragmented requirements",
  "Unclear ownership",
  "Weak handover",
  "Slow stakeholder feedback",
  "Design without operational logic",
  "Technical decisions made too late",
  "Poor internal adoption",
  "Inconsistent brand experience",
];

export default function ProjectManagement() {
  return (
    <SectionWrapper id="method">
      <FadeIn>
        <SectionTitle className="max-w-xl">
          <span className="text-gold">How I Turn</span> <span className="sm:whitespace-nowrap">Complexity Into Delivery.</span>
        </SectionTitle>
      </FadeIn>

      {/* Process line */}
      <div className="mt-8 md:mt-16">
        {/* Desktop: horizontal */}
        <div className="hidden lg:grid grid-cols-4 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-[19px] left-[40px] right-[40px] h-px bg-line" />

          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={0.1 * i}>
              <div className="relative text-center px-6">
                {/* Dot */}
                <div className="mx-auto mb-6 relative z-10 bg-bg px-3">
                  <Image src={step.icon} alt="" width={72} height={72} className="mx-auto h-[72px] w-[72px] object-contain transition duration-500 group-hover:scale-110" />
                </div>
                <span className="font-mono text-[10px] text-gold/60 tracking-wider block mb-2">
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-[18px] text-text-primary tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[16px] text-text-secondary leading-[1.75]">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden relative">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-line" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={0.08 * i}>
                <div className="relative pl-20">
                  <div className="absolute left-0 top-0 bg-bg">
                    <Image src={step.icon} alt="" width={42} height={42} className="h-11 w-11 object-contain" />
                  </div>
                  <span className="font-mono text-[10px] text-gold/60 tracking-wider block mb-1">
                    {step.num}
                  </span>
                  <h3 className="font-heading font-bold text-[16px] text-text-primary tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-text-secondary leading-[1.75]">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Pain Points */}
      <FadeIn delay={0.2}>
        <div className="mt-14 md:mt-24">
          <h3 className="font-heading font-semibold text-[15px] text-text-primary tracking-tight mb-4 md:mb-6">
            Pain Points I Solve
          </h3>
          <div className="grid grid-flow-col grid-rows-2 auto-cols-max gap-3 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch] md:flex md:flex-wrap md:overflow-visible md:pb-0">
            {painChips.map((chip) => (
              <span key={chip} className="chip whitespace-nowrap !px-5 !py-2.5 !text-[12px]">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
