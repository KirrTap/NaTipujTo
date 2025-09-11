// src/pages/Prihlasenie.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Prihlasenie: React.FC = () => {
  const [email, setEmail] = useState('');
  const [heslo, setHeslo] = useState('');
  const [error, setError] = useState('');
  const [meno, setMeno] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMeno('');

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: heslo,
    });

    if (signInError) {
      setError('Email alebo heslo je nesprávne.');
      return;
    }

    const user = data.user;
    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        setError(profileError.message);
        return;
      }
  setMeno(profile.name);
  navigate('/matches');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h2 style={{ marginBottom: 24 }}>Prihlásenie</h2>
      <form onSubmit={handleLogin} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 32, minWidth: 320, background: '#fafbfc', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 16 }}
          />
          <input
            type="password"
            placeholder="Heslo"
            value={heslo}
            onChange={e => setHeslo(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 16 }}
          />
          <button
            type="submit"
            style={{ padding: 10, borderRadius: 4, background: '#1976d2', color: 'white', border: 'none', fontSize: 16, cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = '#115293')}
            onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
          >
            Prihlásiť
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ padding: 10, borderRadius: 4, background: '#d32f2f', color: 'white', border: 'none', fontSize: 16, cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = '#9a2323')}
            onMouseOut={e => (e.currentTarget.style.background = '#d32f2f')}
          >
            Späť
          </button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          {meno && <div style={{ color: 'green', marginTop: 8 }}>Vitaj, {meno}!</div>}
        </div>
      </form>
    </div>
  );
};

export default Prihlasenie;