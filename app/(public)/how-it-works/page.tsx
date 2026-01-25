export default function HowItWorksPage() {
  return (
    <section className="flex flex-col gap-8 max-w-3xl">
      <h1 className="text-3xl font-bold">How It Works</h1>

      <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Sign Up & Login:</strong>  
          Creators log in using email and connect their social accounts.
        </li>

        <li>
          <strong>Connect Platforms:</strong>  
          Connect TikTok and LinkedIn via secure OAuth.
        </li>

        <li>
          <strong>Submit Content:</strong>  
          Paste your public TikTok or LinkedIn post URL into a campaign.
        </li>

        <li>
          <strong>Track Metrics:</strong>  
          Views, impressions, likes, and comments are tracked automatically.
        </li>

        <li>
          <strong>Win Rewards:</strong>  
          Leaderboards and payouts are based on real performance.
        </li>
      </ol>
    </section>
  );
}
