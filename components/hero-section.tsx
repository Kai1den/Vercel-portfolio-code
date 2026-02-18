"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";

const HeroCharacter3D = dynamic(() => import("./hero-character-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0052cc] border-t-transparent" />
    </div>
  ),
});

/* ─── Rotating taglines ─── */
const taglines = [
  "Transforming Data into Decisions",
  "Automating Workflows at Scale",
  "Building Intelligent Dashboards",
  "Bridging Analytics & Operations",
  "Powering Growth with Insights",
];

/* ─── Tool icon definitions with SVG paths ─── */
const tools = [
  {
    name: "Zoho",
    color: "#D32011",
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5 md:h-6 md:w-6">
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Z
        </text>
      </svg>
    ),
  },
  {
    name: "Power BI",
    color: "#F2C811",
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5 md:h-6 md:w-6">
        <rect x="8" y="18" width="6" height="14" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="17" y="12" width="6" height="20" rx="1" fill="currentColor" opacity="0.8" />
        <rect x="26" y="6" width="6" height="26" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "SQL",
    color: "#00BCF2",
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5 md:h-6 md:w-6">
        <ellipse cx="20" cy="12" rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12v16c0 2.76 5.37 5 12 5s12-2.24 12-5V12" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="20" cy="20" rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5 md:h-6 md:w-6">
        <path
          d="M20 6c-5 0-8 2-8 5v3h8v1H12c-3 0-6 2-6 6s2 6 5 6h3v-4c0-3 2-5 5-5h7c2.5 0 5-2 5-5v-2c0-3-3-5-6-5h-5zm-3 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M20 34c5 0 8-2 8-5v-3h-8v-1h8c3 0 6-2 6-6s-2-6-5-6h-3v4c0 3-2 5-5 5h-7c-2.5 0-5 2-5 5v2c0 3 3 5 6 5h5zm3-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    name: "Excel",
    color: "#217346",
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5 md:h-6 md:w-6">
        <rect x="6" y="8" width="28" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14l12 12M26 14L14 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Airtable",
    color: "#18BFFF",
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5 md:h-6 md:w-6">
        <rect x="6" y="10" width="12" height="8" rx="1" fill="currentColor" opacity="0.9" />
        <rect x="22" y="10" width="12" height="8" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="6" y="22" width="12" height="8" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="22" y="22" width="12" height="8" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
];

/* ─── Animated tagline rotator ─── */
function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden md:h-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 text-center font-mono text-sm tracking-widest text-[#3385ff] md:text-base"
        >
          {taglines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─── Tool icon with hover interactions ─── */
function ToolIcon({
  tool,
  delay,
}: {
  tool: (typeof tools)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15, y: -4 }}
      className="group relative flex flex-col items-center gap-1.5"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] transition-all duration-300 md:h-12 md:w-12"
        style={{
          background: `rgba(${hexToRgb(tool.color)}, 0.08)`,
          color: tool.color,
          boxShadow: `0 0 0px rgba(${hexToRgb(tool.color)}, 0)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 20px rgba(${hexToRgb(tool.color)}, 0.3)`;
          e.currentTarget.style.borderColor = `rgba(${hexToRgb(tool.color)}, 0.4)`;
          e.currentTarget.style.background = `rgba(${hexToRgb(tool.color)}, 0.15)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0px rgba(${hexToRgb(tool.color)}, 0)`;
          e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.08)`;
          e.currentTarget.style.background = `rgba(${hexToRgb(tool.color)}, 0.08)`;
        }}
      >
        {tool.icon}
      </div>
      <span className="font-mono text-[10px] tracking-wider text-muted-foreground transition-colors group-hover:text-foreground md:text-xs">
        {tool.name}
      </span>
    </motion.div>
  );
}

/* ─── Utility ─── */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}

/* ─── Typing animation for the name ─── */
function TypedName() {
  const name = "Gautam";
  return (
    <span className="inline-flex">
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.6 + i * 0.08,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
        className="ml-1 inline-block w-[3px] bg-[#3385ff]"
        style={{ height: "1em" }}
      />
    </span>
  );
}

/* ─── Main Hero ─── */
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(0,82,204,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(51,133,255,0.06) 0%, transparent 40%)",
        }}
      />

      {/* 3D Character */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-[1] h-[320px] w-full max-w-lg md:h-[420px] lg:h-[480px]"
      >
        <HeroCharacter3D />

        {/* Glow ring under the figure */}
        <div
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{
            width: "280px",
            height: "40px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,82,204,0.25) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 mt-2 flex flex-col items-center px-6 text-center md:mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="mb-3 inline-block rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#3385ff] uppercase backdrop-blur-sm md:text-xs">
            Data Analyst &mdash; Operations & MIS
          </span>
        </motion.div>

        <h1 className="mb-3 text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <TypedName />
        </h1>

        <RotatingTagline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-3 max-w-lg text-pretty text-sm text-muted-foreground md:text-base"
        >
          Crafting data-driven solutions through workflow automation, business
          intelligence, and operational excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 flex gap-4"
        >
          <a
            href="#experience"
            className="group flex items-center gap-2 rounded-lg bg-[#0052cc] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#3385ff] hover:shadow-[0_0_24px_rgba(0,82,204,0.4)]"
          >
            View My Work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)]"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Tool icons row */}
        <div className="mt-10 flex flex-col items-center gap-3 md:mt-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
          >
            Powered by
          </motion.span>
          <div className="flex items-end gap-4 md:gap-6">
            {tools.map((tool, i) => (
              <ToolIcon key={tool.name} tool={tool} delay={1.6 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-[rgba(255,255,255,0.15)] pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-[#3385ff]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
