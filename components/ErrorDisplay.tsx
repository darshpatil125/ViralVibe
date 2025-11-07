import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="w-full p-4 text-center bg-red-500/10 text-red-300 border border-red-500/30 rounded-lg">
    <p className="font-semibold text-red-200">Oops! Something went wrong.</p>
    <p className="text-sm">{message}</p>
  </div>
);