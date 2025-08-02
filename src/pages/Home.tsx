import React from 'react'
import { Link } from 'react-router-dom'
import { Wand2, FileText, Palette, Download, Lightbulb, Lock } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 text-center bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 text-dark">
            Build Your Perfect Resume in Minutes
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-600">
            CVGo helps you create a professional resume that stands out from the crowd. 
            Choose from our modern templates and land your dream job faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-12">
            <Link 
              to="/login" 
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark hover:-translate-y-1 transition-all shadow-lg"
            >
              Create My Resume
            </Link>
            <Link 
              to="/login" 
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 hover:-translate-y-1 transition-all"
            >
              Get Started
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-96 flex items-center justify-center rounded-xl shadow-xl border">
              <h2 className="text-2xl text-gray-600 font-semibold">Professional Resume Preview</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-15">
            <h2 className="text-4xl font-bold mb-4 text-dark">Why Choose CVGo?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our resume builder comes packed with powerful features to help you create the perfect resume
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-5 text-primary">
                <Wand2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark">Easy to Use</h3>
              <p className="text-gray-600">
                Our intuitive interface makes resume building a breeze. No design skills required - 
                just fill in your details and we'll handle the formatting.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-5 text-primary">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark">ATS Optimized</h3>
              <p className="text-gray-600">
                All our templates are designed to pass through Applicant Tracking Systems (ATS) 
                used by most employers today.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-5 text-primary">
                <Palette size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark">Customizable</h3>
              <p className="text-gray-600">
                Change colors, fonts, and layouts with just a few clicks. Make your resume 
                truly yours without any hassle.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-5 text-primary">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark">Multiple Formats</h3>
              <p className="text-gray-600">
                Download your resume as PDF, DOCX, or plain text. Share it online with a 
                unique link or print it out.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-5 text-primary">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark">Smart Suggestions</h3>
              <p className="text-gray-600">
                Get real-time suggestions to improve your resume content based on your 
                target job and industry.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="w-15 h-15 bg-blue-100 rounded-full flex items-center justify-center mb-5 text-primary">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-dark">Secure Storage</h3>
              <p className="text-gray-600">
                Your data is safe with us. Access and update your resume anytime from any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-15">
            <h2 className="text-4xl font-bold mb-4 text-dark">Professional Resume Templates</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of modern, ATS-friendly resume templates
            </p>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-5 snap-x snap-mandatory">
            {[
              { name: 'Executive', description: 'Clean, professional layout perfect for corporate jobs', bg: 'bg-blue-50' },
              { name: 'Creative', description: 'For designers, artists, and creative professionals', bg: 'bg-yellow-50' },
              { name: 'Minimal', description: 'Simple and elegant design that focuses on content', bg: 'bg-purple-50' },
              { name: 'Professional', description: 'Balanced two-column layout with smart spacing', bg: 'bg-green-50' },
              { name: 'Chronological', description: 'Showcases your career progression clearly', bg: 'bg-cyan-50' }
            ].map((template, index) => (
              <div key={index} className="min-w-80 snap-start bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <div className={`h-96 ${template.bg} flex items-center justify-center text-gray-600 font-semibold text-lg`}>
                  {template.name} Resume
                </div>
                <div className="p-5 border-t border-gray-100">
                  <h3 className="font-semibold mb-2 text-dark">{template.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors">
                    Use This Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold mb-5">Ready to Build Your Perfect Resume?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Join over 1 million professionals who landed their dream jobs with CVGo resumes
          </p>
          <Link 
            to="/login" 
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home