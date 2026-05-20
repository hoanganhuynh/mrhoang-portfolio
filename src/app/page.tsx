"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import LazyMount from "@/components/LazyMount";
import Footer from "@/components/Footer";

const About = dynamic(() => import("@/components/About"));
const StrategicIdentity = dynamic(() => import("@/components/StrategicIdentity"));
const Experience = dynamic(() => import("@/components/Experience"));
const ProjectManagement = dynamic(() => import("@/components/ProjectManagement"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const Capabilities = dynamic(() => import("@/components/Capabilities"));
const Partners = dynamic(() => import("@/components/Partners"));

export default function Home() {
  return (
    <>
      <Navigation />
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
    </>
  );
}
