"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

/* ─── Rotating taglines ─── */
const taglines = [
  "Transforming Data into Decisions",
  "Automating Workflows at Scale",
  "Building Intelligent Dashboards",
  "Bridging Analytics & Operations",
  "Powering Growth with Insights",
];

/* ─── Tool definitions ─── */
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

/* ─── Utility ─── */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}

/* ─── Floating ambient particles (CSS only) ─── */
function AmbientParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `rgba(0, 82, 204, ${p.opacity})`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Letter-by-letter animated name ─── */
function AnimatedName() {
  const name = "GAUTAM";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -90,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center perspective-[800px]"
      aria-label="Gautam"
    >
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="hero-letter relative inline-block text-6xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            textShadow: "0 0 40px rgba(0, 82, 204, 0.0)",
          }}
          whileHover={{
            scale: 1.1,
            color: "#3385ff",
            textShadow: "0 0 30px rgba(0, 82, 204, 0.5), 0 0 60px rgba(0, 82, 204, 0.2)",
            transition: { duration: 0.2 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Glow line under the name ─── */
function GlowUnderline() {
  return (
    <motion.div
      className="mx-auto mt-3 h-px w-0 md:mt-4"
      style={{
        background: "linear-gradient(90deg, transparent, #0052cc, #3385ff, #0052cc, transparent)",
      }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
    />
  );
}

/* ─── Rotating tagline ─── */
function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden md:h-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 text-center font-mono text-sm tracking-widest text-[#3385ff] md:text-base"
        >
          {taglines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─── Tool icon with hover glow ─── */
function ToolIcon({ tool, delay }: { tool: (typeof tools)[number]; delay: number }) {
  const rgb = hexToRgb(tool.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 180, damping: 14 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col items-center gap-2"
    >
      {/* Hover glow ring */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, rgba(${rgb}, 0.12) 0%, transparent 70%)`,
        }}
      />
      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 md:h-13 md:w-13"
        style={{
          borderColor: `rgba(${rgb}, 0.15)`,
          background: `rgba(${rgb}, 0.06)`,
          color: tool.color,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 24px rgba(${rgb}, 0.3), inset 0 0 12px rgba(${rgb}, 0.08)`;
          e.currentTarget.style.borderColor = `rgba(${rgb}, 0.5)`;
          e.currentTarget.style.background = `rgba(${rgb}, 0.14)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = `rgba(${rgb}, 0.15)`;
          e.currentTarget.style.background = `rgba(${rgb}, 0.06)`;
        }}
      >
        {tool.icon}
      </div>
      <span className="font-mono text-[10px] tracking-wider text-muted-foreground transition-colors duration-200 group-hover:text-foreground md:text-xs">
        {tool.name}
      </span>
    </motion.div>
  );
}

/* ─── Subtle grid background ─── */
function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}

/* ─── Mouse-following spotlight ─── */
function Spotlight() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-500 ease-out"
      style={{
        background: `radial-gradient(circle 500px at ${pos.x}% ${pos.y}%, rgba(0,82,204,0.06) 0%, transparent 80%)`,
      }}
    />
  );
}

/* ━━━━━━━━━━━━ Main Hero ━━━━━━━━━━━━ */
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background layers */}
      <GridBackground />
      <AmbientParticles />
      <Spotlight />

      {/* Static ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,82,204,0.08) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase backdrop-blur-sm md:text-xs">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0052cc] shadow-[0_0_8px_rgba(0,82,204,0.6)]" />
            Data Analyst &mdash; Operations & MIS
          </span>
        </motion.div>

        {/* Animated name */}
        <div className="mb-2 mt-6">
          <AnimatedName />
          <GlowUnderline />
        </div>

        {/* Rotating taglines */}
        <div className="mt-5">
          <RotatingTagline />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Crafting data-driven solutions through workflow automation, business
          intelligence, and operational excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-8 flex gap-4"
        >
          <a
            href="#experience"
            className="group flex items-center gap-2 rounded-lg bg-[#0052cc] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#3385ff] hover:shadow-[0_0_28px_rgba(0,82,204,0.45)]"
          >
            View My Work
            <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)]"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Tool icons */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
          >
            Powered by
          </motion.span>
          <div className="flex flex-wrap items-end justify-center gap-5 md:gap-7">
            {tools.map((tool, i) => (
              <ToolIcon key={tool.name} tool={tool} delay={2.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-[rgba(255,255,255,0.12)] pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-[#3385ff]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
