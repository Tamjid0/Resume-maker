// src/components/ResumeForm/ResumeForm.tsx - Main Resume Form Component
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ProfileForm } from './ProfileForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './educationform';
import { ProjectForm } from './projectform'
import { SkillsForm } from './skillsform';
import { CustomForm } from './customform';

const FORM_SECTIONS = [
  { key: 'profile', label: 'Profile', component: ProfileForm },
  { key: 'workExperiences', label: 'Work Experience', component: WorkExperienceForm },
  { key: 'educations', label: 'Education', component: EducationForm },
  { key: 'projects', label: 'Projects', component: ProjectForm },
  { key: 'skills', label: 'Skills', component: SkillsForm },
  { key: 'custom', label: 'Custom Section', component: CustomForm },
];

export const ResumeForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const settings = useSelector((state: RootState) => state.resume.settings);

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h2>
          <nav className="space-y-1">
            {FORM_SECTIONS.map((section) => {
              const isVisible = section.key === 'profile' || settings.formToShow[section.key as keyof typeof settings.formToShow];
              
              if (!isVisible && section.key !== 'profile') return null;
              
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {section.key === 'profile' ? section.label : settings.formToHeading[section.key as keyof typeof settings.formToHeading]}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        {FORM_SECTIONS.map((section) => {
          const Component = section.component;
          return (
            <div
              key={section.key}
              className={activeSection === section.key ? 'block' : 'hidden'}
            >
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// src/components/ResumeForm/FormInput.tsx - Reusable Form Input
interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// src/components/ResumeForm/FormTextarea.tsx - Reusable Textarea
interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// src/components/ResumeForm/BulletListTextarea.tsx - For handling bullet points
interface BulletListTextareaProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const BulletListTextarea: React.FC<BulletListTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    onChange(lines);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value.join('\n')}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <p className="text-xs text-gray-500 mt-1">
        Each line will be a separate bullet point
      </p>
    </div>
  );
};