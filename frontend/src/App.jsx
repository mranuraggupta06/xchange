import React from 'react';
import CreditWallet from './components/CreditWallet';

export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: '24px auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Xchange — Demo</h1>
        <small>Dev build</small>
      </header>

      <main style={{ marginTop: 20 }}>
        <p>Backend must be running at <code>{process.env.REACT_APP_API_URL || 'http://localhost:4000/api'}</code></p>
        <CreditWallet />
      </main>
    </div>
  );
}
