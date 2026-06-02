"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { FadeIn, SectionTitle } from "./SectionWrapper";
import { projects, additionalProjects, type Project } from "@/data/projects";
import { ArrowRight, X, Clock, Users, Globe, AlertCircle, UserCheck, TrendingUp, Code2 } from "lucide-react";

// Tech stack icon mapping
// Sources: marwin1991/profile-technology-icons (.png) · get-icon/geticon (.svg)
const TECH_ICONS: Record<string, string> = {
  "Figma":        "/assets/tech-icons/figma.png",
  "Go":           "/assets/tech-icons/go.png",
  "Node.js":      "/assets/tech-icons/node_js.png",
  "Next.js":      "/assets/tech-icons/next_js.png",
  "Tailwind CSS": "/assets/tech-icons/tailwind_css.png",
  "Redis":        "/assets/tech-icons/redis.png",
  "MySQL":        "/assets/tech-icons/mysql.png",
  "MongoDB":      "/assets/tech-icons/mongodb.png",
  "Docker":       "/assets/tech-icons/docker.png",
  "Unity":        "/assets/tech-icons/unity.png",
  "Photoshop":    "/assets/tech-icons/photoshop.svg",
  "Illustrator":  "/assets/tech-icons/illustrator.svg",
  "Blender":      "/assets/tech-icons/blender.svg",
};

function TechChip({ tech }: { tech: string }) {
  const icon = TECH_ICONS[tech];
  return (
    <span className="chip !text-[12px] !py-1.5 !px-3.5 inline-flex items-center gap-1.5">
      {icon && (
        <Image src={icon} alt={tech} width={16} height={16} className="shrink-0 object-contain" />
      )}
      {tech}
    </span>
  );
}

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
    image: "/assets/projects/hcmc-tourism/01.jpg",
    logo: "/assets/project logo/Vibrant Ho Chi Minh.png",
  },
  "Informa Market": {
    image: "/assets/projects/informa-market/01.jpg",
    logo: "/assets/project logo/Informa.png",
  },
  "Carebox by Hung Thinh Land": {
    image: "/assets/projects/carebox/01.jpg",
    logo: "/assets/project logo/Hung Thinh.png",
  },
};

