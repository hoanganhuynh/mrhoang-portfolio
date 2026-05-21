"use client";

import Image from "next/image";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

const credentials = [
  { icon: GraduationCap, emphasis: "PhD. Psychology", detail: " - Lecturer in Psychology in Business Administration" },
  { icon: BriefcaseBusiness, emphasis: "Chairman", detail: " at Williens Creative Space" },
  { icon: BriefcaseBusiness, emphasis: "Chairman", detail: " at Emotico Wellness" },
  { icon: BriefcaseBusiness, emphasis: "Former Vice President", detail: " at Restaurant Association of Vietnam" },
  { icon: BriefcaseBusiness, emphasis: "Former Head of Digital Design", detail: " at Sacombank" },
  { icon: BriefcaseBusiness, emphasis: "Former Product Design", detail: " at FPT Global Healthcare - Centre of Excellence" },
];


export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(200,168,90,0.16),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.07),transparent_28%)]" />

      <div className="relative z-10 grid min-h-[calc(100svh-6rem)] grid-cols-1 gap-8 px-5 pb-8 md:gap-10 md:pl-8 md:pr-10 md:pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:pr-14">
        <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] sm:min-h-[420px] md:rounded-[28px] lg:min-h-0 anim-fade-up anim-delay-1">
          <Image
            src="/assets/avatar-3.png"
            alt="Williens Hoang Nguyen portrait"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center saturate-[0.86] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />
        </div>

        <div className="flex max-w-[780px] flex-col justify-center py-2 lg:py-10">
          <div className="mb-6 inline-flex w-fit items-center gap-3 text-[14px] font-semibold text-text-primary md:mb-8 anim-fade-up anim-delay-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#20e45f] shadow-[0_0_16px_rgba(32,228,95,0.75)]" />
            Open to collaborations
          </div>

          <div className="max-w-[860px]">
            <h1 className="font-heading font-bold leading-[0.92] tracking-[-0.045em]">
              <span className="block text-[clamp(3rem,7vw,7rem)] text-text-primary">
                Williens
              </span>
              <span className="block text-[clamp(3rem,7vw,7rem)] text-text-primary whitespace-nowrap">
                Hoang Nguyen
              </span>
            </h1>

            <p className="mt-7 max-w-[720px] text-[16px] leading-[1.85] text-text-secondary md:text-[18px] anim-fade-up anim-delay-3">
              Orchestrating lean business operations by synthesizing data-driven analytics and generative AI, underpinned by a strategic foundation in business management psychology
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.035] p-4 backdrop-blur-2xl md:mt-10 md:p-5 anim-slide-right anim-delay-5">
            <div className="grid gap-3">
              {credentials.map(({ icon: Icon, emphasis, detail }) => (
                <div key={`${emphasis}${detail}`} className="flex items-center gap-3 text-[14px] leading-[1.45] text-text-secondary">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.08] text-gold">
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong className="font-semibold text-text-primary">{emphasis}</strong>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
