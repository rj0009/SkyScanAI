import React from 'react';
import type { Scenario } from '../types';
import { LogoIcon } from './IconComponents';

interface SidebarProps {
  scenarios: Scenario[];
  selectedScenario: Scenario;
  setSelectedScenario: (scenario: Scenario) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ scenarios, selectedScenario, setSelectedScenario }) => {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-brand-secondary border-r border-brand-border">
      <div className="flex items-center justify-center h-20 border-b border-brand-border">
        <LogoIcon className="h-8 w-8 text-brand-accent" />
        <h1 className="text-xl font-bold ml-3 text-brand-text-primary">SkyScan AI</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario)}
            className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors duration-200 ${
              selectedScenario.id === scenario.id
                ? 'bg-brand-accent text-white'
                : 'text-brand-text-secondary hover:bg-brand-border hover:text-brand-text-primary'
            }`}
          >
            <scenario.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <span>{scenario.name}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-brand-border">
         <p className="text-xs text-brand-text-secondary text-center">© 2024 SkyScan AI. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
