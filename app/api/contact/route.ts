import { NextResponse } from "next/server";
import { contactSchema } from "@/validators/auth";
import { connectDB } from "@/lib/db";
import Contact from "@/models/contact-model";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);
    console.log("data : ", data);
    await connectDB();

    await Contact.create(data);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
