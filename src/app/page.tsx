"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import LazyMount from "@/components/LazyMount";
import Footer from "@/components/Footer";
import AcademicPage from "@/components/AcademicPage";

const About = dynamic(() => import("@/components/About"));
const StrategicIdentity = dynamic(() => import("@/components/StrategicIdentity"));
const Experience = dynamic(() => import("@/components/Experience"));
const ProjectManagement = dynamic(() => import("@/components/ProjectManagement"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const Capabilities = dynamic(() => import("@/components/Capabilities"));
const Partners = dynamic(() => import("@/components/Partners"));

type Mode = "business" | "academic";

export default function Home() {
  const [mode, setMode] = useState<Mode>("business");

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    if (mode === "academic") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [mode]);

  return (
    <>
      <Navigation mode={mode} setMode={setMode} />
      <AnimatePresence mode="wait">
        {mode === "business" ? (
          <motion.div
            key="business"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <main id="main-content">
              <Hero />
              <Quote />
              <LazyMount id="about"><About /></LazyMount>
              <LazyMount><StrategicIdentity /></LazyMount>
              <LazyMount id="experience"><Experience /></LazyMount>
              <LazyMount id="method"><ProjectManagement /></LazyMount>
              <LazyMount id="projects" minHeight="760px"><FeaturedProjects /></LazyMount>
              <LazyMount><Capabilities /></LazyMount>
              <LazyMount minHeight="360px"><Partners /></LazyMount>
            </main>
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="academic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AcademicPage />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
