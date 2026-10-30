export type UserRole = 
  | 'PUBLIC_VISITOR'
  | 'EMPLOYEE'
  | 'CLIENT_MEMBER'
  | 'CLIENT_ADMIN'
  | 'LEARNING_MODERATOR'
  | 'PRODUCT_OWNER'
  | 'PORTAL_ADMIN';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId?: string; // Empty for public or employee
  tenantName?: string;
  avatar?: string;
  permissions: string[];
}

export interface TenantOrganization {
  id: string;
  name: string;
  code: string;
  industry: string;
  region: string;
  tier: 'Enterprise' | 'Tier-1 Bank' | 'Regional';
  entitledOfferings: string[];
  activeMembers: number;
  consentToCollectiveLearning: boolean;
}

export interface Offering {
  id: string;
  name: string;
  tagline: string;
  category: 'Banking AI' | 'Lending' | 'Compliance' | 'Agentic';
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  isEntitledByDefault?: boolean;
}

export type ObservationStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'APPROVED_PUBLISHED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'CLARIFICATION_REQUESTED';

export type SharingScope = 
  | 'PRIVATE_TO_AUTHOR'
  | 'WITHIN_ORGANIZATION'
  | 'PROPOSED_COMMUNITY_SHARING';

export interface Observation {
  id: string;
  title: string;
  tenantId: string;
  tenantName: string;
  authorId: string;
  authorName: string;
  offeringId: string;
  offeringName: string;
  industry: string;
  region: string;
  observationPeriod: string;
  evidenceType: 'Production Edge Case' | 'Customer Feedback' | 'Regulatory Friction' | 'Model Inconsistency' | 'SME Volatility';
  confidence: 'High (Verified Data)' | 'Medium (Recurring)' | 'Preliminary';
  rawSummary: string; // Private, strictly tenant/moderator only
  redactedSummary?: string; // Anonymized, public for community
  status: ObservationStatus;
  sharingScope: SharingScope;
  piiChecked: boolean;
  piiWarnings: string[];
  moderatorNotes?: string;
  clarificationRequest?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityTheme {
  id: string;
  title: string;
  offeringId: string;
  offeringName: string;
  supportingObservationCount: number;
  distinctOrgCount: number; // Must be >= 3 to satisfy k-anonymity
  observationPeriod: string;
  confidenceLabel: string;
  summary: string;
  status: 'ACTIVE' | 'ARCHIVED';
  linkedImprovementIdeaId?: string;
  updatedAt: string;
}

export type ImprovementStatus = 
  | 'PROPOSED'
  | 'UNDER_REVIEW'
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'RELEASED'
  | 'NOT_PROCEEDING';

export interface ImprovementIdea {
  id: string;
  title: string;
  problemStatement: string;
  offeringId: string;
  offeringName: string;
  themeId: string;
  supportingEvidenceCount: number;
  proposedOutcome: string;
  ownerTeam: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: ImprovementStatus;
  statusNotes: string;
  lastUpdate: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  resourceType: 'Observation' | 'Theme' | 'ImprovementIdea' | 'Membership' | 'Policy';
  resourceId: string;
  details: string;
}

export interface FederatedTrainingRound {
  round: number;
  participants: string[];
  weightMethod: 'FedAvg (Sample Weighted)' | 'FedProx';
  globalLoss: number;
  holdoutAccuracy: number;
  differentialPrivacyEpsilon: number; // ε
  differentialPrivacyDelta: string;   // δ e.g. 1e-5
  status: 'COMPLETED' | 'VALIDATING' | 'REGISTERED_CANDIDATE';
  timestamp: string;
}
