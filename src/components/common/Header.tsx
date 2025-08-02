import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, User } from 'lucide-react'

const Header: React.FC = () => {
  const location = useLocation()
  const isLoggedIn = location.pathname.includes('/dashboard') || location.pathname.includes('/account')

  return (
    <header className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-5">
        <nav className="flex justify-between items-center py-5">
          <Link to="/" className="flex items-center text-3xl font-bold text-primary">
            <FileText className="mr-2 text-accent" size={32} />
            <span>CVGo</span>
          </Link>
          
          <ul className="hidden md:flex space-x-8">
            <li><Link to="/" className="text-dark font-medium hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/templates" className="text-dark font-medium hover:text-primary transition-colors">Templates</Link></li>
            <li><Link to="#" className="text-dark font-medium hover:text-primary transition-colors">Features</Link></li>
            <li><Link to="#" className="text-dark font-medium hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link to="#" className="text-dark font-medium hover:text-primary transition-colors">Blog</Link></li>
          </ul>
          
          {isLoggedIn ? (
            <Link to="/account" className="text-primary hover:text-primary-dark transition-colors">
              <User size={32} />
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary text-white border-none px-5 py-2.5 rounded-md font-semibold text-lg cursor-pointer hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header