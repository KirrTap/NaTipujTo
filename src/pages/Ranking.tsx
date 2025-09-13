import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import { supabase } from '../supabaseClient';

const Ranking: React.FC = () => {
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const { data, error } = await supabase
        .from('tips')
        .select('username, points')
        .order('points', { ascending: false });
      if (error) return;
      // Aggregate points by username
      const scores: Record<string, number> = {};
      data.forEach((row: any) => {
        if (!scores[row.username]) scores[row.username] = 0;
        scores[row.username] += row.points ? Number(row.points) : 0;
      });
      // Convert to array and sort
      const rankingArr = Object.entries(scores)
        .map(([username, points]) => ({ username, points }))
        .sort((a, b) => b.points - a.points);
      setRanking(rankingArr);
    };
    fetchRanking();
  }, []);

  return (
    <>
      <HamburgerMenu />
      <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '70px' }}>
        <div style={{
          maxWidth: 340,
          margin: '0 auto',
          border: '2px solid #1976d2', // užší border
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 4, // menší padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <table style={{ width: '90%', borderCollapse: 'collapse', minWidth: 180 }}>
            <thead>
              <tr>
                <th style={{ padding: '6px', borderBottom: '2px solid #1976d2', fontWeight: 600, background: '#e3f2fd', borderRadius: '8px 8px 0 0' }}>Meno</th>
                <th style={{ padding: '6px', borderBottom: '2px solid #1976d2', fontWeight: 600, background: '#e3f2fd', borderRadius: '8px 8px 0 0' }}>Body</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((row) => (
                <tr key={row.username} style={{ background: 'white', fontWeight: 500 }}>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #eee' }}>{row.username}</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #eee' }}>{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ranking;
