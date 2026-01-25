import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const access_token = body.access_token;

    if (!access_token) {
      return NextResponse.json({ error: 'No access token provided' }, { status: 400 });
    }

    // Replace this with your actual logged-in user logic
    const userId = '35c2f326-f5a8-425c-bfc6-c84b910ec740'; // your Supabase user ID

    const { error } = await supabase
      .from('creator_accounts')
      .update({ access_token })
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 'error', error: err }, { status: 500 });
  }
}
