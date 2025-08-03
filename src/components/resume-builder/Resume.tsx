// src/components/Resume/Resume.tsx - PDF Preview Component
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Register fonts for better PDF rendering
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2' },
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhpKKSTjw.woff2', fontWeight: 600 },
  ]
});

// PDF Styles
const createStyles = (themeColor: string, fontSize: number) => StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: fontSize,
    fontFamily: 'Open Sans',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottom: `2pt solid ${themeColor}`,
    paddingBottom: 10,
  },
  name: {
    fontSize: fontSize + 8,
    fontWeight: 600,
    color: themeColor,
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: fontSize - 1,
    color: '#374151',
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: fontSize + 1,
    fontWeight: 600,
    color: themeColor,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summary: {
    marginBottom: 8,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: fontSize,
    fontWeight: 600,
    color: '#111827',
  },
  company: {
    fontSize: fontSize,
    color: '#374151',
  },
  date: {
    fontSize: fontSize - 1,
    color: '#6B7280',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 10,
  },
  bullet: {
    width: 4,
    marginRight: 6,
    marginTop: 3,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSize - 1,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    padding: '4 8',
    marginRight: 6,
    marginBottom: 4,
    borderRadius: 3,
    fontSize: fontSize - 2,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  degree: {
    fontSize: fontSize,
    fontWeight: 600,
    color: '#111827',
  },
  school: {
    fontSize: fontSize - 1,
    color: '#374151',
  },
  gpa: {
    fontSize: fontSize - 1,
    color: '#6B7280',
  }
});

// Resume PDF Document Component
const ResumeDocument: React.FC = () => {
  const { resume, settings } = useSelector((state: RootState) => state.resume);
  const styles = createStyles(settings.themeColor, parseInt(settings.fontSize));

  const renderBulletPoints = (descriptions: string[]) => {
    return descriptions.filter(desc => desc.trim()).map((desc, index) => (
      <View key={index} style={styles.bulletPoint}>
        <View style={[styles.bullet, { backgroundColor: settings.themeColor }]} />
        <Text style={styles.bulletText}>{desc}</Text>
      </View>
    ));
  };

  const renderSection = (sectionKey: string, title: string, content: React.ReactNode) => {
    if (!settings.formToShow[sectionKey as keyof typeof settings.formToShow]) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {content}
      </View>
    );
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.profile.name}</Text>
          <View style={styles.contactInfo}>
            {resume.profile.email && (
              <Text style={styles.contactItem}>{resume.profile.email}</Text>
            )}
            {resume.profile.phone && (
              <Text style={styles.contactItem}>{resume.profile.phone}</Text>
            )}
            {resume.profile.location && (
              <Text style={styles.contactItem}>{resume.profile.location}</Text>
            )}
            {resume.profile.url && (
              <Text style={styles.contactItem}>{resume.profile.url}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {resume.profile.summary && (
          <View style={styles.section}>
            <Text style={styles.summary}>{resume.profile.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {renderSection('workExperiences', settings.formToHeading.workExperiences, (
          <View>
            {resume.workExperiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <Text style={styles.date}>{exp.date}</Text>
                </View>
                {renderBulletPoints(exp.descriptions)}
              </View>
            ))}
          </View>
        ))}

        {/* Education */}
        {renderSection('educations', settings.formToHeading.educations, (
          <View>
            {resume.educations.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.school}>{edu.school}</Text>
                  </View>
                  <View>
                    <Text style={styles.date}>{edu.date}</Text>
                    {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
                  </View>
                </View>
                {renderBulletPoints(edu.descriptions)}
              </View>
            ))}
          </View>
        ))}

        {/* Projects */}
        {renderSection('projects', settings.formToHeading.projects, (
          <View>
            {resume.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{project.project}</Text>
                  <Text style={styles.date}>{project.date}</Text>
                </View>
                {renderBulletPoints(project.descriptions)}
              </View>
            ))}
          </View>
        ))}

        {/* Skills */}
        {renderSection('skills', settings.formToHeading.skills, (
          <View>
            {resume.skills.featuredSkills.filter(skill => skill.trim()).length > 0 && (
              <View style={styles.skillsContainer}>
                {resume.skills.featuredSkills
                  .filter(skill => skill.trim())
                  .map((skill, index) => (
                    <Text key={index} style={styles.skill}>{skill}</Text>
                  ))}
              </View>
            )}
            <View style={{ marginTop: 8 }}>
              {renderBulletPoints(resume.skills.descriptions)}
            </View>
          </View>
        ))}

        {/* Custom Section */}
        {renderSection('custom', settings.formToHeading.custom, (
          <View>
            {renderBulletPoints(resume.custom.descriptions)}
          </View>
        ))}
      </Page>
    </Document>
  );
};

// Main Resume Preview Component
export const Resume: React.FC = () => {
  return (
    <div className="h-full bg-gray-100">
      <PDFViewer width="100%" height="100%" showToolbar={true}>
        <ResumeDocument />
      </PDFViewer>
    </div>
  );
};