// src/types/resume.ts - Complete Resume Types from Open Resume
export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

export interface ResumeSkills {
  featuredSkills: string[];
  descriptions: string[];
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}

export const DEFAULT_RESUME: Resume = {
  profile: {
    name: "",
    email: "",
    phone: "",
    url: "",
    summary: "",
    location: "",
  },
  workExperiences: [
    {
      company: "",
      jobTitle: "",
      date: "",
      descriptions: [""],
    },
  ],
  educations: [
    {
      school: "",
      degree: "",
      date: "",
      gpa: "",
      descriptions: [""],
    },
  ],
  projects: [
    {
      project: "",
      date: "",
      descriptions: [""],
    },
  ],
  skills: {
    featuredSkills: [""],
    descriptions: [""],
  },
  custom: {
    descriptions: [""],
  },
};

// Resume Settings Types
export interface ResumeSettings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  formToShow: {
    workExperiences: boolean;
    educations: boolean;  
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
  formToHeading: {
    workExperiences: string;
    educations: string;
    projects: string;
    skills: string;
    custom: string;
  };
  formsOrder: string[];
}

export const DEFAULT_RESUME_SETTINGS: ResumeSettings = {
  themeColor: "#4361ee",
  fontFamily: "system-ui",
  fontSize: "11",
  documentSize: "Letter",
  formToShow: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    custom: false,
  },
  formToHeading: {
    workExperiences: "WORK EXPERIENCE",
    educations: "EDUCATION", 
    projects: "PROJECTS",
    skills: "SKILLS",
    custom: "CUSTOM SECTION",
  },
  formsOrder: ["workExperiences", "educations", "projects", "skills", "custom"],
};