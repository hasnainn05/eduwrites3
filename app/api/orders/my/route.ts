import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order-model";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const user = await getUserFromToken();
  console.log("user: ", user);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
