'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

const Projects = () => {
  const projects = [
    {
      title: "Namo",
      description: "A real-time video communication application with screen sharing, chat, and secure room management capabilities.",
      tags: ["React", "WebRTC", "Socket.io", "Node.js"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      links: { demo: "https://namo.shreyagrawal.com", repo: "https://github.com/shrey29ag/namo" }
    },
    {
      title: "GigFlow",
      description: "A comprehensive trading dashboard featuring real-time stock data visualization, secure user authentication, and transaction history.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Firebase"],
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1000&auto=format&fit=crop",
      links: { demo: "https://gigflow-rust.vercel.app/", repo: "https://github.com/shrey29ag/gigflow" }
    },
    {
      title: "Housing & Travel App",
      description: "A booking and listing platform for travelers to find accommodation. Features map integration and booking management.",
      tags: ["MERN Stack", "Google Maps API", "Redux"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
      links: { demo: "#", repo: "#" }
    },
    {
      title: "AI Chatbot Application",
      description: "An intelligent conversational agent powered by NLP to assist users with common queries efficiently.",
      tags: ["Python", "OpenAI API", "React", "Flask"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop",
      links: { demo: "#", repo: "#" }
    }
  ];

  return (
    <SectionWrapper id="projects" className="bg-white dark:bg-transparent">
      <SectionHeading title="Featured Projects" subtitle="My Portfolio" center />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          >
            {/* Image Overlay */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-portfolio-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-4">
                    <a href={project.links.demo} className="p-3 bg-portfolio-gold text-portfolio-dark rounded-full hover:scale-110 transition-transform">
                        <ExternalLink size={24} />
                    </a>
                    <a href={project.links.repo} className="p-3 bg-white text-portfolio-dark rounded-full hover:scale-110 transition-transform">
                        <Github size={24} />
                    </a>
                </div>
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
            </div>
            
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-portfolio-dark dark:text-portfolio-light group-hover:text-portfolio-gold transition-colors">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded uppercase tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
