import React, { useState } from 'react';
import { Plus, X, Save, FileText } from 'lucide-react';
import { ApplicationFormData } from '../types';
import { generateAppCode } from '../data/mockData';

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  onCancel?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    shortDescription: '',
    entity: '',
    ownerTeam: '',
    applicationOwner: '',
    environment: 'Development',
    status: 'Draft',
    customFields: {}
  });

  const [customFields, setCustomFields] = useState<Array<{ key: string; value: string; type: string }>>([]);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');

  const handleInputChange = (field: keyof ApplicationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCustomField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      const newField = { key: newFieldKey, value: newFieldValue, type: newFieldType };
      setCustomFields(prev => [...prev, newField]);
      setFormData(prev => ({
        ...prev,
        customFields: { ...prev.customFields, [newFieldKey]: newFieldValue }
      }));
      setNewFieldKey('');
      setNewFieldValue('');
      setNewFieldType('text');
    }
  };

  const removeCustomField = (index: number) => {
    const fieldToRemove = customFields[index];
    setCustomFields(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => {
      const newCustomFields = { ...prev.customFields };
      delete newCustomFields[fieldToRemove.key];
      return { ...prev, customFields: newCustomFields };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const entities = ['Digital Services', 'Operations', 'Human Resources', 'Finance', 'IT Infrastructure', 'Security'];
  const teams = ['Frontend Team', 'Backend Team', 'DevOps Team', 'Data Team', 'Security Team', 'Platform Team'];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Add New Application</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Register a new application in the MAGIC system</p>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="self-start sm:self-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Application Code Preview */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="font-medium text-blue-900 dark:text-blue-300 text-sm sm:text-base">Auto-generated Code:</span>
              </div>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm font-mono text-blue-800 dark:text-blue-200 break-all">
                {generateAppCode()}
              </code>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
              This unique code will be assigned upon creation and used for API access
            </p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Application Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter application name"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                required
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows={3}
                placeholder="Brief description of the application's purpose and functionality"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Entity *
              </label>
              <select
                required
                value={formData.entity}
                onChange={(e) => handleInputChange('entity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select entity</option>
                {entities.map(entity => (
                  <option key={entity} value={entity}>{entity}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Owner Team *
              </label>
              <select
                required
                value={formData.ownerTeam}
                onChange={(e) => handleInputChange('ownerTeam', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select team</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Application Owner *
              </label>
              <input
                type="text"
                required
                value={formData.applicationOwner}
                onChange={(e) => handleInputChange('applicationOwner', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Full name of the application owner"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Environment *
              </label>
              <select
                required
                value={formData.environment}
                onChange={(e) => handleInputChange('environment', e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Staging">Staging</option>
                <option value="Production">Production</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Production">Production</option>
                <option value="Decom">Decommissioned</option>
              </select>
            </div>
          </div>

          {/* Custom Fields Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Custom Fields</h3>
            
            {/* Add Custom Field */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-3">
                <input
                  type="text"
                  value={newFieldKey}
                  onChange={(e) => setNewFieldKey(e.target.value)}
                  placeholder="Field name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <input
                  type="text"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  placeholder="Field value"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
                <button
                  type="button"
                  onClick={addCustomField}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Display Custom Fields */}
            {customFields.length > 0 && (
              <div className="space-y-3">
                {customFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 min-w-0 flex-1">
                      <span className="font-medium text-gray-900 dark:text-white">{field.key}:</span>
                      <span className="text-gray-700 dark:text-gray-300 break-words">{field.value}</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded self-start sm:self-auto">
                        {field.type}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCustomField(index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1 flex-shrink-0 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Create Application</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;