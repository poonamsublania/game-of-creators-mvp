export default function CampaignsPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Active Campaigns</h1>

      <div className="rounded-xl border p-6">
        <h3 className="text-lg font-semibold">
          TikTok Engagement Challenge
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Submit a TikTok video and compete based on views.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Type: Leaderboard · Platform: TikTok
        </p>
      </div>

      <div className="rounded-xl border p-6">
        <h3 className="text-lg font-semibold">
          LinkedIn Brand Awareness Campaign
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Share a LinkedIn post or video to earn rewards.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Type: CPM · Platform: LinkedIn
        </p>
      </div>
    </section>
  );
}
