import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const contentType = req.headers.get('content-type') || '';

  try {
    /* ================= URL SUBMISSION ================= */
    if (contentType.includes('application/json')) {
      const body = await req.json();

      if (!body.campaign_id) {
        return NextResponse.json(
          { error: 'campaign_id required' },
          { status: 400 }
        );
      }

      const { data, error } = await supabase
        .from('submissions')
        .insert({
          campaign_id: body.campaign_id,
          post_url: body.post_url || null,
        })
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({ submission: data });
    }

    /* ================= VIDEO UPLOAD ================= */
    const form = await req.formData();
    const campaign_id = form.get('campaign_id') as string;
    const video = form.get('video') as File;

    if (!campaign_id || !video) {
      return NextResponse.json(
        { error: 'campaign_id and video required' },
        { status: 400 }
      );
    }

    const ext = video.name.split('.').pop();
    const filePath = `${campaign_id}/${crypto.randomUUID()}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('submissions')
      .upload(filePath, video, {
        contentType: video.type,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('submissions')
      .getPublicUrl(filePath);

    const video_url = urlData.publicUrl;

    // Save submission
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        campaign_id,
        video_url,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ submission: data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const supabase = createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  await supabase.from('submissions').delete().eq('id', id);

  return NextResponse.json({ success: true });
}
