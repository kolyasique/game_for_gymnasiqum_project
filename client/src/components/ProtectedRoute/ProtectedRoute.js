import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ auth, redirectPath = '/auth' }) {
  if (!auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
