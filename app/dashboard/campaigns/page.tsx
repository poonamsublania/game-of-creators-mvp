'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

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
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'live');

      if (!error && data) {
        setCampaigns(data as Campaign[]);
      }
      setLoading(false);
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="p-6">Loading campaigns...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Live Campaigns</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-start">
        {campaigns.map((c) => {
          const usedPercent =
            c.budget > 0 ? (c.used_budget / c.budget) * 100 : 0;

          return (
            <div
              key={c.id}
              className="bg-white border rounded-2xl shadow-sm max-w-md overflow-hidden"
            >
              {/* IMAGE */}
             <div className="w-full h-64 overflow-hidden border-b border-gray-200">

  <img
    src={c.image_url}
    alt={c.title}
    className="w-full h-full object-cover rounded-md"
  />
</div>


              <div className="p-5">
                {/* TITLE */}
                <h2 className="text-base font-semibold mb-2">
                  {c.title}
                </h2>

                {/* META */}
               {/* META BUTTONS */}

              {/* META BUTTONS */}
{/* META BUTTONS - VERTICAL */}
{/* META BUTTONS – SINGLE PERFECT ROW */}
{/* META BUTTONS – FULL CARD WIDTH WITH SPACE BETWEEN */}
<div className="flex w-full gap-3 mb-6">

  <div
    className="flex-1 text-center py-2
               bg-red-100 text-red-700
               text-sm font-medium
               rounded-xl
               hover:bg-red-200 transition
               whitespace-nowrap"
  >
    ✔ 100 Submissions
  </div>

  <div
    className="flex-1 text-center py-2
               bg-blue-100 text-blue-700
               text-sm font-medium
               rounded-xl
               hover:bg-blue-200 transition
               whitespace-nowrap"
  >
    🎥 UGC
  </div>

  <div
    className="flex-1 text-center py-2
               bg-yellow-100 text-yellow-800
               text-sm font-medium
               rounded-xl
               hover:bg-yellow-200 transition
               whitespace-nowrap"
  >
    ⭐ Bonus Available
  </div>

</div>


{/* DETAILS */}
                <div className="space-y-2 text-[13px] text-gray-700 mb-5">

  {/* Platform */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">📱</span>
    <span className="font-medium">Platform:</span>
    <span className="font-semibold ml-1 capitalize">{c.platform}</span>
    
  </div>

  {/* Starts */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">⏱</span>
    <span className="font-medium">Starts:</span>
    <span className="font-semibold ml-1">
      {new Date(c.starts_at).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })}
    </span>
  </div>

  {/* Ends */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">📅</span>
    <span className="font-medium">Ends:</span>
    <span className="font-semibold ml-1">
      {new Date(c.ends_at).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })}
    </span>
  </div>

  {/* Submissions */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">👥</span>
    <span className="font-medium">Submissions:</span>
    <span className="font-semibold ml-1 flex items-center gap-1">
      ✔ {c.current_submissions}/{c.total_submissions}
    </span>
  </div>

  {/* Contest Type */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">📊</span>
    <span className="font-medium">Contest Type:</span>
    <span className="font-semibold ml-1">{c.contest_type}</span>
  </div>

  {/* CPM Rate */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">💰</span>
    <span className="font-medium">CPM Rate:</span>
    <span className="font-semibold ml-1">${c.cpm_rate} / 1k views</span>
  </div>

  {/* Budget */}
  <div className="flex items-center gap-1">
    <span className="text-gray-400 w-5">🪙</span>
    <span className="font-medium">Budget:</span>
    <span className="font-semibold ml-1">${c.budget}</span>
  </div>

</div>

                {/* BUDGET TRACKER */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Budget Tracker
                  </p>

                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-1.5 bg-blue-600 rounded-full"
                      style={{ width: `${usedPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                    <span>${c.used_budget} used</span>
                    <span>${c.budget - c.used_budget} remaining</span>
                  </div>
                </div>

                {/* BUTTON */}
                <Link
                  href={`/dashboard/campaigns/${c.id}`}
                  className="block w-full text-center py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
