'use client';

import { useEffect } from 'react';

export function PhoenixTracker() {
  useEffect(() => {
    // Initialize Phoenix tracking if script is loaded
    if (typeof window !== 'undefined' && (window as any).PhoenixTracker) {
      try {
        (window as any).PhoenixTracker.init();
      } catch (error) {
        console.warn('Phoenix tracking initialization failed:', error);
      }
    }
  }, []);

  return null;
}