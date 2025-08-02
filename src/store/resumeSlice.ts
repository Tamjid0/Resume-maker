// src/store/resumeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Resume, INITIAL_RESUME, ResumeSettings, INITIAL_SETTINGS } from '../types/resume'

interface ResumeState {
  resume: Resume
  settings: ResumeSettings
}

const initialState: ResumeState = {
  resume: INITIAL_RESUME,
  settings: INITIAL_SETTINGS,
}

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<Resume['profile']>>) => {
      state.resume.profile = { ...state.resume.profile, ...action.payload }
    },
    updateWorkExperiences: (state, action: PayloadAction<Resume['workExperiences']>) => {
      state.resume.workExperiences = action.payload
    },
    updateEducations: (state, action: PayloadAction<Resume['educations']>) => {
      state.resume.educations = action.payload
    },
    updateProjects: (state, action: PayloadAction<Resume['projects']>) => {
      state.resume.projects = action.payload
    },
    updateSkills: (state, action: PayloadAction<Resume['skills']>) => {
      state.resume.skills = action.payload
    },
    updateCustom: (state, action: PayloadAction<Resume['custom']>) => {
      state.resume.custom = action.payload
    },
    updateSettings: (state, action: PayloadAction<Partial<ResumeSettings>>) => {
      state.settings = { ...state.settings, ...action.payload }
    },
    setResume: (state, action: PayloadAction<Resume>) => {
      state.resume = action.payload
    },
    resetResume: (state) => {
      state.resume = INITIAL_RESUME
      state.settings = INITIAL_SETTINGS
    },
  },
})

export const {
  updateProfile,
  updateWorkExperiences,
  updateEducations,
  updateProjects,
  updateSkills,
  updateCustom,
  updateSettings,
  setResume,
  resetResume,
} = resumeSlice.actions

export default resumeSlice.reducer
