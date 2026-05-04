import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/tailwind.css';
import React from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';

// Main Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Payment = React.lazy(() => import("./pages/Payment"));
const Promo = React.lazy(() => import("./pages/Promo"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
const Attendance = React.lazy(() => import("./pages/Attendance"));
const Members = React.lazy(() => import("./pages/Member"));

// Auth Pages
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));

// Error Pages
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BadRequest = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.BadRequest })));
const Unauthorized = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.Unauthorized })));
const Forbidden = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.Forbidden })));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Application Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/members" element={<Members />} />
          
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