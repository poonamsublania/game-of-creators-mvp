import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { submission_id, user_id, type, comment, emoji } = await req.json();

  if (!submission_id || !user_id || !type) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  try {
    if (type === 'view') {
      await supabase.from('submission_views').insert([{ submission_id, viewer_id: user_id }]);
    }

    if (type === 'like') {
      await supabase.from('submission_likes').insert([{ submission_id, liker_id: user_id, emoji }]);
    }

    if (type === 'comment') {
      await supabase.from('submission_comments').insert([{ submission_id, commenter_id: user_id, comment }]);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
