// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) return null;
  if (!isAuthenticated) {
    // Refreshni stránku pred redirectom, aby sa session určite vyčistila
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
