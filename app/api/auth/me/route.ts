import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { verifyToken } from "@/lib/jwt";
import User from "@/models/user-model";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("token")?.value;
  // console.log("token : ", token)
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

//   export function verifyToken(token: string) {
//   console.log("process.env.JWT_SECRET : ", process.env.JWT_SECRET)
//   return jwt.verify(token, process.env.JWT_SECRET!);
// }

  // const decoded = verifyToken(token) as { userId: string };
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };



  await connectDB();
  const user = await User.findById(decoded.userId).select("-password");

  return NextResponse.json({ user });
}
