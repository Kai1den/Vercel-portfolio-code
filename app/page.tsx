import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import ToolsSection from "@/components/tools-section";
import AISection from "@/components/ai-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* Divider gradient */}
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[rgba(0,82,204,0.3)] to-transparent" />

      <ExperienceSection />

      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[rgba(0,82,204,0.3)] to-transparent" />

      <SkillsSection />

      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[rgba(0,82,204,0.3)] to-transparent" />

      <ToolsSection />

      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[rgba(0,82,204,0.3)] to-transparent" />

      <AISection />

      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[rgba(0,82,204,0.3)] to-transparent" />

      <ContactSection />
      <Footer />
    </main>
  );
}
