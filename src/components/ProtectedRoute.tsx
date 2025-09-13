// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAllowed(false);
        setLoading(false);
        return;
      }
      if (adminOnly) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setIsAllowed(profile?.role === 'admin');
      } else {
        setIsAllowed(true);
      }
      setLoading(false);
    };
    checkAccess();
  }, [adminOnly]);

  if (loading) return null;
  if (!isAllowed) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
