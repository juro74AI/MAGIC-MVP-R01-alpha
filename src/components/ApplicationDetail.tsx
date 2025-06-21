import React from 'react';
import { ArrowLeft, Server, Shield, AlertTriangle, Users, CheckCircle, XCircle, Edit } from 'lucide-react';
import { Application } from '../types';
import { formatDate, getStatusColor, getVulnerabilityColor, getComplianceColor } from '../utils/helpers';

interface ApplicationDetailProps {
  application: Application;
  onBack: () => void;
  onEdit: (application: Application) => void;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ application, onBack, onEdit }) => {
  const totalVulnerabilities = Object.values(application.vulnerabilities).reduce((sum, count) => sum + count, 0);

  const ComplianceIndicator: React.FC<{ label: string; status: boolean }> = ({ label, status }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center space-x-2">
        {status ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <span className={`text-sm font-medium ${status ? 'text-green-600' : 'text-red-600'}`}>
          {status ? 'Connected' : 'Not Connected'}
        </span>
      </div>
    </div>
  );

  const VulnerabilityBar: React.FC<{ level: string; count: number; total: number }> = ({ level, count, total }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 capitalize">{level}</span>
          <span className="text-sm font-bold text-gray-900">{count}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getVulnerabilityColor(level)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
            <p className="text-gray-600">{application.code}</p>
          </div>
        </div>
        <button
          onClick={() => onEdit(application)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-sm text-gray-900">{application.shortDescription}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Entity</label>
                <p className="mt-1 text-sm text-gray-900">{application.entity}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Owner Team</label>
                <p className="mt-1 text-sm text-gray-900">{application.ownerTeam}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Application Owner</label>
                <p className="mt-1 text-sm text-gray-900">{application.applicationOwner}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Environment</label>
                <p className="mt-1 text-sm text-gray-900">{application.environment}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(application.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(application.updatedAt)}</p>
              </div>
            </div>

            {/* Custom Fields */}
            {Object.keys(application.customFields).length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Fields</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(application.customFields).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <p className="mt-1 text-sm text-gray-900">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Servers */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Associated Servers ({application.servers.length})
            </h3>
            <div className="space-y-3">
              {application.servers.map((server) => (
                <div key={server.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{server.name}</p>
                    <p className="text-sm text-gray-500">{server.osVersion}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                    {server.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Accounts */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Service Accounts ({application.serviceAccounts.length})
            </h3>
            <div className="space-y-3">
              {application.serviceAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{account.name}</p>
                    <p className="text-sm text-gray-500">{account.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                    {account.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Vulnerabilities */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Security Vulnerabilities
            </h3>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gray-900">{totalVulnerabilities}</p>
              <p className="text-sm text-gray-500">Total Vulnerabilities</p>
            </div>
            <div className="space-y-4">
              <VulnerabilityBar level="critical" count={application.vulnerabilities.critical} total={totalVulnerabilities} />
              <VulnerabilityBar level="high" count={application.vulnerabilities.high} total={totalVulnerabilities} />
              <VulnerabilityBar level="medium" count={application.vulnerabilities.medium} total={totalVulnerabilities} />
              <VulnerabilityBar level="low" count={application.vulnerabilities.low} total={totalVulnerabilities} />
            </div>
          </div>

          {/* IAM Compliance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              IAM Compliance
            </h3>
            <div className="text-center mb-4">
              <p className={`text-3xl font-bold ${getComplianceColor(application.iamCompliance.overallScore)}`}>
                {application.iamCompliance.overallScore}%
              </p>
              <p className="text-sm text-gray-500">Overall Score</p>
            </div>
            <div className="space-y-3">
              <ComplianceIndicator 
                label="IAM Connection" 
                status={application.iamCompliance.iamConnection} 
              />
              <ComplianceIndicator 
                label="Directory Connection" 
                status={application.iamCompliance.directoryConnection} 
              />
              <ComplianceIndicator 
                label="PAM Coverage" 
                status={application.iamCompliance.pamCoverage} 
              />
              <ComplianceIndicator 
                label="Review Tools Connection" 
                status={application.iamCompliance.reviewToolsConnection} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;