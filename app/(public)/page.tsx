export default function PublicHomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="mt-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="mt-48 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
      </div>

      <section className="relative z-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col gap-28 py-24">

          {/* ================= HERO ================= */}
          <div className="text-center flex flex-col items-center gap-6">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              Performance-Based Creator Platform
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Game of Creators
            </h1>

            <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Connect brands with high-impact creators and get paid based on{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                real engagement
              </span>
              — views, likes, comments, and shares. No fake followers. No guesswork.
            </p>

            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              <a
                href="/api/auth/signin"
                className="rounded-xl bg-blue-600 px-10 py-4 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
              >
                Get Started Free
              </a>
              <a
                href="#how-it-works"
                className="rounded-xl border bg-white/70 px-10 py-4 font-semibold backdrop-blur hover:bg-white transition dark:bg-gray-900/60"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Creators Onboarded", value: "1,200+" },
              { label: "Campaigns Launched", value: "350+" },
              { label: "Avg Engagement Boost", value: "4.6×" },
              { label: "Paid to Creators", value: "₹18L+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-sm dark:bg-gray-900/60"
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* ================= HOW IT WORKS ================= */}
          <div id="how-it-works" className="flex flex-col gap-12">
            <h2 className="text-3xl font-bold text-center">
              How Game of Creators Works
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Brands Launch Campaigns",
                  desc: "Brands define goals, budgets, platforms, and engagement metrics.",
                },
                {
                  title: "2. Creators Submit Content",
                  desc: "Creators post publicly and submit links to campaigns.",
                },
                {
                  title: "3. Get Paid by Performance",
                  desc: "Earnings are calculated based on real engagement data.",
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-sm hover:shadow-lg transition dark:bg-gray-900/60"
                >
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= WHY US ================= */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "No Fake Metrics",
                desc: "We track real engagement directly from platforms.",
              },
              {
                title: "Creator-First Payouts",
                desc: "Transparent CPM-based earnings. No hidden cuts.",
              },
              {
                title: "Brand-Safe Content",
                desc: "Public posts with real audience validation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-sm dark:bg-gray-900/60"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ================= TESTIMONIALS ================= */}
          <div className="flex flex-col gap-12">
            <h2 className="text-3xl font-bold text-center">
              Loved by Creators & Brands
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  name: "LinkedIn Creator",
                  quote:
                    "Finally a platform that pays based on engagement, not vanity metrics.",
                },
                {
                  name: "Startup Founder",
                  quote:
                    "Our campaign ROI doubled compared to influencer marketplaces.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-sm dark:bg-gray-900/60"
                >
                  <p className="italic text-gray-700 dark:text-gray-300">
                    “{t.quote}”
                  </p>
                  <p className="mt-4 text-sm font-semibold">{t.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= CTA ================= */}
          <div className="rounded-3xl bg-blue-600 text-white p-12 text-center flex flex-col gap-6">
            <h2 className="text-3xl font-bold">
              Ready to Play the Game of Creators?
            </h2>
            <p className="max-w-2xl mx-auto text-blue-100">
              Join creators and brands building transparent, performance-driven
              collaborations.
            </p>
            <a
              href="/api/auth/signin"
              className="mx-auto rounded-xl bg-white px-10 py-4 font-semibold text-blue-700 hover:bg-blue-50 transition"
            >
              Start Now — It’s Free
            </a>
          </div>

          {/* ================= FOOTER ================= */}
          <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Game of Creators. All rights reserved.
          </footer>

        </div>
      </section>
    </main>
  );
}
