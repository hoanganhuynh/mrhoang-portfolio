"use client";

import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative ${noPadding ? "" : "py-16 md:py-32 lg:py-40"} ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        {children}
      </div>
    </section>
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? "is-in-view" : ""}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-heading text-[2rem] md:text-[2.8rem] lg:text-[3.45rem] font-bold text-text-primary leading-[1.08] tracking-[-0.025em] ${className}`}
    >
      {children}
    </h2>
  );
}
