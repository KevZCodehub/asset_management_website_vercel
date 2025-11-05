"use client";
import { motion } from "framer-motion";

export default function AnimatedText({ title }: { title: string }) {
  return (
    <motion.h1
      className="text-4xl sm:text-6xl font-bold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {title}
    </motion.h1>
  );
}


