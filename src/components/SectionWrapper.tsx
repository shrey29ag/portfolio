'use client';
import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
}

const SectionWrapper = ({ id, className = "", children }: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-20 px-4 md:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto h-full">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
