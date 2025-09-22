
import type React from 'react';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  prompt: string;
  mockData: {
    metrics: { name: string; value: number }[];
    events: { time: string; description: string; type: 'info' | 'warning' | 'alert' }[];
  };
}

export interface AnalysisResult {
  report: string;
  metrics: { name: string; value: number }[];
  events: { time: string; description: string; type: 'info' | 'warning' | 'alert' }[];
}
