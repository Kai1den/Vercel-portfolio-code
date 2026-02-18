"use client";

import AnimatedSection from "./animated-section";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <AnimatedSection className="mb-16 text-center">
      <span className="mb-3 inline-block font-mono text-xs tracking-widest text-[#3385ff] uppercase">
        {label}
      </span>
      <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
