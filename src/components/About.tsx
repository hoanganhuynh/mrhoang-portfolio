"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";
import { FeatureGridBackground } from "@/components/blocks/grid-feature-cards";

const principles = [
  {
    icon: "/assets/icons/Brand Archetypes/The Sage (Nhà hiền triết).png",
    title: "Psychology-informed decisions",
    desc: "Leveraging behavioral science to decode user decision-making and engagement, designing products rooted in authentic human patterns.",
  },
  {
    icon: "/assets/icons/Brand Archetypes/The Ruler (Người kiểm soát).png",
    title: "Business-first creative direction",
    desc: "All design decisions are strictly anchored in operational viability, market relevance, and long-term commercial sustainability.",
  },
  {
    icon: "/assets/icons/Giao thoa giữa Creative & Business/TRIẾT LÝ VẬN HÀNH.png",
    title: "Delivery systems that last",
    desc: "Establishing robust workflows, comprehensive documentation, and systematic handover logic to ensure operational continuity and post-launch maintainability.",
  },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid gap-8 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeIn>
            <SectionTitle>
              <span className="text-gold">Decoding behavior.</span> Aligning business. Executing technology.
            </SectionTitle>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-5">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.08 * i}>
              <div className="group relative overflow-hidden p-7 rounded-xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong">
                <FeatureGridBackground />
                <div className="relative z-10 mb-5">
                  <Image src={p.icon} alt="" width={70} height={70} className="h-[70px] w-[70px] object-contain transition duration-500 group-hover:scale-110" />
                </div>
                <h3 className="relative z-10 font-heading font-semibold text-[22px] text-text-primary tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="relative z-10 text-[16px] text-text-secondary leading-[1.8]">
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
