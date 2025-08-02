import React, { useState } from 'react'
import { Save, Download, Eye, Settings } from 'lucide-react'

const ResumeBuilder: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal')
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: '',
    projects: []
  })

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ]

  const handlePersonalChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value
      }
    })
  }

  const handleSave = () => {
    alert('Resume saved successfully!')
  }

  const handleDownload = () => {
    alert('Resume downloaded as PDF!')
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
        <div className="container mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark">Resume Builder</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download PDF
              </button>
              <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                <Eye size={16} className="mr-2" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-lg font-semibold text-dark mb-4">Resume Sections</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <Settings size={16} className="mr-2" />
                Template Settings
              </button>
            </div>
          </div>

          {/* Main Editor */}
          <div className="flex-1 bg-white rounded-xl p-8 shadow-lg">
            {activeSection === 'personal' && (
              <div>
                <h3 className="text-2xl font-bold text-dark mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.personal.name}
                      onChange={(e) => handlePersonalChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) => handlePersonalChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={resumeData.personal.phone}
                      onChange={(e) => handlePersonalChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resumeData.personal.location}
                      onChange={(e) => handlePersonalChange('location', e.target.value)}
                      placeholder="City, State"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    value={resumeData.personal.summary}
                    onChange={(e) => handlePersonalChange('summary', e.target.value)}
                    placeholder="Write a brief summary of your professional experience and goals..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  />
                </div>
              </div>
            )}
            
            {activeSection === 'experience' && (
              <div>
                <h3 className="text-2xl font-bold text-dark mb-6">Work Experience</h3>
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No work experience added yet</p>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Add Work Experience
                  </button>
                </div>
              </div>
            )}
            
            {activeSection === 'education' && (
              <div>
                <h3 className="text-2xl font-bold text-dark mb-6">Education</h3>
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No education added yet</p>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Add Education
                  </button>
                </div>
              </div>
            )}
            
            {activeSection === 'skills' && (
              <div>
                <h3 className="text-2xl font-bold text-dark mb-6">Skills</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    value={resumeData.skills}
                    onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                    placeholder="JavaScript, React, Node.js, Python, SQL..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  />
                </div>
              </div>
            )}
            
            {activeSection === 'projects' && (
              <div>
                <h3 className="text-2xl font-bold text-dark mb-6">Projects</h3>
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No projects added yet</p>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                    Add Project
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resume Preview */}
          <div className="w-96 bg-white rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-lg font-semibold text-dark mb-4">Resume Preview</h2>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-96">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-dark">
                  {resumeData.personal.name || 'Your Name'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {resumeData.personal.email || 'your@email.com'}
                </p>
                <p className="text-gray-600 text-sm">
                  {resumeData.personal.phone || 'Phone Number'}
                </p>
                <p className="text-gray-600 text-sm">
                  {resumeData.personal.location || 'Location'}
                </p>
              </div>
              
              {resumeData.personal.summary && (
                <div className="mb-6">
                  <h4 className="font-semibold text-dark mb-2">Summary</h4>
                  <p className="text-gray-700 text-sm">{resumeData.personal.summary}</p>
                </div>
              )}
              
              {resumeData.skills && (
                <div className="mb-6">
                  <h4 className="font-semibold text-dark mb-2">Skills</h4>
                  <p className="text-gray-700 text-sm">{resumeData.skills}</p>
                </div>
              )}
              
              <div className="text-center text-gray-500 text-sm mt-8">
                Add more sections to see them here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder