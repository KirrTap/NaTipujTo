import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import { supabase } from '../supabaseClient';
import AdminCard from '../components/AdminCard';

const Admin: React.FC = () => {
  const [zapasy, setZapasy] = useState<any[]>([]);

  const fetchMatches = async () => {
    const { data: matches } = await supabase
      .from('matches')
      .select('id, home_team, away_team, date, home_goals, away_goals, kolo')
      .is('home_goals', null)
      .is('away_goals', null)
      .order('date', { ascending: true });
    if (matches) setZapasy(matches);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <>
      <HamburgerMenu />
      <div style={{ textAlign: 'center', marginTop: '24px', padding: '0 8px' }}>
        <div style={{ marginTop: 90 }}>
          {zapasy.map(zapas => (
            <AdminCard
              key={zapas.id}
              home_team={zapas.home_team}
              away_team={zapas.away_team}
              date={zapas.date}
              match_id={zapas.id}
              home_goals={zapas.home_goals}
              away_goals={zapas.away_goals}
              kolo={zapas.kolo}
              onResult={fetchMatches}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
