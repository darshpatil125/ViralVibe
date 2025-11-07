import React, { useState } from 'react';
import type { Suggestions } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface SuggestionsDisplayProps {
  suggestions: Suggestions;
}

const SuggestionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 h-full">
        <h3 className="text-lg font-semibold text-brand-primary mb-2">{title}</h3>
        <div className="text-slate-300 space-y-2">{children}</div>
    </div>
);

export const SuggestionsDisplay: React.FC<SuggestionsDisplayProps> = ({ suggestions }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${suggestions.readyToPost.caption}\n\n${suggestions.readyToPost.hashtags}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="w-full space-y-6 animate-fade-in text-left">
      <div className="bg-slate-700/50 p-5 rounded-xl relative border border-slate-600/50">
        <h3 className="text-xl font-bold text-slate-100 mb-3">Ready to Post</h3>
        <p className="text-slate-200 whitespace-pre-wrap mb-4">{suggestions.readyToPost.caption}</p>
        <p className="text-sm text-brand-primary/90 font-mono">{suggestions.readyToPost.hashtags}</p>
        <button onClick={handleCopy} className="absolute top-4 right-4 p-2 rounded-lg bg-slate-600/50 hover:bg-slate-500/50 text-slate-200 transition-colors">
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
          {copied && <span className="absolute -top-7 right-0 text-xs bg-green-500 text-white px-2 py-1 rounded">Copied!</span>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SuggestionCard title="Content Analysis">
            <p className="text-sm">{suggestions.contentAnalysis}</p>
        </SuggestionCard>

        <SuggestionCard title="Style Notes">
            <ul className="list-disc list-inside text-sm">
                {suggestions.styleNotes.map((note, index) => <li key={index}>{note}</li>)}
            </ul>
        </SuggestionCard>

        <SuggestionCard title="Caption Options">
            <div className="space-y-4">
            {suggestions.captionOptions.map((opt, index) => (
                <div key={index} className="text-sm p-2 bg-slate-900/50 rounded">
                <p><strong className="text-slate-100">Hook:</strong> {opt.hook}</p>
                <p><strong className="text-slate-100">Value:</strong> {opt.value}</p>
                <p><strong className="text-slate-100">CTA:</strong> {opt.cta}</p>
                </div>
            ))}
            </div>
        </SuggestionCard>

        <SuggestionCard title="Generated Hashtags">
            <p className="text-sm font-mono break-words">{suggestions.hashtags.join(' ')}</p>
        </SuggestionCard>
        
        <SuggestionCard title="Posting Suggestion">
            <p className="text-sm">{suggestions.postingSuggestion}</p>
        </SuggestionCard>

        <SuggestionCard title="Best Practices Checklist">
            <ul className="space-y-1">
                {suggestions.bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-center text-sm">
                        <CheckIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                        {practice}
                    </li>
                ))}
            </ul>
        </SuggestionCard>
      </div>
    </div>
  );
};