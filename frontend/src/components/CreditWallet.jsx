import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function CreditWallet() {
  const [me, setMe] = useState(null);
  const [teacherId, setTeacherId] = useState('');
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('xuser');
    if (stored) fetchMe(stored);
  }, []);

  async function fetchMe(userId) {
    try {
      const res = await api.get('/credits/me', { headers: { 'x-user-id': userId } });
      setMe(res.data);
      localStorage.setItem('xuser', userId);
    } catch (err) {
      setMe(null);
    }
  }

  async function transfer() {
    const userId = localStorage.getItem('xuser');
    if (!userId) return setStatus('Set your user id first (dev mode).');
    try {
      setStatus('Sending...');
      const res = await api.post('/credits/transfer',
        { teacherId, amount: Number(amount) },
        { headers: { 'x-user-id': userId } }
      );
      setMe(res.data.result.learner);
      setStatus('Transfer complete');
    } catch (err) {
      setStatus(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="wallet">
      <h2>Credit Wallet (Dev)</h2>
      {!me && (
        <div>
          <p>No user loaded. Paste your user id below and click Load.</p>
          <input id="userid" placeholder="user id" />
          <button onClick={() => {
            const v = document.getElementById('userid').value.trim();
            if (v) fetchMe(v);
          }}>Load</button>
        </div>
      )}
      {me && (
        <div>
          <p><strong>{me.name || me.email}</strong></p>
          <p>Credits: <strong>{me.credits}</strong></p>
        </div>
      )}

      <hr />

      <div>
        <h4>Pay teacher (dev)</h4>
        <input placeholder="teacher id" value={teacherId} onChange={e => setTeacherId(e.target.value)} />
        <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={transfer}>Pay</button>
      </div>

      <p className="status">{status}</p>
    </div>
  );
}
