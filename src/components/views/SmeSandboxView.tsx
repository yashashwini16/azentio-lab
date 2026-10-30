'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Sliders, 
  Info,
  TrendingDown,
  TrendingUp,
  FileText,
  ShieldCheck
} from 'lucide-react';

export const SmeSandboxView: React.FC = () => {
  const { themes, improvements } = useApp();
  
  // Synthetic Scenario State
  const [seasonalDrawdown, setSeasonalDrawdown] = useState<number>(380); // in thousands ($380,000)
  const [sectorType, setSectorType] = useState<'AgriCommodity' | 'RetailHoliday' | 'ConstructionSpring'>('RetailHoliday');
  
  // Baseline Model Calculations (Linear, uncontextualized)
  const baselineCurrentRatio = +(1.65 - (seasonalDrawdown / 400) * 0.75).toFixed(2);
  const baselineRiskScore = Math.max(35, Math.round(86 - (seasonalDrawdown / 10)));
  const baselineCovenantBreach = baselineCurrentRatio < 1.15;

  // Seasonality-Aware AI Calculations (Theme & Model Improvement applied)
  const seasonalityAdjustmentWeight = 0.85;
  const normalizedCurrentRatio = +(1.65 - ((seasonalDrawdown * (1 - seasonalityAdjustmentWeight)) / 400) * 0.75).toFixed(2);
  const seasonalityRiskScore = Math.min(88, Math.round(86 - (seasonalDrawdown / 80)));
  const seasonalityCovenantBreach = false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          Section 10 Benchmark Demonstration
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          SME Cash Flow Seasonality Sandbox
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Demonstrates how the <strong>Collective Learning Loop</strong> transforms client observations into an improved model. Compare the baseline linear credit engine against the <em>Seasonality-Aware Normalization Engine</em> built from cross-client learning.
        </p>
      </div>

      {/* Synthetic Borrower Details */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Synthetic Entity</span>
          <span className="text-sm font-bold text-white block mt-0.5">Solari Agri-Equipments Ltd</span>
          <span className="text-xs text-slate-400">Mid-Market SME (APAC / EMEA)</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Annual Turnover</span>
          <span className="text-sm font-bold text-emerald-400 block mt-0.5">$14.2M Synthetic Data</span>
          <span className="text-xs text-slate-400">Audited 3-Year History</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Selected Sector Cyclicality</span>
          <select
            value={sectorType}
            onChange={(e) => setSectorType(e.target.value as any)}
            className="mt-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-azentio-500 w-full"
          >
            <option value="RetailHoliday">Retail Q4 Holiday Buildup</option>
            <option value="AgriCommodity">Agricultural Pre-Harvest Lag</option>
            <option value="ConstructionSpring">Spring Bulk Material Procurement</option>
          </select>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Governed Collective Theme</span>
          <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5 mt-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Seasonality Context Active (k=3)
          </span>
          <span className="text-[10px] text-slate-400">Apex • Horizon • Vanguard</span>
        </div>
      </div>

      {/* Interactive Scenario Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-azentio-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Simulate Intra-Year Working Capital Drawdown</h3>
          </div>
          <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-3 py-1 rounded-lg">
            ${seasonalDrawdown},000 Drawdown
          </span>
        </div>

        <input
          type="range"
          min="100"
          max="600"
          step="20"
          value={seasonalDrawdown}
          onChange={(e) => setSeasonalDrawdown(Number(e.target.value))}
          className="w-full accent-azentio-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>$100k (Mild Cyclicality)</span>
          <span>$350k (Typical Peak Inventory Build)</span>
          <span>$600k (Extreme Sector Surge)</span>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Legacy Uncontextualized Model */}
        <div className="bg-slate-900/90 border border-rose-900/40 rounded-3xl p-6 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                Legacy Model (Prior to Collective Feedback)
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Linear Variance Scoring</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-950/80 border border-rose-800 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Calculated Current Ratio</span>
              <span className={`text-xl font-bold font-mono ${baselineCovenantBreach ? 'text-rose-400' : 'text-slate-200'}`}>
                {baselineCurrentRatio}x
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Threshold: 1.15x</span>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Credit Risk Score</span>
              <span className={`text-xl font-bold font-mono ${baselineRiskScore < 60 ? 'text-rose-400' : 'text-amber-400'}`}>
                {baselineRiskScore} / 100
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Category: {baselineRiskScore < 60 ? 'Distressed' : 'Vulnerable'}</span>
            </div>
          </div>

          {baselineCovenantBreach ? (
            <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">False Positive Covenant Alarm Triggered!</strong>
                Standard ratio test flags inventory drawdown as dangerous liquidity contraction. Falsely requires loan officer override or credit freeze.
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
              Borderline risk tolerance. High sensitivity to further minor seasonal drawdowns.
            </div>
          )}

          <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/60">
            <span className="font-semibold text-slate-300 block">Flaws Identified by Client Field Teams:</span>
            <p>• Assumes static quarterly cash flow without sector rhythm normalization.</p>
            <p>• Generates false compliance tickets during predictable inventory peaks.</p>
          </div>
        </div>

        {/* Right: Seasonality-Aware AI (With Collective Learning) */}
        <div className="bg-slate-900/90 border border-azentio-600/50 rounded-3xl p-6 space-y-6 relative overflow-hidden shadow-xl shadow-azentio-950/50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-azentio-950 text-cyan-300 border border-azentio-800">
                Azentio AI (With Governed Learning Loop)
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Seasonality-Aware Comparative Model</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-azentio-950/80 border border-azentio-700 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Normalized Current Ratio</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {normalizedCurrentRatio}x
              </span>
              <span className="text-[10px] text-emerald-400/80 block mt-0.5">Post-Seasonal Smoothing</span>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">AI Credit Health Score</span>
              <span className="text-xl font-bold font-mono text-azentio-400">
                {seasonalityRiskScore} / 100
              </span>
              <span className="text-[10px] text-azentio-300 block mt-0.5">Category: Investment Grade</span>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">Normalized for Seasonal Predictability</strong>
              Applies historical 3-year sector cyclical pattern (Apex & Vanguard cross-client cohort). Identifies 98.8% probability of holiday sales clearance.
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/60">
            <span className="font-semibold text-white block">Closed-Loop Learning Verification:</span>
            <p className="text-slate-400">
              • Originates from Theme: <strong className="text-purple-300">Seasonality Context in SME Cash Flow</strong>
            </p>
            <p className="text-slate-400">
              • Linked PO Idea: <strong className="text-cyan-300">Seasonality-Aware Comparative Analysis Engine</strong> (Status: Under Review)
            </p>
            <p className="text-slate-400">
              • Governed Isolation: Fictional borrower client records remain 100% private.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
