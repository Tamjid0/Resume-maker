import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { changeProfile } from '../../../store/resumeSlice';
import { FormInput, FormTextarea } from './ResumeForm';

export const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.resume.resume.profile);

  const handleChange = (field: keyof typeof profile) => (value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
      
      <FormInput
        label="Full Name"
        value={profile.name}
        onChange={handleChange('name')}
        placeholder="John Doe"
        required
      />
      
      <FormInput
        label="Email"
        value={profile.email}
        onChange={handleChange('email')}
        placeholder="john.doe@email.com"
        type="email"
        required
      />
      
      <FormInput
        label="Phone"
        value={profile.phone}
        onChange={handleChange('phone')}
        placeholder="+1 (555) 123-4567"
      />
      
      <FormInput
        label="Website/LinkedIn"
        value={profile.url}
        onChange={handleChange('url')}
        placeholder="https://linkedin.com/in/johndoe"
      />
      
      <FormInput
        label="Location"
        value={profile.location}
        onChange={handleChange('location')}
        placeholder="New York, NY"
      />
      
      <FormTextarea
        label="Professional Summary"
        value={profile.summary}
        onChange={handleChange('summary')}
        placeholder="Brief overview of your experience and career goals..."
        rows={4}
      />
    </div>
  );
};