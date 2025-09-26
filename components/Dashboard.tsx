import React, { useState, useCallback, useEffect } from 'react';
import type { Scenario, AnalysisResult } from '../types';
import VideoUpload from './VideoUpload';
import AnalysisResults from './AnalysisResults';
import { ReportGenerator } from './ReportGenerator';
import { generateAnalysisReport } from '../services/geminiService';

interface DashboardProps {
  scenario: Scenario;
}

const Dashboard: React.FC<DashboardProps> = ({ scenario }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup video URL when component unmounts or scenario changes
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleFileSelect = (file: File | null) => {
    setVideoFile(file);
    setAnalysisResult(null);
    setError(null);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);
    
    try {
      const result = await generateAnalysisReport(scenario.prompt, videoFile.name);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to generate report. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [videoFile, scenario.prompt]);
  
  return (
    <div className="space-y-6">
      <header className="pb-4 border-b border-brand-border">
        <h2 className="text-3xl font-bold text-brand-text-primary">{scenario.name}</h2>
        <p className="text-md text-brand-text-secondary mt-1">{scenario.description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <VideoUpload 
            onFileSelect={handleFileSelect} 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
            videoFile={videoFile}
            videoUrl={videoUrl}
            analysisResult={analysisResult}
          />
          <ReportGenerator 
            isLoading={isAnalyzing}
            report={analysisResult?.report ?? null}
            error={error}
          />
        </div>
        <div className="lg:col-span-2">
            <AnalysisResults scenario={scenario} analysisResult={analysisResult} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
