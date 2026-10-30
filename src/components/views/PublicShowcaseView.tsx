'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Users, 
  Lock,
  Send,
  HelpCircle
} from 'lucide-react';

interface PublicShowcaseViewProps {
  onExploreSandbox: () => void;
  onExploreCollectiveLearning: () => void;
}

export const PublicShowcaseView: React.FC<PublicShowcaseViewProps> = ({
  onExploreSandbox,
  onExploreCollectiveLearning,
}) => {
  const { offerings, currentUser } = useApp();
  const [demoRequested, setDemoRequested] = useState(false);
  const [hackathonRegistered, setHackathonRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', offering: 'financial-analysis-ai' });

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-azentio-950/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azentio-950/80 border border-azentio-800/70 text-azentio-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            Azentio.ai Build Labs 2026 Special Challenge
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Enterprise AI Built for High-Stakes Finance & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azentio-400 via-cyan-300 to-blue-500">
              Governed Collective Learning
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Showcasing Azentio’s next-generation banking intelligence suites. Connecting institutional clients and employees through private, tenant-isolated workspaces, automated privacy redactions, and cross-client theme synthesis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreSandbox}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-azentio-600 to-cyan-500 text-white font-semibold shadow-lg shadow-azentio-600/30 hover:shadow-azentio-600/50 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
            >
              <span>Launch SME Seasonality Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreCollectiveLearning}
              className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2 text-sm"
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>Explore Collective Learning Hub (P0)</span>
            </button>
          </div>

          {/* Persona quick disclaimer */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Currently testing as: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role}). Use the bottom dock to switch roles.</span>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-azentio-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Public AI Discovery</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Explore Azentio’s core banking AI capabilities, benchmark spreading accuracy, and run verified synthetic underwriting scenarios.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tenant-Isolated Workspaces</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Strict multi-tenant boundary checks (IAM-01/IAM-02). Clients keep private drafts strictly isolated from competitor eyes and employees.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Governed Collective Learning</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Moderated de-identification workflow: client observations are scrubbed of PII and grouped into themes once $k \ge 3$ distinct banks report.
            </p>
          </div>

        </div>
      </section>

      {/* Product Offerings Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-azentio-400 font-mono text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            Azentio AI Product Suites
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Enterprise Banking & Lending Intelligence</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Each offering features transparent deterministic and machine-assisted inference, explainable covenants, and synthetic sandbox demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offerings.map(offering => (
            <div 
              key={offering.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-azentio-300 border border-slate-700">
                      {offering.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{offering.name}</h3>
                    <p className="text-xs text-azentio-400 font-medium">{offering.tagline}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {offering.description}
                </p>

                {/* Features */}
                <div className="space-y-1.5 pt-2">
                  {offering.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-azentio-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                {offering.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-950/60 rounded-xl p-2 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Enquiry & Hackathon Registration */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-azentio-800/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-wider text-azentio-400">Request Enterprise Access</span>
            <h3 className="text-2xl font-bold text-white">Join the Azentio.ai Build Labs Ecosystem</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Schedule an executive sandbox walkthrough for your financial institution or register your development team for the Azentio AI Hackathon.
            </p>
          </div>

          {demoRequested ? (
            <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-6 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Demo Enquiry Dispatched!</h4>
              <p className="text-xs text-emerald-300">
                Azentio client relations has received your request. An invitation token will be generated within your registered domain.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setDemoRequested(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Sterling"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-azentio-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Institutional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="rachel@globalbank.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-azentio-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Financial Institution</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Horizon Commercial Bank"
                    value={formData.institution}
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-azentio-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Interested Offering</label>
                  <select
                    value={formData.offering}
                    onChange={e => setFormData({ ...formData, offering: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-azentio-500"
                  >
                    <option value="financial-analysis-ai">Financial Analysis Intelligence</option>
                    <option value="credit-underwrite-ai">Intelligent Credit Underwriting</option>
                    <option value="aml-sentinel-ai">Sentinel AML & Fraud Detection</option>
                    <option value="aira-copilot">AIRA Banker Copilot</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-azentio-600 hover:bg-azentio-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-azentio-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Sandbox Demo Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
