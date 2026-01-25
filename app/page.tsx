import Image from "next/image";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-12">
      {/* Hero Section */}
      <div className="mt-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Game of Creators
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          A performance-driven creator marketing platform where brands
          collaborate with creators and pay based on real engagement —
          views, impressions, and performance, not follower count.
        </p>
      </div>

      {/* How it works */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">1. Join Campaigns</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Brands launch performance-based campaigns for creators.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">2. Submit Content</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Creators submit TikTok or LinkedIn posts to campaigns.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">3. Win by Performance</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Leaderboards are ranked by real engagement metrics.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="flex gap-4">
        <a
          href="/login"
          className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Get Started
        </a>
        <a
          href="/campaigns"
          className="rounded-lg border px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          View Campaigns
        </a>
      </div>
    </section>
  );
}
