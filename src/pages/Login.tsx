import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    // Simple login simulation - redirect to dashboard
    navigate('/dashboard')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-5">
      <div className="flex max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center text-3xl font-bold text-primary mb-5">
              <FileText className="mr-2 text-accent" size={32} />
              <span>CVGo</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-dark">Welcome Back</h1>
            <p className="text-gray-600">Login to access your resume builder dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 font-medium text-dark">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-light-gray rounded-lg text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-light-gray rounded-lg text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link to="#" className="text-primary text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-lg text-base font-semibold hover:bg-primary-dark transition-colors mb-8"
            >
              Login
            </button>
            
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4 relative">
                <span className="bg-white px-4">Or login with</span>
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-light-gray"></span>
                </span>
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-2.5 border border-light-gray rounded-lg bg-white text-dark text-sm hover:bg-light transition-colors"
                >
                  <span className="text-red-500">G</span> Google
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-2.5 border border-light-gray rounded-lg bg-white text-dark text-sm hover:bg-light transition-colors"
                >
                  <span className="text-blue-600">in</span> LinkedIn
                </button>
              </div>
            </div>
            
            <div className="text-center text-gray-600">
              Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
            </div>
          </form>
        </div>
        
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent items-center justify-center p-10 text-white">
          <div className="text-center">
            <FileText className="mx-auto mb-5 opacity-80" size={80} />
            <p className="text-2xl font-medium">Build Your Perfect Resume</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login