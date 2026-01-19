"use client";

import { useEffect } from "react";

export default function AdminLoginRedirect() {
  useEffect(() => {
    // Redirect to user login page
    window.location.replace("/login");
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-slate-600">Redirecting to login...</p>
      </div>
    </div>
  );
}
