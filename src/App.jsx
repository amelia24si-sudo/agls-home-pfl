import { Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './assets/tailwind.css';
import React from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';
import PromoDetail from './pages/PromoDetail';
import Promos from './pages/Promos';

// Public Landing Page
const LandingPage = React.lazy(() => import("./pages/landing/LandingPage"));

// Main Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Payment = React.lazy(() => import("./pages/Payment"));
const Promo = React.lazy(() => import("./pages/Promos"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
const Attendance = React.lazy(() => import("./pages/Attendance"));
const Members = React.lazy(() => import("./pages/Member"));
const Users = React.lazy(() => import("./pages/Users"));

// Auth Pages
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));

// Error Pages
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BadRequest = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.BadRequest })));
const Unauthorized = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.Unauthorized })));
const Forbidden = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.Forbidden })));

// ==================== PROTECTED ROUTE (GUARD) BARU ====================
function ProtectedRoute({ allowedRoles }) {
  const storedUser = localStorage.getItem("userLoggedIn");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 1. Jika belum login sama sekali, lempar ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Jika role TIDAK diizinkan (misal: "member"), langsung redirect ke Landing Page ("/")
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 3. Jika lolos verifikasi (admin/super admin), tampilkan halaman dashboard
  return <Outlet />;
}
// ==========================================================================

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route Khusus Admin & Super Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "super admin"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/promo/:id" element={<PromoDetail />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/members" element={<Members />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>

        {/* Route Umum / Error */}
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="400" element={<BadRequest />} />
          <Route path="401" element={<Unauthorized />} />
          <Route path="403" element={<Forbidden />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}