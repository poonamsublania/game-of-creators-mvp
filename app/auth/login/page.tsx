'use client';

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLinkedInLogin = () => {
    setLoading(true);

    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI ||
        `${window.location.origin}/api/auth/linkedin/callback`
    );
    const state = Math.random().toString(36).substring(2, 15); // random CSRF
    const scope = encodeURIComponent(
      "r_liteprofile r_emailaddress w_member_social r_organization_social"
    );

    const linkedInUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    window.location.href = linkedInUrl;
  };

  return (
    <section className="max-w-md mx-auto mt-20 border rounded-xl p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={handleLinkedInLogin}
        disabled={loading}
        className="w-full mt-4 rounded border border-blue-600 text-blue-600 py-2 hover:bg-blue-50 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Login with LinkedIn"}
      </button>
    </section>
  );
}
