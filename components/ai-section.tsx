"use client";

import { Sparkles, Brain, MessageSquare, Zap, Bot, LineChart } from "lucide-react";
import AnimatedSection from "./animated-section";
import SectionHeading from "./section-heading";

const aiCapabilities = [
  {
    icon: Brain,
    title: "Prompt Engineering",
    description:
      "Crafting precise prompts for complex data analysis, report generation, and business intelligence tasks.",
  },
  {
    icon: MessageSquare,
    title: "ChatGPT & Gemini",
    description:
      "Leveraging large language models for automated data interpretation, summarization, and insight extraction.",
  },
  {
    icon: LineChart,
    title: "AI-Powered Analytics",
    description:
      "Using generative AI to identify patterns, anomalies, and trends in large operational datasets.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Integrating AI tools into existing workflows to automate repetitive analysis and reporting tasks.",
  },
  {
    icon: Bot,
    title: "AI-Assisted Coding",
    description:
      "Using AI copilots for Python scripting, SQL query optimization, and rapid prototyping.",
  },
  {
    icon: Sparkles,
    title: "Content Generation",
    description:
      "Generating professional reports, documentation, and business communications with AI assistance.",
  },
];

export default function AISection() {
  return (
    <section id="ai" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Applied AI"
          title="AI-Augmented Analytics"
          description="Harnessing generative AI tools to supercharge data analysis and operational efficiency"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((cap, index) => (
            <AnimatedSection key={cap.title} delay={index * 0.1}>
              <div className="glass group h-full rounded-xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,82,204,0.12)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(0,82,204,0.1)] transition-colors group-hover:bg-[rgba(0,82,204,0.2)]">
                  <cap.icon className="h-6 w-6 text-[#0052cc]" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* AI Tools banner */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 glass rounded-xl p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052cc] to-[#3385ff]">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  The AI-First Approach
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In every project, I integrate AI tools like ChatGPT and Gemini not as
                  replacements, but as force multipliers. From generating initial SQL
                  queries to validating complex business logic, AI accelerates the
                  entire analytics pipeline while keeping human judgment at the core of
                  every decision.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
