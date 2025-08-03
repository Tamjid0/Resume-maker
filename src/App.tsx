import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import {Templates} from './pages/Templates'
import Account from './pages/Account'
import {ResumeBuilder} from './pages/ResumeBuilder'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/templates" element={<Layout><Templates /></Layout>} />
        <Route path="/resume-builder" element={<Layout><ResumeBuilder /></Layout>} />
        <Route path="/account" element={<Layout><Account /></Layout>} />
      </Routes>
    </div>
  )
}

export default App