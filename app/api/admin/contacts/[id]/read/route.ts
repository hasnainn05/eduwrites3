import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/contact-model";

export async function PATCH(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    await connectDB();

    await Contact.findByIdAndUpdate(id, {
      isRead: true,
    });

    return NextResponse.json({ message: "Marked as read" });
  } catch {
    return NextResponse.json(
      { message: "Failed to mark as read" },
      { status: 500 }
    );
  }
}
