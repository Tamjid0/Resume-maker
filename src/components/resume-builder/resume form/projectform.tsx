import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { changeProject, addProject, removeProject } from '../../../store/resumeSlice';
import { FormInput, BulletListTextarea } from './ResumeForm';
import { Trash2, Plus } from 'lucide-react';

export const ProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.resume.resume.projects);

  const handleChange = (idx: number, field: keyof typeof projects[0]) => (value: string | string[]) => {
    dispatch(changeProject({ idx, field, value }));
  };

  const handleAdd = () => {
    dispatch(addProject());
  };

  const handleRemove = (idx: number) => {
    if (projects.length > 1) {
      dispatch(removeProject(idx));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {projects.map((project, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Project {idx + 1}</h3>
            {projects.length > 1 && (
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <FormInput
            label="Project Name"
            value={project.project}
            onChange={handleChange(idx, 'project')}
            placeholder="E-commerce Website"
            required
          />

          <FormInput
            label="Date"
            value={project.date}
            onChange={handleChange(idx, 'date')}
            placeholder="Jun 2023 - Aug 2023"
            required
          />

          <BulletListTextarea
            label="Project Descriptions"
            value={project.descriptions}
            onChange={handleChange(idx, 'descriptions')}
            placeholder="• Built full-stack e-commerce platform using React and Node.js
• Implemented secure payment processing with Stripe
• Deployed on AWS with CI/CD pipeline"
          />
        </div>
      ))}
    </div>
  );
};