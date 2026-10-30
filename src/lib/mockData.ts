import { 
  TenantOrganization, 
  Offering, 
  Observation, 
  CommunityTheme, 
  ImprovementIdea, 
  AuditEvent,
  FederatedTrainingRound
} from '@/types';

export const INITIAL_TENANTS: TenantOrganization[] = [
  {
    id: 'org-apex',
    name: 'Apex Commercial Bank',
    code: 'APEX',
    industry: 'Commercial & Retail Banking',
    region: 'APAC (Singapore)',
    tier: 'Tier-1 Bank',
    entitledOfferings: ['financial-analysis-ai', 'credit-underwrite-ai', 'aira-copilot'],
    activeMembers: 24,
    consentToCollectiveLearning: true,
  },
  {
    id: 'org-horizon',
    name: 'Horizon Islamic Banking Corp',
    code: 'HIBC',
    industry: 'Islamic Banking & Trade Finance',
    region: 'Middle East (Dubai)',
    tier: 'Tier-1 Bank',
    entitledOfferings: ['financial-analysis-ai', 'credit-underwrite-ai', 'aml-sentinel-ai'],
    activeMembers: 18,
    consentToCollectiveLearning: true,
  },
  {
    id: 'org-vanguard',
    name: 'Vanguard Trust & Investment Bank',
    code: 'VTIB',
    industry: 'Corporate & SME Credit',
    region: 'Europe (London)',
    tier: 'Enterprise',
    entitledOfferings: ['financial-analysis-ai', 'aml-sentinel-ai', 'aira-copilot'],
    activeMembers: 31,
    consentToCollectiveLearning: true,
  },
];

export const OFFERINGS: Offering[] = [
  {
    id: 'financial-analysis-ai',
    name: 'Financial Analysis Intelligence',
    tagline: 'Deep balance sheet contextualization & automated cash-flow anomaly detection',
    category: 'Banking AI',
    description: 'Autonomous financial spreading, cash flow variance modeling, and seasonal cyclicality analysis for corporate and SME underwriting.',
    features: [
      'Automated Multi-Year Financial Spreading',
      'Seasonality-Aware Cash Flow Normalization',
      'Working Capital Cycle Sensitivity Scoring',
      'Explainable Financial Ratio Decomposition'
    ],
    metrics: [
      { label: 'Spreading Speedup', value: '8.4x' },
      { label: 'Anomaly Recall', value: '94.2%' },
      { label: 'Synthetic Benchmark', value: 'Tier-1 Ready' }
    ],
    isEntitledByDefault: true,
  },
  {
    id: 'credit-underwrite-ai',
    name: 'Intelligent Credit & Lending Underwriting',
    tagline: 'Explainable credit assessment with dynamic macro-economic sensitivity',
    category: 'Lending',
    description: 'Empowers credit officers with automated covenant recommendations, default probability simulations, and transparent decision audit trails.',
    features: [
      'Deterministic Covenant Generation',
      'Synthetic Stress-Testing Scenarios',
      'Multi-Tier Approval Routing',
      'De-identified Peer Benchmarking'
    ],
    metrics: [
      { label: 'Turnaround Time', value: '-65%' },
      { label: 'Model Accuracy', value: '91.8%' },
      { label: 'Explainability Score', value: '100%' }
    ],
    isEntitledByDefault: true,
  },
  {
    id: 'aml-sentinel-ai',
    name: 'Sentinel AML & Fraud Detection',
    tagline: 'Graph-powered behavioral anomaly detection and rapid false-positive reduction',
    category: 'Compliance',
    description: 'Reduces compliance fatigue with neural network graph clustering, sanction list screening, and automated SAR narrative generation.',
    features: [
      'Graph-Based Entity Resolution',
      'False-Positive Filtering Engine',
      'Autonomous SAR Filing Narratives',
      'Sub-Second Transaction Risk Triage'
    ],
    metrics: [
      { label: 'False Positives', value: '-72%' },
      { label: 'Triage Latency', value: '<45ms' },
      { label: 'Detection Rate', value: '99.1%' }
    ],
    isEntitledByDefault: false,
  },
  {
    id: 'aira-copilot',
    name: 'AIRA Enterprise Banker Copilot',
    tagline: 'Governed conversational assistant powered by enterprise compliance guardrails',
    category: 'Agentic',
    description: 'Intelligent copilot for frontline relationship managers, analysts, and underwriters, strictly bounded by role-based entitlement filters.',
    features: [
      'Multi-Tenant Data Isolation Guard',
      'Deterministic Citation Attribution',
      'Regulatory Boundary Enforcement',
      'Sub-60s Invalidation Integration'
    ],
    metrics: [
      { label: 'Response Latency', value: '1.1s' },
      { label: 'Zero-Hallucination Guard', value: 'Active' },
      { label: 'Permitted Scope', value: '100% Enforced' }
    ],
    isEntitledByDefault: true,
  }
];

