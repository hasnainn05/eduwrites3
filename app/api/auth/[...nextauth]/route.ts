import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/user-model";
import { signToken } from "@/lib/jwt";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      // 🔍 Find user
      let existingUser = await User.findOne({ email: user.email });

      // 🆕 First time Google login → create user
      if (!existingUser) {
        existingUser = await User.create({
          name: user.name,
          email: user.email,
          avatar: user.image,
          provider: "google",
          password: null, // important
        });
      }

      // 🔐 Issue YOUR JWT
      const token = await signToken(existingUser._id.toString());

      // 🍪 Set cookie manually
      // Auth.js allows this via headers
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
          60 * 60 * 24 * 7
        }`
      );

      return true;
    },
  },
});

export { handler as GET, handler as POST };