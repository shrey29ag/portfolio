'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
              onLoad={() => setIsVideoLoading(false)}
            />
            {/* Overlay to allow clicking through to details if needed, or keeping interactions restricted */}
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
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
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
    </motion.div>
  );
};

export default ProjectCard;
