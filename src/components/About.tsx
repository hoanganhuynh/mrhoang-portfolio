"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";

const principles = [
  {
    icon: "/assets/icons/Brand Archetypes/The Sage (Nhà hiền triết).webp",
    title: "Behavior-informed UX",
    desc: "Using psychology to understand how people decide, hesitate, learn, trust, and move through digital products.",
  },
  {
    icon: "/assets/icons/Brand Archetypes/The Ruler (Người kiểm soát).webp",
    title: "Product-first design direction",
    desc: "Translating product goals into clear journeys, interface systems, and decisions that are useful for users and credible for the business.",
  },
  {
    icon: "/assets/icons/Giao thoa giữa Creative & Business/TRIẾT LÝ VẬN HÀNH.webp",
    title: "Design systems that scale",
    desc: "Building reusable UI logic, visual language, and handoff structure so products can evolve without losing consistency.",
  },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid gap-8 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeIn>
            <SectionTitle>
              <span className="text-gold">Decoding behavior.</span> Shaping flows. Designing products.
            </SectionTitle>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-5">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.08 * i}>
              <div className="group relative overflow-hidden p-7 rounded-xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong">
                <div className="mb-5">
                  <Image src={p.icon} alt="" width={70} height={70} sizes="70px" className="h-[70px] w-[70px] object-contain transition duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-heading font-semibold text-[22px] text-text-primary tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-[16px] text-text-secondary leading-[1.8]">
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
