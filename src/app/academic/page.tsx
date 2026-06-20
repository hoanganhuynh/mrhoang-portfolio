"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import AcademicPage from "@/components/AcademicPage";

export default function Academic() {
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", "academic");
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      document.documentElement.removeAttribute("data-mode");
    };
  }, []);

  return (
    <>
      <Navigation mode="academic" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AcademicPage />
      </motion.div>
    </>
  );
}
