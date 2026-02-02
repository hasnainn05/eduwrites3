import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/user-model";
import { signupSchema } from "@/validators/auth";

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

  return NextResponse.json(
    { message: "Signup successful", userId: user._id },
    { status: 201 }
  );
}
