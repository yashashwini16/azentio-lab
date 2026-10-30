'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Cpu, 
  Sparkles, 
  Layers, 
  Users, 
  BookOpen, 
  Share2, 
  Shield, 
  Network
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useApp();

  const isEmployeeOrStaff = ['EMPLOYEE', 'LEARNING_MODERATOR', 'PRODUCT_OWNER', 'PORTAL_ADMIN'].includes(currentUser.role);
  const isClient = ['CLIENT_MEMBER', 'CLIENT_ADMIN'].includes(currentUser.role);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('showcase')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-azentio-600 to-cyan-400 p-0.5 shadow-lg shadow-azentio-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-azentio-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white font-sans">azentio<span className="text-azentio-400">.ai</span></span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-azentio-950 text-azentio-400 border border-azentio-800/80">
                  Build Labs
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">Enterprise AI & Governed Collaboration</span>
            </div>
          </div>

          {/* Nav Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'showcase' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-azentio-400" />
              AI Showcase
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'sandbox' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              SME Sandbox Demo
            </button>

            <button
              onClick={() => setActiveTab('collective-learning')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'collective-learning' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              Collective Learning
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                P0
              </span>
            </button>

            {/* Client Portal Tab */}
            <button
              onClick={() => setActiveTab('client')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'client' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              Client Workspace
              {isClient && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            {/* Employee Tab */}
            <button
              onClick={() => setActiveTab('employee')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'employee' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              Employee Lab
              {isEmployeeOrStaff && (
                <span className="w-2 h-2 rounded-full bg-blue-400" />
              )}
            </button>

            {/* Federated Learning Tab (P2) */}
            <button
              onClick={() => setActiveTab('federated')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'federated' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Network className="w-4 h-4 text-amber-400" />
              Federated AI (P2)
            </button>

            {/* Governance & Audit */}
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'audit' 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-rose-400" />
              Audit Log
            </button>
          </nav>

          {/* User Info & Tenant Badge */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-slate-200 block">{currentUser.name}</span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {currentUser.tenantName || currentUser.email}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-azentio-400">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