export const INITIAL_OBSERVATIONS: Observation[] = [
  {
    id: 'obs-001',
    title: 'Inconsistent SME cash-flow volatility flags during Q4 retail inventory buildup',
    tenantId: 'org-apex',
    tenantName: 'Apex Commercial Bank',
    authorId: 'user-apex-01',
    authorName: 'Senior SME Credit Specialist',
    offeringId: 'financial-analysis-ai',
    offeringName: 'Financial Analysis Intelligence',
    industry: 'Commercial Banking',
    region: 'APAC',
    observationPeriod: 'Q3-Q4 2025',
    evidenceType: 'SME Volatility',
    confidence: 'High (Verified Data)',
    rawSummary: 'During October-November audit of 140 retail SME borrowers (Account refs AC-99214 to AC-99400), our analysts noted that working capital drawdowns exceeded 45% of annual credit limits. The default model flagged these as high distress, whereas historical repayment showed 98.8% recovery by January post-holiday liquidation.',
    redactedSummary: 'Analysis across 140+ retail SME borrowers revealed that temporary working capital surges during peak seasonal inventory buildup are frequently misclassified as elevated liquidity distress, despite historical seasonal recovery following sales cycles.',
    status: 'APPROVED_PUBLISHED',
    sharingScope: 'PROPOSED_COMMUNITY_SHARING',
    piiChecked: true,
    piiWarnings: ['Account number pattern detected and redacted', 'Specific date range normalized'],
    moderatorNotes: 'Redacted proprietary borrower reference IDs and specific financial ratios. Published as de-identified cross-client observation.',
    createdAt: '2026-10-12T09:30:00Z',
    updatedAt: '2026-10-13T14:20:00Z'
  },
  {
    id: 'obs-002',
    title: 'Agricultural export seasonal harvest cycles treated as structural liquidity strain',
    tenantId: 'org-horizon',
    tenantName: 'Horizon Islamic Banking Corp',
    authorId: 'user-horizon-01',
    authorName: 'Head of Agri-Trade Underwriting',
    offeringId: 'financial-analysis-ai',
    offeringName: 'Financial Analysis Intelligence',
    industry: 'Islamic Banking & Trade Finance',
    region: 'Middle East & North Africa',
    observationPeriod: 'Q2-Q3 2025',
    evidenceType: 'Model Inconsistency',
    confidence: 'High (Verified Data)',
    rawSummary: 'Our Murabaha trade finance portfolio for regional dates and grain exporters showed synthetic risk scores dropping by 18 points between May and July due to pre-harvest receivable lags. Murabaha contracts 7712-A and 7780-B were incorrectly flagged for manual intervention.',
    redactedSummary: 'Trade finance portfolios for commodity and agricultural exporters experience recurring multi-month receivable lags prior to harvest realization. Baseline variance algorithms penalize these cyclical gaps as operational deterioration rather than normal seasonal rhythms.',
    status: 'APPROVED_PUBLISHED',
    sharingScope: 'PROPOSED_COMMUNITY_SHARING',
    piiChecked: true,
    piiWarnings: ['Internal contract numbers masked', 'Regional identifiers generalized'],
    moderatorNotes: 'Verified no client identifiers present. Anonymized to community knowledge repository.',
    createdAt: '2026-10-18T11:15:00Z',
    updatedAt: '2026-10-19T16:45:00Z'
  },
  {
    id: 'obs-003',
    title: 'Construction contractor spring supply procurement flagged as credit rating decay',
    tenantId: 'org-vanguard',
    tenantName: 'Vanguard Trust & Investment Bank',
    authorId: 'user-vanguard-01',
    authorName: 'Commercial Credit Risk Lead',
    offeringId: 'financial-analysis-ai',
    offeringName: 'Financial Analysis Intelligence',
    industry: 'Corporate Credit',
    region: 'Europe',
    observationPeriod: 'Q1-Q2 2025',
    evidenceType: 'Production Edge Case',
    confidence: 'High (Verified Data)',
    rawSummary: 'Reviewed 65 Tier-2 commercial construction contractors. Bulk purchasing of cement and rebar in March causes 90-day liquidity ratios to dip below threshold. Client names such as BuildCorp UK and Thames Infra triggered false covenants.',
    redactedSummary: 'Commercial construction contractors exhibiting concentrated early-year material procurement experience temporary 90-day liquidity ratio contractions that trigger false-positive covenant warnings before project billing milestones.',
    status: 'APPROVED_PUBLISHED',
    sharingScope: 'PROPOSED_COMMUNITY_SHARING',
    piiChecked: true,
    piiWarnings: ['Client names BuildCorp UK and Thames Infra stripped', 'Specific transaction thresholds masked'],
    moderatorNotes: 'Stripped corporate entities. Cross-client value confirmed.',
    createdAt: '2026-10-22T08:00:00Z',
    updatedAt: '2026-10-23T10:10:00Z'
  },
  {
    id: 'obs-004',
    title: 'Internal benchmark testing on seasonal working capital variance',
    tenantId: 'org-apex',
    tenantName: 'Apex Commercial Bank',
    authorId: 'user-apex-02',
    authorName: 'Junior Risk Analyst',
    offeringId: 'credit-underwrite-ai',
    offeringName: 'Intelligent Credit & Lending Underwriting',
    industry: 'Commercial Banking',
    region: 'APAC',
    observationPeriod: 'Current Month',
    evidenceType: 'Customer Feedback',
    confidence: 'Preliminary',
    rawSummary: 'Internal testing on new SME borrowers. We noticed discrepancy in loan term recommendation when collateral evaluation includes fluctuating inventory values.',
    status: 'DRAFT',
    sharingScope: 'WITHIN_ORGANIZATION',
    piiChecked: false,
    piiWarnings: [],
    createdAt: '2026-10-28T14:00:00Z',
    updatedAt: '2026-10-28T14:00:00Z'
  }
];

