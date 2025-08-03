import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { changeSkills, changeCustom } from '../../../store/resumeSlice';
import { BulletListTextarea } from './ResumeForm';

export const SkillsForm: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.resume.resume.skills);

  const handleChange = (field: keyof typeof skills) => (value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
      
      <BulletListTextarea
        label="Featured Skills"
        value={skills.featuredSkills}
        onChange={handleChange('featuredSkills')}
        placeholder="JavaScript
React
Node.js
Python
SQL"
      />

      <BulletListTextarea
        label="Additional Skills"
        value={skills.descriptions}
        onChange={handleChange('descriptions')}
        placeholder="• Programming Languages: JavaScript, Python, Java, C++
• Frameworks: React, Angular, Express.js, Django
• Databases: MySQL, PostgreSQL, MongoDB"
      />
    </div>
  );
};

export const CustomForm: React.FC = () => {
  const dispatch = useDispatch();
  const custom = useSelector((state: RootState) => state.resume.resume.custom);

  const handleChange = (field: keyof typeof custom) => (value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Custom Section</h2>
      
      <BulletListTextarea
        label="Custom Content"
        value={custom.descriptions}
        onChange={handleChange('descriptions')}
        placeholder="• Awards and Honors
• Certifications
• Publications
• Volunteer Experience"
      />
    </div>
  );
};