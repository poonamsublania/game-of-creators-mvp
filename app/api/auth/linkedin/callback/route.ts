import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(
      new URL('/dashboard/settings?linkedin=error', request.url)
    );
  }

  return NextResponse.redirect(
    new URL('/dashboard/settings?linkedin=connected', request.url)
  );
}
