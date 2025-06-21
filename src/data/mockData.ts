import { Application, DashboardStats } from '../types';

export const generateAppCode = (): string => {
  const prefix = 'APP';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const mockApplications: Application[] = [
  {
    id: '1',
    code: 'APP123ABC',
    name: 'Customer Portal',
    shortDescription: 'Web portal for customer self-service and account management',
    entity: 'Digital Services',
    ownerTeam: 'Frontend Team',
    applicationOwner: 'Sarah Johnson',
    environment: 'Production',
    status: 'Production',
    customFields: {
      businessCriticality: 'High',
      dataClassification: 'Confidential'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-12-10T14:20:00Z',
    servers: [
      { id: 's1', name: 'web-prod-01', osVersion: 'Ubuntu 22.04', status: 'Active' },
      { id: 's2', name: 'web-prod-02', osVersion: 'Ubuntu 22.04', status: 'Active' }
    ],
    vulnerabilities: { critical: 0, high: 2, medium: 5, low: 12 },
    serviceAccounts: [
      { id: 'sa1', name: 'portal-api-svc', type: 'API Service', status: 'Active' },
      { id: 'sa2', name: 'portal-db-svc', type: 'Database', status: 'Active' }
    ],
    iamCompliance: {
      iamConnection: true,
      directoryConnection: true,
      pamCoverage: false,
      reviewToolsConnection: true,
      overallScore: 75
    }
  },
  {
    id: '2',
    code: 'APP456DEF',
    name: 'Inventory Management System',
    shortDescription: 'Internal system for tracking and managing company inventory',
    entity: 'Operations',
    ownerTeam: 'Backend Team',
    applicationOwner: 'Michael Chen',
    environment: 'Production',
    status: 'Production',
    customFields: {
      businessCriticality: 'Medium',
      dataClassification: 'Internal'
    },
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-12-08T11:45:00Z',
    servers: [
      { id: 's3', name: 'inv-prod-01', osVersion: 'RHEL 8.5', status: 'Active' }
    ],
    vulnerabilities: { critical: 1, high: 3, medium: 8, low: 15 },
    serviceAccounts: [
      { id: 'sa3', name: 'inv-worker-svc', type: 'Worker Service', status: 'Active' }
    ],
    iamCompliance: {
      iamConnection: true,
      directoryConnection: false,
      pamCoverage: true,
      reviewToolsConnection: false,
      overallScore: 50
    }
  },
  {
    id: '3',
    code: 'APP789GHI',
    name: 'HR Analytics Dashboard',
    shortDescription: 'Analytics and reporting dashboard for HR metrics',
    entity: 'Human Resources',
    ownerTeam: 'Data Team',
    applicationOwner: 'Emily Rodriguez',
    environment: 'Staging',
    status: 'Draft',
    customFields: {
      businessCriticality: 'Low',
      dataClassification: 'Restricted'
    },
    createdAt: '2024-11-01T16:00:00Z',
    updatedAt: '2024-12-05T13:30:00Z',
    servers: [
      { id: 's4', name: 'hr-stage-01', osVersion: 'Ubuntu 20.04', status: 'Active' }
    ],
    vulnerabilities: { critical: 0, high: 1, medium: 3, low: 7 },
    serviceAccounts: [
      { id: 'sa4', name: 'hr-analytics-svc', type: 'Analytics', status: 'Active' }
    ],
    iamCompliance: {
      iamConnection: false,
      directoryConnection: false,
      pamCoverage: false,
      reviewToolsConnection: true,
      overallScore: 25
    }
  }
];

export const mockDashboardStats: DashboardStats = {
  totalApplications: mockApplications.length,
  applicationsByStatus: {
    Production: mockApplications.filter(app => app.status === 'Production').length,
    Draft: mockApplications.filter(app => app.status === 'Draft').length,
    Decom: mockApplications.filter(app => app.status === 'Decom').length
  },
  applicationsByEnvironment: {
    Production: mockApplications.filter(app => app.environment === 'Production').length,
    Staging: mockApplications.filter(app => app.environment === 'Staging').length,
    Development: mockApplications.filter(app => app.environment === 'Development').length,
    Testing: mockApplications.filter(app => app.environment === 'Testing').length
  },
  complianceScore: Math.round(
    mockApplications.reduce((sum, app) => sum + app.iamCompliance.overallScore, 0) / mockApplications.length
  ),
  totalVulnerabilities: mockApplications.reduce(
    (sum, app) => sum + app.vulnerabilities.critical + app.vulnerabilities.high + app.vulnerabilities.medium + app.vulnerabilities.low,
    0
  )
};