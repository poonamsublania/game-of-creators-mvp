export default function PublicHomePage() {
  return (
    <section className="flex flex-col gap-12">
      <div className="mt-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Game of Creators
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          A performance-driven creator marketing platform where brands
          collaborate with creators and pay based on real engagement —
          not follower count.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">Join Campaigns</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Participate in brand campaigns across TikTok and LinkedIn.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">Submit Content</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Submit your public post or video to a campaign.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">Track Performance</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Rankings and rewards are based on real engagement metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
