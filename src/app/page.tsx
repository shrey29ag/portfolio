'use client';

import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-portfolio-dark text-portfolio-dark dark:text-portfolio-light font-sans selection:bg-portfolio-gold selection:text-portfolio-dark transition-colors duration-300">
      {/* Sidebar Navigation - Fixed on Desktop, Drawer on Mobile */}
      <Sidebar />
      
      {/* Main Content Area - Shifted right on desktop to accommodate sidebar */}
      <main className="flex-1 lg:ml-[300px] w-full flex flex-col relative z-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
