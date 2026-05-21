"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";
import { projects, additionalProjects, type Project } from "@/data/projects";
import { ArrowRight, X, Clock, Users } from "lucide-react";

const projectLogos: Record<string, string> = {
  "ss-group": "/assets/project logo/SSGroup.png",
  "fpt-techday": "/assets/project logo/FPT.png",
  rav: "/assets/project logo/RESTAURANT ASSOCIATION VIETNAM.png",
  emotico: "/assets/project logo/eMotico.png",
  vinamilk: "/assets/logo partner two mode/mono/vinamilk.png",
  bcnv: "/assets/project logo/BCNV.png",
  "sacombank-vr": "/assets/project logo/Sacombank.png",
  "cosmo-club": "/assets/logo partner two mode/mono/Cosmo.png",
};

const additionalWorkAssets: Record<string, { image: string; logo: string }> = {
  "Ho Chi Minh City Tourism Website": {
    image: "/assets/additional-works/Ho Chi Minh City Tourism Website.png",
    logo: "/assets/project logo/Vibrant Ho Chi Minh.png",
  },
  "Informa Market": {
    image: "/assets/additional-works/Informa Market.png",
    logo: "/assets/project logo/Informa.png",
  },
  "Carebox by Hung Thinh Land": {
    image: "/assets/additional-works/Carebox by Hung Thinh Land.png",
    logo: "/assets/project logo/Hung Thinh.png",
  },
};

