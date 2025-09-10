import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex',
      marginTop: 60,
      alignItems: 'center',
      background: '#fff'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
        gap: 32
      }}>
        <img src={logo} alt="Logo" style={{ width: 300, height: 'auto' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: '100%', maxWidth: 320 }}>
        <button
          style={{ width: '100%', padding: '16px 0', fontSize: '1.1rem', borderRadius: 8, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
          onClick={() => navigate('/prihlasenie')}
          onMouseOver={e => (e.currentTarget.style.background = '#115293')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >
          Prihlásiť sa
        </button>
        <button
          style={{ width: '100%', padding: '16px 0', fontSize: '1.1rem', borderRadius: 8, border: 'none', background: '#43a047', color: '#fff', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
          onClick={() => navigate('/registracia')}
          onMouseOver={e => (e.currentTarget.style.background = '#2e7031')}
          onMouseOut={e => (e.currentTarget.style.background = '#43a047')}
        >
          Zaregistrovať sa
        </button>
      </div>
    </div>
  );
};

export default Home;
