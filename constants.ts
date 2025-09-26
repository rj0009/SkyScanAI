import type { Scenario } from './types';
import { PollutionIcon, FlotsamIcon, LifeVestIcon, BuoyIcon, IllegalIcon, ARIcon } from './components/IconComponents';

export const SCENARIOS: Scenario[] = [
  {
    id: 'pollution-monitoring',
    name: 'Pollution Monitoring',
    description: 'Detect and analyze black smoke emissions from vessels and potential oil spills on the water surface.',
    icon: PollutionIcon,
    prompt: `
      You are SkyScan AI, a maritime drone footage analysis system.
      Based on the uploaded video for a "Pollution Monitoring" scenario, generate a detailed report, key metrics, and a list of timestamped events.
      Identify any vessels emitting excessive black smoke or any visual evidence of oil spills.
      For each detection, provide a bounding box.
    `,
    mockData: {
      metrics: [
        { name: 'Air Quality Impact', value: 78 },
        { name: 'Water Contamination', value: 45 },
        { name: 'Vessels Monitored', value: 12 },
      ],
      events: [
        { time: '01:30', description: 'Vessel (IMO 9876543) emitting dense black smoke.', type: 'alert', box: { x: 0.25, y: 0.3, width: 0.15, height: 0.2 } },
        { time: '04:55', description: 'Iridescent sheen on water surface, potential oil spill.', type: 'warning', box: { x: 0.5, y: 0.6, width: 0.25, height: 0.15 } },
        { time: '08:10', description: 'Vessel (IMO 1234567) operating with normal emissions.', type: 'info' },
      ],
    },
  },
  {
    id: 'flotsam-detection',
    name: 'Flotsam Detection',
    description: 'Identify and map floating debris and hazards to navigation in fairways and anchorages.',
    icon: FlotsamIcon,
    prompt: `
      You are SkyScan AI, a maritime drone footage analysis system.
      For this "Flotsam Detection" scenario, analyze the video to identify floating debris such as logs, containers, or other navigational hazards.
      Generate a report, relevant metrics, and a list of events with bounding boxes for each detected piece of flotsam.
    `,
    mockData: {
      metrics: [
        { name: 'Fairway Clearance', value: 85 },
        { name: 'Debris Count', value: 8 },
        { name: 'High-Risk Items', value: 1 },
      ],
      events: [
        { time: '02:15', description: 'Large wooden log detected.', type: 'warning', box: { x: 0.6, y: 0.5, width: 0.2, height: 0.05 } },
        { time: '06:40', description: 'Cluster of small plastic debris.', type: 'info', box: { x: 0.3, y: 0.7, width: 0.1, height: 0.1 } },
        { time: '10:05', description: 'Partially submerged container.', type: 'alert', box: { x: 0.1, y: 0.2, width: 0.15, height: 0.15 } },
      ],
    },
  },
  {
    id: 'sea-sports-safety',
    name: 'Sea Sports Safety',
    description: 'Monitor sea sports activities for safety compliance, focusing on life vest usage and safe distances.',
    icon: LifeVestIcon,
    prompt: `
      You are SkyScan AI, a maritime drone footage analysis system.
      In this "Sea Sports Safety" scenario, monitor participants in activities like kayaking or paddleboarding.
      Your analysis should verify if individuals are wearing life vests and maintain safe operating procedures.
      Generate a report, compliance metrics, and an event log. Provide bounding boxes for individuals without life vests.
    `,
    mockData: {
      metrics: [
        { name: 'Life Vest Compliance', value: 75 },
        { name: 'Participants Counted', value: 16 },
        { name: 'Safety Incidents', value: 2 },
      ],
      events: [
        { time: '03:20', description: 'Kayaker without a visible life vest.', type: 'alert', box: { x: 0.45, y: 0.55, width: 0.08, height: 0.12 } },
        { time: '07:00', description: 'Group of paddleboarders operating safely.', type: 'info' },
        { time: '09:45', description: 'Jet ski operating too close to swimmers.', type: 'warning' },
      ],
    },
  },
  {
    id: 'infrastructure-inspection',
    name: 'Infrastructure Inspection',
    description: 'Inspect aids-to-navigation (AToN), mooring buoys, and other fixed maritime infrastructure for damage or defects.',
    icon: BuoyIcon,
    prompt: `
      You are SkyScan AI, an infrastructure analysis system.
      For this "Infrastructure Inspection" scenario, analyze the footage of aids-to-navigation (e.g., buoys).
      Identify any structural damage, corrosion, or malfunctioning lights.
      Generate a detailed inspection report, condition metrics, and an event log with bounding boxes for any anomalies found.
    `,
    mockData: {
      metrics: [
        { name: 'Structural Integrity', value: 92 },
        { name: 'Corrosion Level', value: 15 },
        { name: 'AToN Inspected', value: 5 },
      ],
      events: [
        { time: '01:50', description: 'Minor corrosion on buoy #A3.', type: 'warning', box: { x: 0.5, y: 0.4, width: 0.1, height: 0.15 } },
        { time: '05:25', description: 'Buoy #A4 light appears functional.', type: 'info' },
        { time: '11:10', description: 'Significant marine growth on buoy #A5.', type: 'info', box: { x: 0.3, y: 0.6, width: 0.12, height: 0.1 } },
      ],
    },
  },
  {
    id: 'illegal-activity',
    name: 'Illegal Activity Detection',
    description: 'Detect unauthorized activities like illegal fishing, anchoring in restricted zones, or obstructing fairways.',
    icon: IllegalIcon,
    prompt: `
      You are SkyScan AI, a maritime security system.
      In this "Illegal Activity Detection" scenario, analyze the video for activities such as fishing in no-fishing zones or anchoring in fairways.
      Generate a security report, relevant metrics, and an event log, providing bounding boxes for vessels or persons of interest.
    `,
    mockData: {
      metrics: [
        { name: 'Compliance Score', value: 80 },
        { name: 'Anomalous Activities', value: 2 },
        { name: 'Vessels Tracked', value: 7 },
      ],
      events: [
        { time: '04:05', description: 'Vessel anchored in a restricted fairway.', type: 'alert', box: { x: 0.15, y: 0.25, width: 0.2, height: 0.15 } },
        { time: '08:50', description: 'Evidence of illegal net fishing from a small craft.', type: 'warning', box: { x: 0.7, y: 0.6, width: 0.15, height: 0.1 } },
        { time: '12:30', description: 'Ferry operating normally on its route.', type: 'info' },
      ],
    },
  },
  {
    id: 'ar-overlay',
    name: 'AR Vessel Data Overlay',
    description: 'Simulate an augmented reality overlay of vessel data (like AIS) over the live video stream.',
    icon: ARIcon,
    prompt: `
      You are SkyScan AI, a maritime data fusion system.
      For this "AR Overlay" scenario, identify all vessels in the video.
      For each vessel, generate mock AIS data (IMO number, name, speed, heading) and a bounding box.
      The report should summarize the traffic, with metrics on vessel count and types.
    `,
    mockData: {
      metrics: [
        { name: 'Vessels Identified', value: 4 },
        { name: 'Tankers', value: 1 },
        { name: 'Cargo Ships', value: 2 },
        { name: 'Tugboats', value: 1 },
      ],
      events: [
        { time: '00:30', description: 'Tanker "Neptune" | 12.5kn', type: 'info', box: { x: 0.1, y: 0.2, width: 0.3, height: 0.2 } },
        { time: '00:32', description: 'Cargo "Orion" | 8.2kn', type: 'info', box: { x: 0.5, y: 0.4, width: 0.4, height: 0.25 } },
        { time: '00:35', description: 'Tug "Titan" | 5.0kn', type: 'info', box: { x: 0.4, y: 0.3, width: 0.1, height: 0.08 } },
      ],
    },
  },
];
