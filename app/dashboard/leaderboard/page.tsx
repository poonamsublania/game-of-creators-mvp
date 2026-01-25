'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Eye, Heart, MessageCircle, RefreshCw } from 'lucide-react';

type Submission = {
  submission_id: string;
  creator_name: string;
  video_url: string;
  views: number;
  likes: number;
  comments: number;
};

export default function LeaderboardPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSubmission = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leaderboard_submission_metrics')
      .select('*')
      .limit(1)
      .order('views', { ascending: false })
      .single(); // only one

    if (!error && data) setSubmission(data as Submission);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmission();
  }, []);

  if (!submission) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>
        <button
          onClick={fetchSubmission}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <RefreshCw size={16} /> {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Single Submission Card */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-semibold text-lg mb-2">{submission.creator_name}</h2>

        <video
          src={submission.video_url}
          controls
          className="w-full rounded-lg mb-3"
        />

        <div className="flex justify-between text-gray-700 font-medium">
          <span className="flex items-center gap-1"><Eye size={16} /> {submission.views}</span>
          <span className="flex items-center gap-1 text-red-500"><Heart size={16} /> {submission.likes}</span>
          <span className="flex items-center gap-1 text-blue-500"><MessageCircle size={16} /> {submission.comments}</span>
        </div>
      </div>
    </div>
  );
}
