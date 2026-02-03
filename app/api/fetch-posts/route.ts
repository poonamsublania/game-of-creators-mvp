import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const creatorId = "35c2f326-f5a8-425c-bfc6-c84b910ec740";

  const { data, error } = await supabase
    .from("creator_accounts")
    .select("id")
    .eq("creator_id", creatorId)
    .eq("provider", "linkedin")
    .single();

  // Not connected
  if (error || !data) {
    return NextResponse.json({ connected: false });
  }

  return NextResponse.json({ connected: true });
}
