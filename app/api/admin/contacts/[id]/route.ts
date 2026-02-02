import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/contact-model";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Contact request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Contact request deleted" });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { message: "Failed to delete request" },
      { status: 500 }
    );
  }
}
