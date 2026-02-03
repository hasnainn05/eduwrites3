import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/user-model";
import { signupSchema } from "@/validators/auth";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.issues },
      { status: 400 }
    );
  }

  await connectDB();

  const existingUser = await User.findOne({ email: parsed.data.email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  const user = await User.create({
    ...parsed.data,
    password: hashedPassword,
  });

  const token = await signToken(user._id.toString());
  

  const response = NextResponse.json(
    {  
      user: {
        _id: user?._id,
        role: user?.role,
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt
      },
      message: "Signup successful",  
    },
    { status: 201 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}

