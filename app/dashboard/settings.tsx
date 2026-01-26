'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [linkedinConnected, setLinkedinConnected] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('linkedin') === 'connected') {
      setLinkedinConnected(true);
      alert('✅ LinkedIn connected successfully');
      window.history.replaceState({}, '', '/dashboard/settings');
    }

    if (params.get('linkedin') === 'disconnected') {
      setLinkedinConnected(false);
      alert('❌ LinkedIn disconnected successfully');
      window.history.replaceState({}, '', '/dashboard/settings');
    }
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>Settings</h1>
      <p>Manage your account settings and preferences</p>

      <hr style={{ margin: '24px 0' }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* LinkedIn Card */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 8,
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>LinkedIn</h3>
            <p style={{ margin: 0, color: '#555' }}>
              {linkedinConnected ? 'Connected as Poonam Sublania / Active' : 'Not connected'}
            </p>
          </div>
          {linkedinConnected ? (
            <button
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                backgroundColor: '#ddd',
                border: 'none',
              }}
              onClick={() => setLinkedinConnected(false)}
            >
              Disconnect
            </button>
          ) : (
            <a
              href="/api/auth/linkedin"
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                backgroundColor: '#0A66C2',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              Connect LinkedIn
            </a>
          )}
        </div>

        {/* Instagram / Other accounts can be added the same way */}
      </div>
    </main>
  );
}
