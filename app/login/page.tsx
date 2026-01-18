"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Apple } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to profile
      window.location.href = "/profile";
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", "user@gmail.com");
      localStorage.setItem("authProvider", "google");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = "/profile";
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", "user@icloud.com");
      localStorage.setItem("authProvider", "apple");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = "/profile";
    } catch (err) {
      setError("Apple login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent"></div>
        <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent"></div>
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Service Details */}
          <div className="hidden lg:block">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 font-poppins leading-tight">
              Master Your Academics with EduWrites
            </h2>
            <p className="text-foreground/90 mb-8 leading-relaxed text-lg font-medium">
              Sign in to access your academic writing orders, track progress,
              and connect with expert writers ready to help you succeed.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white border-3 border-border p-6 rounded-xl hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-lg">
                  <span className="text-2xl">📝</span> Essay Writing
                </h3>
                <p className="text-base text-foreground/85 font-medium">
                  Professional essays for all academic levels, perfectly crafted
                  and researched
                </p>
              </div>

              <div className="bg-white border-3 border-border p-6 rounded-xl hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-lg">
                  <span className="text-2xl">🔬</span> Research Papers
                </h3>
                <p className="text-base text-foreground/85 font-medium">
                  In-depth analysis and comprehensive research with proper
                  citations
                </p>
              </div>

              <div className="bg-white border-3 border-border p-6 rounded-xl hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-lg">
                  <span className="text-2xl">🎓</span> Thesis & Dissertations
                </h3>
                <p className="text-base text-foreground/85 font-medium">
                  Expert support for your most important academic projects
                </p>
              </div>

              <div className="bg-white border-3 border-border p-6 rounded-xl hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-lg">
                  <span className="text-2xl">✏️</span> Proofreading & Editing
                </h3>
                <p className="text-base text-foreground/85 font-medium">
                  Polish your work to perfection with our expert editing
                  services
                </p>
              </div>
            </div>

            <div className="bg-white border-4 border-border p-8 rounded-2xl shadow-md">
              <p className="text-base text-foreground/90 mb-4 font-medium">
                <strong className="text-cyan-600 block mb-2 text-lg">
                  🌟 Join 50,000+ Students
                </strong>{" "}
                who trust EduWrites for academic success
              </p>
              <div className="space-y-2 text-sm text-foreground/80 font-bold">
                <p>✓ 100% Plagiarism-free content</p>
                <p>✓ On-time delivery guaranteed</p>
                <p>✓ 24/7 customer support</p>
                <p>✓ Unlimited revisions</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-poppins">
                  EduWrites
                </h2>
                <p className="text-foreground/60 text-sm mt-1">Welcome Back</p>
              </Link>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl border-4 border-border p-10 mb-6 shadow-lg hover:shadow-xl transition-shadow">
              <h1 className="text-3xl font-bold text-foreground mb-6 font-poppins">
                Sign In for Professional Academic Writing Services
              </h1>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-6">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-base font-bold text-foreground/95 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white border-4 border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-base font-bold text-foreground/95 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-white border-4 border-border rounded-lg pl-10 pr-10 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-base font-bold">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-border border-2 bg-white accent-cyan-400"
                    />
                    <span className="text-foreground/85">Remember me</span>
                  </label>
                  <Link
                    href="#"
                    className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 animate-pulse-bounce"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-b from-background to-background/80 text-foreground/50">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="border-4 border-border bg-white hover:shadow-md rounded-lg py-3 font-bold text-foreground transition-all flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                      <span className="hidden sm:inline text-sm">Google</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleAppleLogin}
                  disabled={isLoading}
                  className="border-4 border-border bg-white hover:shadow-md rounded-lg py-3 font-bold text-foreground transition-all flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Apple size={18} />
                      <span className="hidden sm:inline text-sm">Apple</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-foreground/70 text-sm">
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
            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-foreground/60 hover:text-foreground text-sm transition-colors inline-flex items-center gap-2"
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
