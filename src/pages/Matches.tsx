// src/pages/Matches.tsx
import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ZapasCard from '../components/ZapasCard';

const FirstPage: React.FC = () => {
  const [meno, setMeno] = useState('');
  const [zapasy, setZapasy] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndMatches = async () => {
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
      // Načítaj zápasy z databázy
      const { data: matches } = await supabase
        .from('matches')
        .select('id, home_team, away_team, date');
      if (matches) setZapasy(matches);
    };
    fetchProfileAndMatches();
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
    <>
      <HamburgerMenu />
      <div style={{ textAlign: 'center', marginTop: '24px', padding: '0 8px' }}>
      <h1>Welcome!</h1>
      <h2>{meno && `Meno: ${meno}`}</h2>
      <button onClick={handleLogout} style={{ marginTop: 32, padding: '10px 24px', borderRadius: 6, background: '#d32f2f', color: 'white', border: 'none', fontSize: 16, cursor: 'pointer' }}>
        Odhlásiť sa
      </button>
      <div style={{ marginTop: 32 }}>
        {zapasy.map(zapas => (
          <ZapasCard key={zapas.id} home_team={zapas.home_team} away_team={zapas.away_team} date={zapas.date} />
        ))}
      </div>
      </div>
    </>
  );
};

export default FirstPage;