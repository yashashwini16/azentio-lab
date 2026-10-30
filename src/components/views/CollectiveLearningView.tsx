'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Share2, 
  ShieldCheck, 
  Layers, 
  Target, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Lock,
  Eye,
  FileEdit,
  ArrowRight
} from 'lucide-react';
import { Observation, ImprovementStatus } from '@/types';

export const CollectiveLearningView: React.FC = () => {
  const { 
    themes, 
    observations, 
    improvements, 
    currentUser, 
    moderateObservation, 
    withdrawObservation,
    updateImprovementStatus 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffering, setSelectedOffering] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'themes' | 'feed' | 'moderation' | 'product_backlog'>('themes');

  // Moderator redaction modal/state
  const [editingObs, setEditingObs] = useState<Observation | null>(null);
  const [redactedDraft, setRedactedDraft] = useState('');
  const [moderatorNotes, setModeratorNotes] = useState('');

  const isModerator = currentUser.role === 'LEARNING_MODERATOR' || currentUser.role === 'PORTAL_ADMIN';
  const isProductOwner = currentUser.role === 'PRODUCT_OWNER' || currentUser.role === 'PORTAL_ADMIN';

  // Filter approved public feed
  const approvedFeed = observations.filter(o => 
    o.status === 'APPROVED_PUBLISHED' &&
    o.sharingScope === 'PROPOSED_COMMUNITY_SHARING' &&
    (selectedOffering === 'ALL' || o.offeringId === selectedOffering) &&
    (o.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (o.redactedSummary && o.redactedSummary.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Pending moderation queue
  const pendingQueue = observations.filter(o => o.status === 'SUBMITTED' || o.status === 'IN_REVIEW');

  const handleOpenModeration = (obs: Observation) => {
    setEditingObs(obs);
    setRedactedDraft(obs.redactedSummary || obs.rawSummary);
    setModeratorNotes(obs.moderatorNotes || 'Sanitized institutional customer and contract references. Safe for community aggregation.');
  };

  const handleApprove = () => {
    if (!editingObs) return;
    moderateObservation(editingObs.id, 'APPROVE', redactedDraft, moderatorNotes);
    setEditingObs(null);
  };

  const handleReject = () => {
    if (!editingObs) return;
    moderateObservation(editingObs.id, 'REJECT', undefined, moderatorNotes);
    setEditingObs(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/60 text-purple-300 text-xs font-mono">
            <Share2 className="w-3.5 h-3.5" />
            Hackathon Core Requirement: Collective Learning Hub (P0)
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Governed Cross-Client Collective Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Where client market observations are scrubbed of PII, synthesized into cross-institutional themes once $k \ge 3$ distinct banks report, and mapped to product upgrades.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'themes' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Community Themes ({themes.length})
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'feed' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Approved Feed ({approvedFeed.length})
          </button>
          
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeTab === 'moderation' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Moderation Queue
            {pendingQueue.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                {pendingQueue.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('product_backlog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'product_backlog' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Product Loop ({improvements.length})
          </button>
        </div>
      </div>

      {/* TAB 1: COMMUNITY THEMES */}
      {activeTab === 'themes' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Aggregation Safeguard Enforced:</strong> Shared themes require a minimum cohort of at least <strong>3 distinct contributing client organizations</strong> ($k \ge 3$) to prevent identification by differencing.
              </span>
            </div>
            <span className="font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
              Active Cohort: Apex • Horizon • Vanguard
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {themes.map(theme => (
              <div 
                key={theme.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-purple-600/60 transition-all shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                        {theme.offeringName}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        theme.distinctOrgCount >= 3 
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' 
                          : 'bg-amber-950/80 text-amber-300 border-amber-800'
                      }`}>
                        {theme.distinctOrgCount >= 3 ? `Verified k-Cohort (${theme.distinctOrgCount} Orgs)` : `Cohort < 3 (${theme.distinctOrgCount} Orgs)`}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">{theme.title}</h3>
                    <span className="text-xs text-slate-400 block mt-0.5 font-mono">Period: {theme.observationPeriod}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">Evidence Consensus</span>
                    <span className="text-sm font-bold text-purple-300">{theme.confidenceLabel}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {theme.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>Supporting Approved Contributions: <strong className="text-white">{theme.supportingObservationCount}</strong></span>
                  </div>

                  {theme.linkedImprovementIdeaId && (
                    <div className="flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-slate-400">Linked Improvement Idea:</span>
                      <span className="text-cyan-300 font-semibold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
                        Seasonality-Aware Comparative Analysis Engine (Under Review)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: APPROVED COMMUNITY FEED */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search approved observations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedOffering}
                onChange={e => setSelectedOffering(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">All Offerings</option>
                <option value="financial-analysis-ai">Financial Analysis Intelligence</option>
                <option value="credit-underwrite-ai">Credit & Underwriting AI</option>
                <option value="aml-sentinel-ai">Sentinel AML AI</option>
              </select>
            </div>
          </div>

          {/* Approved Items */}
          <div className="grid grid-cols-1 gap-4">
            {approvedFeed.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No approved observations matching your filter.
              </div>
            ) : (
              approvedFeed.map(obs => {
                const isAuthorOrOrg = currentUser.tenantId === obs.tenantId;

                return (
                  <div 
                    key={obs.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-azentio-300 border border-slate-700 font-bold">
                            {obs.offeringName}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                            {obs.evidenceType}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {obs.region} • {obs.observationPeriod}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">{obs.title}</h4>
                      </div>

                      {/* De-identified org badge */}
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                        Institutional Peer (De-identified)
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                      {obs.redactedSummary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-800/60">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Moderator Redacted & Verified • No Client PII Exposed</span>
                      </div>

                      {/* Sub-60s Withdrawal Button for the Author */}
                      {isAuthorOrOrg && (
                        <button
                          onClick={() => withdrawObservation(obs.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-all font-medium text-xs"
                          title="Simulate immediate sub-60s invalidation and purge from community feed"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Withdraw (Sub-60s Invalidation)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MODERATION QUEUE */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-amber-900/40 rounded-2xl p-4 text-xs text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Learning Moderator Boundary:</strong> You have authorization to review proposed contributions, redact proprietary customer/contract details, and publish safe de-identified summaries.
              </span>
            </div>
            {!isModerator && (
              <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                Read-Only Preview (Switch to Moderator below)
              </span>
            )}
          </div>

          {pendingQueue.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Moderation Queue is Clear!</h4>
              <p className="text-xs text-slate-400">
                All submitted market observations have been reviewed and published or sanitized.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingQueue.map(obs => (
                <div 
                  key={obs.id}
                  className="bg-slate-900 border border-amber-800/50 rounded-2xl p-6 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                          STATUS: {obs.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Source Tenant: <strong className="text-white">{obs.tenantName}</strong>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1.5">{obs.title}</h3>
                    </div>

                    <button
                      onClick={() => handleOpenModeration(obs)}
                      className="px-3 py-1.5 rounded-lg bg-azentio-600 hover:bg-azentio-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      <span>Review & Redact</span>
                    </button>
                  </div>

                  {/* Private Raw Summary */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">
                      Private Client Draft (Original Unredacted Content):
                    </span>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                      {obs.rawSummary}
                    </div>
                  </div>

                  {/* Automated PII Scanner Warnings */}
                  {obs.piiWarnings.length > 0 && (
                    <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Automated Privacy Scanner Flags ({obs.piiWarnings.length}):</span>
                      </div>
                      {obs.piiWarnings.map((w, idx) => (
                        <p key={idx} className="text-[11px] text-amber-200/90 pl-5">• {w}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PRODUCT OWNER IMPROVEMENT LOOP */}
      {activeTab === 'product_backlog' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-cyan-900/40 rounded-2xl p-4 text-xs text-cyan-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Closing the Loop (Section 10):</strong> Product Owners map synthesized community themes into concrete product improvement ideas with public status updates.
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {improvements.map(idea => (
              <div 
                key={idea.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                        {idea.offeringName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        Priority: {idea.priority}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">{idea.title}</h3>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Responsible Team: <strong className="text-white">{idea.ownerTeam}</strong>
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="shrink-0">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Improvement Status</span>
                    <select
                      value={idea.status}
                      disabled={!isProductOwner}
                      onChange={(e) => updateImprovementStatus(idea.id, e.target.value as ImprovementStatus, 'Status updated via PO triage panel')}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold focus:outline-none focus:border-cyan-500 disabled:opacity-80"
                    >
                      <option value="PROPOSED">PROPOSED</option>
                      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                      <option value="PLANNED">PLANNED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RELEASED">RELEASED</option>
                      <option value="NOT_PROCEEDING">NOT_PROCEEDING</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Problem Statement</span>
                    <p className="text-slate-300 leading-relaxed">{idea.problemStatement}</p>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase block font-semibold">Proposed Target Outcome</span>
                    <p className="text-slate-300 leading-relaxed">{idea.proposedOutcome}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Supported by <strong>{idea.supportingEvidenceCount} distinct client observations</strong></span>
                  </div>
                  <span className="text-[11px] font-mono">Last Audit Update: {new Date(idea.lastUpdate).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODERATION REDACTION MODAL */}
      {editingObs && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Sanitize & Approve Observation</h3>
                <span className="text-xs text-slate-400 font-mono">ID: {editingObs.id} • Tenant: {editingObs.tenantName}</span>
              </div>
              <button 
                onClick={() => setEditingObs(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Proposed Shared Text (Redact all corporate customer names and exact account codes):
                </label>
                <textarea
                  rows={4}
                  value={redactedDraft}
                  onChange={e => setRedactedDraft(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Moderator Audit Notes:
                </label>
                <input
                  type="text"
                  value={moderatorNotes}
                  onChange={e => setModeratorNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold"
              >
                Reject Submission
              </button>
              <button
                onClick={handleApprove}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Approve & Publish De-Identified
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
