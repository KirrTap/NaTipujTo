import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import HamburgerMenu from '../components/HamburgerMenu';

const teamNameMap: Record<string, string> = {
  'Banská Bystrica': 'HC BB',
  'Bratislava': 'HC BA',
  'Košice': 'HC KE',
  'Liptovský Mikuláš': 'HK LM',
  'Michalovce': 'HK MI',
  'Nitra': 'HK NR',
  'Poprad': 'HK PP',
  'Prešov': 'HC PO',
  'Spišská Nová Ves': 'HK SNV',
  'Trenčín': 'HK TN',
  'Zvolen': 'HKM ZV',
  'Žilina': 'HC ZA',
};

const teamNames = Object.keys(teamNameMap).sort();

const AdminMatch: React.FC = () => {
  const [homeTeam, setHomeTeam] = useState(''); // human name
  const [awayTeam, setAwayTeam] = useState(''); // human name
  const [date, setDate] = useState('');
  const [kolo, setKolo] = useState('');
  const [loading, setLoading] = useState(false);
  const [addedMsg, setAddedMsg] = useState('');

  const handleAdd = async () => {
    if (!homeTeam || !awayTeam || !date || !kolo) return;
    setLoading(true);
    await supabase
      .from('matches')
      .insert({
        home_team: teamNameMap[homeTeam],
        away_team: teamNameMap[awayTeam],
        date,
        kolo: Number(kolo)
      });
    setLoading(false);
    setHomeTeam('');
    setAwayTeam('');
    setDate('');
    setKolo('');
    setAddedMsg('Zápas bol pridaný!');
  };

  return (
    <>
      <HamburgerMenu />
      <div style={{
        maxWidth: 340,
        margin: '70px auto 0 auto',
        border: '2px solid #1976d2',
        borderRadius: 16,
        background: 'linear-gradient(135deg,#e3f2fd 0%,#fff 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontWeight: 500, color: '#1976d2', marginBottom: 2 }}>Domáci tím:</label>
          <select value={homeTeam} onChange={e => setHomeTeam(e.target.value)} required style={{
            padding: '8px', borderRadius: 8, border: '1.5px solid #90caf9', fontSize: 16, background: '#f5faff', outline: 'none', marginBottom: 4
          }}>
            <option value="" disabled>Vyber tím</option>
            {teamNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontWeight: 500, color: '#1976d2', marginBottom: 2 }}>Hosťujúci tím:</label>
          <select value={awayTeam} onChange={e => setAwayTeam(e.target.value)} required style={{
            padding: '8px', borderRadius: 8, border: '1.5px solid #90caf9', fontSize: 16, background: '#f5faff', outline: 'none', marginBottom: 4
          }}>
            <option value="" disabled>Vyber tím</option>
            {teamNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontWeight: 500, color: '#1976d2', marginBottom: 2 }}>Dátum a čas:</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} style={{
            padding: '8px', borderRadius: 8, border: '1.5px solid #90caf9', fontSize: 16, background: '#f5faff', outline: 'none', marginBottom: 4
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontWeight: 500, color: '#1976d2', marginBottom: 2 }}>Kolo:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={kolo}
            onChange={e => setKolo(e.target.value.replace(/[^0-9]/g, ''))}
            style={{
              padding: '8px', borderRadius: 8, border: '1.5px solid #90caf9', fontSize: 16, background: '#f5faff', outline: 'none', marginBottom: 4
            }}
          />
        </div>
        <button onClick={handleAdd} disabled={loading} style={{
          background: loading ? '#90caf9' : '#1976d2', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600,
          fontSize: 17, marginTop: 10, boxShadow: '0 2px 8px rgba(25,118,210,0.08)', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s'
        }}>
          {loading ? 'Pridávam...' : 'Pridať zápas'}
        </button>
        {addedMsg && (
          <div style={{ color: '#388e3c', fontWeight: 500, textAlign: 'center', marginTop: 10, fontSize: 15 }}>
            {addedMsg}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMatch;