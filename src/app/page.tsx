'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PublicShowcaseView } from '@/components/views/PublicShowcaseView';
import { SmeSandboxView } from '@/components/views/SmeSandboxView';
import { CollectiveLearningView } from '@/components/views/CollectiveLearningView';
import { ClientWorkspaceView } from '@/components/views/ClientWorkspaceView';
import { EmployeeLabView } from '@/components/views/EmployeeLabView';
import { FederatedLearningView } from '@/components/views/FederatedLearningView';
import { AuditLogView } from '@/components/views/AuditLogView';
import { useApp } from '@/context/AppContext';
import { Cpu, ExternalLink, ShieldAlert } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('showcase');
  const { currentUser } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="transition-all duration-300">
          {activeTab === 'showcase' && (
            <PublicShowcaseView
              onExploreSandbox={() => setActiveTab('sandbox')}
              onExploreCollectiveLearning={() => setActiveTab('collective-learning')}
            />
          )}

          {activeTab === 'sandbox' && (
            <SmeSandboxView />
          )}

          {activeTab === 'collective-learning' && (
            <CollectiveLearningView />
          )}

          {activeTab === 'client' && (
            <ClientWorkspaceView />
          )}

          {activeTab === 'employee' && (
            <EmployeeLabView />
          )}

          {activeTab === 'federated' && (
            <FederatedLearningView />
          )}

          {activeTab === 'audit' && (
            <AuditLogView />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 mt-12 pb-24 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-azentio-500" />
            <span className="font-semibold text-slate-400">azentio.ai</span>
            <span>— Azentio.ai Build Labs Special Challenge Solution</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a 
              href="https://www.linkedin.com/in/azento-ai-819992408" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-azentio-400 transition-colors flex items-center gap-1"
            >
              <span>Azentio Software LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://www.linkedin.com/company/hackculture/" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-azentio-400 transition-colors flex items-center gap-1"
            >
              <span>HackCulture LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
