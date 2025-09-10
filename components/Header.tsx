
import React from 'react';
import { BeakerIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-primary p-2 rounded-full">
            <BeakerIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-primary">CogniSense-Cloud</h1>
            <p className="text-md text-brand-muted">A Technical & Clinical Blueprint by CogArchitect-MM</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
