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
    async session({ session, token }) {
      if (session.user) {
        // TypeScript-safe fallback for string
        session.user.id = token.sub ?? "";
        session.user.provider = token?.provider ?? "";
      }
      return session;
    },

    async jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl; // always redirect to home/dashboard
    },
  },
});

export { handler as GET, handler as POST };
