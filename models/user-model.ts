import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: false },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    avatar: String,
    role: {
      type: String,
      default: 'user'
    }
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
