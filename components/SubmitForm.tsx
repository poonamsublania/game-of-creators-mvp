'use client';

import { useState } from 'react';

interface SubmitFormProps {
  creatorId: string;
}

export default function SubmitForm({ creatorId }: SubmitFormProps) {
  const [postUrl, setPostUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postUrl, creatorId }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Submission successful!');
      setPostUrl('');
    } else {
      setStatus(data.error || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <label className="block mb-2 font-bold">LinkedIn Post URL</label>
      <input
        type="url"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="https://www.linkedin.com/feed/update/..."
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}
