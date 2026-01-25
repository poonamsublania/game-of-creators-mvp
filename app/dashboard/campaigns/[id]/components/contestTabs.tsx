'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function ContestTabs({ contestId }: { contestId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const isDetails = pathname.includes('contest-details');
  const isLeaderboard = pathname.includes('leaderboard');

  <div className="border border-red-500 p-4 text-red-600">
  ContestTabs is rendering
</div>

  return (
    
    <div className="space-y-4">

      {/* ================= TOP BIG TABS ================= */}
      <div className="flex w-full bg-gray-100 rounded-full p-1">
        <button
          onClick={() =>
            router.push(`/dashboard/campaigns/${contestId}/contest-details`)
          }
          className={`flex-1 py-3 text-sm font-semibold rounded-full transition
            ${
              isDetails
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-gray-600 hover:text-black'
            }`}
        >
          Contest Details
        </button>

        <button
          onClick={() =>
            router.push(`/dashboard/campaigns/${contestId}/leaderboard`)
          }
          className={`flex-1 py-3 text-sm font-semibold rounded-full transition
            ${
              isLeaderboard
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-gray-600 hover:text-black'
            }`}
        >
          Leaderboard
        </button>
      </div>

      {/* ================= SECOND ROW TABS ================= */}
      <div className="flex gap-6 text-sm text-gray-500 border-b pb-2 overflow-x-auto">
        <button className="font-semibold text-purple-600 border-b-2 border-purple-600 pb-2">
          Earning Opportunities
        </button>
        <button className="hover:text-black">Contest Details</button>
        <button className="hover:text-black">Content Requirements</button>
        <button className="hover:text-black">Participation Guidelines</button>
        <button className="hover:text-black">Resources & Tools</button>
      </div>

    </div>
  );
}
