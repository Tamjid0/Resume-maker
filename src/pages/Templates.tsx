import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Templates: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const filters = ['All', 'Professional', 'Creative', 'Minimal', 'Modern']
  
  const templates = [
    { 
      id: 1, 
      name: 'Executive', 
      description: 'Clean corporate design', 
      category: 'Professional',
      preview: 'bg-blue-50'
    },
    { 
      id: 2, 
      name: 'Creative Pro', 
      description: 'For designers and artists', 
      category: 'Creative',
      preview: 'bg-purple-50'
    },
    { 
      id: 3, 
      name: 'Minimal Clean', 
      description: 'Simple elegant design', 
      category: 'Minimal',
      preview: 'bg-gray-50'
    },
    { 
      id: 4, 
      name: 'Modern Tech', 
      description: 'Perfect for tech roles', 
      category: 'Modern',
      preview: 'bg-green-50'
    },
    { 
      id: 5, 
      name: 'Business Pro', 
      description: 'Professional layout', 
      category: 'Professional',
      preview: 'bg-yellow-50'
    },
    { 
      id: 6, 
      name: 'Designer Special', 
      description: 'Creative and unique', 
      category: 'Creative',
      preview: 'bg-pink-50'
    },
    { 
      id: 7, 
      name: 'Simple Focus', 
      description: 'Content-focused design', 
      category: 'Minimal',
      preview: 'bg-indigo-50'
    },
    { 
      id: 8, 
      name: 'Tech Startup', 
      description: 'Modern startup vibe', 
      category: 'Modern',
      preview: 'bg-teal-50'
    }
  ]
  
  const filteredTemplates = activeFilter === 'All' 
    ? templates 
    : templates.filter(template => template.category === activeFilter)

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-dark mb-4">Professional Resume Templates</h1>
          <p className="text-gray-600 text-lg">Select a template to get started</p>
        </div>
        
        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`h-64 ${template.preview} flex items-center justify-center text-gray-600 font-medium relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                <span className="relative z-10">{template.name} Template</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-dark mb-1">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <Link 
                  to="/resume-builder" 
                  className="block w-full bg-primary text-white text-center py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No templates found for this category.</p>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="bg-white rounded-xl p-8 mt-12 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-dark mb-4">Can't find the right template?</h2>
          <p className="text-gray-600 mb-6">
            All our templates are fully customizable. You can change colors, fonts, and layouts 
            to match your personal style.
          </p>
          <Link 
            to="/resume-builder" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Start with Blank Template
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Templates