import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { changeEducation, addEducation, removeEducation } from '../../../store/resumeSlice';
import { FormInput, BulletListTextarea } from './ResumeForm';
import { Trash2, Plus } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const educations = useSelector((state: RootState) => state.resume.resume.educations);

  const handleChange = (idx: number, field: keyof typeof educations[0]) => (value: string | string[]) => {
    dispatch(changeEducation({ idx, field, value }));
  };

  const handleAdd = () => {
    dispatch(addEducation());
  };

  const handleRemove = (idx: number) => {
    if (educations.length > 1) {
      dispatch(removeEducation(idx));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {educations.map((education, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Education {idx + 1}</h3>
            {educations.length > 1 && (
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <FormInput
            label="School"
            value={education.school}
            onChange={handleChange(idx, 'school')}
            placeholder="University Name"
            required
          />

          <FormInput
            label="Degree"
            value={education.degree}
            onChange={handleChange(idx, 'degree')}
            placeholder="Bachelor of Science in Computer Science"
            required
          />

          <FormInput
            label="Date"
            value={education.date}
            onChange={handleChange(idx, 'date')}
            placeholder="Sep 2016 - May 2020"
            required
          />

          <FormInput
            label="GPA (Optional)"
            value={education.gpa}
            onChange={handleChange(idx, 'gpa')}
            placeholder="3.8/4.0"
          />

          <BulletListTextarea
            label="Achievements/Activities"
            value={education.descriptions}
            onChange={handleChange(idx, 'descriptions')}
            placeholder="• Dean's List (4 semesters)
• President of Computer Science Club
• Relevant Coursework: Data Structures, Algorithms"
          />
        </div>
      ))}
    </div>
  );
};
