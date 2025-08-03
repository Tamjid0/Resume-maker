// src/pages/Templates.tsx - Updated Templates Page with Resume Builder Integration
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetResume, changeSettings } from '../store/resumeSlice';
import { Search, Filter, Star, Clock, ArrowRight, Eye } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  description: string;
  featured: boolean;
  popularity: number;
  themeColor: string;
}

const TEMPLATE_DATA: Template[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Professional',
    preview: '/api/placeholder/300/400',
    description: 'Clean and modern design perfect for tech and business professionals',
    featured: true,
    popularity: 95,
    themeColor: '#4361ee'
  },
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    category: 'Executive',
    preview: '/api/placeholder/300/400',
    description: 'Traditional layout ideal for senior management and executive roles',
    featured: true,
    popularity: 88,
    themeColor: '#1f2937'
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Creative',
    preview: '/api/placeholder/300/400',
    description: 'Bold and creative layout for designers and creative professionals',
    featured: false,
    popularity: 92,
    themeColor: '#8b5cf6'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'Minimal',
    preview: '/api/placeholder/300/400',
    description: 'Simple, clean design that focuses on content over decoration',
    featured: true,
    popularity: 87,
    themeColor: '#059669'
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    category: 'Academic',
    preview: '/api/placeholder/300/400',
    description: 'Academic-focused template for researchers and educators',
    featured: false,
    popularity: 78,
    themeColor: '#dc2626'
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    category: 'Sales',
    preview: '/api/placeholder/300/400',
    description: 'Dynamic layout perfect for sales and marketing professionals',
    featured: false,
    popularity: 84,
    themeColor: '#f59e0b'
  }
];

const CATEGORIES = ['All', 'Professional', 'Executive', 'Creative', 'Minimal', 'Academic', 'Sales'];

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredTemplates = TEMPLATE_DATA
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleUseTemplate = (template: Template) => {
    // Reset resume data and apply template settings
    dispatch(resetResume());
    dispatch(changeSettings({ field: 'themeColor', value: template.themeColor }));
    
    // Navigate to resume builder
    navigate('/resume-builder');
  };

  const handlePreviewTemplate = (template: Template) => {
    // In a real app, this would open a preview modal
    console.log('Preview template:', template.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of ATS-friendly, professionally designed resume templates. 
              Each template is optimized for modern hiring systems and proven to get results.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="popularity">Most Popular</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={24} />
              Featured Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates
                .filter(template => template.featured)
                .map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => handleUseTemplate(template)}
                    onPreview={() => handlePreviewTemplate(template)}
                    featured
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({filteredTemplates.length} templates)
            </span>
          </h2>
          
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={() => handleUseTemplate(template)}
                  onPreview={() => handlePreviewTemplate(template)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template Card Component
interface TemplateCardProps {
  template: Template;
  onUse: () => void;
  onPreview: () => void;
  featured?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUse, onPreview, featured = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow ${
      featured ? 'border-yellow-200 ring-2 ring-yellow-100' : 'border-gray-200'
    }`}>
      {/* Template Preview */}
      <div className="relative group">
        <div className="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={template.preview}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={onPreview}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-gray-100"
            >
              <Eye size={16} />
              Preview
            </button>
          </div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star size={12} />
            Featured
          </div>
        )}

        {/* Popularity Badge */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Clock size={12} />
          {template.popularity}%
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          <span 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: template.themeColor }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {template.category}
          </span>
          
          <button
            onClick={onUse}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Use Template
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};