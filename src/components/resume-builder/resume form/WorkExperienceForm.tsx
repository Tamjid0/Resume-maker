import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { changeWorkExperience, addWorkExperience, removeWorkExperience } from '../../../store/resumeSlice';
import { FormInput, BulletListTextarea } from './ResumeForm';
import { Trash2, Plus } from 'lucide-react';

export const WorkExperienceForm: React.FC = () => {
  const dispatch = useDispatch();
  const workExperiences = useSelector((state: RootState) => state.resume.resume.workExperiences);

  const handleChange = (idx: number, field: keyof typeof workExperiences[0]) => (value: string | string[]) => {
    dispatch(changeWorkExperience({ idx, field, value }));
  };

  const handleAdd = () => {
    dispatch(addWorkExperience());
  };

  const handleRemove = (idx: number) => {
    if (workExperiences.length > 1) {
      dispatch(removeWorkExperience(idx));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {workExperiences.map((experience, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Experience {idx + 1}</h3>
            {workExperiences.length > 1 && (
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <FormInput
            label="Company"
            value={experience.company}
            onChange={handleChange(idx, 'company')}
            placeholder="Company Name"
            required
          />

          <FormInput
            label="Job Title"
            value={experience.jobTitle}
            onChange={handleChange(idx, 'jobTitle')}
            placeholder="Software Engineer"
            required
          />

          <FormInput
            label="Date"
            value={experience.date}
            onChange={handleChange(idx, 'date')}
            placeholder="Jan 2020 - Present"
            required
          />

          <BulletListTextarea
            label="Job Descriptions"
            value={experience.descriptions}
            onChange={handleChange(idx, 'descriptions')}
            placeholder="• Developed and maintained web applications
• Collaborated with cross-functional teams
• Improved system performance by 30%"
          />
        </div>
      ))}
    </div>
  );
};
