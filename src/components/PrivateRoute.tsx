// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Define publicly accessible routes
  const publicRoutes = ['/about'];

  // If the route is public, allow access
  if (publicRoutes.includes(location.pathname)) {
    return <Outlet />;
  }

  // Otherwise, check if the user is authenticated
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
