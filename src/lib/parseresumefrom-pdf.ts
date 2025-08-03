import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { Resume, DEFAULT_RESUME } from '../types/resume';

// Set up PDF.js worker
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export const parseResumeFromPdf = async (file: File): Promise<Resume> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    // Parse the extracted text into resume structure
    return parseTextToResume(fullText);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};

const parseTextToResume = (text: string): Resume => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const resume: Resume = JSON.parse(JSON.stringify(DEFAULT_RESUME));

  // Simple parsing logic - this is a basic implementation
  // In a real app, you'd want more sophisticated NLP parsing
  
  let currentSection = '';
  let workExpIndex = 0;
  let educationIndex = 0;
  let projectIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Extract name (usually first non-empty line)
    if (i === 0 && !resume.profile.name) {
      resume.profile.name = line;
      continue;
    }

    // Extract contact info
    if (line.includes('@') && !resume.profile.email) {
      const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) resume.profile.email = emailMatch[0];
    }

    if (line.match(/[\+]?[\d\s\-\(\)]{10,}/)) {
      const phoneMatch = line.match(/[\+]?[\d\s\-\(\)]{10,}/);
      if (phoneMatch && !resume.profile.phone) {
        resume.profile.phone = phoneMatch[0].trim();
      }
    }

    if (line.match(/https?:\/\//) || line.includes('linkedin.com')) {
      if (!resume.profile.url) {
        resume.profile.url = line;
      }
    }

    // Detect sections
    if (lowerLine.includes('experience') || lowerLine.includes('employment')) {
      currentSection = 'work';
      continue;
    }
    if (lowerLine.includes('education') || lowerLine.includes('university') || lowerLine.includes('college')) {
      currentSection = 'education';
      continue;
    }
    if (lowerLine.includes('project') || lowerLine.includes('portfolio')) {
      currentSection = 'projects';
      continue;
    }
    if (lowerLine.includes('skill') || lowerLine.includes('technical')) {
      currentSection = 'skills';
      continue;
    }
    if (lowerLine.includes('summary') || lowerLine.includes('objective')) {
      currentSection = 'summary';
      continue;
    }

    // Parse content based on current section
    switch (currentSection) {
      case 'summary':
        if (!resume.profile.summary && line.length > 20) {
          resume.profile.summary = line;
        }
        break;

      case 'work':
        if (line.length > 5 && !line.startsWith('•') && !line.startsWith('-')) {
          // Likely a job title or company
          if (workExpIndex >= resume.workExperiences.length) {
            resume.workExperiences.push({
              company: '',
              jobTitle: '',
              date: '',
              descriptions: []
            });
          }
          
          if (!resume.workExperiences[workExpIndex].jobTitle) {
            resume.workExperiences[workExpIndex].jobTitle = line;
          } else if (!resume.workExperiences[workExpIndex].company) {
            resume.workExperiences[workExpIndex].company = line;
          } else {
            workExpIndex++;
            if (workExpIndex >= resume.workExperiences.length) {
              resume.workExperiences.push({
                company: line,
                jobTitle: '',
                date: '',
                descriptions: []
              });
            }
          }
        } else if (line.startsWith('•') || line.startsWith('-')) {
          // Bullet point
          if (workExpIndex < resume.workExperiences.length) {
            resume.workExperiences[workExpIndex].descriptions.push(line.substring(1).trim());
          }
        }
        break;

      case 'education':
        if (line.length > 5) {
          if (educationIndex >= resume.educations.length) {
            resume.educations.push({
              school: '',
              degree: '',
              date: '',
              gpa: '',
              descriptions: []
            });
          }
          
          if (!resume.educations[educationIndex].school) {
            resume.educations[educationIndex].school = line;
          } else if (!resume.educations[educationIndex].degree) {
            resume.educations[educationIndex].degree = line;
          } else {
            educationIndex++;
          }
        }
        break;

      case 'projects':
        if (line.length > 5 && !line.startsWith('•') && !line.startsWith('-')) {
          if (projectIndex >= resume.projects.length) {
            resume.projects.push({
              project: '',
              date: '',
              descriptions: []
            });
          }
          resume.projects[projectIndex].project = line;
        } else if (line.startsWith('•') || line.startsWith('-')) {
          if (projectIndex < resume.projects.length) {
            resume.projects[projectIndex].descriptions.push(line.substring(1).trim());
          }
        }
        break;

      case 'skills':
        if (line.length > 2) {
          const skills = line.split(/[,;]/).map(s => s.trim()).filter(s => s.length > 0);
          resume.skills.featuredSkills.push(...skills);
        }
        break;
    }
  }

  // Clean up empty entries
  resume.workExperiences = resume.workExperiences.filter(exp => exp.company || exp.jobTitle);
  resume.educations = resume.educations.filter(edu => edu.school || edu.degree);
  resume.projects = resume.projects.filter(proj => proj.project);
  resume.skills.featuredSkills = resume.skills.featuredSkills.filter(skill => skill.length > 0);

  // Ensure at least one entry in each array
  if (resume.workExperiences.length === 0) {
    resume.workExperiences = [DEFAULT_RESUME.workExperiences[0]];
  }
  if (resume.educations.length === 0) {
    resume.educations = [DEFAULT_RESUME.educations[0]];
  }
  if (resume.projects.length === 0) {
    resume.projects = [DEFAULT_RESUME.projects[0]];
  }

  return resume;
};