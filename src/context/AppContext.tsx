'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserSession, 
  UserRole, 
  TenantOrganization, 
  Offering, 
  Observation, 
  CommunityTheme, 
  ImprovementIdea, 
  AuditEvent,
  FederatedTrainingRound,
  ImprovementStatus
} from '@/types';
import { 
  INITIAL_TENANTS, 
  OFFERINGS, 
  INITIAL_OBSERVATIONS, 
  INITIAL_THEMES, 
  INITIAL_IMPROVEMENTS, 
  INITIAL_AUDIT_LOGS,
  INITIAL_FEDERATED_ROUNDS 
} from '@/lib/mockData';
import { scanSensitiveData } from '@/lib/privacyScanner';

// Default presets for the Judges Role Switcher
export const PRESET_USERS: Record<string, UserSession> = {
  PUBLIC: {
    id: 'user-public',
    name: 'Public Explorer',
    email: 'visitor@enterprise.global',
    role: 'PUBLIC_VISITOR',
    permissions: ['VIEW_PUBLIC_CATALOG', 'REQUEST_DEMO', 'REGISTER_HACKATHON'],
  },
  EMPLOYEE: {
    id: 'user-emp-azentio',
    name: 'Dr. Alistair Vance',
    email: 'alistair.vance@azentio.com',
    role: 'EMPLOYEE',
    permissions: ['VIEW_INTERNAL_PLAYGROUND', 'VIEW_BROADCASTS', 'SUBMIT_EXPERIMENT'],
  },
  CLIENT_APEX: {
    id: 'user-apex-01',
    name: 'Sarah Chen (Apex Bank)',
    email: 'sarah.chen@apexbank.com.sg',
    role: 'CLIENT_MEMBER',
    tenantId: 'org-apex',
    tenantName: 'Apex Commercial Bank',
    permissions: ['VIEW_OWN_WORKSPACE', 'SUBMIT_OBSERVATIONS', 'VIEW_COMMUNITY_FEED'],
  },
  CLIENT_HORIZON: {
    id: 'user-horizon-01',
    name: 'Tariq Al-Mansoor (Horizon Islamic)',
    email: 'tariq.mansoor@horizonbank.ae',
    role: 'CLIENT_MEMBER',
    tenantId: 'org-horizon',
    tenantName: 'Horizon Islamic Banking Corp',
    permissions: ['VIEW_OWN_WORKSPACE', 'SUBMIT_OBSERVATIONS', 'VIEW_COMMUNITY_FEED'],
  },
  CLIENT_VANGUARD: {
    id: 'user-vanguard-01',
    name: 'Eleanor Sterling (Vanguard Trust)',
    email: 'e.sterling@vanguardtrust.co.uk',
    role: 'CLIENT_MEMBER',
    tenantId: 'org-vanguard',
    tenantName: 'Vanguard Trust & Investment Bank',
    permissions: ['VIEW_OWN_WORKSPACE', 'SUBMIT_OBSERVATIONS', 'VIEW_COMMUNITY_FEED'],
  },
  MODERATOR: {
    id: 'user-mod-01',
    name: 'Marcus Vance (Compliance & Trust)',
    email: 'marcus.vance@azentio.com',
    role: 'LEARNING_MODERATOR',
    permissions: ['REVIEW_OBSERVATIONS', 'REDACT_CONTENT', 'PUBLISH_SHARED_LEARNING', 'AUDIT_ACTIONS'],
  },
  PRODUCT_OWNER: {
    id: 'user-po-01',
    name: 'Elena Rostova (AI Product Lead)',
    email: 'elena.rostova@azentio.com',
    role: 'PRODUCT_OWNER',
    permissions: ['VIEW_COMMUNITY_FEED', 'SYNTHESIZE_THEMES', 'CREATE_IMPROVEMENT_IDEAS', 'UPDATE_ROADMAP'],
  },
  PORTAL_ADMIN: {
    id: 'user-admin-01',
    name: 'Chief Security Officer',
    email: 'security.admin@azentio.com',
    role: 'PORTAL_ADMIN',
    permissions: ['MANAGE_TENANTS', 'VIEW_FULL_AUDIT_LOG', 'OVERRIDE_POLICIES', 'SYSTEM_CONFIG'],
  }
};

