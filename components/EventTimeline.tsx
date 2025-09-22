
import React from 'react';
import { InfoIcon, WarningIcon, AlertIcon } from './IconComponents';

interface Event {
  time: string;
  description: string;
  type: 'info' | 'warning' | 'alert';
}

interface EventTimelineProps {
  events: Event[];
}

const eventTypeStyles = {
  info: {
    icon: InfoIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/30',
  },
  warning: {
    icon: WarningIcon,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/30',
  },
  alert: {
    icon: AlertIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-900/30',
  },
};

const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => {
          const { icon: Icon, color, bgColor } = eventTypeStyles[event.type];
          return (
            <li key={eventIdx}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-brand-border" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center ring-8 ring-brand-secondary`}>
                      <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-brand-text-secondary">{event.description}</p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-brand-text-secondary">
                      <time>{event.time}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventTimeline;
