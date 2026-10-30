'use client';

import React from 'react';
import { useApp, PRESET_USERS } from '@/context/AppContext';
import { 
  Globe, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Target, 
  RotateCcw,
  Sliders
} from 'lucide-react';

export const RoleSwitcherDock: React.FC = () => {
  const { currentUser, switchRole, resetAllData } = useApp();

  const presets = [
    { key: 'PUBLIC', label: 'Public Visitor', icon: Globe, color: 'text-slate-300' },
    { key: 'EMPLOYEE', label: 'Employee (@azentio)', icon: Briefcase, color: 'text-blue-400' },
    { key: 'CLIENT_APEX', label: 'Client (Apex Bank)', icon: Building2, color: 'text-emerald-400' },
    { key: 'CLIENT_HORIZON', label: 'Client (Horizon Islamic)', icon: Building2, color: 'text-teal-400' },
    { key: 'MODERATOR', label: 'Moderator', icon: ShieldCheck, color: 'text-amber-400' },
    { key: 'PRODUCT_OWNER', label: 'Product Owner', icon: Target, color: 'text-purple-400' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl shadow-black/60 pointer-events-auto flex items-center justify-between gap-3 text-xs">
        
        {/* Left: Indicator */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700">
          <Sliders className="w-4 h-4 text-azentio-400 animate-pulse" />
          <div className="hidden sm:block">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">RBAC Identity</span>
            <span className="font-semibold text-white truncate max-w-[140px] block">{currentUser.name}</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-azentio-950 text-azentio-300 border border-azentio-800/60">
            {currentUser.role}
          </span>
        </div>

        {/* Center: Switch Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {presets.map(p => {
            const Icon = p.icon;
            const isSelected = 
              (p.key === 'PUBLIC' && currentUser.role === 'PUBLIC_VISITOR') ||
              (p.key === 'EMPLOYEE' && currentUser.role === 'EMPLOYEE') ||
              (p.key === 'CLIENT_APEX' && currentUser.tenantId === 'org-apex' && currentUser.role === 'CLIENT_MEMBER') ||
              (p.key === 'CLIENT_HORIZON' && currentUser.tenantId === 'org-horizon' && currentUser.role === 'CLIENT_MEMBER') ||
              (p.key === 'MODERATOR' && currentUser.role === 'LEARNING_MODERATOR') ||
              (p.key === 'PRODUCT_OWNER' && currentUser.role === 'PRODUCT_OWNER');

            return (
              <button
                key={p.key}
                onClick={() => switchRole(p.key as keyof typeof PRESET_USERS)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shrink-0 ${
                  isSelected 
                    ? 'bg-azentio-600 text-white shadow-md shadow-azentio-600/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
                title={`Switch persona to ${p.label}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : p.color}`} />
                <span className="hidden md:inline">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Reset Scenario Button */}
        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-white border border-rose-800/50 transition-all shrink-0 font-medium text-xs"
          title="Reset to default hackathon SME Seasonality benchmark state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Reset Demo</span>
        </button>

      </div>
    </div>
  );
};
