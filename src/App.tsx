import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

type Match = {
  id: number;
  home_team: string;
  away_team: string;
  date: string;
  result: string | null;
};

function App() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*');
      if (error) console.error(error);
      else setMatches(data || []);
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h1>Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            {match.home_team} vs {match.away_team} ({match.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;