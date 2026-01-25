'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import {
  DollarSign,
  Clock,
  Users,
  CalendarDays,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

/* ---------------- PLATFORM ICONS ---------------- */

const PLATFORM_ICON_MAP: Record<string, string> = {
  youtube: '/youtube.png',
  tiktok: '/titok.png',
  linkedin: '/linkedin.png',
};

/* ---------------- TYPES ---------------- */

type Campaign = {
  id: string;
  title: string;
  image_url: string;
  platform: string;
  starts_at: string;
  ends_at: string;
  contest_type: string;
  cpm_rate: number;
  budget: number;
  used_budget: number;
  current_submissions: number;
  total_submissions: number;
  status: string;
};

/* ---------------- PAGE ---------------- */

export default function CampaignDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      const { data } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setCampaign(data as Campaign);
      setLoading(false);
    };

    if (id) fetchCampaign();
  }, [id]);

  if (loading) return <div className="p-6">Loading campaign...</div>;
  if (!campaign) return <div className="p-6 text-red-500">Campaign not found</div>;

  const durationDays = Math.ceil(
    (new Date(campaign.ends_at).getTime() -
      new Date(campaign.starts_at).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const platformKey = campaign.platform.toLowerCase();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* ================= HERO ================= */}
      <div className="relative rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6">

        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white rounded-xl p-2 shadow">
            <img
              src={PLATFORM_ICON_MAP[platformKey]}
              alt={campaign.platform}
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="uppercase text-sm font-medium opacity-90">
            {campaign.platform}
          </span>
        </div>

        <h1 className="text-3xl font-bold">{campaign.title}</h1>

        <div className="flex gap-2 mt-3 flex-wrap">
          <Badge label={campaign.status.toUpperCase()} />
          <Badge label={campaign.contest_type} />
          <Badge label={campaign.platform} />
        </div>

        <div className="mt-3 text-sm opacity-90">
          {new Date(campaign.starts_at).toDateString()} –{' '}
          {new Date(campaign.ends_at).toDateString()}
        </div>

        <div className="absolute right-6 top-6 bg-white text-black rounded-xl p-4 w-56 shadow-xl">
          <div className="text-xs text-gray-500">TOTAL BUDGET</div>
          <div className="text-3xl font-bold">${campaign.budget}</div>
          <div className="text-xs text-gray-500">
            ${campaign.cpm_rate} per 1,000 views
          </div>
        </div>
      </div>

      {/* ================= IMAGE ================= */}
     <div className="w-full rounded-2xl shadow border bg-black px-6 py-4">
  <img
    src={campaign.image_url}
    alt={campaign.title}
    className="w-full max-h-
    
    [520px] object-contain mx-auto"
  />
</div>






 {/* ================= READY TO SHOWCASE ================= */}
<div className="border rounded-2xl p-8 text-center bg-gray-50">
  <h2 className="text-2xl font-semibold text-blue-600">
    Ready to Showcase Your Talent?
  </h2>

  <p className="text-gray-500 mt-2">
    {campaign.status === 'live'
      ? 'Submit your content and start earning based on performance.'
      : 'This opportunity has ended or is no longer active.'}
  </p>

  <button
    disabled={campaign.status !== 'live'}
    className={`mt-6 px-6 py-3 rounded-xl font-medium transition
      ${
        campaign.status === 'live'
          ? 'bg-purple-600 text-white hover:bg-purple-700'
          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
      }`}
  >
    {campaign.status === 'live' ? 'Participate Now' : 'Contest Ended'}
  </button>
</div>



      {/* ================= READY TO SHOWCASE ================= */}
      {campaign.status !== 'live' && (
        <div className="border rounded-2xl p-10 text-center bg-gray-50">
          <h2 className="text-2xl font-semibold text-purple-600">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-gray-500 mt-2">
            This opportunity has ended or is no longer active.
          </p>
          <button
            disabled
            className="mt-6 px-8 py-3 rounded-xl bg-gray-300 text-gray-600 font-medium cursor-not-allowed"
          >
            Contest Ended
          </button>
        </div>
      )}

      
      {/* ================= STATS ROW ================= */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  {/* PLATFORM */}
  <StatBox
    title="PLATFORM"
    value={campaign.platform}
    icon={
      <img
        src={PLATFORM_ICON_MAP[platformKey]}
        alt={campaign.platform}
        className="w-8 h-8"
      />
    }
    bg="bg-red-100"

  />

  {/* DURATION */}
  <StatBox
    title="DURATION"
    value={`${durationDays} days`}
    sub={`${new Date(campaign.starts_at).toDateString()} - ${new Date(
      campaign.ends_at
    ).toDateString()}`}
    icon={<CalendarDays size={22} />}
    bg="bg-blue-100"

  />

  {/* TOTAL BUDGET */}
  <StatBox
    title="TOTAL BUDGET"
    value={`$${campaign.budget}`}
    sub="CPM based"
    icon={<DollarSign size={22} />}
    bg="bg-orange-100"

  />

  {/* SUBMISSIONS */}
  <StatBox
    title="SUBMISSIONS"
    value={campaign.current_submissions.toString()}
    sub="Total entries"
    icon={<Users size={22} />}
    bg="bg-purple-100"

  />
</div>

      {/* ================= CONTEST STATUS ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="font-semibold mb-2">Contest Status Update</h3>
        <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
          Payouts Processed
        </span>
        
        <p className="text-gray-500 text-sm mt-2">
          Verification is complete and payouts have been processed to winners.
        </p>
      </div>
     
{/* ================= CONTEST / LEADERBOARD BUTTONS ================= */}
<div className="flex w-full max-w-xl mx-auto mt-4 rounded-full bg-gray-100 shadow-sm overflow-hidden border">
  {/* Contest Details Button */}
  <button
    onClick={() => (window.location.href = '/dashboard/campaigns/[id]/contest-details')}
    className="flex-1 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white transition-colors duration-300"
  >
    Contest Details
  </button>

  {/* Leaderboard Button */}
  <button
    onClick={() => (window.location.href = '/dashboard/campaigns/[id]/leaderboard')}
    className="flex-1 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white transition-colors duration-300"
  >
    Leaderboard
  </button>
</div>



      {/* ================= EARNINGS ================= */}
      <div className="border rounded-xl bg-white p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <DollarSign size={18} /> Earning Opportunities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MiniStat label="Pay Rate" value={`$${campaign.cpm_rate} / 1k views`} />
          <MiniStat label="Total Budget" value={`$${campaign.budget}`} />
          <MiniStat label="Used Budget" value={`$${campaign.used_budget}`} />
          <MiniStat
            label="Remaining"
            value={`$${campaign.budget - campaign.used_budget}`}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Badge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
      {label}
    </span>
  );
}

function StatBox({
  title,
  value,
  sub,
  icon,
  bg,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white flex gap-4 items-center">
      <div className={`p-3 rounded-xl ${bg}`}>{icon}</div>
      <div>
        <div className="text-xs text-gray-500 font-medium">{title}</div>
        <div className="text-lg font-semibold">{value}</div>
        {sub && <div className="text-xs text-gray-400">{sub}</div>}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>

    
  );
}


