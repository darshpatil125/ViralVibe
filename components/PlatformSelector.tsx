import React from 'react';
import { PLATFORMS } from '../constants';
import type { SocialPlatform } from '../types';

interface PlatformSelectorProps {
  selectedPlatform: SocialPlatform;
  onSelect: (platform: SocialPlatform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selectedPlatform, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {PLATFORMS.map((platform) => {
        const isSelected = platform.name === selectedPlatform.name;
        return (
          <button
            key={platform.name}
            onClick={() => onSelect(platform)}
            className={`flex flex-col items-center justify-center p-3 space-y-2 rounded-lg transition-all duration-200 border 
              ${isSelected
                ? 'bg-brand-primary/80 border-brand-primary text-white shadow-lg shadow-brand-primary/30'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-brand-primary/70 hover:text-white'
              }`}
          >
            <platform.icon className="w-8 h-8" />
            <span className="text-xs sm:text-sm font-medium text-center">{platform.name}</span>
          </button>
        );
      })}
    </div>
  );
};