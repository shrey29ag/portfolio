'use client';
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const highlights = [
    "Certified Full Stack Developer",
    "Fresher & Enthusiastic Learner",
    "Open Source Contributor",
    "Tech Speaker & Mentor"
  ];

  return (
    <SectionWrapper id="about" className="bg-white dark:bg-transparent">
      {/* Content Definitions for Reusability */}
      {(() => {
        const IntroText = () => (
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-light">
                I’m a passionate <span className="font-bold text-portfolio-dark dark:text-portfolio-light">Full Stack Web Developer</span> who enjoys building scalable and user-focused applications. 
                Driven by curiosity and a problem-solving mindset, I love turning complex ideas into clean, efficient, and impactful digital solutions.
            </p>
        );

        const DetailText = () => (
             <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-light">
                My goal is to use modern technologies to build impactful digital solutions. From developing robust backend systems to crafting intuitive frontend experiences, 
                I aim to deliver quality and excellence in every project I work on.
            </p>
        );

        const Highlights = () => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                {highlights.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="text-portfolio-gold shrink-0" size={20} />
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm lg:text-base">{item}</span>
                    </div>
                ))}
            </div>
        );

        const Quote = () => (
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-l-4 border-portfolio-gold rounded-r-lg transition-colors duration-300 text-left">
                <p className="italic text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                    "Analytical thinking and problem solving are more than just skills for me. They shape the way I approach challenges and opportunities. I strongly believe in continuous learning, constant improvement, and growing as a developer every day."
                </p>
            </div>
        );

        const ProfileImage = ({ className = "" }) => (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative ${className}`}
            >
                <div className="absolute inset-0 bg-portfolio-gold rounded-lg transform rotate-6 scale-95 opacity-20 -z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Working" 
                    className="rounded-lg shadow-xl w-full object-cover h-[300px] md:h-[400px] lg:h-[450px] grayscale hover:grayscale-0 transition-all duration-500" 
                />
            </motion.div>
        );

        return (
            <>
                {/* LARGE DESKTOP LAYOUT (XL+) - Side by Side */}
                <div className="hidden xl:grid grid-cols-2 gap-16 items-center">
                    <ProfileImage />
                    <div>
                        <SectionHeading title="About Me" subtitle="My Story" />
                        <IntroText />
                        <DetailText />
                        <Highlights />
                        <Quote />
                    </div>
                </div>

                {/* LAPTOP / TABLET / MOBILE LAYOUT (< XL) - Vertical Stack with Custom Order */}
                <div className="flex flex-col xl:hidden items-center text-center">
                    <SectionHeading title="About Me" subtitle="My Story" center />
                    
                    <div className="max-w-3xl mx-auto">
                        <IntroText />
                    </div>

                    <div className="w-full max-w-lg my-8">
                        <ProfileImage />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <DetailText />
                        <div className="flex justify-center md:justify-start">
                             <Highlights />
                        </div>
                        <Quote />
                    </div>
                </div>
            </>
        );
      })()}
    </SectionWrapper>
  );
};

export default About;

