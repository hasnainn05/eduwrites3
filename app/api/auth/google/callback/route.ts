// import { NextResponse } from "next/server";
// import { signToken } from "@/lib/jwt";
// import { connectDB } from "@/lib/db";
// import User from "@/models/user-model";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");
//   const name = searchParams.get("name");
//   const avatar = searchParams.get("avatar");

//   if (!email) {
//     return NextResponse.redirect(
//       new URL("/login?error=google", req.url)
//     );
//   }

//   await connectDB();

//   let user = await User.findOne({ email });

//   if (!user) {
//     user = await User.create({
//       email,
//       name,
//       avatar,
//       provider: "google",
//       password: null,
//     });
//   }

//   const token = await signToken(user._id.toString());

//   const response = NextResponse.redirect(
//     new URL("/profile", req.url)
//   );

//   response.cookies.set("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7,
//   });

//   return response;
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user-model";
import { signToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {

      const code = req.nextUrl.searchParams.get("code");
    
      if (!code) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    
    //   🔁 Exchange code for access token
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
          grant_type: "authorization_code",
        }),
      });
    
    
    //   const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: new URLSearchParams({
    //         code,
    //         client_id: process.env.GOOGLE_CLIENT_ID!,
    //         client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    //         redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
    //         grant_type: "authorization_code",
    //     }),
    //     });
    
    
    
      const tokenData = await tokenRes.json();
    
      // 🔍 Fetch Google profile
      const userRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
    
      const googleUser = await userRes.json();
    
      await connectDB();

      
      // 🔍 Find or create user
      let user = await User.findOne({ email: googleUser.email });
    
      if (!user) {
        user = await User.create({
          name: googleUser.name,
          email: googleUser.email,
          avatar: googleUser.picture,
          provider: "google",
          password: null,
        });
      }
    
      // 🔐 Issue YOUR JWT
      const jwtToken = await signToken(user._id.toString());
    
      // 🍪 Set cookie
      const response = NextResponse.redirect(
        new URL("/profile", req.url)
      );
    
      response.cookies.set("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    
      return response;
  } catch (error) {
    console.log("*********************************************************")
    console.log("ERROR : : !! : ", error)
    console.log("*********************************************************")
  } 
}