import { CreativeDotBackground } from "@/components/creative-dot-background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative">
      <CreativeDotBackground />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container py-10">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
