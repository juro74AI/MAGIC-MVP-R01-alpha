import React from 'react';
import { Server, Shield, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { mockDashboardStats, mockApplications } from '../data/mockData';
import { getStatusColor, getComplianceColor } from '../utils/helpers';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const stats = mockDashboardStats;

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    onClick?: () => void;
  }> = ({ title, value, icon: Icon, color, onClick }) => (
    <div 
      className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ComplianceChart: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">IAM Compliance Overview</h3>
      <div className="space-y-4">
        {mockApplications.map((app) => (
          <div key={app.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{app.name}</p>
              <p className="text-sm text-gray-500">{app.code}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className={`w-3 h-3 rounded-full ${app.iamCompliance.iamConnection ? 'bg-green-500' : 'bg-red-500'}`} title="IAM Connection" />
                <div className={`w-3 h-3 rounded-full ${app.iamCompliance.directoryConnection ? 'bg-green-500' : 'bg-red-500'}`} title="Directory Connection" />
                <div className={`w-3 h-3 rounded-full ${app.iamCompliance.pamCoverage ? 'bg-green-500' : 'bg-red-500'}`} title="PAM Coverage" />
                <div className={`w-3 h-3 rounded-full ${app.iamCompliance.reviewToolsConnection ? 'bg-green-500' : 'bg-red-500'}`} title="Review Tools" />
              </div>
              <span className={`font-semibold ${getComplianceColor(app.iamCompliance.overallScore)}`}>
                {app.iamCompliance.overallScore}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const VulnerabilityOverview: React.FC = () => {
    const totalVulns = mockApplications.reduce((sum, app) => ({
      critical: sum.critical + app.vulnerabilities.critical,
      high: sum.high + app.vulnerabilities.high,
      medium: sum.medium + app.vulnerabilities.medium,
      low: sum.low + app.vulnerabilities.low
    }), { critical: 0, high: 0, medium: 0, low: 0 });

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Vulnerabilities</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-xl font-bold text-gray-900">{totalVulns.critical}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">High</p>
              <p className="text-xl font-bold text-gray-900">{totalVulns.high}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Medium</p>
              <p className="text-xl font-bold text-gray-900">{totalVulns.medium}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Low</p>
              <p className="text-xl font-bold text-gray-900">{totalVulns.low}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your application portfolio and compliance status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={Server}
          color="bg-blue-500"
          onClick={() => onViewChange('applications')}
        />
        <StatCard
          title="Production Apps"
          value={stats.applicationsByStatus.Production}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Compliance Score"
          value={`${stats.complianceScore}%`}
          icon={Shield}
          color="bg-purple-500"
          onClick={() => onViewChange('compliance')}
        />
        <StatCard
          title="Total Vulnerabilities"
          value={stats.totalVulnerabilities}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceChart />
        <VulnerabilityOverview />
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <button
              onClick={() => onViewChange('applications')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockApplications.slice(0, 5).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-500">{app.code} • {app.entity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <span className={`font-medium ${getComplianceColor(app.iamCompliance.overallScore)}`}>
                    {app.iamCompliance.overallScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;