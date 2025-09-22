
import React, { useRef } from 'react';
import { UploadIcon, PlayIcon, AnalyzeIcon, LoadingIcon } from './IconComponents';

interface VideoUploadProps {
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  videoFile: File | null;
  videoUrl: string | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileSelect, onAnalyze, isAnalyzing, videoFile, videoUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-brand-secondary rounded-xl border border-brand-border p-6 shadow-lg">
       <div className="aspect-video bg-brand-primary rounded-lg mb-4 border border-brand-border flex items-center justify-center overflow-hidden">
        {videoUrl ? (
          <video src={videoUrl} controls className="w-full h-full object-cover"></video>
        ) : (
          <div className="text-center text-brand-text-secondary">
            <PlayIcon className="h-16 w-16 mx-auto" />
            <p className="mt-2">Video preview will appear here</p>
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
