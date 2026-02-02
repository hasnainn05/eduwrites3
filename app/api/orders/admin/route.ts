import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order-model";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const user = await getUserFromToken();
  if (!user || user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const orders = await Order.find()
    .populate("user", "email")
    .sort({ createdAt: -1 });

  return NextResponse.json(orders);
}