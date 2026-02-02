import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/user-model";
import { loginSchema } from "@/validators/auth";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.issues },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await User.findOne({ email: parsed.data.email });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(
    parsed.data.password,
    user.password
  );

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // const token = signToken(user._id.toString());
  const token = await signToken(user._id.toString());


  const response = NextResponse.json({ user: {
    _id: user?._id,
    role: user?.role,
    name: user?.name,
    email: user?.email,
    createdAt: user?.createdAt
  }, message: "Login successful" });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
