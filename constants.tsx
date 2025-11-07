
import React from 'react';
import type { SocialPlatform } from './types';

const InstagramIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" />
  </svg>
);

const TwitterIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TiktokIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.25,7.39a3,3,0,0,0-2.3-2.43C18,4.5,14,4.5,12,4.5s-6,0-7.92.46A3,3,0,0,0,1.75,7.39,26,26,0,0,0,1.29,12a26,26,0,0,0,.46,4.61,3,3,0,0,0,2.3,2.43c2,.46,6,.46,7.92.46s5.94,0,7.92-.46a3,3,0,0,0,2.3-2.43A26,26,0,0,0,22.71,12,26,26,0,0,0,22.25,7.39ZM9.72,15.35V8.65l6,3.35Z" />
    </svg>
);


export const PLATFORMS: SocialPlatform[] = [
  { name: 'Instagram Reels', icon: InstagramIcon },
  { name: 'Facebook Post', icon: FacebookIcon },
  { name: 'Twitter / X', icon: TwitterIcon },
  { name: 'TikTok', icon: TiktokIcon },
];
