"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, GraduationCap, Briefcase } from "lucide-react";

type Mode = "business" | "academic";

const navItems = [
  { label: "Profile", href: "#about" },
  { label: "Method", href: "#method" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function Navigation({ mode, setMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    window.dispatchEvent(
      new CustomEvent("lazy-section-request", { detail: href.slice(1) })
    );
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const toggleMode = () => setMode(mode === "business" ? "academic" : "business");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 anim-fade-up ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
          <div className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
            isScrolled
              ? "border-line bg-bg/78 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-[28px]"
              : "border-transparent bg-transparent shadow-none backdrop-blur-0"
          }`}>

            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                if (mode === "academic") {
                  setMode("business");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="relative z-10 flex items-center"
            >
              <Image
                src="/assets/logo.svg"
                alt="Williens logo"
                width={124}
                height={34}
                priority
                className="h-8 w-auto"
              />
            </a>

            {/* Desktop nav items — only in business mode */}
            {mode === "business" && (
              <div className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5 transition-all duration-500">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[16px] tracking-[0.02em] uppercase transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? "text-gold"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}


            {/* Desktop right side: mode toggle + call button */}
            <div className="hidden md:flex items-center gap-3">
              {/* Pill toggle */}
              <div className="flex items-center rounded-full border border-line bg-surface overflow-hidden">
                <button
                  onClick={() => setMode("business")}
                  className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 rounded-full ${
                    mode === "business"
                      ? "bg-gold/15 text-gold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setMode("academic")}
                  className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 rounded-full ${
                    mode === "academic"
                      ? "bg-gold/15 text-gold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Academic
                </button>
              </div>

              <button
                onClick={() => { window.location.href = "tel:0929822369"; }}
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase px-5 py-2 rounded-full border border-gold/25 bg-gold/10 text-gold hover:bg-gold hover:text-bg transition-all duration-300 z-10"
              >
                <Phone size={13} />
                Call 0929 822 369
              </button>
            </div>

            {/* Mobile right side: call + mode icon + menu */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="tel:0929822369"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-2 rounded-full border border-gold/25 bg-gold/10 text-gold"
                aria-label="Call 0929 822 369"
              >
                <Phone size={12} />
                0929 822 369
              </a>
              <button
                onClick={toggleMode}
                className="p-2 text-text-muted hover:text-gold transition-colors z-10"
                aria-label={mode === "business" ? "Switch to Academic mode" : "Switch to Business mode"}
              >
                {mode === "business" ? <GraduationCap size={18} /> : <Briefcase size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-text-muted hover:text-text-primary transition-colors z-10"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-3xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-1 pt-8">
              {mode === "business" && navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left font-heading text-2xl font-bold text-text-primary hover:text-gold transition-colors py-4 border-b border-line flex items-center justify-between"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-text-muted tracking-wider">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
              {mode === "academic" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[12px] text-text-muted uppercase tracking-wider py-4"
                >
                  Lý lịch khoa học
                </motion.p>
              )}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => scrollTo("#contact")}
                className="mt-8 w-full py-3.5 font-mono text-[11px] tracking-wider uppercase border border-gold/20 text-gold rounded-full hover:bg-gold/[0.05] transition-all"
              >
                Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
