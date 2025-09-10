// src/pages/FirstPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const FirstPage: React.FC = () => {
  const [meno, setMeno] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();
        if (profile) setMeno(profile.name);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Pre istotu vymaž aj session z localStorage (ak by niečo zostalo)
    Object.keys(localStorage)
      .filter((k) => k.startsWith('sb-'))
      .forEach((k) => localStorage.removeItem(k));
    window.location.href = '/';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome!</h1>
      <h2>{meno && `Meno: ${meno}`}</h2>
      <button onClick={handleLogout} style={{ marginTop: 32, padding: '10px 24px', borderRadius: 6, background: '#d32f2f', color: 'white', border: 'none', fontSize: 16, cursor: 'pointer' }}>
        Odhlásiť sa
      </button>
    </div>
  );
};

export default FirstPage;