import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center p-12">
      <div className="relative">
        <div className="h-20 w-20 border-8 border-black bg-yellow-400 shadow-neo-lg animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-12 w-12 border-8 border-black bg-pink-400"></div>
        </div>
      </div>
      <p className="mt-6 text-xl font-black uppercase tracking-wider">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