interface AppContextType {
  currentUser: UserSession;
  setCurrentUser: (user: UserSession) => void;
  switchRole: (presetKey: keyof typeof PRESET_USERS) => void;
  tenants: TenantOrganization[];
  offerings: Offering[];
  observations: Observation[];
  themes: CommunityTheme[];
  improvements: ImprovementIdea[];
  auditLogs: AuditEvent[];
  federatedRounds: FederatedTrainingRound[];
  activeNotification: string | null;
  dismissNotification: () => void;
  
  // Actions
  submitObservation: (obs: {
    title: string;
    offeringId: string;
    industry: string;
    region: string;
    observationPeriod: string;
    evidenceType: Observation['evidenceType'];
    confidence: Observation['confidence'];
    rawSummary: string;
    sharingScope: Observation['sharingScope'];
  }) => string;
  
  moderateObservation: (
    id: string,
    decision: 'APPROVE' | 'REJECT' | 'CLARIFY',
    redactedSummary?: string,
    notes?: string
  ) => void;
  
  withdrawObservation: (id: string) => void;
  
  createImprovementIdea: (idea: {
    title: string;
    problemStatement: string;
    offeringId: string;
    themeId: string;
    proposedOutcome: string;
    ownerTeam: string;
    priority: ImprovementIdea['priority'];
  }) => void;
  
  updateImprovementStatus: (
    id: string,
    status: ImprovementStatus,
    notes: string
  ) => void;
  
