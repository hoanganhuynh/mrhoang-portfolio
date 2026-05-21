"use client";

import Image from "next/image";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";

const logoFiles = [
  "logo 01.png",
  "fpt.png",
  "vinamilk.png",
  "BCNV.png",
  "RAV.png",
  "emotico.png",
  "ssgroup.png",
  "Cosmo.png",
  "informa.png",
  "secomm.png",
  "vrplus.png",
  "baemin.png",
  "biz.png",
  "spham.png",
  "cjfood.png",
  "cmc corp.png",
  "hungthinh.png",
  "IIHC.png",
  "NK.png",
  "osam.png",
  "PTIT.png",
  "polar.png",
  "smartosc.png",
  "SolarBK.png",
  "tech appolo.png",
  "twins.png",
  "VibrantHCM.png",
  "xperian.png",
  "sacombank.png",
];

const partnerLogos = logoFiles.map((file) => ({
  name: file.replace(/\.[^.]+$/, ""),
  mono: `/assets/logo partner two mode/mono/${file}`,
  color: `/assets/logo partner two mode/color/${file}`,
}));

export default function Partners() {
  return (
    <SectionWrapper>
      <FadeIn>
        <SectionTitle className="max-w-2xl">
          Clients &amp; Partners
        </SectionTitle>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-4 md:mt-12 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
          {partnerLogos.map((logo) => (
            <div
              key={logo.mono}
              className="group flex items-center justify-center h-20 rounded-lg px-1 py-1 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.035] sm:h-28 sm:px-2 sm:py-2"
            >
              <div className="relative flex h-16 w-full items-center justify-center sm:h-24">
                <Image
                  src={logo.mono}
                  alt={logo.name}
                  width={240}
                  height={150}
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 20vw, 25vw"
                  className="absolute max-h-14 w-auto object-contain grayscale opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-0 sm:max-h-24"
                />
                <Image
                  src={logo.color}
                  alt=""
                  width={240}
                  height={150}
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 20vw, 25vw"
                  className="absolute max-h-14 w-auto object-contain opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 sm:max-h-24"
                />
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
