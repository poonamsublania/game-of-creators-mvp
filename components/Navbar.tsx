'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Game of Creators</h1>
      <div className="space-x-4">
        
         <Link href="/dashboard/campaigns">Campaigns</Link>
        <Link href="/dashboard/submit">Submit</Link>
        <Link href="/dashboard/leaderboard">Leaderboard</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </div>
    </nav>
  );
}