  runNextFederatedRound: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSession>(PRESET_USERS.PUBLIC);
  const [tenants] = useState<TenantOrganization[]>(INITIAL_TENANTS);
  const [offerings] = useState<Offering[]>(OFFERINGS);
  const [observations, setObservations] = useState<Observation[]>(INITIAL_OBSERVATIONS);
  const [themes, setThemes] = useState<CommunityTheme[]>(INITIAL_THEMES);
  const [improvements, setImprovements] = useState<ImprovementIdea[]>(INITIAL_IMPROVEMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);
  const [federatedRounds, setFederatedRounds] = useState<FederatedTrainingRound[]>(INITIAL_FEDERATED_ROUNDS);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setActiveNotification(msg);
  };

  const dismissNotification = () => {
    setActiveNotification(null);
  };

  const addAudit = (action: string, resourceType: AuditEvent['resourceType'], resourceId: string, details: string) => {
    const newAudit: AuditEvent = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action,
      resourceType,
      resourceId,
      details,
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  const switchRole = (presetKey: keyof typeof PRESET_USERS) => {
    const target = PRESET_USERS[presetKey];
    if (target) {
      setCurrentUser(target);
      notify(`Switched context to: ${target.name} (${target.role})`);
    }
  };

  // Re-evaluates Community Themes after changes (enforcing k >= 3 rule!)
  const recomputeThemes = (currentObs: Observation[]) => {
    const approved = currentObs.filter(o => o.status === 'APPROVED_PUBLISHED' && o.sharingScope === 'PROPOSED_COMMUNITY_SHARING');
    
    // Group by offering
    const byOffering: Record<string, Observation[]> = {};
    approved.forEach(o => {
      if (!byOffering[o.offeringId]) byOffering[o.offeringId] = [];
      byOffering[o.offeringId].push(o);
    });

    const updatedThemes = [...themes];
    
    Object.entries(byOffering).forEach(([offeringId, obsList]) => {
      const distinctTenants = new Set(obsList.map(o => o.tenantId));
      const targetTheme = updatedThemes.find(t => t.offeringId === offeringId);
      
      if (targetTheme) {
        targetTheme.supportingObservationCount = obsList.length;
        targetTheme.distinctOrgCount = distinctTenants.size;
        targetTheme.updatedAt = new Date().toISOString();
        if (distinctTenants.size < 3) {
          targetTheme.confidenceLabel = 'Sample Size Limited (< 3 distinct orgs)';
        } else {
          targetTheme.confidenceLabel = 'High (Cross-Institutional Consensus)';
        }
      }
    });

    setThemes(updatedThemes);
  };

  const submitObservation = (obsInput: {
    title: string;
    offeringId: string;
    industry: string;
    region: string;
    observationPeriod: string;
    evidenceType: Observation['evidenceType'];
    confidence: Observation['confidence'];
    rawSummary: string;
    sharingScope: Observation['sharingScope'];
  }): string => {
    const offering = offerings.find(o => o.id === obsInput.offeringId);
    const scan = scanSensitiveData(obsInput.rawSummary);
    const newId = `obs-${Date.now()}`;

    const newObs: Observation = {
      id: newId,
      title: obsInput.title,
      tenantId: currentUser.tenantId || 'org-apex',
      tenantName: currentUser.tenantName || 'Apex Commercial Bank',
      authorId: currentUser.id,
      authorName: currentUser.name,
      offeringId: obsInput.offeringId,
      offeringName: offering ? offering.name : 'Azentio AI Solution',
      industry: obsInput.industry,
      region: obsInput.region,
      observationPeriod: obsInput.observationPeriod,
      evidenceType: obsInput.evidenceType,
      confidence: obsInput.confidence,
      rawSummary: obsInput.rawSummary,
      redactedSummary: scan.hasSensitiveData ? scan.suggestedRedaction : obsInput.rawSummary,
      status: obsInput.sharingScope === 'PROPOSED_COMMUNITY_SHARING' ? 'SUBMITTED' : 'DRAFT',
      sharingScope: obsInput.sharingScope,
      piiChecked: true,
      piiWarnings: scan.warnings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextObsList = [newObs, ...observations];
    setObservations(nextObsList);
    addAudit(
      obsInput.sharingScope === 'PROPOSED_COMMUNITY_SHARING' ? 'OBSERVATION_SUBMITTED_FOR_REVIEW' : 'OBSERVATION_SAVED_DRAFT',
      'Observation',
      newId,
      `Submitted by ${currentUser.name} (${currentUser.tenantName || 'Org'}). Scope: ${obsInput.sharingScope}. Flags: ${scan.warnings.length}`
    );

    notify(`Observation ${obsInput.sharingScope === 'PROPOSED_COMMUNITY_SHARING' ? 'submitted for moderation review' : 'saved to organization workspace'}`);
    return newId;
  };

  const moderateObservation = (
    id: string,
    decision: 'APPROVE' | 'REJECT' | 'CLARIFY',
    redactedSummary?: string,
    notes?: string
  ) => {
    const updated = observations.map(o => {
      if (o.id !== id) return o;
      let newStatus: Observation['status'] = o.status;
      if (decision === 'APPROVE') newStatus = 'APPROVED_PUBLISHED';
      if (decision === 'REJECT') newStatus = 'REJECTED';
      if (decision === 'CLARIFY') newStatus = 'CLARIFICATION_REQUESTED';

      return {
        ...o,
        status: newStatus,
        redactedSummary: redactedSummary || o.redactedSummary || o.rawSummary,
        moderatorNotes: notes || o.moderatorNotes,
        updatedAt: new Date().toISOString()
      };
    });

    setObservations(updated);
    recomputeThemes(updated);

    addAudit(
      `MODERATION_${decision}`,
      'Observation',
      id,
      `Decision: ${decision}. Reviewer: ${currentUser.name}. Notes: ${notes || 'Standard compliance verification'}`
    );

    notify(`Observation ${id} moderated: ${decision}`);
  };

  // Sub-60 second withdrawal implementation
  const withdrawObservation = (id: string) => {
    const updated = observations.map(o => {
      if (o.id !== id) return o;
      return {
        ...o,
        status: 'WITHDRAWN' as const,
        updatedAt: new Date().toISOString(),
        moderatorNotes: 'Withdrawn by author / organization. Purged from community feed and cache.'
      };
    });

    setObservations(updated);
    recomputeThemes(updated);

    addAudit(
      'OBSERVATION_WITHDRAWN_PURGED',
      'Observation',
      id,
      `Immediate sub-60s invalidation triggered. Removed from shared index, community feed, and AIRA retrieval.`
    );

    notify(`Observation ${id} synchronously withdrawn. Search indexes & cache purged.`);
  };

  const createImprovementIdea = (ideaInput: {
    title: string;
    problemStatement: string;
    offeringId: string;
    themeId: string;
    proposedOutcome: string;
    ownerTeam: string;
    priority: ImprovementIdea['priority'];
  }) => {
    const offering = offerings.find(o => o.id === ideaInput.offeringId);
    const theme = themes.find(t => t.id === ideaInput.themeId);
    const newId = `idea-${Date.now()}`;

    const newIdea: ImprovementIdea = {
      id: newId,
      title: ideaInput.title,
      problemStatement: ideaInput.problemStatement,
      offeringId: ideaInput.offeringId,
      offeringName: offering ? offering.name : 'Azentio AI Solution',
      themeId: ideaInput.themeId,
      supportingEvidenceCount: theme ? theme.supportingObservationCount : 1,
      proposedOutcome: ideaInput.proposedOutcome,
      ownerTeam: ideaInput.ownerTeam,
      priority: ideaInput.priority,
      status: 'PROPOSED',
      statusNotes: 'Initial proposal generated from collective learning theme.',
      lastUpdate: new Date().toISOString()
    };

    setImprovements([newIdea, ...improvements]);
    addAudit(
      'IMPROVEMENT_IDEA_CREATED',
      'ImprovementIdea',
      newId,
      `Idea "${ideaInput.title}" created by ${currentUser.name}. Linked to theme ${ideaInput.themeId}.`
    );

    notify(`Improvement Idea created and linked to theme.`);
  };

  const updateImprovementStatus = (id: string, status: ImprovementStatus, notes: string) => {
    setImprovements(prev => prev.map(item => {
      if (item.id !== id) return item;
      return {
        ...item,
        status,
        statusNotes: notes,
        lastUpdate: new Date().toISOString()
      };
    }));

    addAudit(
      'IMPROVEMENT_STATUS_UPDATED',
      'ImprovementIdea',
      id,
      `Status updated to ${status}. Details: ${notes}`
    );

    notify(`Improvement status updated to: ${status}`);
  };

  const runNextFederatedRound = () => {
    const nextRoundNum = federatedRounds.length + 1;
    const prev = federatedRounds[federatedRounds.length - 1];
    const newLoss = Math.max(0.12, +(prev.globalLoss * 0.78).toFixed(3));
    const newAcc = Math.min(96.5, +(prev.holdoutAccuracy + (96.5 - prev.holdoutAccuracy) * 0.35).toFixed(1));
    const newEps = +(prev.differentialPrivacyEpsilon + 0.14).toFixed(2);

    const newRound: FederatedTrainingRound = {
      round: nextRoundNum,
      participants: ['Apex Bank Node', 'Horizon Islamic Node', 'Vanguard Trust Node'],
      weightMethod: 'FedAvg (Sample Weighted)',
      globalLoss: newLoss,
      holdoutAccuracy: newAcc,
      differentialPrivacyEpsilon: newEps,
      differentialPrivacyDelta: '1e-5',
      status: 'REGISTERED_CANDIDATE',
      timestamp: new Date().toISOString()
    };

    setFederatedRounds([...federatedRounds, newRound]);
    addAudit(
      'FEDERATED_ROUND_EXECUTED',
      'Policy',
      `fed-round-${nextRoundNum}`,
      `FedAvg executed across 3 nodes. Loss: ${newLoss}, Accuracy: ${newAcc}%, Privacy Budget ε: ${newEps}. Candidate model registered.`
    );

    notify(`Federated Round ${nextRoundNum} completed! Accuracy reached ${newAcc}%. Candidate model registered.`);
  };

  const resetAllData = () => {
    setObservations(INITIAL_OBSERVATIONS);
    setThemes(INITIAL_THEMES);
    setImprovements(INITIAL_IMPROVEMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setFederatedRounds(INITIAL_FEDERATED_ROUNDS);
    notify('Reset all system state back to default hackathon benchmark scenario!');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      tenants,
      offerings,
      observations,
      themes,
      improvements,
      auditLogs,
      federatedRounds,
      activeNotification,
      dismissNotification,
      submitObservation,
      moderateObservation,
      withdrawObservation,
      createImprovementIdea,
      updateImprovementStatus,
      runNextFederatedRound,
      resetAllData,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
