'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { activeNotification, dismissNotification } = useApp();

  if (!activeNotification) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-azentio-500/50 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-4">
      <CheckCircle2 className="w-5 h-5 text-azentio-400 shrink-0" />
      <span className="text-sm font-medium text-slate-200">{activeNotification}</span>
      <button 
        onClick={dismissNotification}
        className="text-slate-400 hover:text-white transition-colors ml-2 p-1 rounded-md hover:bg-slate-800"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
