
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:border-brand-secondary transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="text-lg font-semibold text-brand-dark ml-3">{title}</h4>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
