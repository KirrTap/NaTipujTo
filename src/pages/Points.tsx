import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import HamburgerMenu from '../components/HamburgerMenu';
import ProfileBar from '../components/ProfileBar';
import PointsCard from '../components/PointsCard';

const Points: React.FC = () => {
  const [meno, setMeno] = useState('');
  const [tips, setTips] = useState<any[]>([]);

  const fetchTips = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();
      if (profile) {
        setMeno(profile.name);

        const { data: tipsData } = await supabase
          .from('tips')
          .select('id, tip_h, tip_a, points, matches(home_team, away_team, date)')
          .eq('username', profile.name)
          .not('points', 'is', null);

        setTips(tipsData || []);
      }
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <>
      <HamburgerMenu />
      <ProfileBar name={meno} />
      <div style={{ textAlign: 'center', marginTop: '24px', padding: '0 8px' }}>
        <div style={{ marginTop: 32 }}>
          {tips
            .sort((a, b) => new Date(b.matches?.date).getTime() - new Date(a.matches?.date).getTime())
            .map((tip) => (
              <PointsCard
                key={tip.id}
                id={tip.id}
                home_team={tip.matches?.home_team}
                away_team={tip.matches?.away_team}
                date={tip.matches?.date}
                tip_h={tip.tip_h}
                tip_a={tip.tip_a}
                points={tip.points}
              />
          ))}
        </div>
      </div>
    </>
  );
};

export default Points;
