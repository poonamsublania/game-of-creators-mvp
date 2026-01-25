'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Opportunity = {
  id: string;
  title: string;
  platform: string;
  image_url: string;
  starts: string;
  ends: string;
  submissions: number;
  contest_type: string;
  cpm_rate: number;
  total_budget: number;
};

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('starts', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return;
    }

    setOpportunities(data || []);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="font-bold text-lg">Game of Creators</h1>
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/opportunities">Opportunities</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Opportunities</h2>

        {opportunities.length === 0 && (
          <p className="text-gray-500">No opportunities found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-lg shadow p-4"
            >
              <img
                src={opp.image_url}
                alt={opp.title}
                className="w-full h-48 object-cover rounded"
              />

              <h3 className="font-bold text-lg mt-3">{opp.title}</h3>

              <p className="text-sm text-gray-600 mt-1">
                Platform: <b>{opp.platform}</b>
              </p>

              <p className="text-sm mt-1">
                Starts: {new Date(opp.starts).toLocaleString()}
              </p>

              <p className="text-sm">
                Ends: {new Date(opp.ends).toLocaleString()}
              </p>

              <p className="text-sm mt-1">
                Submissions: {opp.submissions}
              </p>

              <p className="text-sm">
                Contest Type: {opp.contest_type}
              </p>

              <p className="text-sm">
                CPM: ${opp.cpm_rate} / 1k views
              </p>

              <p className="text-sm font-semibold">
                Total Budget: ${opp.total_budget}
              </p>

              <button className="mt-3 text-blue-600 font-medium">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
