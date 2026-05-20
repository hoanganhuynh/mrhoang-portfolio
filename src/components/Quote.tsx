"use client";

import Image from "next/image";

export default function Quote() {
  return (
    <section className="relative overflow-hidden py-14 md:py-24">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[96px_1fr] items-center gap-5 px-6 md:grid-cols-1 md:gap-12 md:px-10 lg:grid-cols-[0.28fr_0.72fr] lg:px-14">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 md:aspect-[4/5] md:rounded-[28px]">
          <Image
            src="/assets/avatar.jpeg"
            alt="Williens Hoang Nguyen portrait detail"
            fill
            sizes="(min-width: 1024px) 360px, 80vw"
            className="object-cover object-[58%_42%] grayscale contrast-[1.08] transition duration-700 hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        </div>

        <div className="relative">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold/75 md:mb-8 md:text-[11px]">
            Working principle
          </span>
          <blockquote className="max-w-3xl font-heading text-[18px] font-bold leading-[1.5] tracking-[-0.01em] text-text-primary md:text-[20px] md:leading-[1.55]">
            “Clarity is not a visual style. It is the operational condition that
            allows teams, products, and users to move with confidence.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
