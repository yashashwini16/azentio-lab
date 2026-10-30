'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Terminal, 
  Lock, 
  Search, 
  Filter, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export const AuditLogView: React.FC = () => {
  const { auditLogs, currentUser } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.actorName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5" />
            IAM-01 & IAM-02 Security & Audit Trail
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Governance & Operational Audit Stream
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Immutable log of server-side permissions, tenant boundaries, moderation redactions, sub-60s withdrawals, and aggregation thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-mono">
            RBAC Guard: <strong>{currentUser.role}</strong>
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter audit actions by actor, keyword, or resource..."
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor & Role</th>
                <th className="p-3.5">Audited Action</th>
                <th className="p-3.5">Target Resource</th>
                <th className="p-3.5">Security & Compliance Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="p-3.5 text-slate-500 whitespace-nowrap text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="text-white font-bold block">{log.actorName}</span>
                    <span className="text-[10px] text-slate-400 font-sans block">{log.actorRole}</span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      log.action.includes('APPROVED') ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                      log.action.includes('WITHDRAWN') ? 'bg-rose-950 text-rose-300 border-rose-800' :
                      log.action.includes('THEME') ? 'bg-purple-950 text-purple-300 border-purple-800' :
                      log.action.includes('FEDERATED') ? 'bg-amber-950 text-amber-300 border-amber-800' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 whitespace-nowrap">
                    {log.resourceType}: <strong className="text-white">{log.resourceId}</strong>
                  </td>
                  <td className="p-3.5 text-slate-300 font-sans text-xs max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
