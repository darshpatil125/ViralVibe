import React, { useState, useCallback } from 'react';
import { ContentUploader } from './components/ContentUploader';
import { PlatformSelector } from './components/PlatformSelector';
import { SuggestionsDisplay } from './components/SuggestionsDisplay';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateSocialMediaPost } from './services/geminiService';
import { SocialPlatform, Suggestions, Content } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { PLATFORMS } from './constants';

export default function App() {
  const [content, setContent] = useState<Content | null>(null);
  const [platform, setPlatform] = useState<SocialPlatform>(PLATFORMS[0]);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContentChange = (newContent: Content | null) => {
    setContent(newContent);
    setSuggestions(null); // Clear previous suggestions when content changes
  };

  const handlePlatformSelect = (newPlatform: SocialPlatform) => {
    setPlatform(newPlatform);
    setSuggestions(null); // Clear previous suggestions when platform changes
  };

  const handleGenerate = useCallback(async () => {
    if (!content || !platform) {
      setError("Please upload content and select a platform first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      let contentInput: { type: 'text' | 'image' | 'video'; value: string; mimeType?: string; };
      
      if (content.type === 'text') {
        contentInput = { type: 'text', value: content.value };
      } else {
        const base64Data = await fileToBase64(content.value);
        contentInput = { type: content.type, value: base64Data, mimeType: content.value.type };
      }
      
      const result = await generateSocialMediaPost(contentInput, platform.name);
      setSuggestions(result);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [content, platform]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-secondary rounded-full mix-blend-screen filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-primary rounded-full mix-blend-screen filter blur-xl opacity-40 animate-blob" style={{animationDelay: '2s'}}></div>
      </div>
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
            Creator Assistant AI
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Generate viral posts in seconds. Upload content, pick a platform, and let AI do the rest.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-slate-100">1. Upload Your Content</h2>
                <ContentUploader onContentChange={handleContentChange} />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-slate-100">2. Select a Platform</h2>
                <PlatformSelector
                  selectedPlatform={platform}
                  onSelect={handlePlatformSelect}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !content}
                className="w-full py-3 text-lg font-bold text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg shadow-brand-primary/30"
              >
                {isLoading ? 'Generating...' : '✨ Generate Post Ideas'}
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl min-h-[400px] flex flex-col justify-center items-center">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {suggestions && <SuggestionsDisplay suggestions={suggestions} />}
            {!isLoading && !error && !suggestions && (
              <div className="text-center text-slate-400">
                <p className="text-5xl">🚀</p>
                <p className="mt-4 text-lg">Your AI-generated post suggestions will appear here.</p>
              </div>
            )}
          </div>
        </div>
        <footer className="text-center mt-12 text-slate-400">
          <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
}