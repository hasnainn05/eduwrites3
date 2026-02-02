import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // guest orders allowed
    },

    fullName: String,
    email: String,
    whatsapp: String,

    service: String,
    packageType: String,
    wordCount: Number,
    deadline: Date,
    budget: Number,

    academicLevel: String,
    subject: String,
    paperType: String,

    description: String,

    attachments: [
      {
        url: String,
        public_id: String,
        filename: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);
