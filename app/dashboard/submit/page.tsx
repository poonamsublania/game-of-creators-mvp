'use client';

import { useEffect, useState } from 'react';

type Submission = {
  id: string;
  post_url?: string;
  video_url?: string;
  submitted_at: string;
};

const CAMPAIGN_ID = '4f111ee6-23cf-489e-aed0-008cad241517';

export default function SubmitPage() {
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ================= LOAD SUBMISSIONS ================= */
  useEffect(() => {
    fetch('/api/submissions')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setSubmissions(data))
      .catch(() => {});
  }, []);

  /* ================= VIDEO SELECT ================= */
  const onVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setVideos((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeVideo = (i: number) => {
    setVideos((v) => v.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!url && videos.length === 0) {
      setError('Please add a post URL or upload at least one video.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      /* URL SUBMISSION */
      if (url) {
        const res = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaign_id: CAMPAIGN_ID, post_url: url }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'URL submission failed');

        setSubmissions((p) => [data.submission, ...p]);
        setUrl('');
      }

      /* VIDEO UPLOADS */
      for (const video of videos) {
        const fd = new FormData();
        fd.append('campaign_id', CAMPAIGN_ID);
        fd.append('video', video);

        const res = await fetch('/api/submissions', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Video upload failed');

        setSubmissions((p) => [data.submission, ...p]);
      }

      setVideos([]);
      setPreviews([]);
    } catch (e: any) {
      setError(e.message || 'Submission failed');
    }

    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Submit Content</h1>
        <p className="text-gray-500">Submit your post URL or upload videos for this campaign.</p>
      </div>

      {/* SUBMIT CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
        {/* URL INPUT */}
        <label className="text-sm font-semibold text-gray-700">Post URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://instagram.com/..."
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* OR */}
        <div className="text-center text-gray-400 text-sm my-4">OR</div>

        {/* VIDEO UPLOAD */}
        <label className="text-sm font-semibold text-gray-700">Upload Videos</label>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={onVideoSelect}
          className="mt-2"
        />

        {/* VIDEO PREVIEWS */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {previews.map((src, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <video src={src} controls className="w-full h-40 object-cover" />
                <button
                  onClick={() => removeVideo(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
        >
          {loading ? 'Submitting...' : 'Submit Content'}
        </button>
      </div>

      {/* SUBMISSIONS LIST */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Your Submissions</h3>
        {submissions.length === 0 && <p className="text-gray-500 text-sm">No submissions yet.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.map((s) => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              {/* URL */}
              {s.post_url && (
                <a href={s.post_url} target="_blank" className="text-blue-600 underline break-all">
                  {s.post_url}
                </a>
              )}

              {/* VIDEO */}
              {s.video_url && (
                <video src={s.video_url} controls className="w-full mt-3 rounded-lg h-48 object-cover" />
              )}

              {/* TIMESTAMP */}
              <div className="text-xs text-gray-500 mt-2">
                Submitted on {new Date(s.submitted_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}