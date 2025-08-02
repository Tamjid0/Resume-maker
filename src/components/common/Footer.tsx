import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-15">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center text-3xl font-bold text-primary mb-5">
              <FileText className="mr-2 text-accent" size={32} />
              <span>CVGo</span>
            </div>
            <p className="text-gray-300 mb-5">
              The easiest way to create a professional resume that gets you hired.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-300 hover:text-accent transition-colors">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-accent transition-colors">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-accent transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-accent transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5 text-accent">Product</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Examples</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5 text-accent">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Resume Tips</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Cover Letters</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Interview Tips</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Career Advice</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5 text-accent">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-5 text-center">
          <p className="text-gray-400">&copy; 2023 CVGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer