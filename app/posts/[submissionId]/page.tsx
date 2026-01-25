'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function PostPage({ params }: { params: { submissionId: string } }) {
  const submissionId = params.submissionId;

  useEffect(() => {
    const trackView = async () => {
      await supabase.rpc('increment_views', {
        p_submission_id: submissionId,
      });
    };

    trackView();
  }, [submissionId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">LinkedIn Post</h1>

      {/* Your embedded post / iframe here */}
    </div>
  );
}
