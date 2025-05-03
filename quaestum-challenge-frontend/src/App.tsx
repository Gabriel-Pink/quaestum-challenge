import { Navigate, Route, Routes } from "react-router-dom"
import JobApplication from "./pages/JobApplication"
import CandidateRegistration from "./pages/CandidateRegistration"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { EmailVerification } from "./pages/EmailVerification"
import { Dashboard } from "./pages/Dashboard"
import { PrivateRoute } from "./components/PrivateRoute"

function App() {


  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/job-application" element={<JobApplication />} />
        <Route path="/reset-password/:id" element={<CandidateRegistration />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
