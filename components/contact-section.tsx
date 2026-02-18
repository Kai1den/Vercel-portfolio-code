"use client";

import { useState } from "react";
import { Mail, Linkedin, Send, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./animated-section";
import SectionHeading from "./section-heading";

export default function ContactSection() {
  const [terminalLines, setTerminalLines] = useState([
    { text: "$ whoami", type: "command" as const },
    { text: "gautam - data analyst & operations specialist", type: "output" as const },
    { text: "$ cat contact.json", type: "command" as const },
  ]);
  const [showResult, setShowResult] = useState(false);

  const handleTerminalClick = () => {
    if (!showResult) {
      setShowResult(true);
      setTerminalLines((prev) => [
        ...prev,
        { text: '{ "status": "open_to_opportunities" }', type: "output" as const },
        { text: "$ echo 'Let's connect!'", type: "command" as const },
        { text: "Let's connect!", type: "output" as const },
      ]);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Get in Touch"
          title="Let's Build Something"
          description="Open to opportunities in data analytics, operations, and business intelligence"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Terminal card */}
          <AnimatedSection>
            <div
              className="glass cursor-pointer overflow-hidden rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,82,204,0.12)]"
              onClick={handleTerminalClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleTerminalClick();
              }}
              aria-label="Interactive terminal - click to reveal contact status"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Terminal className="h-3 w-3" />
                  gautam@portfolio ~
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-4 font-mono text-sm">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className={`mb-1 ${
                      line.type === "command"
                        ? "text-[#3385ff]"
                        : "text-muted-foreground"
                    }`}
                  >
                    {line.text}
                  </motion.div>
                ))}
                {!showResult && (
                  <span className="inline-block h-4 w-2 animate-pulse bg-[#3385ff]" />
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact buttons */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:gautam@example.com"
                className="glass group flex items-center gap-4 rounded-xl p-5 transition-all hover:shadow-[0_0_30px_rgba(0,82,204,0.12)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,82,204,0.1)] transition-colors group-hover:bg-[rgba(0,82,204,0.2)]">
                  <Mail className="h-6 w-6 text-[#0052cc]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">
                    Drop me a message
                  </p>
                </div>
                <Send className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </a>

              <a
                href="https://linkedin.com/in/gautam"
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center gap-4 rounded-xl p-5 transition-all hover:shadow-[0_0_30px_rgba(0,82,204,0.12)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,82,204,0.1)] transition-colors group-hover:bg-[rgba(0,82,204,0.2)]">
                  <Linkedin className="h-6 w-6 text-[#0052cc]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">
                    Let's connect professionally
                  </p>
                </div>
                <Send className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </a>

              <div className="glass rounded-xl p-5">
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Current Status
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
