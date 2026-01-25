import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("creator_accounts")
    .select("linkedin_connected")
    .single();

  if (error) {
    return NextResponse.json({ linkedin_connected: false });
  }

  return NextResponse.json(data);
}
