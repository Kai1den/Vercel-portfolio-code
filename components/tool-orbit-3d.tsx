"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
  {
    name: "Zoho Suite",
    color: "#D32011",
    desc: "CRM, Books, Desk, Projects and full business workflow automation",
  },
  {
    name: "Power BI",
    color: "#F2C811",
    desc: "Interactive dashboards, DAX measures, and real-time data visualization",
  },
  {
    name: "Airtable",
    color: "#18BFFF",
    desc: "Relational databases, project tracking, and collaborative workflows",
  },
  {
    name: "Excel",
    color: "#217346",
    desc: "Advanced formulas, pivot tables, VBA macros, and data modeling",
  },
  {
    name: "SQL",
    color: "#00BCF2",
    desc: "Complex queries, stored procedures, and database optimization",
  },
  {
    name: "Python",
    color: "#3776AB",
    desc: "Data analysis with Pandas, automation scripts, and API integrations",
  },
];

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}

function ToolNode({
  tool,
  index,
  isActive,
  onClick,
}: {
  tool: (typeof tools)[number];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const rgb = hexToRgb(tool.color);
  const angle = (index / tools.length) * Math.PI * 2 - Math.PI / 2;
  const radius = 140;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.button
      onClick={onClick}
      className="absolute flex flex-col items-center gap-2"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow */}
      <div
        className="absolute -inset-3 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(${rgb}, ${isActive ? 0.3 : 0}) 0%, transparent 70%)`,
          opacity: isActive ? 1 : undefined,
        }}
      />
      {/* Circle */}
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 md:h-16 md:w-16"
        style={{
          borderColor: isActive ? tool.color : `rgba(${rgb}, 0.3)`,
          background: isActive ? `rgba(${rgb}, 0.2)` : `rgba(${rgb}, 0.06)`,
          boxShadow: isActive ? `0 0 24px rgba(${rgb}, 0.4), inset 0 0 12px rgba(${rgb}, 0.1)` : "none",
        }}
      >
        <span
          className="text-lg font-bold md:text-xl"
          style={{ color: tool.color }}
        >
          {tool.name.charAt(0)}
        </span>
      </div>
      <span
        className="text-center font-mono text-[10px] tracking-wider transition-colors duration-200 md:text-xs"
        style={{ color: isActive ? tool.color : "rgba(255,255,255,0.5)" }}
      >
        {tool.name}
      </span>
    </motion.button>
  );
}

export default function ToolOrbit3D() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-10 py-8 md:py-12">
      {/* Orbit visualization */}
      <div className="relative h-[360px] w-[360px] md:h-[400px] md:w-[400px]">
        {/* Orbit ring */}
        <div className="absolute inset-[calc(50%-140px)] h-[280px] w-[280px] rounded-full border border-[rgba(255,255,255,0.05)]" />
        <motion.div
          className="absolute inset-[calc(50%-140px)] h-[280px] w-[280px] rounded-full border border-[rgba(0,82,204,0.15)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Center core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(0,82,204,0.3)] bg-[rgba(0,82,204,0.08)]"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0,82,204,0.2), inset 0 0 10px rgba(0,82,204,0.1)",
                "0 0 40px rgba(0,82,204,0.3), inset 0 0 20px rgba(0,82,204,0.15)",
                "0 0 20px rgba(0,82,204,0.2), inset 0 0 10px rgba(0,82,204,0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-xs font-bold tracking-wider text-[#3385ff]">
              GB
            </span>
          </motion.div>
          {/* Connecting lines */}
          {tools.map((_, i) => {
            const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
            const length = 140;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-left"
                style={{
                  width: length,
                  height: "1px",
                  background: `linear-gradient(90deg, rgba(0,82,204,0.15), transparent)`,
                  transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                }}
              />
            );
          })}
        </div>

        {/* Tool nodes */}
        {tools.map((tool, i) => (
          <ToolNode
            key={tool.name}
            tool={tool}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* Active tool detail */}
      <div className="h-20 w-full max-w-md px-4">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-4 text-center"
            >
              <p
                className="text-sm font-semibold"
                style={{ color: tools[activeIndex].color }}
              >
                {tools[activeIndex].name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[rgba(255,255,255,0.6)]">
                {tools[activeIndex].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
