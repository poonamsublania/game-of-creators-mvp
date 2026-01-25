import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ secret key
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(
      new URL('/dashboard/settings?linkedin=error', request.url)
    );
  }

  // 🔁 Exchange code → access token
  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    console.error('LinkedIn token error:', tokenData);
    return NextResponse.redirect(
      new URL('/dashboard/settings?linkedin=error', request.url)
    );
  }

  // ⚠️ TEMP user id (replace later with session user)
  const userId = '35c2f326-f5a8-425c-bfc6-c84b910ec740';

  // ✅ Save REAL access token
  await supabase.from('creator_accounts').upsert({
    id: userId,
    linkedin_id: 'company_111555924',
    access_token: tokenData.access_token,
    created_at: new Date().toISOString(),
  });

  return NextResponse.redirect(
    new URL('/dashboard/settings?linkedin=connected', request.url)
  );
}
