'use client';
import React from 'react';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';
import ProjectCard, { Project } from './ProjectCard';
import { ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects: Project[] = [
    {
      title: "Namo",
      description: "A real-time video communication application with screen sharing, chat, and secure room management capabilities.",
      tags: ["React", "WebRTC", "Socket.io", "Node.js"],
      thumbnailUrl: "/namo_logo.svg",
      liveUrl: "https://namo.shreyagrawal.com",
      repoUrl: "https://github.com/shrey29ag/namo"
    },
    {
      title: "GigFlow",
      description: "A comprehensive trading dashboard featuring real-time stock data visualization, secure user authentication, and transaction history.",
      tags: ["MERN Stack", "JavaScript", "Tailwind CSS", "MongoDB"],
      thumbnailUrl: "/gigflow_logo.svg",
      liveUrl: "https://gigflow-rust.vercel.app/",
      repoUrl: "https://github.com/shrey29ag/gigflow"
    },
    {
      title: "Vantaya",
      description: "A modern travel booking platform designed for seamless exploration and unique stay experiences.",
      tags: ["MERN Stack", "Bootstrap", "Cloudinary", "Passport.js"],
      thumbnailUrl: "/compass.svg",
      liveUrl: "https://vantaya.shreyagrawal.com/",
      repoUrl: "https://github.com/shrey29ag/vantaya"
    }
  ];

  return (
    <SectionWrapper id="projects" className="bg-white dark:bg-transparent">
      <SectionHeading title="Featured Projects" subtitle="My Portfolio" center />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <a 
          href="https://github.com/shrey29ag" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-8 py-3 bg-portfolio-dark dark:bg-gray-800 text-white dark:text-portfolio-light border-2 border-transparent hover:border-portfolio-gold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-bold tracking-wide"
        >
          View More Projects
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </a>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
