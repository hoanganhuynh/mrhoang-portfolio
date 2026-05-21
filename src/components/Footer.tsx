"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 py-16 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(200,168,90,0.12),transparent_32%)]" />

      <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col gap-7 px-6 md:gap-8 md:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-heading text-[1.6rem] font-bold tracking-[-0.025em] text-text-primary md:text-[2.5rem]">
              Williens Hoang Nguyen
            </p>
            <div className="mt-5 grid gap-3 text-[16px] text-text-secondary">
              <a href="mailto:hello@williens.com" className="flex items-center gap-3 transition-colors duration-300 hover:text-gold">
                <Mail size={18} className="text-gold" />
                hello@williens.com
              </a>
              <a href="tel:0929822369" className="flex items-center gap-3 transition-colors duration-300 hover:text-gold">
                <Phone size={18} className="text-gold" />
                0929 822 369 (Mr. Hoang)
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-gold" />
                281 Nguyen Van Troi, Phu Nhuan, HCMC
              </div>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-5 py-3 text-[13px] font-semibold text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-bg"
          >
            Back to top
            <ArrowUp size={15} />
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-text-muted md:flex-row md:items-center">
          <span>&copy; {new Date().getFullYear()} Williens Hoang Nguyen</span>
          <span>Psychology · Product · Creative Operations</span>
        </div>
      </div>
    </footer>
  );
}
