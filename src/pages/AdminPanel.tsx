import React from 'react';
import HamburgerMenu from '../components/HamburgerMenu';

const AdminPanel: React.FC = () => (
  <>
    <HamburgerMenu />
  <div style={{ marginTop: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <button
        style={{
          background: '#1976d2', color: '#fff', border: 'none', borderRadius: 10,
          padding: '14px 0', fontWeight: 600, fontSize: 18, cursor: 'pointer',
          width: 220, boxShadow: '0 2px 8px rgba(25,118,210,0.08)', transition: 'background 0.2s'
        }}
        onClick={() => window.location.href = '/admin-result'}
      >
        Vyhodnotiť zápasy
      </button>
      <button
        style={{
          background: '#43a047', color: '#fff', border: 'none', borderRadius: 10,
          padding: '14px 0', fontWeight: 600, fontSize: 18, cursor: 'pointer',
          width: 220, boxShadow: '0 2px 8px rgba(67,160,71,0.08)', transition: 'background 0.2s'
        }}
        onClick={() => window.location.href = '/admin-match'}
      >
        Pridať zápas
      </button>
    </div>
  </>
);

export default AdminPanel;