
import React from 'react';
import Header from './components/Header';
import Section from './components/Section';
import Card from './components/Card';
import CodeBlock from './components/CodeBlock';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import { BLUEPRINT_DATA } from './constants';
import { CheckCircleIcon, ShieldCheckIcon, BeakerIcon, LightBulbIcon, ServerStackIcon, CircleStackIcon, ScaleIcon, CodeBracketIcon, ChartBarIcon, EyeIcon, UserGroupIcon, GlobeAltIcon, LockClosedIcon } from './components/Icons';

const App: React.FC = () => {

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LightBulbIcon': return <LightBulbIcon className="h-6 w-6 text-brand-secondary" />;
      case 'CheckCircleIcon': return <CheckCircleIcon className="h-6 w-6 text-brand-accent" />;
      case 'ShieldCheckIcon': return <ShieldCheckIcon className="h-6 w-6 text-brand-secondary" />;
      case 'BeakerIcon': return <BeakerIcon className="h-6 w-6 text-brand-accent" />;
      case 'ServerStackIcon': return <ServerStackIcon className="h-8 w-8 text-brand-primary" />;
      case 'CircleStackIcon': return <CircleStackIcon className="h-8 w-8 text-brand-primary" />;
      case 'ScaleIcon': return <ScaleIcon className="h-8 w-8 text-brand-primary" />;
      case 'CodeBracketIcon': return <CodeBracketIcon className="h-8 w-8 text-brand-primary" />;
      case 'ChartBarIcon': return <ChartBarIcon className="h-8 w-8 text-brand-primary" />;
      case 'EyeIcon': return <EyeIcon className="h-8 w-8 text-brand-primary" />;
      case 'UserGroupIcon': return <UserGroupIcon className="h-6 w-6 text-brand-secondary" />;
      case 'GlobeAltIcon': return <GlobeAltIcon className="h-6 w-6 text-brand-secondary" />;
      case 'LockClosedIcon': return <LockClosedIcon className="h-6 w-6 text-brand-secondary" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {BLUEPRINT_DATA.map((section, index) => (
          <Section key={index} title={section.title} icon={getIcon(section.icon)}>
            {section.id === 'architecture' && <ArchitectureDiagram />}
            {section.content?.map((item, itemIdx) => (
              <div key={itemIdx} className="mb-8 last:mb-0">
                <h3 className="text-2xl font-semibold text-brand-dark mb-4">{item.subtitle}</h3>
                {Array.isArray(item.description) ? (
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {item.description.map((line, lineIdx) => <li key={lineIdx}>{line}</li>)}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                )}
                
                {item.cards && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.cards.map((card, cardIdx) => (
                      <Card key={cardIdx} title={card.title} icon={getIcon(card.icon)}>
                        <p className="text-brand-muted">{card.text}</p>
                      </Card>
                    ))}
                  </div>
                )}

                {item.details && (
                   <div className="mt-6 space-y-6">
                    {item.details.map((detail, detailIdx) => (
                       <div key={detailIdx} className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-bold text-brand-primary">{detail.title}</h4>
                          <p className="text-gray-600 mt-1">{detail.text}</p>
                       </div>
                    ))}
                   </div>
                )}

                {item.codeBlock && (
                  <div className="mt-6">
                    <CodeBlock title={item.codeBlock.title} language="json" code={item.codeBlock.code} />
                  </div>
                )}
              </div>
            ))}
          </Section>
        ))}

        {/* Disclaimer Section */}
        <div className="mt-16 animate-fade-in-up">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-r-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Regulatory Disclaimer & Important Notice
                </h3>
                <p className="font-semibold">
                    This blueprint is for research and prototyping purposes only. It is not intended for clinical use.
                </p>
                <p className="mt-1 text-sm">
                    Deployment of any application based on this design requires rigorous, independent clinical validation, adherence to all applicable data privacy laws (e.g., HIPAA, GDPR), and obtaining the necessary regulatory approvals from bodies such as the FDA or a CE Mark.
                </p>
            </div>
        </div>
      </main>
      <footer className="text-center py-6 bg-white border-t border-gray-200">
        <p className="text-brand-muted text-sm">&copy; {new Date().getFullYear()} CogArchitect-MM. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
