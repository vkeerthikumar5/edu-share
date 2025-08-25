// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();

  // Show loader until auth state is restored
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If roles are provided, check if user's role is allowed
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If allowed → render nested route(s)
  return <Outlet />;
}
