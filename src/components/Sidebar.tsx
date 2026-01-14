'use client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Home, User, Code, Briefcase, Mail, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero', icon: Home },
    { name: 'About', to: 'about', icon: User },
    { name: 'Skills', to: 'skills', icon: Code },
    { name: 'Projects', to: 'projects', icon: Briefcase },
    { name: 'Contact', to: 'contact', icon: Mail },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full p-8 relative">
      <div className="absolute top-4 right-4 md:hidden">
         {/* Mobile internal content toggle not needed if outside */}
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 mb-6 border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden relative transition-colors duration-300">
           {/* Placeholder for user image - User should replace this */}
           <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
             <User size={48} />
           </div>
           {/* <img src="/path/to/image.jpg" className="w-full h-full object-cover" /> */}
        </div>
        <h2 className="text-2xl font-black text-portfolio-dark dark:text-portfolio-light tracking-tighter text-center leading-none mb-2 transition-colors duration-300">
          Shrey Agrawal
        </h2>
        <span className="bg-portfolio-dark dark:bg-portfolio-light text-portfolio-gold dark:text-portfolio-dark px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest transition-colors duration-300">
          Developer
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-50}
                activeClass="text-portfolio-dark bg-white/30 dark:bg-black/20"
                className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer text-portfolio-dark/70 dark:text-portfolio-light/70 hover:text-portfolio-dark dark:hover:text-portfolio-light hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 font-bold uppercase text-sm tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Footer */}
      <div className="mt-auto flex flex-col gap-4">
        <div className="flex justify-center gap-4 pt-8 border-t border-black/10 dark:border-white/10">
          <a href="#" className="text-portfolio-dark/60 dark:text-portfolio-light/60 hover:text-portfolio-dark dark:hover:text-portfolio-light transition-colors"><Github size={20} /></a>
          <a href="#" className="text-portfolio-dark/60 dark:text-portfolio-light/60 hover:text-portfolio-dark dark:hover:text-portfolio-light transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-portfolio-dark/60 dark:text-portfolio-light/60 hover:text-portfolio-dark dark:hover:text-portfolio-light transition-colors"><Twitter size={20} /></a>
        </div>
        
        {/* Theme Settings */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex flex-col items-center w-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-portfolio-dark/40 dark:text-portfolio-light/40 mb-2">Appearance</span>
            <ThemeToggle />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile/Tablet Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-portfolio-dark z-50 flex items-center justify-between px-6 shadow-sm dark:shadow-gray-800 transition-colors duration-300">
        
        {/* Profile Photo Trigger */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 overflow-hidden border-2 border-portfolio-gold cursor-pointer hover:scale-105 transition-transform"
          aria-label="Open Menu"
        >
          <User size={24} />
          {/* <img src="/path/to/image.jpg" className="w-full h-full object-cover" /> */}
        </button>

        <div className="flex items-center gap-4">
           <ThemeToggle />
           {/* Burger Icon (Optional, keeping as secondary trigger) */}
           <button onClick={() => setIsOpen(true)} className="p-2 text-portfolio-dark dark:text-portfolio-light">
             <Menu size={28} />
           </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-portfolio-gold dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
            >
               <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 text-portfolio-dark hover:bg-white/20 rounded-full"
               >
                 <X size={24} />
               </button>
               {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Static) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[300px] bg-portfolio-gold dark:bg-gray-900 border-r border-portfolio-dark/5 dark:border-gray-800 overflow-y-auto transition-colors duration-300">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;

