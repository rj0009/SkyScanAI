import type React from 'react';

export interface BoundingBox {
  x: number; // top-left x (0-1, normalized)
  y: number; // top-left y (0-1, normalized)
  width: number; // width (0-1, normalized)
  height: number; // height (0-1, normalized)
}

export interface DetectionEvent {
  time: string;
  description: string;
  type: 'info' | 'warning' | 'alert';
  box?: BoundingBox;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  prompt: string;
  mockData: {
    metrics: { name: string; value: number }[];
    events: DetectionEvent[];
  };
}

export interface AnalysisResult {
  report: string;
  metrics: { name: string; value: number }[];
  events: DetectionEvent[];
}