function ProjectVisual({ project }: { project: Project }) {
  const image = project.images[0];

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/[0.025]">
      {image ? (
        <Image
          src={image}
          alt={`${project.name} project preview`}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover opacity-80 saturate-[0.85] contrast-[1.08] transition duration-700 group-hover:scale-[1.04] group-hover:opacity-95"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,168,90,0.08),transparent_60%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-gold/75">
          {project.filterTag}
        </span>
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-text-muted">
          {project.timeframe}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const logo = projectLogos[project.slug];
  const logoOffset =
    project.slug === "sacombank-vr"
      ? "translate-x-[10px]"
      : project.slug === "ss-group" || project.slug === "fpt-techday"
        ? "-translate-x-4"
        : "";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <>
      <div
        className={`group rounded-xl border border-line bg-surface overflow-hidden hover:border-gold/15 transition-all duration-500 ${
          featured ? "lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch" : ""
        }`}
      >
        <div className={featured ? "lg:min-h-full" : ""}>
          <ProjectVisual project={project} />
        </div>

        <div className={`${featured ? "lg:flex lg:flex-col lg:justify-center" : ""}`}>
          {logo && (
            <div className="px-0 py-0">
              <Image src={logo} alt={`${project.name} logo`} width={270} height={180} className={`max-h-[108px] w-auto object-contain opacity-85 transition duration-500 group-hover:opacity-100 group-hover:scale-105 ${logoOffset}`} />
            </div>
          )}
          <div className="p-6 pt-0 md:p-7 md:pt-0">
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-gold/70 block mb-2">
              {project.category}
            </span>
            <h3 className="font-heading font-bold text-[20px] md:text-[22px] text-text-primary tracking-tight">
              {project.name}
            </h3>

            <p className="text-[16px] text-text-secondary leading-[1.75] mt-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="chip !text-[9px] !py-0.5 !px-2">
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 flex items-center gap-2 text-[14px] text-gold hover:text-gold/80 transition-colors group/btn"
            >
              View Case Study
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {mounted && createPortal(
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 h-full w-full max-w-2xl overflow-y-auto border-l border-line bg-[#0a0a0a] p-6 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-2 text-text-muted hover:text-text-primary transition-colors z-10"
                aria-label="Close case study"
              >
                <X size={18} />
              </button>

              <div className="rounded-lg overflow-hidden border border-line md:rounded-xl">
                <ProjectVisual project={project} />
              </div>

              <div className="mt-6 md:mt-8">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/70 block mb-2">
                  {project.category}
                </span>
                {logo && (
                  <Image src={logo} alt={`${project.name} logo`} width={285} height={192} className="mb-4 max-h-20 w-auto object-contain md:mb-5 md:max-h-[108px]" />
                )}
                <h2 className="font-heading font-bold text-[24px] md:text-[36px] text-text-primary tracking-tight leading-[1.1]">
                  {project.name}
                </h2>

                <div className="flex items-center gap-4 mt-4 text-[12px] text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} className="text-gold/40" />
                    {project.timeframe}
                  </span>
                  <span>{project.role}</span>
                </div>

                <div className="mt-6 space-y-6 md:mt-8 md:space-y-8">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-2">
                      Business Context
                    </h4>
                    <p className="text-[16px] text-text-secondary leading-[1.8]">
                      {project.description}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-2">
                      Pain Point
                    </h4>
                    <p className="text-[16px] text-text-secondary leading-[1.8]">
                      {project.painPoint}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-2">
                      My Role &amp; Contribution
                    </h4>
                    <p className="text-[16px] text-text-secondary leading-[1.8]">
                      {project.pmContribution}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-3">
                      Operational Impact
                    </h4>
                    <ul className="space-y-2.5">
                      {project.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start gap-3 text-[16px] text-text-secondary leading-[1.7]">
                          <span className="w-1 h-1 rounded-full bg-gold/50 mt-2 shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-3">
                      Team
                    </h4>
                    <div className="flex items-center gap-2 text-[12px] text-text-muted">
                      <Users size={12} className="text-gold/40" />
                      {project.team.join(" · ")}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="chip">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}

export default function FeaturedProjects() {
  const visibleAdditionalProjects = additionalProjects.filter(
    (project) => project.name !== "Food Hospitality Vietnam"
  );

  return (
    <SectionWrapper id="projects">
      <FadeIn>
        <SectionTitle className="max-w-4xl">
          <span className="text-gold">Projects Across Industries</span> <span className="sm:whitespace-nowrap">and Platforms</span>
        </SectionTitle>
      </FadeIn>

      {/* Featured — first 2 projects large */}
      <div className="mt-8 space-y-5 md:mt-14 md:space-y-6">
        {projects.slice(0, 2).map((project, i) => (
          <FadeIn key={project.slug} delay={0.08 * i}>
            <ProjectCard project={project} featured />
          </FadeIn>
        ))}
      </div>

      {/* Remaining projects — 2-col grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-2">
        {projects.slice(2).map((project, i) => (
          <FadeIn key={project.slug} delay={0.06 * i}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {/* Additional works */}
      <FadeIn delay={0.2}>
        <div className="mt-14 md:mt-24">
          <div className="flex items-center gap-4 mb-5 md:mb-8">
            <h3 className="font-heading font-semibold text-[15px] text-text-primary tracking-tight whitespace-nowrap">
              Additional Works
            </h3>
            <div className="h-px flex-1 bg-line" />
          </div>
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
            {visibleAdditionalProjects.map((proj) => {
              const assets = additionalWorkAssets[proj.name];

              return (
              <div
                key={proj.name}
                className="group w-[76vw] min-w-[76vw] snap-start overflow-hidden rounded-xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong sm:w-auto sm:min-w-0"
              >
                {assets && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={assets.image}
                      alt={`${proj.name} preview`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                {assets && (
                  <div className="px-0 py-0">
                    <Image src={assets.logo} alt={`${proj.name} logo`} width={255} height={165} className="max-h-24 w-auto object-contain opacity-85 transition duration-500 group-hover:opacity-100 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5 pt-0">
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-gold/60 block mb-2">
                    {proj.category}
                  </span>
                  <h4 className="font-heading font-semibold text-[18px] text-text-primary tracking-tight">
                    {proj.name}
                  </h4>
                  <span className="text-[13px] text-text-muted mt-2 block">{proj.year}</span>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
