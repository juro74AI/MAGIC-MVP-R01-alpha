import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import ApplicationDetail from './components/ApplicationDetail';
import { Application, ApplicationFormData } from './types';
import { mockApplications, generateAppCode } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>(mockApplications);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedApplication(null);
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setCurrentView('application-detail');
  };

  const handleEditApplication = (application: Application) => {
    setSelectedApplication(application);
    setCurrentView('edit-application');
  };

  const handleCreateApplication = (formData: ApplicationFormData) => {
    const newApplication: Application = {
      id: Date.now().toString(),
      code: generateAppCode(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      servers: [],
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
      serviceAccounts: [],
      iamCompliance: {
        iamConnection: false,
        directoryConnection: false,
        pamCoverage: false,
        reviewToolsConnection: false,
        overallScore: 0
      }
    };

    setApplications(prev => [...prev, newApplication]);
    alert(`Application "${newApplication.name}" created successfully with code: ${newApplication.code}`);
    setCurrentView('applications');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard applications={applications} onViewChange={handleViewChange} />;
      
      case 'applications':
        return (
          <ApplicationList
            applications={applications}
            onViewApplication={handleViewApplication}
            onEditApplication={handleEditApplication}
          />
        );
      
      case 'add-application':
        return (
          <ApplicationForm
            onSubmit={handleCreateApplication}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      
      case 'application-detail':
        return selectedApplication ? (
          <ApplicationDetail
            application={selectedApplication}
            onBack={() => setCurrentView('applications')}
            onEdit={handleEditApplication}
          />
        ) : null;
      
      case 'search':
        return (
          <ApplicationList
            applications={applications}
            onViewApplication={handleViewApplication}
            onEditApplication={handleEditApplication}
          />
        );
      
      case 'compliance':
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance Dashboard</h2>
            <p className="text-gray-600">Advanced compliance analytics and reporting coming soon...</p>
          </div>
        );
      
      case 'teams':
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Teams Management</h2>
            <p className="text-gray-600">Team management features coming soon...</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">System configuration and settings coming soon...</p>
          </div>
        );
      
      default:
        return <Dashboard applications={applications} onViewChange={handleViewChange} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;