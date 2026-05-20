"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";

interface Role {
  status: "Current" | "Former";
  title: string;
  org: string;
  focus: string;
  logo: string;
}

const roles: Role[] = [
  {
    status: "Current",
    title: "Chairman",
    org: "Williens Creative Space",
    logo: "/assets/Williens Logo White text.svg",
    focus: "Creative-technical agency leadership, digital product strategy, project governance, and client delivery.",
  },
  {
    status: "Current",
    title: "Chairman",
    org: "Emotico Wellness",
    logo: "/assets/project logo/eMotico.png",
    focus: "Mental wellness platform development, psychology-informed product direction, and wellness technology strategy.",
  },
  {
    status: "Former",
    title: "Vice President",
    org: "Restaurant Association of Vietnam",
    logo: "/assets/project logo/RESTAURANT ASSOCIATION VIETNAM.png",
    focus: "Community ecosystem building, F&B industry partnership, campaign coordination, and stakeholder engagement.",
  },
  {
    status: "Former",
    title: "Head of Digital Design",
    org: "Sacombank",
    logo: "/assets/project logo/Sacombank.png",
    focus: "Digital design leadership, financial product experience, banking innovation, and design system governance.",
  },
  {
    status: "Former",
    title: "Product Design",
    org: "FPT Global Healthcare — Centre of Excellence",
    logo: "/assets/project logo/FPT.png",
    focus: "Healthcare product design, UX research, digital health experience, and cross-functional collaboration.",
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="grid gap-8 md:gap-16 lg:grid-cols-[420px_1fr] lg:gap-32 xl:gap-40">
        {/* Left sticky heading */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeIn>
            <SectionTitle>
              <span className="text-gold">Leadership</span> <span className="sm:whitespace-nowrap">Across Industries</span>
            </SectionTitle>
          </FadeIn>
        </div>

        {/* Right timeline */}
        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-gold/30 via-line to-transparent" />

          <div className="space-y-0">
            {roles.map((role, i) => (
              <FadeIn key={`${role.org}-${role.title}`} delay={0.06 * i}>
                <div className="relative pl-8 py-6 group transition duration-500 hover:translate-x-1">
                  {/* Timeline dot */}
                  <div className="absolute left-[-3.5px] top-8">
                    <div
                      className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                        role.status === "Current"
                          ? "bg-gold"
                          : "bg-line-strong group-hover:bg-gold/50"
                      }`}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 sm:gap-6">
                    <div>
                      <span
                        className={`mb-2 block font-mono text-[9px] tracking-[0.12em] uppercase ${
                          role.status === "Current" ? "text-gold" : "text-text-muted"
                        }`}
                      >
                        {role.status}
                      </span>
                      <h3 className="font-heading font-bold text-[20px] md:text-[22px] text-text-primary tracking-tight">
                        {role.title}
                      </h3>
                      <p className="text-[16px] text-gold/70 mt-0.5">
                        {role.org}
                      </p>
                    </div>
                    <Image
                      src={role.logo}
                      alt={`${role.org} logo`}
                      width={280}
                      height={184}
                      className={`ml-auto max-w-[42%] w-auto shrink-0 object-contain opacity-85 transition duration-500 group-hover:opacity-100 group-hover:scale-105 sm:max-w-none ${
                        role.org === "Williens Creative Space" ? "max-h-12 sm:max-h-[90px]" : "max-h-16 sm:max-h-32"
                      }`}
                    />
                  </div>
                  <p className="text-[16px] text-text-secondary leading-[1.75] mt-4 max-w-2xl">
                    {role.focus}
                  </p>

                  {/* Separator */}
                  {i < roles.length - 1 && (
                    <div className="mt-6 hairline" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
