import axios from "axios";
import NextAuth from "next-auth";
import MongooseAdapter from "@next-auth/mongoose-adapter";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "../../../lib/mongodb.js";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongooseAdapter(clientPromise, {
    model: "Users",
  }),
  callbacks: {
    async session({ session }) {
      const user = {
        username: session.user.name,
        test: true,
      };
      await session.adapter.upsert({ user });
      return session;
    },
  },
};

export default NextAuth(authOptions);
