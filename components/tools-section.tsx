"use client";

import AnimatedSection from "./animated-section";
import SectionHeading from "./section-heading";
import ToolOrbit3D from "./tool-orbit-3d";

export default function ToolsSection() {
  return (
    <section id="tools" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Tech Stack"
          title="Tool Ecosystem"
          description="An interactive orbit of the tools powering data-driven operations. Hover to explore."
        />

        <AnimatedSection>
          <div className="glass overflow-hidden rounded-2xl">
            <ToolOrbit3D />
          </div>
        </AnimatedSection>

        {/* Tool descriptions below */}
        <AnimatedSection delay={0.2}>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Zoho", desc: "Business Suite" },
              { name: "Power BI", desc: "Visualization" },
              { name: "Airtable", desc: "Project Mgmt" },
              { name: "Excel", desc: "Data Analysis" },
              { name: "SQL", desc: "Database Ops" },
              { name: "Python", desc: "Automation" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="glass rounded-lg p-3 text-center transition-all hover:shadow-[0_0_15px_rgba(0,82,204,0.1)]"
              >
                <p className="text-sm font-medium text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
