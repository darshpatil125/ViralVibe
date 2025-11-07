
import React from 'react';

export interface SocialPlatform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type Content = 
  | { type: 'text'; value: string }
  | { type: 'image'; value: File }
  | { type: 'video'; value: File };

export interface CaptionOption {
  hook: string;
  value: string;
  cta: string;
}

export interface Suggestions {
  contentAnalysis: string;
  captionOptions: CaptionOption[];
  hashtags: string[];
  postingSuggestion: string;
  bestPractices: string[];
  styleNotes: string[];
  readyToPost: {
    caption: string;
    hashtags: string;
  };
}

export type ContentInput = {
    type: 'text' | 'image' | 'video';
    value: string;
    mimeType?: string;
}
