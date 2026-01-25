// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: { params: { scope: "r_liteprofile r_emailaddress" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Add user id and provider info to the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.provider = token?.provider ?? "";
      }
      return session;
    },

    // Keep provider info in the JWT
    async jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    // Redirect after login
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard/settings after login
      const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`;
      return redirectTo;
    },
  },

  // Optional: You can add session strategy if needed
  // session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
