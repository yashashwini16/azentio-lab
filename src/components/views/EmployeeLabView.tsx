'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Briefcase, 
  Play, 
  Video, 
  Terminal, 
  Sparkles, 
  Layers, 
  Users, 
  BookOpen, 
  CheckCircle,
  FlaskConical,
  ExternalLink
} from 'lucide-react';

export const EmployeeLabView: React.FC = () => {
  const { currentUser } = useApp();
  const [selectedScenario, setSelectedScenario] = useState('sme-stress');
  const [playgroundOutput, setPlaygroundOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const isVerifiedEmployee = ['EMPLOYEE', 'LEARNING_MODERATOR', 'PRODUCT_OWNER', 'PORTAL_ADMIN'].includes(currentUser.role);

  const handleRunSyntheticScenario = () => {
    setIsRunning(true);
    setPlaygroundOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      setPlaygroundOutput(`[INTERNAL PLAYGROUND RUN: ${selectedScenario.toUpperCase()}]
Timestamp: ${new Date().toISOString()}
Executor Identity: ${currentUser.name} (${currentUser.email})
Simulation Context: Deterministic Multi-Year Financial Spreading
--
1. Spreading Completed across 3 Synthetic Fiscal Years (FY23, FY24, FY25).
2. Seasonal Smoothing Filter Applied: Detected Q4 inventory spike (+38% QoQ).
3. Variance Reconciliation: Current ratio adjusted from 1.08x to 1.42x normalized.
4. Explainable Audit Trail: 0 PII entities referenced; synthetic benchmark verified.`);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Employee Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                  Verified Employee Workspace
                </span>
                <span className="text-xs text-slate-400 font-mono">@azentio.com</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Azentio Employee Innovation Lab
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Internal AI Playground, private experiments, employee broadcasts, and product collaboration spaces.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-2xl">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Active Work Identity</span>
            <span className="text-xs font-semibold text-white block">{currentUser.name}</span>
            <span className="text-[11px] text-blue-400 font-mono">{currentUser.email}</span>
          </div>
        </div>
      </div>

      {/* Grid: Playground & Broadcasts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Internal AI Playground */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Internal AI Playground (Section 05)</h3>
                <span className="text-xs text-slate-400">Run deterministic & machine-assisted demonstrations on synthetic cohorts</span>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Synthetic Sandbox
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Select Synthetic Scenario</label>
              <select
                value={selectedScenario}
                onChange={e => setSelectedScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              >
                <option value="sme-stress">SME Working Capital Stress & Seasonality Spreading</option>
                <option value="islamic-trade-murabaha">Murabaha Agricultural Receivable Lag Simulation</option>
                <option value="construction-procure">Spring Construction Bulk Procurement Covenant Test</option>
                <option value="aml-graph-triage">Graph Neural Network AML False-Positive Pruning</option>
              </select>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                Scenario Inputs & Parameters:
              </span>
              <p>• Data Source: Synthetic Enterprise Financial Dataset v4.2</p>
              <p>• Model: Financial Analysis Intelligence (v2.8-beta with Seasonality Smoothing)</p>
              <p>• Boundary Check: Client-private records strictly excluded from playground inference.</p>
            </div>

            <div>
              <button
                onClick={handleRunSyntheticScenario}
                disabled={isRunning}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunning ? 'Executing Simulation...' : 'Execute Playground Scenario'}</span>
              </button>
            </div>

            {playgroundOutput && (
              <div className="space-y-2 pt-2 animate-in fade-in">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Execution Output Log:</span>
                <pre className="bg-slate-950 p-4 rounded-xl border border-blue-900/50 text-xs text-blue-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {playgroundOutput}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Broadcasts & Hackathon Spaces */}
        <div className="space-y-6">
          
          {/* Employee Live Broadcasts */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Video className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Employee Broadcasts</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    Internal Briefing
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Today, 16:00 UTC</span>
                </div>
                <h4 className="text-xs font-bold text-white">Q4 Enterprise AI Architecture & Collective Learning Rollout</h4>
                <p className="text-[11px] text-slate-400">Exclusive to @azentio.com team members. Engineering demo & roadmap discussion.</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Recorded Session</span>
                  <span className="text-[10px] text-slate-400 font-mono">42 mins</span>
                </div>
                <h4 className="text-xs font-bold text-white">Federated Model Learning Threat Model & Privacy Budgets</h4>
                <p className="text-[11px] text-slate-400">Deep dive into FedAvg, gradient poisoning defenses, and differential privacy.</p>
              </div>
            </div>
          </div>

          {/* Hackathon Team Space */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Build Labs Team Space</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Collaborate on the Special Challenge with team members. Push commits to GitHub to qualify for the 10 Brownie Points.
            </p>

            <div className="bg-purple-950/40 border border-purple-800/60 p-3 rounded-xl text-xs text-purple-200 space-y-1">
              <span className="font-semibold block text-white">Brownie Points Checklist:</span>
              <p>✔ Multi-tenant persona separation</p>
              <p>✔ Governed collective learning workflow (P0)</p>
              <p>✔ Seasonality SME scenario benchmark</p>
              <p>✔ Federated learning simulator (P2)</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
