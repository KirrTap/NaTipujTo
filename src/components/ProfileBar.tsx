import React from 'react';

const ProfileBar: React.FC<{ name: string }> = ({ name }) => {

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 60,
      padding: '0 0 0 8px',
      background: '#fff',
      borderRadius: 0,
      boxShadow: 'none',
      maxWidth: 340,
      margin: 0
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#bbb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Basic profile icon SVG */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"/></svg>
      </div>
      <span style={{ fontWeight: 600, fontSize: 16, color: '#333' }}>{name}</span>
    </div>
  );
};

export default ProfileBar;
