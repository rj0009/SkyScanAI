
import React from 'react';

interface ReportGeneratorProps {
  isLoading: boolean;
  report: string | null;
  error: string | null;
}

const ReportSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-brand-border rounded w-1/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-brand-border rounded w-full"></div>
      <div className="h-3 bg-brand-border rounded w-5/6"></div>
      <div className="h-3 bg-brand-border rounded w-full"></div>
    </div>
    <div className="h-4 bg-brand-border rounded w-1/3 pt-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-brand-border rounded w-full"></div>
      <div className="h-3 bg-brand-border rounded w-3/4"></div>
    </div>
  </div>
);

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ isLoading, report, error }) => {
  const formatReport = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.match(/^\d+\./)) {
        return <p key={index} className="mb-2 pl-4">{paragraph}</p>;
      }
      if (paragraph.trim().length === 0) {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2">{paragraph}</p>;
    });
  };

  return (
    <div className="bg-brand-secondary rounded-xl border border-brand-border p-6 shadow-lg min-h-[300px]">
      <h3 className="text-lg font-semibold text-brand-text-primary mb-4">AI Generated Report</h3>
      <div className="text-sm text-brand-text-secondary leading-relaxed">
        {isLoading && <ReportSkeleton />}
        {error && <div className="text-red-400 bg-red-900/20 border border-red-400/50 rounded-lg p-4">{error}</div>}
        {!isLoading && !error && !report && (
          <div className="text-center py-10">
            <p>Upload a video and click "Analyze" to generate a report.</p>
          </div>
        )}
        {report && <div className="prose prose-sm prose-invert max-w-none">{formatReport(report)}</div>}
      </div>
    </div>
  );
};
