'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  FileText, 
  PlusCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  RotateCcw, 
  Send,
  AlertCircle,
  Sparkles,
  Layers
} from 'lucide-react';
import { scanSensitiveData } from '@/lib/privacyScanner';
import { Observation } from '@/types';

export const ClientWorkspaceView: React.FC = () => {
  const { 
    currentUser, 
    tenants, 
    offerings, 
    observations, 
    submitObservation, 
    withdrawObservation,
    switchRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'observations' | 'submit' | 'entitlements'>('observations');
  
  // Submission Form State
  const [title, setTitle] = useState('');
  const [offeringId, setOfferingId] = useState('financial-analysis-ai');
  const [industry, setIndustry] = useState('Commercial Banking');
  const [region, setRegion] = useState('APAC / Regional');
  const [observationPeriod, setObservationPeriod] = useState('Current Quarter');
  const [evidenceType, setEvidenceType] = useState<Observation['evidenceType']>('SME Volatility');
  const [confidence, setConfidence] = useState<Observation['confidence']>('High (Verified Data)');
  const [rawSummary, setRawSummary] = useState('');
  const [sharingScope, setSharingScope] = useState<Observation['sharingScope']>('PROPOSED_COMMUNITY_SHARING');
  
  // Real-time Privacy Scanner feedback
  const scanResult = scanSensitiveData(rawSummary);

  const currentTenant = tenants.find(t => t.id === currentUser.tenantId) || tenants[0];
  const isClientUser = currentUser.role === 'CLIENT_MEMBER' || currentUser.role === 'CLIENT_ADMIN';

  // Filter observations belonging only to this client organization
  const orgObservations = observations.filter(o => o.tenantId === currentTenant.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitObservation({
      title,
      offeringId,
      industry,
      region,
      observationPeriod,
      evidenceType,
      confidence,
      rawSummary,
      sharingScope
    });
    // Reset form
    setTitle('');
    setRawSummary('');
    setActiveTab('observations');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Client Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  {currentTenant.tier}
                </span>
                <span className="text-xs text-slate-400 font-mono">Tenant ID: {currentTenant.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {currentTenant.name}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentTenant.industry} • {currentTenant.region} • {currentTenant.activeMembers} Authorized Seats
              </p>
            </div>
          </div>

          {/* Tenant Switcher */}
          <div className="bg-slate-950/80 border border-slate-800 p-2 rounded-2xl flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono px-2 block">Switch Tenant</span>
            <button
              onClick={() => switchRole('CLIENT_APEX')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTenant.id === 'org-apex' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Apex Bank
            </button>
            <button
              onClick={() => switchRole('CLIENT_HORIZON')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTenant.id === 'org-horizon' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Horizon Islamic
            </button>
            <button
              onClick={() => switchRole('CLIENT_VANGUARD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTenant.id === 'org-vanguard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vanguard Trust
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setActiveTab('observations')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'observations' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Our Organisation Observations ({orgObservations.length})
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'submit' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Capture New Observation
          </button>
          <button
            onClick={() => setActiveTab('entitlements')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'entitlements' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Entitled Sandboxes ({currentTenant.entitledOfferings.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ORGANIZATION OBSERVATIONS */}
      {activeTab === 'observations' && (
        <div className="space-y-4">
          {orgObservations.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm">
              No observations recorded for this tenant workspace yet.
            </div>
          ) : (
            orgObservations.map(obs => (
              <div 
                key={obs.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold border ${
                        obs.status === 'APPROVED_PUBLISHED' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                        obs.status === 'SUBMITTED' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                        obs.status === 'WITHDRAWN' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        STATUS: {obs.status}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-azentio-300 border border-slate-700">
                        {obs.offeringName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Scope: {obs.sharingScope}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-2">{obs.title}</h3>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Submitted by: {obs.authorName} • {new Date(obs.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {obs.status === 'APPROVED_PUBLISHED' && (
                    <button
                      onClick={() => withdrawObservation(obs.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Withdraw Observation
                    </button>
                  )}
                </div>

                {/* Raw Summary (Private to org) */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Confidential Internal Submission Body:
                  </span>
                  <p className="leading-relaxed font-mono">{obs.rawSummary}</p>
                </div>

                {/* Redacted Version if approved */}
                {obs.redactedSummary && obs.status === 'APPROVED_PUBLISHED' && (
                  <div className="bg-purple-950/30 p-4 rounded-xl border border-purple-800/40 text-xs text-purple-200 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-purple-400 block font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      Sanitized Community Shared Representation:
                    </span>
                    <p className="leading-relaxed">{obs.redactedSummary}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: CAPTURE NEW OBSERVATION */}
      {activeTab === 'submit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Record New Market Observation</h3>
            <p className="text-xs text-slate-400">
              Contributions are stored securely in your private tenant workspace. If proposed for community sharing, our learning moderators will verify de-identification.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Observation Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Q4 SME Working Capital drawdown flags false covenant breach"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Target AI Offering</label>
                <select
                  value={offeringId}
                  onChange={e => setOfferingId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="financial-analysis-ai">Financial Analysis Intelligence</option>
                  <option value="credit-underwrite-ai">Credit & Underwriting AI</option>
                  <option value="aml-sentinel-ai">Sentinel AML AI</option>
                  <option value="aira-copilot">AIRA Banker Copilot</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Evidence Category</label>
                <select
                  value={evidenceType}
                  onChange={e => setEvidenceType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="SME Volatility">SME Volatility / Seasonal Swings</option>
                  <option value="Model Inconsistency">Model Inconsistency</option>
                  <option value="Production Edge Case">Production Edge Case</option>
                  <option value="Regulatory Friction">Regulatory Friction</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Observation Period</label>
                <input
                  type="text"
                  value={observationPeriod}
                  onChange={e => setObservationPeriod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Private Summary Textarea with Real-time Scanner */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">
                  Detailed Operational Observation
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Real-time Privacy Scanner Active
                </span>
              </div>

              <textarea
                rows={5}
                required
                placeholder="Describe the discrepancy, specific borrower patterns, financial spread behavior, or false-positive alarms noticed in production..."
                value={rawSummary}
                onChange={e => setRawSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />

              {/* Real-time scanner feedback */}
              {scanResult.hasSensitiveData && (
                <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 text-xs text-amber-200 space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Sensitive Patterns Detected by Privacy Scanner:</span>
                  </div>
                  {scanResult.warnings.map((w, idx) => (
                    <p key={idx} className="pl-5 text-[11px]">• {w}</p>
                  ))}
                  <p className="text-[10px] text-amber-300/80 pt-1 pl-5">
                    Don't worry: our learning moderator will sanitize this into: <em>"{scanResult.suggestedRedaction.substring(0, 100)}..."</em> before community publication.
                  </p>
                </div>
              )}
            </div>

            {/* Explicit Sharing Choice (IAM-01 / Section 09) */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-white block">
                Explicit Sharing Consent (Section 09 Compliance):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  sharingScope === 'PRIVATE_TO_AUTHOR' ? 'bg-slate-800 border-emerald-500 text-white' : 'border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="scope"
                    className="sr-only"
                    checked={sharingScope === 'PRIVATE_TO_AUTHOR'}
                    onChange={() => setSharingScope('PRIVATE_TO_AUTHOR')}
                  />
                  <span className="font-semibold block">Private to Author</span>
                  <span className="text-[10px] text-slate-400 mt-1">Draft only visible to your user identity.</span>
                </label>

                <label className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  sharingScope === 'WITHIN_ORGANIZATION' ? 'bg-slate-800 border-emerald-500 text-white' : 'border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="scope"
                    className="sr-only"
                    checked={sharingScope === 'WITHIN_ORGANIZATION'}
                    onChange={() => setSharingScope('WITHIN_ORGANIZATION')}
                  />
                  <span className="font-semibold block">Within My Organization</span>
                  <span className="text-[10px] text-slate-400 mt-1">Shared with risk colleagues at {currentTenant.name}.</span>
                </label>

                <label className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  sharingScope === 'PROPOSED_COMMUNITY_SHARING' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="scope"
                    className="sr-only"
                    checked={sharingScope === 'PROPOSED_COMMUNITY_SHARING'}
                    onChange={() => setSharingScope('PROPOSED_COMMUNITY_SHARING')}
                  />
                  <span className="font-semibold block text-emerald-300">Propose to Learning Hub</span>
                  <span className="text-[10px] text-emerald-400/80 mt-1">Undergoes de-identification to form cross-client themes.</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('observations')}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Observation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: ENTITLED SANDBOXES */}
      {activeTab === 'entitlements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offerings
            .filter(o => currentTenant.entitledOfferings.includes(o.id))
            .map(offering => (
              <div 
                key={offering.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    Entitled Sandbox
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Isolated Runner</span>
                </div>
                <h3 className="text-lg font-bold text-white">{offering.name}</h3>
                <p className="text-xs text-slate-300">{offering.description}</p>
                <div className="pt-2">
                  <button className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-azentio-400 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all">
                    <Sparkles className="w-3.5 h-3.5" />
                    Launch Synthetic Run
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

    </div>
  );
};