/* ─── Infinite scroll image viewer ──────────────────────────────────────────
   • current = unbounded virtual index (never wraps) → smooth loop, no jump
   • Active image: opacity 100%, centered
   • Adjacent images: opacity 30%, always pre-positioned above/below
   • realIdx = ((current % n) + n) % n maps virtual → real image
────────────────────────────────────────────────────────────────────────── */
function ImageViewer({ images, projectName }: { images: string[]; projectName: string }) {
  const [current, setCurrent] = useState(0); // unbounded — grows forever
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ cH: 0, imgH: 0 });
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const n = images.length;

  useLayoutEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setDims({ cH: Math.round(height), imgH: Math.round(width * 9 / 16) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 550) return;
    lastScrollTime.current = now;
    setCurrent(i => i + dir); // unbounded — no modulo → no jump
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (n <= 1) return;
    advance(e.deltaY > 0 ? 1 : -1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) advance(delta > 0 ? 1 : -1);
  };

  if (!n) return <div className="h-full bg-[#050505]" />;

  const { cH, imgH } = dims;
  const centerY = cH > 0 && imgH > 0 ? Math.round((cH - imgH) / 2) : 0;
  const ready = imgH > 0 && cH > 0;

  // Real index of active image (for dot indicators)
  const realCurrent = ((current % n) + n) % n;

  // Navigate to image i via shortest circular path
  const goTo = (i: number) => {
    lastScrollTime.current = 0;
    let diff = i - realCurrent;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    setCurrent(c => c + diff);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-full select-none overflow-hidden bg-[#050505]"
    >
      {/* Fallback before dimensions measured */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full aspect-[16/9]">
            <Image src={images[0]} alt={projectName} fill priority sizes="50vw" className="object-cover" />
          </div>
        </div>
      )}

      {/* 3 virtual slots — prev / current / next — always positioned, never jump */}
      {ready && [current - 1, current, current + 1].map((vIdx) => {
        const realIdx = ((vIdx % n) + n) % n;
        const y = centerY + (vIdx - current) * imgH;
        const opacity = vIdx === current ? 1 : 0.3;

        return (
          <motion.div
            key={vIdx}
            initial={false}
            animate={{ y, opacity }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0"
            style={{ top: 0, height: imgH }}
          >
            <Image
              src={images[realIdx]}
              alt={`${projectName} ${realIdx + 1}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        );
      })}

      {/* Vertical dot indicators — right edge */}
      {n > 1 && (
        <div className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 flex flex-col gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1}`}
              className={`rounded-full border transition-all duration-300 ${
                i === realCurrent
                  ? "h-2.5 w-2.5 border-gold bg-gold shadow-[0_0_6px_rgba(200,168,90,0.7)]"
                  : "h-2 w-2 border-white/40 bg-transparent hover:border-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Section label helper ───────────────────────────────────────────────── */
function SectionLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon size={14} strokeWidth={1.8} className="shrink-0 text-gold" />
      <span className="font-mono text-[12px] font-semibold tracking-[0.12em] uppercase text-gold">
        {children}
      </span>
    </div>
  );
}

/* ─── Meta chips (timeframe + role) ─────────────────────────────────────── */
function MetaChips({ timeframe, role }: { timeframe?: string; role?: string }) {
  if (!timeframe && !role) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {timeframe && (
        <span className="flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.07] px-3 py-1 font-mono text-[10px] tracking-[0.08em] uppercase text-gold/85">
          <Clock size={10} className="shrink-0" />
          {timeframe}
        </span>
      )}
      {role && (
        <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.08em] uppercase text-text-muted">
          {role}
        </span>
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
        onClick={() => setShowModal(true)}
        className={`group cursor-pointer rounded-xl border border-line bg-surface overflow-hidden hover:border-gold/15 transition-all duration-500 ${
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
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 z-[60] rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-text-muted transition-all hover:bg-white/10 hover:text-text-primary"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* LEFT: scroll-based image viewer */}
            <div className="h-[45vh] shrink-0 lg:h-full">
              <ImageViewer images={project.images} projectName={project.name} />
            </div>

            {/* RIGHT: project info */}
            <div className="flex-1 overflow-y-auto border-t border-line lg:border-l lg:border-t-0">
              <div className="px-6 py-8 md:px-10 md:py-10">
                <span className="mb-3 block font-mono text-[10px] tracking-[0.12em] uppercase text-gold/70">
                  {project.category}
                </span>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="flex-1 font-heading font-bold text-[24px] leading-[1.1] tracking-tight text-text-primary md:text-[36px]">
                    {project.name}
                  </h2>
                  {logo && (
                    <Image
                      src={logo}
                      alt={`${project.name} logo`}
                      width={200}
                      height={130}
                      className={`shrink-0 max-h-[188px] w-auto object-contain md:max-h-[250px] ${logoOffset}`}
                    />
                  )}
                </div>

                <MetaChips timeframe={project.timeframe} role={project.role} />

                <div className="mt-8 space-y-7 md:space-y-8">
                  <div>
                    <SectionLabel icon={Globe}>Business Context</SectionLabel>
                    <p className="text-[15px] leading-[1.85] text-text-secondary">
                      {project.description}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <SectionLabel icon={AlertCircle}>Pain Point</SectionLabel>
                    <p className="text-[15px] leading-[1.85] text-text-secondary">
                      {project.painPoint}
                    </p>
                  </div>

                  <div>
                    <SectionLabel icon={UserCheck}>My Role &amp; Contribution</SectionLabel>
                    <p className="text-[15px] leading-[1.85] text-text-secondary">
                      {project.pmContribution}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <SectionLabel icon={TrendingUp}>Operational Impact</SectionLabel>
                    <ul className="space-y-2.5">
                      {project.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.75] text-text-secondary">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <SectionLabel icon={Code2}>Tech Stack</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <TechChip key={tech} tech={tech} />
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
      <div
        onClick={() => setShowModal(true)}
        className="group cursor-pointer w-[76vw] min-w-[76vw] snap-start overflow-hidden rounded-xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:bg-surface-strong sm:w-auto sm:min-w-0"
      >
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

              {/* LEFT: scroll-based image viewer */}
              <div className="h-[45vh] shrink-0 lg:h-full">
                <ImageViewer images={data.images} projectName={data.name} />
              </div>

              {/* RIGHT: project info */}
              <div className="flex-1 overflow-y-auto border-t border-line lg:border-l lg:border-t-0">
                <div className="px-6 py-8 md:px-10 md:py-10">
                  <span className="mb-3 block font-mono text-[10px] tracking-[0.12em] uppercase text-gold/70">
                    {data.category}
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="flex-1 font-heading font-bold text-[24px] leading-[1.1] tracking-tight text-text-primary md:text-[36px]">
                      {data.name}
                    </h2>
                    {data.logo && (
                      <Image
                        src={data.logo}
                        alt={`${data.name} logo`}
                        width={200}
                        height={130}
                        className={`shrink-0 max-h-[188px] w-auto object-contain md:max-h-[250px] ${data.logoOffset ?? ""}`}
                      />
                    )}
                  </div>

                  <MetaChips timeframe={data.timeframe} role={data.role} />

                  <div className="mt-8 space-y-7 md:space-y-8">
                    {data.description && (
                      <div>
                        <SectionLabel icon={Globe}>Business Context</SectionLabel>
                        <p className="text-[15px] leading-[1.85] text-text-secondary">{data.description}</p>
                      </div>
                    )}

                    {(data.painPoint || data.pmContribution) && <div className="hairline" />}

                    {data.painPoint && (
                      <div>
                        <SectionLabel icon={AlertCircle}>Pain Point</SectionLabel>
                        <p className="text-[15px] leading-[1.85] text-text-secondary">{data.painPoint}</p>
                      </div>
                    )}

                    {data.pmContribution && (
                      <div>
                        <SectionLabel icon={UserCheck}>My Role &amp; Contribution</SectionLabel>
                        <p className="text-[15px] leading-[1.85] text-text-secondary">{data.pmContribution}</p>
                      </div>
                    )}

                    {!!data.outcomes?.length && (
                      <>
                        <div className="hairline" />
                        <div>
                          <SectionLabel icon={TrendingUp}>Operational Impact</SectionLabel>
                          <ul className="space-y-2.5">
                            {data.outcomes.map((o, i) => (
                              <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.75] text-text-secondary">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}

                    {!!data.techStack?.length && (
                      <div>
                        <SectionLabel icon={Code2}>Tech Stack</SectionLabel>
                        <div className="flex flex-wrap gap-2">
                          {data.techStack.map((tech) => (
                            <TechChip key={tech} tech={tech} />
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
