// src/pages/Registracia.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Registracia: React.FC = () => {
  const [meno, setMeno] = useState('');
  const [email, setEmail] = useState('');
  const [heslo, setHeslo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [heslo2, setHeslo2] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (heslo.length < 6) {
      setError('Heslo musí mať aspoň 6 znakov.');
      return;
    }
    if (heslo !== heslo2) {
      setError('Heslá sa nezhodujú.');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: heslo,
    });

    if (signUpError) {
      if (signUpError.message.includes('Password should be at least 6 characters')) {
        setError('Heslo musí mať aspoň 6 znakov.');
      } else if (signUpError.message.includes('already registered')) {
        setError('Tento email je už registrovaný.');
      } else {
        setError('Chyba pri registrácii: ' + signUpError.message);
      }
      return;
    }

    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, name: meno, role: 'player'}]);
      if (profileError) {
        setError(profileError.message);
        return;
      }
      setSuccess('Registrácia úspešná!');
      setTimeout(() => {
        navigate('/prihlasenie');
      }, 1000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h2 style={{ marginBottom: 24 }}>Registrácia</h2>
      <form onSubmit={handleRegister} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 32, minWidth: 320, background: '#fafbfc', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="text"
            placeholder="Meno"
            value={meno}
            onChange={e => setMeno(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 16 }}
          />
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
          <input
            type="password"
            placeholder="Zopakovať heslo"
            value={heslo2}
            onChange={e => setHeslo2(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 16 }}
          />
          <button
            type="submit"
            style={{ padding: 10, borderRadius: 4, background: '#1976d2', color: 'white', border: 'none', fontSize: 16, cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = '#115293')}
            onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
          >
            Registrovať
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
          {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default Registracia;
