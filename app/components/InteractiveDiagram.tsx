"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MODULE_INFO: Record<string, string> = {
  binaryVolatility:
    "Classifies the current market as high- or low-volatility. This regime flag helps the main model adjust position sizing and expected risk levels dynamically.",
  regimeState:
    "Classification of the economic regime based on macroeconomic variables and correlation coefficients",
  llmSentiment:
    "Uses a large-language model to extract sentiment from 10-K and 10-Q filings. The resulting score is merged into fundamental signals used as input to the main gradient-boosting model.",
  mainGbm:
    "Core predictive engine that integrates fundamentals, sentiment, and volatility features to estimate next-period expected returns for each stock.",
  portfolio:
    "Converts model predictions into portfolio weights, applying sector caps, leverage (150/50), and turnover constraints to balance alpha and cost.",
  finalProcessing:
    "Aggregates monthly trades, adjusts for transaction costs, and outputs the finalized holdings file for execution.",
  ibrkExec:
    "Sends finalized orders through the Interactive Brokers API for simulated execution and P&L tracking.",
};

type ModuleKey = keyof typeof MODULE_INFO;

type Box = {
  key: ModuleKey;
  label: string;
  color: "blue" | "red" | "green";
};

const BOXES: Box[] = [
  { key: "binaryVolatility", label: "Binary Volatility Model", color: "blue" },
  { key: "regimeState", label: "Regime State Model", color: "blue" },
  { key: "mainGbm", label: "Main Gradient Boosting Model", color: "red" },
  { key: "portfolio", label: "Portfolio Building", color: "red" },
  { key: "llmSentiment", label: "LLM Sentiment Score", color: "blue" },
  { key: "finalProcessing", label: "Final Data Processing", color: "green" },
  { key: "ibrkExec", label: "IBRK Exec.", color: "red" },
];

function colorClasses(color: Box["color"]) {
  switch (color) {
    case "blue":
      return "bg-blue-600 hover:bg-blue-700 border-blue-300";
    case "red":
      // match site red accent family for cohesion
      return "bg-[#800000] hover:bg-[#6a0000] border-red-300";
    case "green":
      return "bg-green-600 hover:bg-green-700 border-green-300";
    default:
      return "bg-gray-600 hover:bg-gray-700 border-gray-300";
  }
}

export default function InteractiveDiagram() {
  // hovered previews the description; locked persists selection after mouse leaves
  const [hovered, setHovered] = useState<ModuleKey | null>(null);
  const [locked, setLocked] = useState<ModuleKey | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRefs = useRef<Record<ModuleKey, HTMLButtonElement | null>>({
    binaryVolatility: null,
    regimeState: null,
    llmSentiment: null,
    mainGbm: null,
    portfolio: null,
    finalProcessing: null,
    ibrkExec: null,
  });
  const [lines, setLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);

  const connections: Array<[ModuleKey, ModuleKey]> = [
    ["binaryVolatility", "mainGbm"],
    ["regimeState", "portfolio"],
    ["llmSentiment", "mainGbm"],
    ["mainGbm", "portfolio"],
    ["portfolio", "finalProcessing"],
    ["finalProcessing", "ibrkExec"],
  ];

  const computeLines = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const nextLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    const centerOf = (key: ModuleKey) => {
      const el = boxRefs.current[key];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - cRect.left + r.width / 2, y: r.top - cRect.top + r.height / 2 };
    };
    connections.forEach(([from, to]) => {
      const a = centerOf(from);
      const b = centerOf(to);
      if (a && b) nextLines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    });
    setLines(nextLines);
  };

  useLayoutEffect(() => {
    computeLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => computeLines();
    window.addEventListener("resize", onResize);
    const id = setInterval(computeLines, 300); // recompute after layout shifts
    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(id);
    };
  }, []);

  const getDescription = () => {
    const current = locked ?? hovered;
    if (!current) return "Hover over any module to learn more about its role.";
    return MODULE_INFO[current];
  };

  const BoxItem = ({ box }: { box: Box }) => (
    <motion.button
      type="button"
      ref={(el) => { boxRefs.current[box.key] = el; }}
      onMouseEnter={() => {
        if (!locked) setHovered(box.key);
      }}
      onMouseLeave={() => {
        if (!locked) setHovered((prev) => (prev === box.key ? null : prev));
      }}
      onClick={() => {
        setLocked((prev) => (prev === box.key ? null : box.key));
        setHovered(null);
      }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`text-center rounded-md border px-4 py-4 min-h-[72px] w-40 sm:w-48 md:w-56 mx-auto flex items-center justify-center text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40 ${colorClasses(
        box.color
      )} ${locked === box.key ? "ring-2 ring-white/60" : ""}`}
      aria-pressed={locked === box.key}
    >
      <div className="font-bold text-sm sm:text-base md:text-lg leading-snug mx-auto">{box.label}</div>
    </motion.button>
  );

  return (
    <div className="w-full mx-auto relative" ref={containerRef}>
      {/* SVG arrows overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
          </marker>
        </defs>
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />
        ))}
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start relative">
        {/* Left column: informational models and main model */}
        <div className="flex flex-col gap-4">
          {/* Binary Volatility */}
          <BoxItem box={BOXES[0]} />
          {/* Main Gradient Boosting Model (moved here) */}
          <BoxItem box={BOXES[2]} />
          {/* LLM Sentiment */}
          <BoxItem box={BOXES[4]} />
        </div>

        {/* Center column: Regime above Portfolio */}
        <div className="flex flex-col gap-4">
          <BoxItem box={BOXES[1]} />
          <BoxItem box={BOXES[3]} />
        </div>

        {/* Right column: processing path (shifted down) */}
        <div className="flex flex-col gap-4">
          <div className="hidden md:block h-10" />
          <BoxItem box={BOXES[5]} />
          <BoxItem box={BOXES[6]} />
        </div>
      </div>

      {/* Description panel */}
      <div className="mt-6 rounded-lg bg-white/10 text-white p-4 border border-white/15">
        <div className="text-sm sm:text-base leading-relaxed">
          {getDescription()}
        </div>
      </div>
    </div>
  );
}
