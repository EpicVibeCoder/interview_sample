import React from "react";

interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#BD1F17] text-white">
      <div className="mb-4 text-6xl font-bebas-neue tracking-wider">
        {Math.round(progress)}%
      </div>
      <div className="h-2 w-64 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full bg-yellow-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 animate-pulse font-roboto text-sm tracking-widest opacity-80">
        PREPARING AUTHENTIC EXPERIENCE...
      </div>
    </div>
  );
};

export default LoadingScreen;
