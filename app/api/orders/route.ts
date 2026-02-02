import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order-model";
import cloudinary from "@/lib/cloudinary";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("attachment") as File | null;

  let uploadedFile = null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const originalName = file.name;                    // e.g. "invoice 2025.pdf"
    const safeName = originalName.trim();              // or add more sanitization if needed

    const uploadRes = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "orders",
            resource_type: "raw",
            public_id: safeName,                       // MUST include .pdf
            // Do NOT set format here — it's ignored for raw
          },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    uploadedFile = {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
      filename: file.name,
    };
  }

  const user = await getUserFromToken();

  const order = await Order.create({
    user: user?.id,
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    service: formData.get("serviceType"),
    packageType: formData.get("packageType"),
    wordCount: Number(formData.get("wordCount")),
    deadline: formData.get("deadline"),
    budget: Number(formData.get("budget")),
    academicLevel: formData.get("academicLevel"),
    subject: formData.get("subject"),
    paperType: formData.get("paperType"),
    description: formData.get("description"),
    attachments: uploadedFile ? [uploadedFile] : [],
  });

  return NextResponse.json(order, { status: 201 });
}
