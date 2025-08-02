import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, User, Mail, Lock } from 'lucide-react'

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Simple signup simulation - redirect to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center text-3xl font-bold text-primary mb-2">
            <FileText className="mr-2 text-accent" size={32} />
            <span>CVGo</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-dark">Create an Account</h1>
          <p className="text-gray-600">Get started with your perfect resume today</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-medium text-dark">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 text-gray-400" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-medium text-dark">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 font-medium text-dark">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-dark">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-gray-400" size={20} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors mb-5"
          >
            Sign Up
          </button>
          
          <p className="text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup