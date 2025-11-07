import React from 'react';

export const Loader = () => (
  <div className="flex flex-col items-center justify-center space-y-2">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
    <span className="text-slate-300">AI is thinking...</span>
  </div>
);