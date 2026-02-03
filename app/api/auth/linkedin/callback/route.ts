import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/dashboard/settings?linkedin=error", req.url)
    );
  }

  // 1️⃣ Exchange code → access token
  const tokenRes = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    }
  );

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    console.error("LinkedIn token error:", tokenData);
    return NextResponse.redirect(
      new URL("/dashboard/settings?linkedin=error", req.url)
    );
  }

  // 2️⃣ (Optional) Fetch LinkedIn profile
  await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 3️⃣ Supabase SERVICE ROLE client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // ✅ YOUR SUPABASE USER ID (HARDCODED)
  const creatorId = "35c2f326-f5a8-425c-bfc6-c84b910ec740";

  // 4️⃣ Save / update creator account
  await supabase.from("creator_accounts").upsert({
    creator_id: creatorId,
    provider: "linkedin",
    access_token: accessToken,
  });

  // 5️⃣ Redirect success
  return NextResponse.redirect(
    new URL("/dashboard/settings?linkedin=connected", req.url)
  );
}
