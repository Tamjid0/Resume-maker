// src/pages/ResumeBuilder.tsx - Complete Resume Builder Integration
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { resetResume, changeSettings } from '../store/resumeSlice';
import { ResumeForm } from '../components/resume-builder/resume form/ResumeForm';
import { Resume } from '../components/resume-builder/Resume';
import { ResumeDropzone } from '../components/ResumeDropzone/ResumeDropzone';
import { Download, Upload, RotateCcw, Settings, Eye, Edit3, X } from 'lucide-react';
// Remove PDFDownloadLink import if @react-pdf/renderer is not available
// import { PDFDownloadLink } from '@react-pdf/renderer';

export const ResumeBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { resume, settings } = useSelector((state: RootState) => state.resume);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [showImport, setShowImport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all resume data? This action cannot be undone.')) {
      dispatch(resetResume());
    }
  };

  const handleSettingsChange = (field: string, value: any) => {
    dispatch(changeSettings({ field: field as keyof typeof settings, value }));
  };

  // Simple PDF download handler (replace with actual PDF generation)
  const handleDownloadPDF = () => {
    // Implement your PDF generation logic here
    console.log('Download PDF clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
              
              {/* Mobile Tab Switcher */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-3 py-1 text-sm font-medium rounded-l-md ${
                    activeTab === 'form'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Edit3 size={16} className="inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 text-sm font-medium rounded-r-md ${
                    activeTab === 'preview'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Eye size={16} className="inline mr-1" />
                  Preview
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowImport(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Upload size={16} />
                Import PDF
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <RotateCcw size={16} />
                Reset
              </button>

              {/* Replace PDFDownloadLink with regular button */}
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Form Panel */}
          <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
            activeTab === 'form' ? 'block' : 'hidden lg:block'
          }`}>
            <ResumeForm />
          </div>

          {/* Preview Panel */}
          <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
            activeTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}>
            <Resume />
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Import Resume from PDF</h3>
              <button
                onClick={() => setShowImport(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <ResumeDropzone onClose={() => setShowImport(false)} />
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

// Settings Modal Component
interface SettingsModalProps {
  settings: any;
  onSettingsChange: (field: string, value: any) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onSettingsChange, onClose }) => {
  const themeColors = [
    { name: 'Blue', value: '#4361ee' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Teal', value: '#14b8a6' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Resume Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Theme Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {themeColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onSettingsChange('themeColor', color.value)}
                  className={`flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 ${
                    settings.themeColor === color.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size: {settings.fontSize}pt
            </label>
            <input
              type="range"
              min="9"
              max="14"
              value={settings.fontSize}
              onChange={(e) => onSettingsChange('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Section Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sections to Show
            </label>
            <div className="space-y-2">
              {settings.formToShow && Object.entries(settings.formToShow).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(e) =>
                      onSettingsChange('formToShow', {
                        ...settings.formToShow,
                        [key]: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">
                    {settings.formToHeading?.[key as keyof typeof settings.formToHeading] || key}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Headings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Section Headings
            </label>
            <div className="space-y-3">
              {settings.formToHeading && Object.entries(settings.formToHeading).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs text-gray-500 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) =>
                      onSettingsChange('formToHeading', {
                        ...settings.formToHeading,
                        [key]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};