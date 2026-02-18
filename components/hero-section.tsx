"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";

const DataGrid3D = dynamic(() => import("./data-grid-3d"), { ssr: false });

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <DataGrid3D />

      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.85) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="mb-4 inline-block rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-1.5 font-mono text-xs tracking-widest text-[#3385ff] uppercase backdrop-blur-sm">
            Data-Driven Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Gautam
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-2 font-mono text-lg tracking-wide text-[#3385ff] md:text-xl"
        >
          Data Analyst — Operations & MIS
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          Transforming raw data into strategic insights. Specializing in
          workflow automation, business intelligence, and operational
          excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex gap-4"
        >
          <a
            href="#experience"
            className="group flex items-center gap-2 rounded-lg bg-[#0052cc] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#3385ff] hover:shadow-[0_0_20px_rgba(0,82,204,0.4)]"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
