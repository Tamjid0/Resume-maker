// src/store/resumeSlice.ts - Redux slice for resume data
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resume, ResumeSettings, DEFAULT_RESUME, DEFAULT_RESUME_SETTINGS } from '../types/resume';

interface ResumeState {
  resume: Resume;
  settings: ResumeSettings;
}

const initialState: ResumeState = {
  resume: DEFAULT_RESUME,
  settings: DEFAULT_RESUME_SETTINGS,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Profile actions
    changeProfile: (state, action: PayloadAction<{ field: keyof Resume['profile']; value: string }>) => {
      const { field, value } = action.payload;
      state.resume.profile[field] = value;
    },

    // Work Experience actions
    changeWorkExperience: (
      state,
      action: PayloadAction<{
        idx: number;
        field: keyof Resume['workExperiences'][0];
        value: string | string[];
      }>
    ) => {
      const { idx, field, value } = action.payload;
      if (state.resume.workExperiences[idx]) {
        (state.resume.workExperiences[idx] as any)[field] = value;
      }
    },

    addWorkExperience: (state) => {
      state.resume.workExperiences.push({
        company: '',
        jobTitle: '',
        date: '',
        descriptions: [''],
      });
    },

    removeWorkExperience: (state, action: PayloadAction<number>) => {
      state.resume.workExperiences.splice(action.payload, 1);
    },

    // Education actions
    changeEducation: (
      state,
      action: PayloadAction<{
        idx: number;
        field: keyof Resume['educations'][0];
        value: string | string[];
      }>
    ) => {
      const { idx, field, value } = action.payload;
      if (state.resume.educations[idx]) {
        (state.resume.educations[idx] as any)[field] = value;
      }
    },

    addEducation: (state) => {
      state.resume.educations.push({
        school: '',
        degree: '',
        date: '',
        gpa: '',
        descriptions: [''],
      });
    },

    removeEducation: (state, action: PayloadAction<number>) => {
      state.resume.educations.splice(action.payload, 1);
    },

    // Project actions
    changeProject: (
      state,
      action: PayloadAction<{
        idx: number;
        field: keyof Resume['projects'][0];
        value: string | string[];
      }>
    ) => {
      const { idx, field, value } = action.payload;
      if (state.resume.projects[idx]) {
        (state.resume.projects[idx] as any)[field] = value;
      }
    },

    addProject: (state) => {
      state.resume.projects.push({
        project: '',
        date: '',
        descriptions: [''],
      });
    },

    removeProject: (state, action: PayloadAction<number>) => {
      state.resume.projects.splice(action.payload, 1);
    },

    // Skills actions  
    changeSkills: (
      state,
      action: PayloadAction<{ field: keyof Resume['skills']; value: string[] }>
    ) => {
      const { field, value } = action.payload;
      state.resume.skills[field] = value;
    },

    // Custom section actions
    changeCustom: (
      state,
      action: PayloadAction<{ field: keyof Resume['custom']; value: string[] }>
    ) => {
      const { field, value } = action.payload;
      state.resume.custom[field] = value;
    },

    // Settings actions
    changeSettings: (
      state,
      action: PayloadAction<{ field: keyof ResumeSettings; value: any }>
    ) => {
      const { field, value } = action.payload;
      (state.settings as any)[field] = value;
    },

    // Import resume from PDF
    setResume: (state, action: PayloadAction<Resume>) => {
      state.resume = action.payload;
    },

    // Reset resume
    resetResume: (state) => {
      state.resume = DEFAULT_RESUME;
      state.settings = DEFAULT_RESUME_SETTINGS;
    },
  },
});

export const {
  changeProfile,
  changeWorkExperience,
  addWorkExperience,
  removeWorkExperience,
  changeEducation,
  addEducation,
  removeEducation,
  changeProject,
  addProject,
  removeProject,
  changeSkills,
  changeCustom,
  changeSettings,
  setResume,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;