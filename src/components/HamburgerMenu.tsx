import React, { useState } from 'react';

import { supabase } from '../supabaseClient';

const menuItems = [
  { label: 'Zápasy', path: '/matches' },
  { label: 'Moje tipy', path: '/my-tips' },
  { label: 'Body', path: '/points' },
  { label: 'Rebríček', path: '/ranking' }
];

const HamburgerMenu: React.FC = () => {
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await supabase.auth.signOut();
    Object.keys(localStorage)
      .filter((k) => k.startsWith('sb-'))
      .forEach((k) => localStorage.removeItem(k));
    window.location.href = '/';
  };
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (profile && profile.role === 'admin') {
          setIsAdmin(true);
        }
      }
    };
    checkAdmin();
  }, []);

  return (
    <>
  <div style={{ position: open ? 'fixed' : 'absolute', top: 0, right: 18, zIndex: 100, height: 60, display: 'flex', alignItems: 'center' }}>
    <button
      aria-label="menu"
      onClick={() => setOpen(!open)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: 28, height: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ height: 4, borderRadius: 2, background: '#1976d2', width: '100%' }} />
        ))}
      </div>
    </button>
  </div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-220px',
          width: 200,
          height: '100vh',
          background: '#fff',
          boxShadow: open ? '-2px 0 8px rgba(0,0,0,0.12)' : 'none',
          transition: 'right 0.3s',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 60
        }}
      >
        {menuItems.map(item => (
          <a
            key={item.label}
            href={item.path}
            style={{
              padding: '16px 24px',
              fontSize: 17,
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #eee',
              cursor: 'pointer'
            }}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        {isAdmin && (
          <a
            href="/adminpanel"
            style={{
              padding: '16px 24px',
              fontSize: 17,
              color: '#388e3c',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              background: '#e8f5e9'
            }}
            onClick={() => setOpen(false)}
          >
            Admin Panel
          </a>
        )}
        <a
          href="/"
          style={{
            padding: '16px 24px',
            fontSize: 17,
            color: '#d32f2f',
            textDecoration: 'none',
            fontWeight: 500,
            borderBottom: '1px solid #eee',
            cursor: 'pointer'
          }}
          onClick={handleLogout}
        >
          Odhlásiť
        </a>
      </div>
    </>
  );
};

export default HamburgerMenu;