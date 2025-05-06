import React from 'react';

export default function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
      <img src="/BellyUpLogo.png" alt="App Logo" style={{ height: 50, marginRight: '1rem' }} />
      <h1>BellyUp</h1>
    </header>
  );
}
