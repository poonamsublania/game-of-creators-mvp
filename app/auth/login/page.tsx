'use client';

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLinkedInLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || `${window.location.origin}/api/auth/linkedin/callback`);
    const state = "random_string_123"; // Optional: CSRF protection
    const scope = encodeURIComponent("openid profile email r_profile"); // Verified working scopes

    const linkedInUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    window.location.href = linkedInUrl;
  };

  return (
    <section className="max-w-md mx-auto mt-20 border rounded-xl p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={handleLinkedInLogin}
        className="w-full mt-4 rounded border border-blue-600 text-blue-600 py-2 hover:bg-blue-50"
      >
        Login with LinkedIn
      </button>
    </section>
  );
}
