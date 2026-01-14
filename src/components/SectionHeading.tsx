'use client';
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  light?: boolean;
  center?: boolean;
}

const SectionHeading = ({ title, subtitle, light = false, center = false }: SectionHeadingProps) => {
  return (
    <div className={`mb-16 ${center ? 'text-center flex flex-col items-center' : ''}`}>
      <span className={`text-xs md:text-sm font-bold tracking-[0.3em] uppercase block mb-3 ${light ? 'text-portfolio-gold' : 'text-gray-500 dark:text-gray-400'}`}>
        {subtitle}
      </span>
      <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight ${light ? 'text-white' : 'text-portfolio-dark dark:text-portfolio-light'}`}>
        {title}
      </h2>
      <div className={`mt-6 w-20 h-1.5 ${light ? 'bg-portfolio-gold' : 'bg-portfolio-gold'} rounded-full`}></div>
    </div>
  );
};

export default SectionHeading;
