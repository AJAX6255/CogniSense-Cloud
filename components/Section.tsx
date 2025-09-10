
import React from 'react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  return (
    <section className="mb-16 bg-white p-8 rounded-xl shadow-lg animate-fade-in-up border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-brand-primary/10 p-3 rounded-full mr-4">
            {icon}
        </div>
        <h2 className="text-4xl font-bold text-brand-dark tracking-tight">{title}</h2>
      </div>
      <div className="pl-4 border-l-4 border-brand-accent/50">
        {children}
      </div>
    </section>
  );
};

export default Section;
