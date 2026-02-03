import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken() {
//   const token = cookies().get("token")?.value;
const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("token")?.value;
  const nextAuthToken = cookieStore.get("next-auth.session-token")?.value;
  // console.log("nextAuthToken exist ?  : ", nextAuthToken)
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "user" | "admin";
    };
  } catch {
    return null;
  }
}
