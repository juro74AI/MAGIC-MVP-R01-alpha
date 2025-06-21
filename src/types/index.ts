export interface Application {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  entity: string;
  ownerTeam: string;
  applicationOwner: string;
  environment: 'Development' | 'Staging' | 'Production' | 'Testing';
  status: 'Draft' | 'Production' | 'Decom';
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  servers: Server[];
  vulnerabilities: VulnerabilityCount;
  serviceAccounts: ServiceAccount[];
  iamCompliance: IAMCompliance;
}

export interface Server {
  id: string;
  name: string;
  osVersion: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

export interface VulnerabilityCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface ServiceAccount {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
}

export interface IAMCompliance {
  iamConnection: boolean;
  directoryConnection: boolean;
  pamCoverage: boolean;
  reviewToolsConnection: boolean;
  overallScore: number;
}

export interface ApplicationFormData {
  name: string;
  shortDescription: string;
  entity: string;
  ownerTeam: string;
  applicationOwner: string;
  environment: Application['environment'];
  status: Application['status'];
  customFields: Record<string, any>;
}

export interface DashboardStats {
  totalApplications: number;
  applicationsByStatus: Record<string, number>;
  applicationsByEnvironment: Record<string, number>;
  complianceScore: number;
  totalVulnerabilities: number;
}