"use client";

import {
  Database,
  BarChart3,
  Code2,
  Layers,
  FileSpreadsheet,
  GitBranch,
  Workflow,
  ClipboardList,
  TrendingUp,
  Settings,
} from "lucide-react";
import AnimatedSection from "./animated-section";
import SectionHeading from "./section-heading";

const technicalSkills = [
  { name: "Zoho Suite", description: "CRM, Books, Inventory, Analytics", icon: Layers, level: 95 },
  { name: "Power BI", description: "Dashboards & Data Visualization", icon: BarChart3, level: 88 },
  { name: "SQL", description: "Query Design & Database Management", icon: Database, level: 82 },
  { name: "Python", description: "Data Analysis & Automation", icon: Code2, level: 75 },
  { name: "Advanced Excel", description: "Pivot Tables, VBA, Power Query", icon: FileSpreadsheet, level: 92 },
  { name: "Airtable", description: "Project Management & Databases", icon: GitBranch, level: 85 },
];

const functionalSkills = [
  { name: "MIS Reporting", description: "End-to-end management information systems", icon: ClipboardList },
  { name: "Workflow Automation", description: "Process optimization & system integration", icon: Workflow },
  { name: "Business Analytics", description: "KPI tracking & strategic insights", icon: TrendingUp },
  { name: "Operations Management", description: "Inventory, procurement & supply chain", icon: Settings },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Capabilities"
          title="Skills Dashboard"
          description="A comprehensive toolkit for data-driven operations"
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Technical Skills */}
          <AnimatedSection>
            <div className="glass rounded-xl p-6">
              <h3 className="mb-6 flex items-center gap-2 font-mono text-sm tracking-wider text-[#3385ff] uppercase">
                <Code2 className="h-4 w-4" />
                Technical Skills
              </h3>
              <div className="flex flex-col gap-5">
                {technicalSkills.map((skill, index) => (
                  <AnimatedSection key={skill.name} delay={index * 0.08}>
                    <div className="group">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[rgba(0,82,204,0.1)] transition-colors group-hover:bg-[rgba(0,82,204,0.2)]">
                            <skill.icon className="h-4 w-4 text-[#0052cc]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {skill.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-[#3385ff]">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.05)]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0052cc] to-[#3385ff] transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Functional Skills */}
          <AnimatedSection delay={0.2}>
            <div className="glass rounded-xl p-6">
              <h3 className="mb-6 flex items-center gap-2 font-mono text-sm tracking-wider text-[#3385ff] uppercase">
                <Settings className="h-4 w-4" />
                Functional Skills
              </h3>
              <div className="flex flex-col gap-4">
                {functionalSkills.map((skill, index) => (
                  <AnimatedSection key={skill.name} delay={index * 0.1}>
                    <div className="group flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-[rgba(0,82,204,0.2)] hover:bg-[rgba(0,82,204,0.03)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,82,204,0.1)] transition-colors group-hover:bg-[rgba(0,82,204,0.15)]">
                        <skill.icon className="h-6 w-6 text-[#0052cc]" />
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-semibold text-foreground">
                          {skill.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Stats boxes */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[rgba(0,82,204,0.06)] p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-[#3385ff]">3+</p>
                  <p className="text-xs text-muted-foreground">Years Experience</p>
                </div>
                <div className="rounded-lg bg-[rgba(0,82,204,0.06)] p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-[#3385ff]">60%</p>
                  <p className="text-xs text-muted-foreground">Manual Tasks Reduced</p>
                </div>
                <div className="rounded-lg bg-[rgba(0,82,204,0.06)] p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-[#3385ff]">10+</p>
                  <p className="text-xs text-muted-foreground">Tools Mastered</p>
                </div>
                <div className="rounded-lg bg-[rgba(0,82,204,0.06)] p-4 text-center">
                  <p className="font-mono text-2xl font-bold text-[#3385ff]">45%</p>
                  <p className="text-xs text-muted-foreground">Faster Reporting</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
