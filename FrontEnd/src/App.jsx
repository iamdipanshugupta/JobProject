import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Utilities
import { getRole } from "./utils/auth.js";

// Layouts
import PublicLayout from "./Layouts/PublicLayout.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import JobSeekerLayout from "./Layouts/JobSeekerLayout.jsx";

// Public Pages
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Enquiry from "./pages/Enquiry.jsx";
import ImageGallery from "./pages/Imagegallery.jsx";
import ViewJob from "./pages/ViewJob.jsx";

// Auth Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

// Admin Pages
import Dashboard from "./Admin/Dashboard.jsx";
import JobManagement from "./Admin/JobManagement.jsx";
import ResultManagement from "./Admin/ResultManagement.jsx";
import FeedbackManagement from "./Admin/FeedbackManagement.jsx";
import LoginInfo from "./Admin/LoginInfo.jsx";
import Enquiries from "./Admin/Enquiries.jsx";
import ComplainManagement from "./Admin/ComplainManagement.jsx";
import JobSeekerManagement from "./Admin/JobSeekerManagement.jsx";
import AdminUsers from "./Admin/AdminUsers.jsx";
import ManageApplications from "./Admin/ManageApplications.jsx";

// JobSeeker Pages
import JobSeekerDashboard from "./JobSeeker/JobSeekerDashboard.jsx";
import SearchJob from "./JobSeeker/SearchJob.jsx";
import ApplyJob from "./JobSeeker/ApplyJob.jsx";
import Complain from "./JobSeeker/Complain.jsx";
import Results from "./JobSeeker/Results.jsx";
import Feedback from "./JobSeeker/Feedback.jsx";

// -------------------- Protected Route Guard --------------------
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = getRole();
  if (!role || role !== allowedRole.toLowerCase()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <Routes>

        {/* ===== Public Routes ===== */}
        <Route path="/"              element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/services"      element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/enquiry"       element={<PublicLayout><Enquiry /></PublicLayout>} />
        <Route path="/imagegallery"  element={<PublicLayout><ImageGallery /></PublicLayout>} />
        <Route path="/viewjob"       element={<PublicLayout><ViewJob /></PublicLayout>} />

        {/* ===== Auth Routes ===== */}
        <Route path="/login"                   element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register"                element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/forgot-password"         element={<PublicLayout><ForgotPassword /></PublicLayout>} />
        <Route path="/reset-password/:token"   element={<PublicLayout><ResetPassword /></PublicLayout>} />

        {/* ===== Admin Routes ===== */}
        <Route path="/admin/dashboard"              element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><Dashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/jobs"                   element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><JobManagement /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/results"                element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><ResultManagement /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/feedback"               element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><FeedbackManagement /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/login-info"             element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><LoginInfo /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/enquiries"              element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><Enquiries /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/complaints"             element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><ComplainManagement /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/jobseekers"             element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><JobSeekerManagement /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users"                  element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><AdminUsers /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/applications"           element={<ProtectedRoute allowedRole="admin"><AdminLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><ManageApplications /></AdminLayout></ProtectedRoute>} />

        {/* Legacy admin URL redirects (for backward compat) */}
        <Route path="/dashboard"            element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/job-management"       element={<Navigate to="/admin/jobs" replace />} />
        <Route path="/result-management"    element={<Navigate to="/admin/results" replace />} />
        <Route path="/feedback-management"  element={<Navigate to="/admin/feedback" replace />} />
        <Route path="/login-info"           element={<Navigate to="/admin/login-info" replace />} />
        <Route path="/enquiries"            element={<Navigate to="/admin/enquiries" replace />} />
        <Route path="/complain-management"  element={<Navigate to="/admin/complaints" replace />} />
        <Route path="/job-seeker-management" element={<Navigate to="/admin/jobseekers" replace />} />
        <Route path="/admin-users"          element={<Navigate to="/admin/users" replace />} />
        <Route path="/management-applications" element={<Navigate to="/admin/applications" replace />} />

        {/* ===== Job Seeker Routes ===== */}
        <Route path="/jobseeker/dashboard"  element={<ProtectedRoute allowedRole="jobseeker"><JobSeekerLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><JobSeekerDashboard /></JobSeekerLayout></ProtectedRoute>} />
        <Route path="/jobseeker/search-job" element={<ProtectedRoute allowedRole="jobseeker"><JobSeekerLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><SearchJob /></JobSeekerLayout></ProtectedRoute>} />
        <Route path="/jobseeker/apply-job"  element={<ProtectedRoute allowedRole="jobseeker"><JobSeekerLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><ApplyJob /></JobSeekerLayout></ProtectedRoute>} />
        <Route path="/jobseeker/complain"   element={<ProtectedRoute allowedRole="jobseeker"><JobSeekerLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><Complain /></JobSeekerLayout></ProtectedRoute>} />
        <Route path="/jobseeker/results"    element={<ProtectedRoute allowedRole="jobseeker"><JobSeekerLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><Results /></JobSeekerLayout></ProtectedRoute>} />
        <Route path="/jobseeker/feedback"   element={<ProtectedRoute allowedRole="jobseeker"><JobSeekerLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}><Feedback /></JobSeekerLayout></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;