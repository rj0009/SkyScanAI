import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import type { Scenario } from './types';
import { SCENARIOS } from './constants';

const App: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <div className="flex h-screen bg-brand-primary font-sans">
      <Sidebar 
        scenarios={SCENARIOS} 
        selectedScenario={selectedScenario} 
        setSelectedScenario={setSelectedScenario} 
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Dashboard key={selectedScenario.id} scenario={selectedScenario} />
      </main>
    </div>
  );
};

export default App;