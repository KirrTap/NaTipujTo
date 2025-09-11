// src/pages/Matches.tsx
import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import ProfileBar from '../components/ProfileBar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ZapasCard from '../components/ZapasCard';

const Matches: React.FC = () => {
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

  // handleLogout už netreba, je v LogoutButton

  return (
    <>
      <HamburgerMenu />
      <ProfileBar name={meno} />
      <div style={{ textAlign: 'center', marginTop: '24px', padding: '0 8px' }}>
        <div style={{ marginTop: 32 }}>
          {zapasy.map(zapas => (
            <ZapasCard key={zapas.id} home_team={zapas.home_team} away_team={zapas.away_team} date={zapas.date} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Matches;