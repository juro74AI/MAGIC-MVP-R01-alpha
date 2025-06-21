import React from 'react';
import { Server, Shield, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { Application } from '../types';
import { getStatusColor, getComplianceColor } from '../utils/helpers';

interface DashboardProps {
  applications: Application[];
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ applications, onViewChange }) => {
  // Calculate stats from actual applications
  const stats = {
    totalApplications: applications.length,
    applicationsByStatus: {
      Production: applications.filter(app => app.status === 'Production').length,
      Draft: applications.filter(app => app.status === 'Draft').length,
      Decom: applications.filter(app => app.status === 'Decom').length
    },
    applicationsByEnvironment: {
      Production: applications.filter(app => app.environment === 'Production').length,
      Staging: applications.filter(app => app.environment === 'Staging').length,
      Development: applications.filter(app => app.environment === 'Development').length,
      Testing: applications.filter(app => app.environment === 'Testing').length
    },
    complianceScore: applications.length > 0 ? Math.round(
      applications.reduce((sum, app) => sum + app.iamCompliance.overallScore, 0) / applications.length
    ) : 0,
    totalVulnerabilities: applications.reduce(
      (sum, app) => sum + app.vulnerabilities.critical + app.vulnerabilities.high + app.vulnerabilities.medium + app.vulnerabilities.low,
      0
    )
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    onClick?: () => void;
  }> = ({ title, value, icon: Icon, color, onClick }) => (
    <div 
      className={`bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${color} flex-shrink-0 ml-3`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );

  const ComplianceChart: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">IAM Compliance Overview</h3>
      <div className="space-y-3 sm:space-y-4">
        {applications.slice(0, 5).map((app) => (
          <div key={app.id} className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{app.name}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{app.code}</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ml-3">
              <div className="hidden sm:flex space-x-1">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${app.iamCompliance.iamConnection ? 'bg-green-500' : 'bg-red-500'}`} title="IAM Connection" />
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${app.iamCompliance.directoryConnection ? 'bg-green-500' : 'bg-red-500'}`} title="Directory Connection" />
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${app.iamCompliance.pamCoverage ? 'bg-green-500' : 'bg-red-500'}`} title="PAM Coverage" />
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${app.iamCompliance.reviewToolsConnection ? 'bg-green-500' : 'bg-red-500'}`} title="Review Tools" />
              </div>
              <span className={`font-semibold text-sm sm:text-base ${getComplianceColor(app.iamCompliance.overallScore)}`}>
                {app.iamCompliance.overallScore}%
              </span>
            </div>
          </div>
        ))}
        {applications.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
            <p className="text-sm sm:text-base">No applications registered yet.</p>
            <button
              onClick={() => onViewChange('add-application')}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              Add your first application →
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const VulnerabilityOverview: React.FC = () => {
    const totalVulns = applications.reduce((sum, app) => ({
      critical: sum.critical + app.vulnerabilities.critical,
      high: sum.high + app.vulnerabilities.high,
      medium: sum.medium + app.vulnerabilities.medium,
      low: sum.low + app.vulnerabilities.low
    }), { critical: 0, high: 0, medium: 0, low: 0 });

    return (
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Vulnerabilities</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded flex-shrink-0"></div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{totalVulns.critical}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded flex-shrink-0"></div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">High</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{totalVulns.high}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded flex-shrink-0"></div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Medium</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{totalVulns.medium}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded flex-shrink-0"></div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Low</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{totalVulns.low}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Overview of your application portfolio and compliance status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ComplianceChart />
        <VulnerabilityOverview />
      </div>

      {/* Recent Applications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Applications</h3>
            <button
              onClick={() => onViewChange('applications')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View all →
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {applications.slice(0, 5).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Server className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{app.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{app.code} • {app.entity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <span className={`font-medium text-sm sm:text-base ${getComplianceColor(app.iamCompliance.overallScore)}`}>
                    {app.iamCompliance.overallScore}%
                  </span>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
                <p className="text-sm sm:text-base">No applications registered yet.</p>
                <button
                  onClick={() => onViewChange('add-application')}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
                >
                  Add your first application →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;