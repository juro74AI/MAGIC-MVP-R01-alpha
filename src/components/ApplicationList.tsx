import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Server, ChevronLeft, ChevronRight } from 'lucide-react';
import { Application } from '../types';
import { formatDate, getStatusColor, getComplianceColor } from '../utils/helpers';

interface ApplicationListProps {
  applications: Application[];
  onViewApplication: (application: Application) => void;
  onEditApplication: (application: Application) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, onViewApplication, onEditApplication }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [environmentFilter, setEnvironmentFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Application>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Application) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedApplications = useMemo(() => {
    let filtered = applications.filter(app => {
      const matchesSearch = searchTerm === '' || 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicationOwner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || app.status === statusFilter;
      const matchesEnvironment = environmentFilter === '' || app.environment === environmentFilter;
      const matchesEntity = entityFilter === '' || app.entity === entityFilter;
      
      return matchesSearch && matchesStatus && matchesEnvironment && matchesEntity;
    });

    // Sort applications
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [applications, searchTerm, statusFilter, environmentFilter, entityFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredAndSortedApplications.slice(startIndex, startIndex + itemsPerPage);

  const uniqueStatuses = [...new Set(applications.map(app => app.status))];
  const uniqueEnvironments = [...new Set(applications.map(app => app.environment))];
  const uniqueEntities = [...new Set(applications.map(app => app.entity))];

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setEnvironmentFilter('');
    setEntityFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Applications</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage and monitor all registered applications</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm transition-colors">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={environmentFilter}
              onChange={(e) => setEnvironmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Environments</option>
              {uniqueEnvironments.map(env => (
                <option key={env} value={env}>{env}</option>
              ))}
            </select>

            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Entities</option>
              {uniqueEntities.map(entity => (
                <option key={entity} value={entity}>{entity}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-2 sm:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {paginatedApplications.length} of {filteredAndSortedApplications.length} applications
          </p>
          {(searchTerm || statusFilter || environmentFilter || entityFilter) && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium self-start sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Applications Table - Desktop */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors">
        <div className="w-full">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-1/4"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Application</span>
                    {sortField === 'name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-1/6"
                  onClick={() => handleSort('entity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Entity</span>
                    {sortField === 'entity' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-1/6"
                  onClick={() => handleSort('applicationOwner')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Owner</span>
                    {sortField === 'applicationOwner' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-1/8"
                  onClick={() => handleSort('environment')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Env</span>
                    {sortField === 'environment' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-1/8"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === 'status' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                  Compliance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                  Updated
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{app.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{app.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="truncate">{app.entity}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="truncate">{app.applicationOwner}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="truncate">{app.environment}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold text-sm ${getComplianceColor(app.iamCompliance.overallScore)}`}>
                      {app.iamCompliance.overallScore}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="truncate">{formatDate(app.updatedAt)}</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => onViewApplication(app)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditApplication(app)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Cards - Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {paginatedApplications.map((app) => (
          <div key={app.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">{app.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{app.code}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => onViewApplication(app)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-2"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEditApplication(app)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-2"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Entity:</span>
                <p className="font-medium text-gray-900 dark:text-white truncate">{app.entity}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Owner:</span>
                <p className="font-medium text-gray-900 dark:text-white truncate">{app.applicationOwner}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Environment:</span>
                <p className="font-medium text-gray-900 dark:text-white">{app.environment}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Updated:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formatDate(app.updatedAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                {app.status}
              </span>
              <span className={`font-semibold ${getComplianceColor(app.iamCompliance.overallScore)}`}>
                Compliance: {app.iamCompliance.overallScore}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-between transition-colors">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;