export const INITIAL_THEMES: CommunityTheme[] = [
  {
    id: 'theme-seasonality-sme',
    title: 'Seasonality Context in SME Cash Flow & Working Capital Cycles',
    offeringId: 'financial-analysis-ai',
    offeringName: 'Financial Analysis Intelligence',
    supportingObservationCount: 3,
    distinctOrgCount: 3, // Meets k >= 3 threshold: Apex, Horizon, Vanguard!
    observationPeriod: '2025 - 2026 Multi-Region',
    confidenceLabel: 'High (Cross-Institutional Consensus)',
    summary: 'Multiple independent financial institutions report that cyclical inventory procurement (retail holiday buildup, agricultural pre-harvest, and construction seasonal starts) causes temporary liquidity ratio dips that standard linear models misinterpret as credit deterioration. Recommends implementing seasonality-aware comparative normalization.',
    status: 'ACTIVE',
    linkedImprovementIdeaId: 'idea-seasonality-norm',
    updatedAt: '2026-10-24T12:00:00Z'
  }
];

export const INITIAL_IMPROVEMENTS: ImprovementIdea[] = [
  {
    id: 'idea-seasonality-norm',
    title: 'Seasonality-Aware Comparative Analysis & Cyclical Normalization Engine',
    problemStatement: 'Current automated financial spreading and ratio analysis engines treat intra-year working capital swings as potential default indicators, generating false covenant alerts for seasonal industries.',
    offeringId: 'financial-analysis-ai',
    offeringName: 'Financial Analysis Intelligence',
    themeId: 'theme-seasonality-sme',
    supportingEvidenceCount: 3,
    proposedOutcome: 'Incorporate sector-specific cyclical smoothing filters and cross-year quarter-on-quarter comparisons before triggering liquidity variance flags.',
    ownerTeam: 'Azentio Core Banking AI & Risk Product Team',
    priority: 'HIGH',
    status: 'UNDER_REVIEW', // As explicitly described in Hackathon doc!
    statusNotes: 'Under review with Engineering architecture team. Synthetic validation planned in upcoming sprint.',
    lastUpdate: '2026-10-25T17:30:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'audit-001',
    timestamp: '2026-10-13T14:20:00Z',
    actorName: 'Sarah Jenkins (Moderator)',
    actorRole: 'LEARNING_MODERATOR',
    action: 'OBSERVATION_APPROVED_AND_REDACTED',
    resourceType: 'Observation',
    resourceId: 'obs-001',
    details: 'Redacted sensitive account refs AC-99214 to AC-99400. Approved for Community Sharing feed.'
  },
  {
    id: 'audit-002',
    timestamp: '2026-10-19T16:45:00Z',
    actorName: 'Sarah Jenkins (Moderator)',
    actorRole: 'LEARNING_MODERATOR',
    action: 'OBSERVATION_APPROVED_AND_REDACTED',
    resourceType: 'Observation',
    resourceId: 'obs-002',
    details: 'Masked proprietary trade contract numbers 7712-A and 7780-B. Published to Collective Learning Hub.'
  },
  {
    id: 'audit-003',
    timestamp: '2026-10-23T10:10:00Z',
    actorName: 'David Chen (Moderator)',
    actorRole: 'LEARNING_MODERATOR',
    action: 'OBSERVATION_APPROVED_AND_REDACTED',
    resourceType: 'Observation',
    resourceId: 'obs-003',
    details: 'Sanitized contractor commercial client names BuildCorp UK and Thames Infra. Approved.'
  },
  {
    id: 'audit-004',
    timestamp: '2026-10-24T12:00:00Z',
    actorName: 'System / Community Aggregator',
    actorRole: 'PORTAL_ADMIN',
    action: 'THEME_SYNTHESIZED_K_THRESHOLD_MET',
    resourceType: 'Theme',
    resourceId: 'theme-seasonality-sme',
    details: 'Aggregation threshold verified: 3 distinct participating organizations (Apex, Horizon, Vanguard). Theme activated.'
  },
  {
    id: 'audit-005',
    timestamp: '2026-10-25T17:30:00Z',
    actorName: 'Marcus Vance (Product Owner)',
    actorRole: 'PRODUCT_OWNER',
    action: 'IMPROVEMENT_IDEA_CREATED',
    resourceType: 'ImprovementIdea',
    resourceId: 'idea-seasonality-norm',
    details: 'Linked theme-seasonality-sme to Financial Analysis Intelligence roadmap. Status set to UNDER_REVIEW.'
  }
];

