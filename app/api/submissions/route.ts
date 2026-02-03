import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 🔒 Hardcoded auth user id for assignment
const AUTH_USER_ID = '35c2f326-f5a8-425c-bfc6-c84b910ec740'

/* =========================
   GET → FETCH SUBMISSIONS
========================= */
export async function GET() {
  try {
    // Get first creator account id
    const { data: creatorAccounts } = await supabase
      .from('creator_accounts')
      .select('id')
      .eq('creator_id', AUTH_USER_ID)
      .limit(1)

    if (!creatorAccounts || creatorAccounts.length === 0) {
      return NextResponse.json([])
    }

    const creatorId = creatorAccounts[0].id

    const { data } = await supabase
      .from('submissions')
      .select('*')
      .eq('creator_id', creatorId)
      .order('submitted_at', { ascending: false })

    return NextResponse.json(data || [])
  } catch (err) {
    console.error('GET error:', err)
    return NextResponse.json([], { status: 500 })
  }
}

/* =========================
   POST → SAVE SUBMISSION
========================= */
export async function POST(req: NextRequest) {
  try {
    const { campaign_id, post_url } = await req.json()

    if (!campaign_id || !post_url) {
      return NextResponse.json(
        { error: 'Missing campaign_id or post_url' },
        { status: 400 }
      )
    }

    // Get creator account id
    const { data: creatorAccounts } = await supabase
      .from('creator_accounts')
      .select('id')
      .eq('creator_id', AUTH_USER_ID)
      .limit(1)

    if (!creatorAccounts || creatorAccounts.length === 0) {
      return NextResponse.json(
        { error: 'No creator account found in DB' },
        { status: 400 }
      )
    }

    const creatorId = creatorAccounts[0].id

    const { data, error } = await supabase
      .from('submissions')
      .insert({
        campaign_id,
        creator_id: creatorId,
        platform: 'linkedin',
        content_type: 'post',
        post_url,
      })
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('POST error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
