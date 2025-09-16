import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { useAuth } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'

// Public Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

// Student Pages
import StudentDashboard from './pages/student/Dashboard'
import StudentProfile from './pages/student/Profile'
import StudentApplications from './pages/student/Applications'
import StudentInternships from './pages/student/Internships'
import StudentMatching from './pages/student/Matching'
import StudentPMScheme from './pages/student/PMScheme'

// Company Pages
import CompanyDashboard from './pages/company/Dashboard'
import CompanyProfile from './pages/company/Profile'
import CompanyInternships from './pages/company/Internships'
import CompanyApplications from './pages/company/Applications'
import CompanyCandidates from './pages/company/Candidates'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminAnalytics from './pages/admin/Analytics'
import GovernmentDashboard from './pages/government/Dashboard'

// Shared Pages
import InternshipDetails from './pages/shared/InternshipDetails'
import ChatPage from './pages/shared/Chat'
import NotFoundPage from './pages/NotFound'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        Loading...
      </Box>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <Layout>
              <Routes>
                <Route path="/" element={<StudentDashboard />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/applications" element={<StudentApplications />} />
                <Route path="/internships" element={<StudentInternships />} />
                <Route path="/matching" element={<StudentMatching />} />
                <Route path="/pm-scheme" element={<StudentPMScheme />} />
                <Route path="/chat/:applicationId" element={<ChatPage />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/company/*"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYER']}>
            <Layout>
              <Routes>
                <Route path="/" element={<CompanyDashboard />} />
                <Route path="/dashboard" element={<CompanyDashboard />} />
                <Route path="/profile" element={<CompanyProfile />} />
                <Route path="/internships" element={<CompanyInternships />} />
                <Route path="/applications" element={<CompanyApplications />} />
                <Route path="/candidates" element={<CompanyCandidates />} />
                <Route path="/chat/:applicationId" element={<ChatPage />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Layout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/analytics" element={<AdminAnalytics />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/government/*"
        element={
          <ProtectedRoute allowedRoles={['GOVERNMENT_ADMIN']}>
            <Layout>
              <Routes>
                <Route path="/" element={<GovernmentDashboard />} />
                <Route path="/dashboard" element={<GovernmentDashboard />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Shared Protected Routes */}
      <Route
        path="/internship/:id"
        element={
          <ProtectedRoute>
            <InternshipDetails />
          </ProtectedRoute>
        }
      />

      {/* Redirect based on user role */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Navigate
              to={
                user.role === 'STUDENT'
                  ? '/student/dashboard'
                  : user.role === 'EMPLOYER'
                  ? '/company/dashboard'
                  : user.role === 'ADMIN'
                  ? '/admin/dashboard'
                  : '/government/dashboard'
              }
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App


