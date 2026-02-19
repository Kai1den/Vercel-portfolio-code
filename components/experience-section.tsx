"use client";

import { Briefcase, ArrowRight } from "lucide-react";
import AnimatedSection from "./animated-section";
import SectionHeading from "./section-heading";

const experiences = [
  {
    company: "Greenscape-eco",
    role: "MIS Executive / Data Analyst",
    period: "March 2025 - Present",
    highlight: "Led migration from Tally to Zoho Books",
    achievements: [
      "Led the complete migration from Tally to Zoho Books, establishing a modern cloud-based accounting ecosystem",
      "Built automated MIS dashboards tracking KPIs across Sales, Inventory, and Procurement",
      "Implemented workflow automation reducing manual data entry by 60%",
      "Integrated Zoho CRM, Books, and Inventory for end-to-end business process optimization",
    ],
  },
  {
    company: "ROI Hunt",
    role: "Operations & Data Analyst",
    period: "November 2024 - March 2025",
    highlight: "Performance marketing analytics",
    achievements: [
      "Managed cross-platform ad performance analytics for clients across Google, Meta, and Amazon",
      "Built Power BI dashboards for real-time campaign ROI tracking",
      "Optimized client reporting workflows using Airtable and automated data pipelines",
      "Reduced reporting turnaround time by 45% through process automation",
    ],
  },
  {
    company: "IDUS Furnitures",
    role: "Operations Executive",
    period: "2022 - 2023",
    highlight: "Inventory & supply chain optimization",
    achievements: [
      "Managed end-to-end inventory tracking and supply chain coordination",
      "Developed Excel-based reporting systems for procurement and vendor management",
      "Streamlined order processing workflows, improving fulfillment efficiency",
      "Coordinated with cross-functional teams for project-based operations",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label="Career Path"
          title="Professional Experience"
          description="Building data-driven operations systems across industries"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-4 hidden w-px bg-gradient-to-b from-[#0052cc] via-[rgba(0,82,204,0.3)] to-transparent md:left-1/2 md:block" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <AnimatedSection key={exp.company} delay={index * 0.15}>
                <div
                  className={`flex flex-col gap-6 md:flex-row md:gap-12 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden items-start justify-center md:flex md:w-0">
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#0052cc] bg-background">
                      <div className="h-3 w-3 rounded-full bg-[#0052cc]" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`glass group flex-1 rounded-xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,82,204,0.15)] ${
                      index % 2 === 1 ? "md:text-right" : ""
                    }`}
                  >
                    <div
                      className={`mb-4 flex items-center gap-3 ${
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,82,204,0.1)]">
                        <Briefcase className="h-5 w-5 text-[#0052cc]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <p className="font-mono text-xs text-[#3385ff]">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mb-3 flex items-center gap-2 font-mono text-xs text-muted-foreground ${
                        index % 2 === 1 ? "md:justify-end" : ""
                      }`}
                    >
                      <span>{exp.period}</span>
                    </div>

                    <div
                      className={`mb-4 inline-flex items-center gap-1.5 rounded-full bg-[rgba(0,82,204,0.1)] px-3 py-1 text-xs text-[#3385ff] ${
                        index % 2 === 1 ? "md:float-right md:clear-both" : ""
                      }`}
                    >
                      <ArrowRight className="h-3 w-3" />
                      {exp.highlight}
                    </div>

                    <ul
                      className={`clear-both flex flex-col gap-2 ${
                        index % 2 === 1 ? "md:items-end" : ""
                      }`}
                    >
                      {exp.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className={`flex gap-2 text-sm text-muted-foreground ${
                            index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
                          }`}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(0,82,204,0.5)]" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
