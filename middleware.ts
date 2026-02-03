// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyToken } from "./lib/jwt";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     verifyToken(token);
//     return NextResponse.next();
//   } catch {
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }
// }

// export const config = {
//   matcher: ["/api/orders/:path*", "/api/protected/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // console.log("token in middleware ? : ", token)
  const { pathname } = req.nextUrl;

  // console.log("req. next URL : ", req.nextUrl)

  const protectedRoutes = [
    // "/profile", 
    "/dashboard", 
    "/api/orders"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await verifyToken(token); // 🔥 MUST await
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    // "/profile/:path*",
    "/dashboard/:path*",
    "/api/orders/:path*",
    // "/api/admin/:path*",
  ],
};
