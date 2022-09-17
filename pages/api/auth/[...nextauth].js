import axios from "axios";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
      const user = await axios.post("http://localhost:3000/api/users", {
        username: session.user.name,
        key: session.user.name,
      });

      if (user.status === 200) {
        session.user = user.data.exists;
        return session;
      } else if (user.status === 201) {
        session.user = user.data;
        return session;
      } else {
        return session;
      }
    },
  },
});
