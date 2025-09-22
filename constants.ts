
import type { Scenario } from './types';
import { ShipIcon, HardHatIcon, WindIcon, BoxIcon } from './components/IconComponents';

export const SCENARIOS: Scenario[] = [
  {
    id: 'vessel-inspection',
    name: 'Vessel Inspection',
    description: 'Analyze drone footage for hull corrosion, structural integrity, and equipment status.',
    icon: ShipIcon,
    prompt: `
      You are SkyScan AI, an advanced drone footage analysis system.
      Based on the uploaded video for a "Vessel Inspection" scenario, generate a detailed inspection report.
      The report should include:
      1. A concise summary of the vessel's condition.
      2. A list of key findings (e.g., corrosion, fouling, structural anomalies) with mock timestamps.
      3. A set of actionable recommendations (e.g., "Recommend cleaning and re-inspection within 3 months.").
      Format the output as clear, human-readable text.
    `,
    mockData: {
      metrics: [
        { name: 'Corrosion', value: 28 },
        { name: 'Fouling', value: 45 },
        { name: 'Structural Anomaly', value: 5 },
        { name: 'Overall Integrity', value: 85 },
      ],
      events: [
        { time: '01:12', description: 'Minor corrosion detected on starboard bow.', type: 'info' },
        { time: '03:45', description: 'Moderate fouling observed on port hull.', type: 'warning' },
        { time: '07:21', description: 'Potential stress fracture near Frame 150.', type: 'alert' },
        { time: '10:05', description: 'Propeller appears to be in good condition.', type: 'info' },
      ],
    },
  },
  {
    id: 'worksite-inspection',
    name: 'Worksite Inspection',
    description: 'Monitor worksites for safety compliance, PPE usage, and operational efficiency.',
    icon: HardHatIcon,
    prompt: `
      You are SkyScan AI, an advanced drone footage analysis system.
      Based on the uploaded video for a "Worksite Inspection" scenario (e.g., Tuas Port reclamation), generate a detailed safety and progress report.
      The report should include:
      1. An overall safety compliance summary.
      2. A list of observed events, noting any PPE violations or hazardous conditions with mock timestamps.
      3. An assessment of work progress (e.g., material movement, land settling).
      4. Recommendations for improving safety and efficiency.
      Format the output as clear, human-readable text.
    `,
    mockData: {
      metrics: [
        { name: 'PPE Compliance', value: 92 },
        { name: 'Hazard Zones', value: 3 },
        { name: 'Equipment Utilization', value: 78 },
        { name: 'Progress vs. Plan', value: 95 },
      ],
      events: [
        { time: '02:30', description: 'Worker in Sector B without a hard hat.', type: 'alert' },
        { time: '05:15', description: 'Excavator activity detected in Zone 3.', type: 'info' },
        { time: '06:40', description: 'Safety cone barrier appears to be moved.', type: 'warning' },
        { time: '11:20', description: 'New fill material observed in Zone 4.', type: 'info' },
      ],
    },
  },
  {
    id: 'environmental-monitoring',
    name: 'Environmental Monitoring',
    description: 'Track emission plumes, water quality, and changes in the local ecosystem.',
    icon: WindIcon,
    prompt: `
      You are SkyScan AI, an advanced drone footage analysis system.
      Based on the uploaded video for an "Environmental Monitoring" scenario, generate a detailed environmental impact report.
      The report should include:
      1. A summary of environmental observations.
      2. Detection of any emission plumes, specifying their duration and potential source with mock timestamps.
      3. Analysis of water surface for any signs of pollution or thermal anomalies.
      4. Recommendations for further investigation or mitigation actions.
      Format the output as clear, human-readable text.
    `,
    mockData: {
      metrics: [
        { name: 'Air Quality Index', value: 65 },
        { name: 'Water Turbidity', value: 30 },
        { name: 'Thermal Anomaly', value: 12 },
        { name: 'Vegetation Health', value: 88 },
      ],
      events: [
        { time: '00:55', description: 'Emission plume detected from stack A.', type: 'warning' },
        { time: '04:18', description: 'Plume lasted for over 2 minutes.', type: 'alert' },
        { time: '08:02', description: 'Slight discoloration noted in water outflow channel.', type: 'warning' },
        { time: '12:45', description: 'No significant changes in shoreline vegetation.', type: 'info' },
      ],
    },
  },
    {
    id: 'parcel-delivery',
    name: 'Drone Parcel Delivery',
    description: 'Monitor drone delivery routes for obstacles, safety, and delivery confirmation.',
    icon: BoxIcon,
    prompt: `
      You are SkyScan AI, an advanced drone footage analysis system.
      Based on the uploaded video for a "Drone Parcel Delivery" scenario, generate a flight and delivery log.
      The report should include:
      1. A summary of the flight from takeoff to landing.
      2. A log of any detected obstacles or deviations from the planned flight path, with mock timestamps.
      3. Confirmation of package delivery at the target location.
      4. Any safety or efficiency recommendations for future flights.
      Format the output as clear, human-readable text.
    `,
    mockData: {
      metrics: [
        { name: 'Path Adherence', value: 99 },
        { name: 'Obstacles Detected', value: 1 },
        { name: 'Delivery Success', value: 100 },
        { name: 'Flight Efficiency', value: 97 },
      ],
      events: [
        { time: '00:00', description: 'Drone takeoff initiated.', type: 'info' },
        { time: '02:10', description: 'Flight path deviation to avoid flock of birds.', type: 'warning' },
        { time: '04:35', description: 'Package successfully delivered to coordinates.', type: 'info' },
        { time: '05:50', description: 'Drone returned to base and landed.', type: 'info' },
      ],
    },
  },
];
