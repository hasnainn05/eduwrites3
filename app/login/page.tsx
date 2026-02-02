"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/useUserContext";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { setUser } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // try {
    //   // Store login state in localStorage
    //   localStorage.setItem("isLoggedIn", "true");
    //   localStorage.setItem("userEmail", email);

    //   // Simulate login delay
    //   await new Promise((resolve) => setTimeout(resolve, 1500));

    //   // Redirect to profile
    //   window.location.href = "/profile";
    // } catch (err) {
    //   setError("Login failed. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Zod / auth errors
        if (data?.errors?.length) {
          setError(data.errors[0].message);
        } else {
          setError(data.message || "Login failed");
        }
        return;
      }

      // ✅ JWT is already stored in HttpOnly cookie by backend
      // window.location.href = "/profile"; // or /dashboard
      console.log("data : ", data);
      if(data?.user?.role === "admin"){        
        setUser(data?.user);
        router.push("/admin/dashboard");
      }
      if(data?.user?.role === "user"){
        setUser(data?.user);
        router.push("/profile");
      }        
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     localStorage.setItem("isLoggedIn", "true");
  //     localStorage.setItem("userEmail", "user@gmail.com");
  //     localStorage.setItem("authProvider", "google");
  //     await new Promise((resolve) => setTimeout(resolve, 1500));
  //     window.location.href = "/profile";
  //   } catch (err) {
  //     setError("Google login failed. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleGoogleLogin = async () => {
    // setIsLoading(true);
    // try {
    //   const { signIn } = await import("next-auth/react");
    //   const resposne = await signIn("google", {
    //     callbackUrl: "/profile",
    //   });
    //   console.log("Response login by google : ", resposne)
    // } catch (err) {
    //   console.log("Error while login through google : ", err)
    //   setError("Google login failed, Please try again");
    // } finally {
    //   setIsLoading(false);
    // }
     window.location.href = "/api/auth/google";
  };


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent"></div>
        <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent"></div>
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Side - Service Details */}
          <div className="hidden lg:block max-w-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-poppins leading-tight">
              Master Your Academics with EduWrites
            </h2>
            <p className="text-foreground/90 mb-4 leading-relaxed text-xs font-medium">
              Sign in to access your academic writing orders, track progress,
              and connect with expert writers ready to help you succeed.
            </p>

            <div className="space-y-3 mb-4">
              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <span className="text-lg">📝</span> Essay Writing
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  Professional essays for all academic levels, perfectly crafted
                  and researched
                </p>
              </div>

              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <span className="text-lg">🔬</span> Research Papers
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  In-depth analysis and comprehensive research with proper
                  citations
                </p>
              </div>

              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <span className="text-lg">🎓</span> Thesis & Dissertations
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  Expert support for your most important academic projects
                </p>
              </div>

              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <span className="text-lg">✏️</span> Proofreading & Editing
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  Polish your work to perfection with our expert editing
                  services
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-border p-4 rounded-lg shadow-md">
              <p className="text-xs text-foreground/90 mb-2 font-medium">
                <strong className="text-cyan-600 block mb-1 text-sm">
                  🌟 Join 50,000+ Students
                </strong>{" "}
                who trust EduWrites for academic success
              </p>
              <div className="space-y-1 text-[9px] text-foreground/80 font-bold">
                <p>✓ 100% Plagiarism-free content</p>
                <p>✓ On-time delivery guaranteed</p>
                <p>✓ 24/7 customer support</p>
                <p>✓ Unlimited revisions</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-xs mx-auto lg:mx-0">
            {/* Logo */}
            <div className="text-center mb-5">
              <Link href="/" className="inline-block">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-poppins">
                  EduWrites
                </h2>
                <p className="text-foreground/60 text-xs mt-0.5">
                  Welcome Back
                </p>
              </Link>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg border-2 border-border p-5 mb-4 shadow-lg hover:shadow-xl transition-shadow">
              <h1 className="text-sm font-bold text-foreground mb-4 font-poppins uppercase tracking-wider">
                Sign In
              </h1>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 mb-3">
                  <p className="text-red-300 text-xs">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-foreground/95 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white border-2 border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-foreground/95 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-white border-2 border-border rounded-lg pl-9 pr-9 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs font-bold">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border border-2 bg-white accent-cyan-400"
                    />
                    <span className="text-foreground/85">Remember me</span>
                  </label>
                  <Link
                    href="#"
                    className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors text-xs"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gradient-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 animate-pulse-bounce"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-xs">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span> <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[9px]">
                  <span className="px-2 bg-gradient-to-b from-background to-background/80 text-foreground/50">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full border-2 border-border bg-white hover:shadow-md rounded-lg py-2 font-bold text-xs text-foreground transition-all flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-foreground/70 text-xs">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-3">
              <Link
                href="/"
                className="text-foreground/60 hover:text-foreground text-xs transition-colors inline-flex items-center gap-1"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
