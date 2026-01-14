'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Zap, Wrench, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: Code2,
            skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Vite", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap", "Framer Motion"]
        },
        {
            title: "Backend Development",
            icon: Server,
            skills: ["Node.js", "Express.js", "RESTful APIs", "JWT", "OAuth", "Microservices"]
        },
        {
            title: "Database & Storage",
            icon: Database,
            skills: ["MongoDB", "Mongoose", "PostgreSQL", "Firebase", "Redis"]
        },
        {
            title: "Real-Time & Advanced",
            icon: Zap,
            skills: ["WebSockets", "Socket.io", "Real-time Event Handling", "Server-Sent Events"]
        },
        {
            title: "Tools & Platforms",
            icon: Wrench,
            skills: ["Git", "GitHub", "Postman", "npm / yarn", "Docker", "Vercel", "Netlify", "Render"]
        },
        {
            title: "Soft Skills",
            icon: Users,
            skills: ["Problem-solving", "Analytical Thinking", "Clean Code", "Team Collaboration", "Agile / Scrum"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <SectionWrapper id="skills" className="bg-gray-50 dark:bg-transparent border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
        <SectionHeading title="Technical Proficiency" subtitle="What I Do" center />
        
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
            {skillCategories.map((category, index) => (
                <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-b-4 border-transparent hover:border-portfolio-gold transition-all duration-300 group"
                >
                    <div className="bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-portfolio-dark dark:text-portfolio-gold group-hover:bg-portfolio-gold group-hover:text-portfolio-dark transition-colors">
                        <category.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-portfolio-dark dark:text-portfolio-light">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, idx) => (
                            <span 
                                key={idx} 
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium border border-gray-200 dark:border-gray-600"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </SectionWrapper>
  );
};

export default Skills;

