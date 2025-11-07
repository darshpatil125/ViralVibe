import React, { useState, useCallback, useRef } from 'react';
import type { Content } from '../types';

interface ContentUploaderProps {
  onContentChange: (content: Content | null) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);


export const ContentUploader: React.FC<ContentUploaderProps> = ({ onContentChange }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image') ? 'image' : 'video';
      onContentChange({ type: fileType, value: file });
      setFileName(file.name);
    } else {
      onContentChange(null);
      setFileName(null);
    }
  };
  
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = event.target.value;
      setTextValue(newText);
      if (newText.trim()) {
          onContentChange({type: 'text', value: newText});
      } else {
          onContentChange(null);
      }
  };

  const onFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file) {
          const fileType = file.type.startsWith('image') ? 'image' : 'video';
          onContentChange({ type: fileType, value: file });
          setFileName(file.name);
      }
  };
  
  const tabClasses = (tabName: 'upload' | 'text') => 
    `w-full py-2.5 text-sm font-medium leading-5 text-center rounded-lg cursor-pointer transition-colors duration-200
     ${activeTab === tabName 
       ? 'bg-brand-primary text-white shadow' 
       : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`;
  
  return (
    <div>
      <div className="flex space-x-1 rounded-xl bg-slate-900/60 p-1 mb-4">
        <div onClick={() => setActiveTab('upload')} className={tabClasses('upload')}>
          Upload File
        </div>
        <div onClick={() => setActiveTab('text')} className={tabClasses('text')}>
          Paste Text
        </div>
      </div>
      <div>
        {activeTab === 'upload' ? (
           <label 
             onDrop={onFileDrop} 
             onDragOver={(e) => e.preventDefault()}
             htmlFor="file-upload" 
             className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600/50 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
           >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon />
                <p className="mb-2 text-sm text-slate-400">
                    <span className="font-semibold text-slate-300">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">Image or Video</p>
            </div>
            <input id="file-upload" ref={fileInputRef} type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
            {fileName && (
                <div className="absolute bottom-2 px-2 text-xs text-slate-300 bg-slate-900/50 rounded">
                    {fileName}
                </div>
            )}
           </label>
        ) : (
          <textarea
            className="w-full h-32 p-3 bg-transparent border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition text-slate-200 placeholder-slate-500"
            placeholder="Paste your article excerpt or text here..."
            value={textValue}
            onChange={handleTextChange}
          />
        )}
      </div>
    </div>
  );
};