
import React, { useRef, useState, useEffect } from 'react';
import { UploadIcon, PlayIcon, AnalyzeIcon, LoadingIcon } from './IconComponents';
import type { AnalysisResult } from '../types';


interface VideoUploadProps {
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  videoFile: File | null;
  videoUrl: string | null;
  analysisResult: AnalysisResult | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileSelect, onAnalyze, isAnalyzing, videoFile, videoUrl, analysisResult }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setCurrentTime(0);
    // When a new video is loaded, reset its time
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
    }
  }, [videoUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const timeToSeconds = (timeStr: string): number => {
    if (!timeStr || !timeStr.includes(':')) return -1;
    const parts = timeStr.split(':');
    if (parts.length !== 2) return -1;
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (isNaN(minutes) || isNaN(seconds)) return -1;
    return minutes * 60 + seconds;
  };


  return (
    <div className="bg-brand-secondary rounded-xl border border-brand-border p-6 shadow-lg">
       <div className="relative aspect-video bg-brand-primary rounded-lg mb-4 border border-brand-border flex items-center justify-center overflow-hidden">
        {videoUrl ? (
          <video 
            ref={videoRef}
            src={videoUrl} 
            controls 
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            >
          </video>
        ) : (
          <div className="text-center text-brand-text-secondary">
            <PlayIcon className="h-16 w-16 mx-auto" />
            <p className="mt-2">Video preview will appear here</p>
          </div>
        )}
        {analysisResult && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {analysisResult.events.filter(e => e.box).map((event, index) => {
                const eventTimeInSeconds = timeToSeconds(event.time);
                // Show the box for 3 seconds starting from the event time
                const isVisible = eventTimeInSeconds !== -1 && currentTime >= eventTimeInSeconds && currentTime < eventTimeInSeconds + 3;

                if (!isVisible) {
                    return null;
                }

                const box = event.box!;
                const boxColor = event.type === 'alert' ? '#EF4444' : event.type === 'warning' ? '#F59E0B' : '#3B82F6';
                
                const style: React.CSSProperties = {
                  position: 'absolute',
                  left: `${box.x * 100}%`,
                  top: `${box.y * 100}%`,
                  width: `${box.width * 100}%`,
                  height: `${box.height * 100}%`,
                  border: `2px solid ${boxColor}`,
                  borderRadius: '4px',
                  boxShadow: `0 0 8px ${boxColor}aa`,
                  transition: 'opacity 0.2s ease-in-out',
                  opacity: isVisible ? 1 : 0,
                };
                
                const labelStyle: React.CSSProperties = {
                    position: 'absolute',
                    top: 0,
                    left: '-2px',
                    transform: 'translateY(-100%)',
                    backgroundColor: boxColor,
                    color: '#ffffff',
                    padding: '2px 6px',
                    fontSize: '10px',
                    fontWeight: '600',
                    borderRadius: '4px 4px 0 0',
                    whiteSpace: 'nowrap',
                    textShadow: '1px 1px 1px #00000088'
                };

                return (
                  <div key={index} style={style}>
                    <span style={labelStyle}>{event.description}</span>
                  </div>
                );
              })}
            </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="w-full sm:w-auto flex-grow flex items-center justify-center px-4 py-2 bg-brand-border text-brand-text-primary rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <UploadIcon className="h-5 w-5 mr-2" />
          {videoFile ? videoFile.name : 'Upload Drone Footage'}
        </button>
        <button
          onClick={onAnalyze}
          disabled={!videoFile || isAnalyzing}
          className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center px-6 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <LoadingIcon className="animate-spin h-5 w-5 mr-2" />
              Analyzing...
            </>
          ) : (
             <>
              <AnalyzeIcon className="h-5 w-5 mr-2" />
              Analyze
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
