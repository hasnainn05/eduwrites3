import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/contact-model";
import nodemailer from "nodemailer";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { message } = await req.json();

    // console.log("Message : ", message);

    if (!message) {
      return NextResponse.json(
        { message: "Reply message is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      // from: `"EduWrites Support" <${process.env.ADMIN_EMAIL}>`,
      from: `"EduWrites Support" <info@eduwrites.com>`,
      to: contact.email,
      subject: `Re: ${contact.subject || "Your Quote Request"}`,
      html: `
        <p>Hi ${contact.name},</p>
        <p>${message.replace(/\n/g, "<br />")}</p>
        <br />
        <p>Regards,<br />EduWrites Team</p>
      `,
    });

    contact.isReplied = true;
    contact.isRead = true;
    await contact.save();

    return NextResponse.json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send reply" },
      { status: 500 }
    );
  }
}