export const INITIAL_FEDERATED_ROUNDS: FederatedTrainingRound[] = [
  {
    round: 1,
    participants: ['Apex Bank Node', 'Horizon Islamic Node', 'Vanguard Trust Node'],
    weightMethod: 'FedAvg (Sample Weighted)',
    globalLoss: 0.684,
    holdoutAccuracy: 74.2,
    differentialPrivacyEpsilon: 0.85,
    differentialPrivacyDelta: '1e-5',
    status: 'COMPLETED',
    timestamp: '2026-10-26T10:00:00Z'
  },
  {
    round: 2,
    participants: ['Apex Bank Node', 'Horizon Islamic Node', 'Vanguard Trust Node'],
    weightMethod: 'FedAvg (Sample Weighted)',
    globalLoss: 0.492,
    holdoutAccuracy: 81.5,
    differentialPrivacyEpsilon: 1.12,
    differentialPrivacyDelta: '1e-5',
    status: 'COMPLETED',
    timestamp: '2026-10-27T11:30:00Z'
  },
  {
    round: 3,
    participants: ['Apex Bank Node', 'Horizon Islamic Node', 'Vanguard Trust Node'],
    weightMethod: 'FedAvg (Sample Weighted)',
    globalLoss: 0.328,
    holdoutAccuracy: 86.9,
    differentialPrivacyEpsilon: 1.35,
    differentialPrivacyDelta: '1e-5',
    status: 'COMPLETED',
    timestamp: '2026-10-28T14:15:00Z'
  },
  {
    round: 4,
    participants: ['Apex Bank Node', 'Horizon Islamic Node', 'Vanguard Trust Node'],
    weightMethod: 'FedAvg (Sample Weighted)',
    globalLoss: 0.245,
    holdoutAccuracy: 89.6,
    differentialPrivacyEpsilon: 1.48,
    differentialPrivacyDelta: '1e-5',
    status: 'REGISTERED_CANDIDATE',
    timestamp: '2026-10-29T16:00:00Z'
  }
];
