"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          {"<"}
          <span className="text-[#0052cc]">Gautam</span>
          {"/>"} &mdash; Designed & Built with Data-First Thinking
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
