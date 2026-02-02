// import jwt from "jsonwebtoken";

// export function signToken(userId: string) {
//   return jwt.sign(
//     { userId },
//     process.env.JWT_SECRET!,
//     { expiresIn: "7d" }
//   );
// }

// export function verifyToken(token: string) {
//   console.log("process.env.JWT_SECRET : ", process.env.JWT_SECRET)
//   return jwt.verify(token, process.env.JWT_SECRET!);
// }

import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// ✅ For API routes (sign token)
export async function signToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

// ✅ For middleware (verify token)
export async function verifyToken(token: string) {
  return await jwtVerify(token, secret);
}
