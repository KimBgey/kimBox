"use client";

import { useState } from "react";
import HeroIntro from "@/components/sections/HeroIntro";
import Nav from "@/components/Nav";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StackSection from "@/components/sections/StackSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import type { Project, Service } from "@/lib/db/schema";

interface Props {
  dbProjects: Project[];
  dbServices: Service[];
  comeupUrl: string;
}

export default function HomeClient({ dbProjects, dbServices, comeupUrl }: Props) {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window !== "undefined") return !!sessionStorage.getItem("introSeen");
    return false;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("introSeen", "1");
    setIntroDone(true);
  };

  return (
    <>
      {!introDone && <HeroIntro onComplete={handleIntroComplete} />}
      <div
        className={`transition-opacity duration-700 ${introDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Nav />
        <HeroSection />
        <AboutSection />
        <ProjectsSection projects={dbProjects.length > 0 ? dbProjects : undefined} />
        <ServicesSection dbServices={dbServices.length > 0 ? dbServices : undefined} comeupUrl={comeupUrl} />
        <StackSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
