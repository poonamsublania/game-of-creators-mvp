import Image from "next/image";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Clock,
  Youtube,
  CheckCircle2,
  Link2,
  ExternalLink,
  FileVideo,
  Trophy,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
     

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-200/70 px-5 py-2 text-sm font-semibold text-indigo-800">
            🚀 Performance-Based Creator Platform
          </span>

          <h1 className="mt-8 leading-tight">
            <span className="block text-6xl sm:text-7xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Game
              </span>{" "}
              <span className="text-gray-400 text-4xl sm:text-5xl font-semibold">
                of
              </span>{" "}
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                Creators
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Brands and creators collaborate transparently and earn based on{" "}
            <span className="font-semibold text-indigo-700">
              real engagement
            </span>, not fake followers.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/login"
              className="rounded-lg bg-indigo-600 px-10 py-3 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Get Started
            </a>
            <a
              href="/campaigns"
              className="rounded-lg border border-indigo-300 px-10 py-3 font-semibold text-indigo-700 hover:bg-indigo-100 transition"
            >
              Explore Campaigns
            </a>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <p className="mt-2 text-center text-gray-500">
            Simple · Transparent · Performance-driven
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Feature
              icon={<TrendingUp className="h-9 w-9 text-indigo-600" />}
              title="Join Campaigns"
              text="Apply to curated campaigns launched by trusted brands."
            />
            <Feature
              icon={<Sparkles className="h-9 w-9 text-pink-500" />}
              title="Submit Content"
              text="Publish public posts or videos on supported platforms."
            />
            <Feature
              icon={<ShieldCheck className="h-9 w-9 text-emerald-600" />}
              title="Earn Transparently"
              text="Rankings based on verified engagement metrics."
            />
          </div>
        </div>
      </section>

      {/* ================= SUPPORTED PLATFORMS ================= */}
<section className="bg-gradient-to-b from-slate-50 to-white">
  <div className="mx-auto max-w-6xl px-6 py-16 text-center">
    
    <h2 className="text-3xl font-bold text-slate-900">
      Supported Platforms
    </h2>
    <p className="mt-3 text-slate-600 max-w-xl mx-auto">
      Share your content where your audience already spends time
    </p>

    <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      
      {/* YouTube */}
      <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-red-50">
          <img src="/youtube.png" alt="YouTube" className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          YouTube
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Long-form and short video submissions
        </p>
      </div>

      {/* LinkedIn */}
      <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50">
          <img src="/linkedin.png" alt="LinkedIn" className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          LinkedIn
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Professional content & creator posts
        </p>
      </div>

      {/* TikTok */}
      <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100">
          <img src="/tiktok.png" alt="TikTok" className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          TikTok
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Short-form viral video content
        </p>
      </div>

    </div>
  </div>
</section>


      {/* ================= CONTEST DETAILS (ADDED BELOW) ================= */}
      <ContestDetailsSection />

      {/* ================= FINAL CTA ================= */}
      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-extrabold">
            Ready to Win with Real Engagement?
          </h2>
          <p className="mt-3 text-gray-600">
            Join today and start earning based on performance.
          </p>

          <a
            href="/login"
            className="mt-8 inline-block rounded-lg bg-indigo-600 px-12 py-3 text-white font-bold shadow hover:bg-indigo-700 transition"
          >
            Start Now
          </a>
        </div>
      </section>
    </main>
  );
}

/* ================= SECTIONS ================= */

function ContestDetailsSection() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-6 space-y-8">

        <Card title="📅 Contest Details">
          <div className="grid sm:grid-cols-2 gap-4">
            <Info icon={<Calendar />} label="Start Date" value="Oct 22, 2025 · 12:00 PM" />
            <Info icon={<Clock />} label="End Date" value="Nov 18, 2025 · 12:00 PM" />
            <Info icon={<Youtube />} label="Platform" value="YouTube" />
            <Info icon={<CheckCircle2 className="text-emerald-600" />} label="Status" value="Ended" />
          </div>
        </Card>

        <Card title="📝 Content Requirements">
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Minimum 15 seconds</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> English or Hindi</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Mention Game of Creators</li>
          </ul>
        </Card>

        <Card title="📌 Participation Guidelines">
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Link2 className="h-4 w-4 text-indigo-500" /> Add tracking link in pinned comment</li>
            <li className="flex gap-2"><Trophy className="h-4 w-4 text-amber-500" /> $25 bonus for top conversions</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No fake engagement</li>
          </ul>
        </Card>

        <Card title="🧰 Resources & Tools">
          <Resource icon={<ExternalLink />} title="Game of Creators Website" />
          <Resource icon={<FileVideo />} title="3-Second GOC Outro Clip" />
        </Card>

      </div>
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Feature({ icon, title, text }: any) {
  return (
    <div className="rounded-lg bg-slate-50 border p-6 text-center hover:shadow-md transition">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}

function PlatformCard({ image, title }: any) {
  return (
    <div className="rounded-lg bg-white p-6 text-center shadow hover:scale-105 transition">
      <Image src={image} alt={title} width={56} height={56} className="mx-auto" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="rounded-xl bg-white border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Info({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-slate-50 px-4 py-3">
      <div className="text-slate-500">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function Resource({ icon, title }: any) {
  return (
    <div className="flex items-center justify-between border rounded-lg px-4 py-3 hover:bg-slate-50">
      <div className="flex items-center gap-3 text-indigo-600">
        {icon}
        <span className="text-sm font-medium text-gray-900">{title}</span>
      </div>
      <span className="text-sm text-indigo-600">View</span>
    </div>
  );
}
