
import React from 'react';
import { ArrowLongRightIcon, CloudIcon, ComputerDesktopIcon, CircleStackIcon, CpuChipIcon, ShieldCheckIcon } from './Icons';

const ArchBox: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; className?: string }> = ({ title, subtitle, icon, className }) => (
  <div className={`bg-white p-4 rounded-lg shadow-md border flex flex-col items-center text-center ${className}`}>
    <div className="mb-2">{icon}</div>
    <h4 className="font-bold text-brand-primary">{title}</h4>
    <p className="text-xs text-brand-muted">{subtitle}</p>
  </div>
);

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="my-8 p-6 bg-brand-light rounded-xl border border-gray-200">
      <h3 className="text-2xl font-semibold text-brand-dark text-center mb-6">Proposed System Architecture</h3>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Client */}
        <ArchBox title="Frontend Client" subtitle="React / Flutter for Web" icon={<ComputerDesktopIcon className="h-8 w-8 text-brand-secondary"/>} />
        
        <ArrowLongRightIcon className="h-8 w-8 text-brand-muted hidden md:block" />
        <ArrowLongRightIcon className="h-8 w-8 text-brand-muted rotate-90 md:hidden" />
        
        {/* Gateway & Services */}
        <div className="flex flex-col space-y-4">
          <ArchBox title="API Gateway" subtitle="e.g., AWS API Gateway" icon={<ShieldCheckIcon className="h-8 w-8 text-green-500" />} />
          <div className="flex space-x-2">
            <div className="flex-1 text-center bg-blue-100 p-2 rounded-lg text-sm text-blue-800">Task Delivery Service</div>
            <div className="flex-1 text-center bg-blue-100 p-2 rounded-lg text-sm text-blue-800">Data Ingestion Service</div>
            <div className="flex-1 text-center bg-blue-100 p-2 rounded-lg text-sm text-blue-800">Inference Service</div>
          </div>
        </div>

        <ArrowLongRightIcon className="h-8 w-8 text-brand-muted hidden md:block" />
        <ArrowLongRightIcon className="h-8 w-8 text-brand-muted rotate-90 md:hidden" />

        {/* Backend Infrastructure */}
        <div className="flex flex-col space-y-4">
          <ArchBox title="Cloud Services" subtitle="GCP / AWS / Azure" icon={<CloudIcon className="h-8 w-8 text-brand-accent"/>} />
          <div className="grid grid-cols-2 gap-2">
            <ArchBox title="Data Lake" subtitle="S3 / GCS" icon={<CircleStackIcon className="h-6 w-6 text-yellow-500" />} className="col-span-1" />
            <ArchBox title="MLOps Pipeline" subtitle="SageMaker / Vertex AI" icon={<CpuChipIcon className="h-6 w-6 text-purple-500" />} className="col-span-1" />
            <div className="col-span-2 text-center bg-indigo-100 p-2 rounded-lg text-sm text-indigo-800">Processed Database (e.g., PostgreSQL)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
