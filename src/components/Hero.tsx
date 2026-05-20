"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { BriefcaseBusiness, Mail, MapPin, Phone, GraduationCap } from "lucide-react";

const contactPoints = [
  { icon: Mail, label: "hello@williens.com", href: "mailto:hello@williens.com" },
  { icon: Phone, label: "0383 898 238 (Mr. Hoang)", href: "tel:0383898238" },
  {
    icon: MapPin,
    label: "281 Nguyen Van Troi, Phu Nhuan, HCMC",
    href: "https://www.google.com/maps/search/?api=1&query=281%20Nguyen%20Van%20Troi%2C%20Phu%20Nhuan%2C%20HCMC",
  },
];

const credentials = [
  { icon: GraduationCap, emphasis: "PhD. Psychology", detail: " - Lecturer in Psychology in Business Administration" },
  { icon: BriefcaseBusiness, emphasis: "Chairman", detail: " at Williens Creative Space" },
  { icon: BriefcaseBusiness, emphasis: "Chairman", detail: " at Emotico Wellness" },
  { icon: BriefcaseBusiness, emphasis: "Former Vice President", detail: " at Restaurant Association of Vietnam" },
  { icon: BriefcaseBusiness, emphasis: "Former Head of Digital Design", detail: " at Sacombank" },
  { icon: BriefcaseBusiness, emphasis: "Former Product Design", detail: " at FPT Global Healthcare - Centre of Excellence" },
];

function renderBottomUpLetters(text: string, offset = 0) {
  return Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="bottom-up-letter"
      style={{ "--letter-index": offset + index } as CSSProperties}
    >
      {char}
    </span>
  ));
}

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
              <span className="bottom-up-line block text-[clamp(3rem,7vw,7rem)] text-text-primary">
                {renderBottomUpLetters("Williens")}
              </span>
              <span className="bottom-up-line block text-[clamp(3rem,7vw,7rem)] text-text-primary">
                {renderBottomUpLetters("Hoang Nguyen", "Williens".length)}
              </span>
            </h1>

            <p className="mt-7 max-w-[720px] text-[16px] leading-[1.85] text-text-secondary md:text-[18px] anim-fade-up anim-delay-3">
              I synthesize complex business objectives, fragmented requirements,
              and behavioral insights into intuitive, scalable, and commercially
              viable digital products.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.035] p-4 backdrop-blur-2xl md:mt-10 md:p-5 anim-slide-right anim-delay-5">
            <div className="grid gap-3">
              {credentials.map(({ icon: Icon, emphasis, detail }) => (
                <div key={`${emphasis}${detail}`} className="flex items-center gap-3 text-[14px] leading-[1.45] text-text-secondary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.08] text-gold">
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

          <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 md:mt-8 md:gap-4 md:pt-6 anim-fade-up anim-delay-6">
            {contactPoints.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="flex items-center gap-3 text-[16px] font-semibold text-text-primary/90 transition-colors duration-300 hover:text-gold">
                <Icon size={18} strokeWidth={1.8} className="text-gold" />
                <span>{label}</span>
              </a>
            ))}
            <a href="https://www.linkedin.com/in/williens" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[16px] font-semibold text-text-primary/90 transition-colors duration-300 hover:text-gold">
              <BriefcaseBusiness size={18} strokeWidth={1.8} className="text-gold" />
              <span>linkedin.com/in/williens</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
