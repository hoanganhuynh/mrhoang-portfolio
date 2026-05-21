"use client";

import { FadeIn } from "./SectionWrapper";

const contactItems = [
  { label: "Email", value: "hello@williens.com" },
  { label: "Phone", value: "0929 822 369 (Mr. Hoang)" },
  { label: "Address", value: "281 Nguyen Van Troi, Phu Nhuan, HCMC" },
  { label: "LinkedIn", value: "linkedin.com/in/williens" },
  { label: "Website", value: "williens.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-gold w-[500px] h-[500px] top-[-15%] left-[20%] opacity-30" />
        <div className="glow-gold w-[300px] h-[300px] bottom-[-5%] right-[15%] opacity-20" />
      </div>

      <div className="relative z-10 max-w-[720px] mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <h2 className="font-heading text-[1.75rem] md:text-[2.5rem] lg:text-[3.25rem] font-bold text-text-primary leading-[1.08] tracking-[-0.025em]">
            Let&apos;s build systems people can actually use.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-7 text-text-secondary text-[16px] md:text-[17px] leading-[1.85] max-w-2xl mx-auto">
            From digital products to brand platforms, I pursue initiatives that
            demand the seamless integration of psychological insights, business
            acumen, and technical stability.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted">
                  {item.label}
                </span>
                <span className="text-[16px] text-text-secondary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
