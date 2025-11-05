"use client";
import { motion } from "framer-motion";
import React from "react";

type Theme = "red" | "black";

export default function Section({ 
  children, 
  theme = "red" 
}: { 
  children: React.ReactNode;
  theme?: Theme;
}) {
  const bgClass = theme === "red" ? "bg-[#800000] text-white" : "bg-black text-white";
  
  return (
    <motion.section
      className={`min-h-screen flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 text-center ${bgClass}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.section>
  );
}


