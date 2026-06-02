"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";
import { FeatureGridBackground } from "@/components/blocks/grid-feature-cards";

const cards = [
  {
    icon: "/assets/icons/Giao thoa giữa Creative & Business/TƯ DUY THIẾT KẾ.webp",
    title: "UX × Psychology",
    body: "Designing from the way people understand, choose, feel, and act, so each product decision has a human reason behind it.",
  },
  {
    icon: "/assets/icons/Giao thoa giữa Creative & Business/TIẾP CẬN THỰC TIỄN.webp",
    title: "UI × Product Logic",
    body: "Turning complex requirements into clear screens, flows, states, and reusable patterns that support real product use.",
  },
  {
    icon: "/assets/icons/Giao thoa giữa Creative & Business/TRIẾT LÝ VẬN HÀNH.webp",
    title: "Brand × Experience",
    body: "Keeping visual identity, interaction quality, and product behavior aligned across every touchpoint users encounter.",
  },
];

export default function StrategicIdentity() {
  return (
    <SectionWrapper>
      <FadeIn>
        <SectionTitle className="max-w-2xl">
          <span className="text-gold">Where Behavior,</span> <span className="sm:whitespace-nowrap">Interface, and Product Meet.</span>
        </SectionTitle>
      </FadeIn>

      <div className="mt-8 grid md:mt-16 md:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <FadeIn key={card.title} delay={0.1 * i}>
            <div className="group relative rounded-xl border border-line bg-surface p-8 h-full transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong">
              <FeatureGridBackground />
              {/* Gold top line on hover */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gold/0 group-hover:bg-gold/20 transition-all duration-500" />

              <div className="relative z-10 flex items-center justify-between">
                <span>
                  <Image src={card.icon} alt="" width={80} height={80} className="h-20 w-20 object-contain transition duration-500 group-hover:scale-110" />
                </span>
              </div>

              <h3 className="relative z-10 font-heading font-bold text-[19px] md:text-[20px] text-text-primary mt-6 mb-4 tracking-tight">
                {card.title}
              </h3>

              <p className="relative z-10 text-[16px] text-text-secondary leading-[1.8]">
                {card.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
