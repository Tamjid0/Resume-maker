import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Download, FileText } from 'lucide-react'

const Dashboard: React.FC = () => {
  const mockResumes = [
    { id: 1, name: 'Professional Resume', template: 'Executive', lastModified: '2 days ago', color: 'bg-blue-50' },
    { id: 2, name: 'Creative Portfolio', template: 'Creative', lastModified: '1 week ago', color: 'bg-purple-50' },
    { id: 3, name: 'Software Engineer CV', template: 'Minimal', lastModified: '3 days ago', color: 'bg-green-50' }
  ]

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-5 py-12">
        {/* Welcome Banner */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-2">
            Welcome back, <span className="text-primary">User</span>!
          </h1>
          <p className="text-gray-600 text-lg">Ready to create your next amazing resume?</p>
        </div>
        
        {/* New Resume Button */}
        <div className="mb-10">
          <Link 
            to="/templates" 
            className="inline-flex items-center bg-primary text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg"
          >
            <Plus className="mr-3" size={24} />
            Create New Resume
          </Link>
        </div>
        
        {/* Recent Resumes Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-dark mb-6">Your Recent Resumes</h3>
          
          {mockResumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResumes.map((resume) => (
                <div key={resume.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`h-48 ${resume.color} flex items-center justify-center text-gray-600 font-medium`}>
                    <FileText size={48} className="opacity-60" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-lg text-dark mb-1">{resume.name}</h4>
                    <p className="text-gray-500 text-sm mb-1">Template: {resume.template}</p>
                    <p className="text-gray-400 text-sm mb-4">Modified {resume.lastModified}</p>
                    <div className="flex gap-2">
                      <Link 
                        to="/resume-builder" 
                        className="flex items-center bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Link>
                      <button className="flex items-center bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                        <Download size={16} className="mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
              <p className="text-gray-500 mb-6">Create your first resume to get started</p>
              <Link 
                to="/templates" 
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                <Plus className="mr-2" size={20} />
                Create Your First Resume
              </Link>
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-dark mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/templates" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
            >
              <FileText className="text-primary mr-3" size={24} />
              <div>
                <h4 className="font-medium text-dark">Browse Templates</h4>
                <p className="text-gray-500 text-sm">Choose from professional designs</p>
              </div>
            </Link>
            
            <Link 
              to="/account" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
            >
              <div className="w-6 h-6 bg-primary rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium text-dark">Account Settings</h4>
                <p className="text-gray-500 text-sm">Manage your profile</p>
              </div>
            </Link>
            
            <a 
              href="#" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
            >
              <div className="w-6 h-6 bg-green-500 rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium text-dark">Resume Tips</h4>
                <p className="text-gray-500 text-sm">Get expert advice</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard