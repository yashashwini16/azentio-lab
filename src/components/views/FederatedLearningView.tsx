'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Network, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Play, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const FederatedLearningView: React.FC = () => {
  const { federatedRounds, runNextFederatedRound } = useApp();
  const [isSimulating, setIsSimulating] = useState(false);

  const latestRound = federatedRounds[federatedRounds.length - 1];

  const handleRunRound = () => {
    setIsSimulating(true);
    setTimeout(() => {
      runNextFederatedRound();
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/60 text-amber-300 text-xs font-mono">
            <Network className="w-3.5 h-3.5" />
            Advanced Track (P2): Decentralized Model Aggregation
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Federated Machine Learning Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Separate client environments train models locally on private institutional records. A secure coordinator aggregates model weights via <strong>FedAvg</strong> with differential privacy accounting ($\epsilon, \delta$). Raw customer data never leaves client nodes.
          </p>
        </div>

        <div>
          <button
            onClick={handleRunRound}
            disabled={isSimulating}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulating ? 'Aggregating Gradients...' : 'Trigger Next Federated Round'}</span>
          </button>
        </div>
      </div>

      {/* 3 Isolated Participating Client Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              Isolated Client Node 01
            </span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white">Apex Commercial Bank Node</h3>
          <p className="text-xs text-slate-400">
            Local SME & Retail Transaction Store. 1,420 synthetic training records.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Local Loss:</span>
              <span className="text-emerald-400 font-bold">0.241</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Weight Share:</span>
              <span>38.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Raw Data Status:</span>
              <span className="text-emerald-400">Local Only</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-bold">
              Isolated Client Node 02
            </span>
            <Lock className="w-4 h-4 text-teal-400" />
          </div>
          <h3 className="text-base font-bold text-white">Horizon Islamic Bank Node</h3>
          <p className="text-xs text-slate-400">
            Murabaha & Trade Finance Datasets. 980 synthetic contracts.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Local Loss:</span>
              <span className="text-teal-400 font-bold">0.258</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Weight Share:</span>
              <span>26.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Raw Data Status:</span>
              <span className="text-teal-400">Local Only</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
              Isolated Client Node 03
            </span>
            <Lock className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-white">Vanguard Trust Node</h3>
          <p className="text-xs text-slate-400">
            Corporate Contractor Credit Spreads. 1,310 synthetic records.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Local Loss:</span>
              <span className="text-blue-400 font-bold">0.237</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Weight Share:</span>
              <span>35.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Raw Data Status:</span>
              <span className="text-blue-400">Local Only</span>
            </div>
          </div>
        </div>

      </div>

      {/* Aggregator Metrics Card */}
      <div className="bg-slate-900 border border-amber-800/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
              Central Coordinator Aggregation State
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Global Model Candidate (Round {latestRound.round})
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono block">Differential Privacy Budget</span>
            <span className="text-sm font-bold text-amber-400 font-mono">
              ε = {latestRound.differentialPrivacyEpsilon} • δ = {latestRound.differentialPrivacyDelta}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Global Holdout Accuracy</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
              {latestRound.holdoutAccuracy}%
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono">+15.4% vs Baseline</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Global Training Loss</span>
            <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">
              {latestRound.globalLoss}
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono">Convergence Verified</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Weighting Algorithm</span>
            <span className="text-sm font-bold text-white mt-2 block">
              {latestRound.weightMethod}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Sample-Size Proportional</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Candidate Deployment</span>
            <span className="text-sm font-bold text-amber-300 mt-2 block">
              {latestRound.status}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Human Review Required</span>
          </div>
        </div>

        {/* History Table */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-semibold text-white block uppercase tracking-wider font-mono">
            Aggregation Round History
          </span>
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Round</th>
                  <th className="p-3">Participants</th>
                  <th className="p-3">Holdout Accuracy</th>
                  <th className="p-3">Global Loss</th>
                  <th className="p-3">Privacy ε</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {federatedRounds.map(r => (
                  <tr key={r.round} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">Round {r.round}</td>
                    <td className="p-3 text-slate-400">{r.participants.join(', ')}</td>
                    <td className="p-3 text-emerald-400 font-bold">{r.holdoutAccuracy}%</td>
                    <td className="p-3 text-cyan-400">{r.globalLoss}</td>
                    <td className="p-3 text-amber-300">ε={r.differentialPrivacyEpsilon}</td>
                    <td className="p-3 text-slate-500 text-[11px]">{new Date(r.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
