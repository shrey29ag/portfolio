'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, Loader2, X, Globe, Lock, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Project {
  title: string;
  description: string;
  thumbnailUrl: string;
  liveUrl: string;
  repoUrl: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and register keyboard listener when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsModalOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  // Check for touch device on mount
  useEffect(() => {
    const checkTouch = () => {
      // Only consider it a "touch device" for our purposes if it CANNOT hover.
      // This allows laptops with touchscreens (which can still hover with a mouse) to work.
      return window.matchMedia('(hover: none)').matches;
    };
    setIsTouchDevice(checkTouch());
  }, []);

  // Handle hover interaction with delay
  useEffect(() => {
    if (isHovered && !isTouchDevice) {
      // Start timer to show iframe
      timerRef.current = setTimeout(() => {
        setShowIframe(true);
      }, 500); // 500ms delay
    } else {
      // Clear timer and reset states immediately on mouse leave
      if (timerRef.current) clearTimeout(timerRef.current);
      setShowIframe(false);
      setIsVideoLoading(true);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHovered, isTouchDevice]);

  const renderModal = () => {
    if (!mounted || !isModalOpen) return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Backdrop click to close */}
        <div 
          className="absolute inset-0 -z-10 cursor-pointer" 
          onClick={() => setIsModalOpen(false)}
        />
        
        {/* Browser Window Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          {/* Mock Browser Header */}
          <div className="h-14 bg-gray-50 dark:bg-gray-850 border-b border-gray-205 dark:border-gray-800 px-4 flex items-center justify-between shrink-0 select-none">
            
            {/* macOS window controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group cursor-pointer"
                title="Close"
              >
                <span className="text-[8px] text-red-905 opacity-0 group-hover:opacity-100 transition-opacity font-bold">×</span>
              </button>
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              
              {/* Navigation controls */}
              <div className="hidden sm:flex items-center gap-1 ml-4 text-gray-400 dark:text-gray-500">
                <button className="p-1 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors disabled:opacity-40" disabled>
                  <ArrowLeft size={16} />
                </button>
                <button className="p-1 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors disabled:opacity-40" disabled>
                  <ArrowRight size={16} />
                </button>
                <button className="p-1 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors">
                  <RotateCw size={14} />
                </button>
              </div>
            </div>

            {/* Mock URL Bar */}
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-1.5 text-xs text-gray-500 dark:text-gray-400 max-w-md w-full text-center flex items-center justify-center gap-1.5 font-mono truncate shadow-sm mx-4">
              <Lock size={12} className="text-green-500 shrink-0" />
              <span className="text-green-650 dark:text-green-400 font-semibold select-all">https://</span>
              <span className="truncate select-all">{project.liveUrl.replace(/^https?:\/\//, '')}</span>
            </div>

            {/* Window Action Buttons */}
            <div className="flex items-center gap-2">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-portfolio-gold hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Open in new tab"
              >
                <span className="hidden md:inline">Open Live</span>
                <ExternalLink size={16} />
              </a>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                title="Close Preview"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Browser Iframe Body */}
          <div className="w-full flex-grow relative bg-gray-50 dark:bg-gray-950">
            <iframe
              src={project.liveUrl}
              title={`Interactive Preview of ${project.title}`}
              className="w-full h-full border-0 bg-white dark:bg-gray-900 pointer-events-auto"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </motion.div>
      </div>,
      document.body
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors duration-300 flex flex-col h-full"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
    >
      {/* Media Container - Aspect Video */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
        
        {/* Iframe Layer */}
        {showIframe && !isTouchDevice && (
          <div className="absolute inset-0 z-20 animate-in fade-in duration-500 bg-white dark:bg-gray-900">
            {isVideoLoading && (
               <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-portfolio-gold" />
               </div>
            )}
            <iframe
              src={project.liveUrl}
              title={`Preview of ${project.title}`}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
              onLoad={() => setIsVideoLoading(false)}
            />
            
            {/* Elegant glassmorphic hover overlay to trigger full interactive preview modal */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center z-30 opacity-0 group-hover:opacity-100 p-4 text-center">
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="px-5 py-2.5 bg-portfolio-gold text-portfolio-dark font-black text-xs uppercase tracking-wider rounded-lg shadow-[4px_4px_0px_0px_rgba(33,33,33,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer hover:scale-105"
               >
                 Launch Live Preview
               </button>
               <p className="text-[10px] text-white/90 font-medium tracking-wide mt-2 drop-shadow-md select-none">
                 Interact with full scrolling, forms, & login
               </p>
            </div>
          </div>
        )}

        {/* Thumbnail Layer */}
        <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${showIframe ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             
             {/* Hover Overlay (only visible when iframe is NOT showing and NOT touch) */}
             <div className={`absolute inset-0 bg-portfolio-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center pointer-events-none`}>
                {!showIframe && (
                  <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs font-bold uppercase tracking-wider text-portfolio-dark dark:text-portfolio-light backdrop-blur-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {isTouchDevice ? 'Tap links below' : 'Hover to Preview'}
                  </span>
                )}
             </div>

             <img 
                src={project.thumbnailUrl} 
                alt={project.title} 
                className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-700 bg-white dark:bg-gray-800" 
             />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-30 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-start mb-3">
             <h3 className="text-xl md:text-2xl font-bold text-portfolio-dark dark:text-portfolio-light group-hover:text-portfolio-gold transition-colors">
                {project.title}
             </h3>
             <div className="flex gap-2 shrink-0">
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-portfolio-gold hover:bg-portfolio-gold/10 rounded-full transition-all" title="Live Demo">
                        <ExternalLink size={20} />
                    </a>
                )}
                {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-portfolio-gold hover:bg-portfolio-gold/10 rounded-full transition-all" title="GitHub Repo">
                        <Github size={20} />
                    </a>
                )}
             </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm flex-grow leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
                <span key={tag} className="text-[10px] md:text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded uppercase tracking-wide">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      {/* Interactive Browser Modal Portal */}
      {renderModal()}
    </motion.div>
  );
};

export default ProjectCard;
