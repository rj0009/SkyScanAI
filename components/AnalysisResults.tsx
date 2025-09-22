
import React from 'react';
import type { Scenario } from '../types';
import MetricsChart from './MetricsChart';
import EventTimeline from './EventTimeline';
import { MapPinIcon } from './IconComponents';

interface AnalysisResultsProps {
  scenario: Scenario;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ scenario }) => {
  return (
    <div className="space-y-6">
      <div className="bg-brand-secondary rounded-xl border border-brand-border p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-brand-text-primary mb-4">Key Metrics</h3>
        <MetricsChart data={scenario.mockData.metrics} />
      </div>

      <div className="bg-brand-secondary rounded-xl border border-brand-border p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-brand-text-primary mb-4">Geospatial Overview</h3>
        <div className="aspect-video bg-brand-primary rounded-lg border border-brand-border flex items-center justify-center overflow-hidden relative">
          <img src={`https://picsum.photos/seed/${scenario.id}/600/400`} alt="Geospatial Map" className="w-full h-full object-cover opacity-50" />
           <div className="absolute inset-0 flex items-center justify-center">
                <MapPinIcon className="h-10 w-10 text-red-500 animate-pulse" />
           </div>
           <p className="absolute bottom-2 left-3 text-xs text-white bg-black/50 px-2 py-1 rounded">Mock Location Data</p>
        </div>
      </div>
      
       <div className="bg-brand-secondary rounded-xl border border-brand-border p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-brand-text-primary mb-4">Event Timeline</h3>
        <EventTimeline events={scenario.mockData.events} />
      </div>
    </div>
  );
};

export default AnalysisResults;
