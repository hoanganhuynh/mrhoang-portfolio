"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";
import { projects, additionalProjects, type Project } from "@/data/projects";
import { ArrowRight, X, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";

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
    image: "/assets/additional-works/Ho Chi Minh City Tourism Website.jpg",
    logo: "/assets/project logo/Vibrant Ho Chi Minh.png",
  },
  "Informa Market": {
    image: "/assets/additional-works/Informa Market.jpg",
    logo: "/assets/project logo/Informa.png",
  },
  "Carebox by Hung Thinh Land": {
    image: "/assets/additional-works/Carebox by Hung Thinh Land.jpg",
    logo: "/assets/project logo/Hung Thinh.png",
  },
};

function ImageCarousel({ images, projectName }: { images: string[]; projectName: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  if (!images.length) {
    return <div className="flex h-full items-center justify-center bg-white/[0.025]" />;
  }

  return (
    <div className="flex h-full flex-col bg-[#050505]">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${projectName} image ${current + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-black/80"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-black/80"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/70">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex shrink-0 gap-2 overflow-x-auto bg-black/80 p-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-11 w-16 shrink-0 overflow-hidden rounded transition-all duration-200 ${
                i === current
                  ? "opacity-100 ring-2 ring-gold"
                  : "opacity-50 ring-1 ring-white/10 hover:opacity-80"
              }`}
            >
              <Image src={img} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

      {/* Fullscreen modal */}
      {mounted && createPortal(
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-bg lg:grid lg:grid-cols-2"
          >
            {/* Close button — fixed top-right, always visible */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 z-[60] rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-text-muted transition-all hover:bg-white/10 hover:text-text-primary"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* LEFT: image carousel */}
            <div className="h-[45vh] shrink-0 lg:h-full">
              <ImageCarousel images={project.images} projectName={project.name} />
            </div>

            {/* RIGHT: project info (scrollable) */}
            <div className="flex-1 overflow-y-auto border-t border-line lg:border-l lg:border-t-0">
              <div className="px-6 py-8 md:px-10 md:py-10">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.12em] uppercase text-gold/70">
                  {project.category}
                </span>
                {logo && (
                  <Image
                    src={logo}
                    alt={`${project.name} logo`}
                    width={285}
                    height={192}
                    className={`mb-4 max-h-20 w-auto object-contain md:mb-5 md:max-h-[108px] ${logoOffset}`}
                  />
                )}
                <h2 className="font-heading font-bold text-[24px] leading-[1.1] tracking-tight text-text-primary md:text-[36px]">
                  {project.name}
                </h2>

                <div className="mt-4 flex items-center gap-4 text-[12px] text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} className="text-gold/40" />
                    {project.timeframe}
                  </span>
                  <span>{project.role}</span>
                </div>

                <div className="mt-6 space-y-6 md:mt-8 md:space-y-8">
                  <div>
                    <h4 className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                      Business Context
                    </h4>
                    <p className="text-[16px] leading-[1.8] text-text-secondary">
                      {project.description}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <h4 className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                      Pain Point
                    </h4>
                    <p className="text-[16px] leading-[1.8] text-text-secondary">
                      {project.painPoint}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                      My Role &amp; Contribution
                    </h4>
                    <p className="text-[16px] leading-[1.8] text-text-secondary">
                      {project.pmContribution}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <h4 className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                      Operational Impact
                    </h4>
                    <ul className="space-y-2.5">
                      {project.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.7] text-text-secondary">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                      Team
                    </h4>
                    <div className="flex items-center gap-2 text-[12px] text-text-muted">
                      <Users size={12} className="text-gold/40" />
                      {project.team.join(" · ")}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}

type AdditionalCardData = {
  name: string;
  category: string;
  images: string[];
  logo?: string;
  logoOffset?: string;
  timeframe?: string;
  role?: string;
  description?: string;
  painPoint?: string;
  pmContribution?: string;
  outcomes?: string[];
  team?: string[];
  techStack?: string[];
};

function AdditionalWorkCard({ data }: { data: AdditionalCardData }) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const previewImage = data.images[0];

  return (
    <>
      <div className="group w-[76vw] min-w-[76vw] snap-start overflow-hidden rounded-xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong sm:w-auto sm:min-w-0">
        {previewImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={previewImage}
              alt={`${data.name} preview`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
        )}
        {data.logo && (
          <div className="px-0 py-0">
            <Image
              src={data.logo}
              alt={`${data.name} logo`}
              width={255}
              height={165}
              className="max-h-24 w-auto object-contain opacity-85 transition duration-500 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 pt-0">
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-gold/60 block mb-2">
            {data.category}
          </span>
          <h4 className="font-heading font-semibold text-[18px] text-text-primary tracking-tight">
            {data.name}
          </h4>
          <span className="text-[13px] text-text-muted mt-2 block">{data.timeframe}</span>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 flex items-center gap-2 text-[13px] text-gold hover:text-gold/80 transition-colors group/btn"
          >
            View Case Study
            <ArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-bg lg:grid lg:grid-cols-2"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 z-[60] rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-text-muted transition-all hover:bg-white/10 hover:text-text-primary"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="h-[45vh] shrink-0 lg:h-full">
                <ImageCarousel images={data.images} projectName={data.name} />
              </div>

              <div className="flex-1 overflow-y-auto border-t border-line lg:border-l lg:border-t-0">
                <div className="px-6 py-8 md:px-10 md:py-10">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.12em] uppercase text-gold/70">
                    {data.category}
                  </span>
                  {data.logo && (
                    <Image
                      src={data.logo}
                      alt={`${data.name} logo`}
                      width={285}
                      height={192}
                      className={`mb-4 max-h-20 w-auto object-contain md:mb-5 md:max-h-[108px] ${data.logoOffset ?? ""}`}
                    />
                  )}
                  <h2 className="font-heading font-bold text-[24px] leading-[1.1] tracking-tight text-text-primary md:text-[36px]">
                    {data.name}
                  </h2>

                  {(data.timeframe || data.role) && (
                    <div className="mt-4 flex items-center gap-4 text-[12px] text-text-muted">
                      {data.timeframe && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} className="text-gold/40" />
                          {data.timeframe}
                        </span>
                      )}
                      {data.role && <span>{data.role}</span>}
                    </div>
                  )}

                  <div className="mt-6 space-y-6 md:mt-8 md:space-y-8">
                    {data.description && (
                      <div>
                        <h4 className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                          Business Context
                        </h4>
                        <p className="text-[16px] leading-[1.8] text-text-secondary">{data.description}</p>
                      </div>
                    )}

                    {(data.painPoint || data.pmContribution) && <div className="hairline" />}

                    {data.painPoint && (
                      <div>
                        <h4 className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                          Pain Point
                        </h4>
                        <p className="text-[16px] leading-[1.8] text-text-secondary">{data.painPoint}</p>
                      </div>
                    )}

                    {data.pmContribution && (
                      <div>
                        <h4 className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                          My Role &amp; Contribution
                        </h4>
                        <p className="text-[16px] leading-[1.8] text-text-secondary">{data.pmContribution}</p>
                      </div>
                    )}

                    {!!data.outcomes?.length && (
                      <>
                        <div className="hairline" />
                        <div>
                          <h4 className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                            Operational Impact
                          </h4>
                          <ul className="space-y-2.5">
                            {data.outcomes.map((o, i) => (
                              <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.7] text-text-secondary">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}

                    {!!data.team?.length && (
                      <div>
                        <h4 className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                          Team
                        </h4>
                        <div className="flex items-center gap-2 text-[12px] text-text-muted">
                          <Users size={12} className="text-gold/40" />
                          {data.team.join(" · ")}
                        </div>
                      </div>
                    )}

                    {!!data.techStack?.length && (
                      <div>
                        <h4 className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-gold/60">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {data.techStack.map((tech) => (
                            <span key={tech} className="chip">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default function FeaturedProjects() {
  const featuredSlugs = ["ss-group", "rav", "emotico", "vinamilk"];
  const additionalSlugs = ["fpt-techday", "bcnv", "sacombank-vr", "cosmo-club"];

  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];

  const movedToAdditional = additionalSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];

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

      {/* Featured — 2-col grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <FadeIn key={project.slug} delay={0.08 * i}>
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
            {/* Projects moved to additional — full Project data */}
            {movedToAdditional.map((proj) => {
              const logoOffset =
                proj.slug === "sacombank-vr"
                  ? "translate-x-[10px]"
                  : proj.slug === "fpt-techday"
                    ? "-translate-x-4"
                    : "";
              return (
                <AdditionalWorkCard
                  key={proj.slug}
                  data={{
                    name: proj.name,
                    category: proj.category,
                    images: proj.images,
                    logo: projectLogos[proj.slug],
                    logoOffset,
                    timeframe: proj.timeframe,
                    role: proj.role,
                    description: proj.description,
                    painPoint: proj.painPoint,
                    pmContribution: proj.pmContribution,
                    outcomes: proj.outcomes,
                    team: proj.team,
                    techStack: proj.techStack,
                  }}
                />
              );
            })}

            {/* Original additional works — limited data */}
            {visibleAdditionalProjects.map((proj) => {
              const assets = additionalWorkAssets[proj.name];
              return (
                <AdditionalWorkCard
                  key={proj.name}
                  data={{
                    name: proj.name,
                    category: proj.category,
                    images: assets ? [assets.image] : [],
                    logo: assets?.logo,
                    timeframe: proj.year,
                  }}
                />
              );
            })}
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
