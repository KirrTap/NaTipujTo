// src/pages/Matches.tsx
import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import ProfileBar from '../components/ProfileBar';
import { supabase } from '../supabaseClient';
import ZapasCard from '../components/ZapasCard';

const Matches: React.FC = () => {
  const [meno, setMeno] = useState('');
  const [zapasy, setZapasy] = useState<any[]>([]);
  const [tipy, setTipy] = useState<any[]>([]);


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
      if (profile && profile.name) {
        setMeno(profile.name);
        // Načítaj tipy pre používateľa
        const { data: tips } = await supabase
          .from('tips')
          .select('match_id')
          .eq('username', profile.name);
        if (tips) setTipy(tips.map(t => t.match_id));
      }
    }
    // Načítaj zápasy z databázy
    const { data: matches } = await supabase
      .from('matches')
      .select('id, home_team, away_team, date, kolo')
      .order('date', { ascending: true });
    if (matches) setZapasy(matches);
  };

  useEffect(() => {
    fetchProfileAndMatches();
  }, []);

  return (
    <>
      <HamburgerMenu />
      <ProfileBar name={meno} />
      <div style={{ textAlign: 'center', marginTop: '24px', padding: '0 8px' }}>
        <div style={{ marginTop: 32 }}>
          {zapasy
            .filter(zapas => {
              // zobraz len zápasy, ktoré ešte nezačali
              const now = new Date();
              const matchDate = new Date(zapas.date);
              return matchDate > now && !tipy.includes(zapas.id);
            })
            .sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              if (dateA !== dateB) return dateA - dateB;
              return a.id - b.id;
            })
            .map(zapas => (
              <ZapasCard
                key={zapas.id}
                home_team={zapas.home_team}
                away_team={zapas.away_team}
                date={zapas.date}
                match_id={zapas.id}
                username={meno}
                kolo={zapas.kolo}
                onTip={fetchProfileAndMatches}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Matches;