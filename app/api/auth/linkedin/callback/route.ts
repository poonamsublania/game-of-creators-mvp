import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/dashboard/settings?linkedin=error", req.url)
    );
  }

  // Later: exchange code → access token
  // For now: redirect success

  return NextResponse.redirect(
    new URL("/dashboard/settings?linkedin=connected", req.url)
  );
}
