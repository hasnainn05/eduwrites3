"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Signup() {
  const [step, setStep] = useState<"form" | "verify" | "success">("form");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [verificationCode, setVerificationCode] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to Terms & Conditions");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("verify");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Store login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", formData.email);
      setStep("success");
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", "user@gmail.com");
      localStorage.setItem("authProvider", "google");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("success");
    } catch (err) {
      setError("Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          {/* Left Side - Benefits */}
          <div className="hidden lg:block max-w-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-poppins leading-tight">
              Join the Academic Success Community
            </h2>
            <p className="text-foreground/90 mb-4 leading-relaxed text-xs font-medium">
              Get access to professional academic writing services that help you
              achieve your educational goals.
            </p>

            <div className="space-y-3 mb-4">
              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <CheckCircle size={16} className="text-cyan-400" /> Quality
                  Guaranteed
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  100% plagiarism-free, original content written by expert
                  writers
                </p>
              </div>

              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <CheckCircle size={16} className="text-cyan-400" /> Fast
                  Turnaround
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  On-time delivery with flexible deadline options to suit your
                  needs
                </p>
              </div>

              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <CheckCircle size={16} className="text-cyan-400" /> Expert
                  Support
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  24/7 customer support and unlimited revisions until you're
                  satisfied
                </p>
              </div>

              <div className="bg-white border-2 border-border p-3 rounded-lg hover:shadow-md transition-all shadow-sm">
                <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-xs">
                  <CheckCircle size={16} className="text-cyan-400" /> Affordable
                  Pricing
                </h3>
                <p className="text-[10px] text-foreground/85 font-medium">
                  Competitive rates with flexible payment options for students
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-border p-4 rounded-lg shadow-md">
              <p className="text-xs text-foreground/90 mb-2 font-medium">
                <strong className="text-cyan-600 block mb-1 text-sm">
                  📊 By the Numbers
                </strong>
              </p>
              <div className="grid grid-cols-2 gap-3 text-[9px] text-foreground/80 font-bold">
                <div>
                  <div className="text-lg font-bold text-cyan-400">50K+</div>
                  <p>Happy Students</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-400">98%</div>
                  <p>Satisfaction Rate</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-400">50+</div>
                  <p>Expert Writers</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-400">24/7</div>
                  <p>Support Team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-xs mx-auto lg:mx-0">
            {/* Logo */}
            <div className="text-center mb-5">
              <Link href="/" className="inline-block">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-poppins">
                  EduWrites
                </h2>
                <p className="text-foreground/60 text-xs mt-0.5">
                  Join Our Community
                </p>
              </Link>
            </div>

            {step === "form" && (
              <div className="bg-white rounded-lg border-2 border-border p-5 mb-4 shadow-lg hover:shadow-xl transition-shadow">
                <h1 className="text-sm font-bold text-foreground mb-1 font-poppins uppercase tracking-wider">
                  Create Account
                </h1>
                <p className="text-foreground/85 text-xs mb-4 font-medium">
                  Start your academic success journey today
                </p>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 mb-3">
                    <p className="text-red-300 text-xs">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-foreground/95 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                      />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="John Doe"
                        required
                        className="w-full bg-white border-2 border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Email */}
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
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-white border-2 border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Password */}
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
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white border-2 border-border rounded-lg pl-9 pr-9 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-foreground/95 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white border-2 border-border rounded-lg pl-9 pr-9 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-2 cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded border-border border-2 bg-white accent-cyan-400 mt-0.5"
                    />
                    <span className="text-foreground/85 text-xs font-bold">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gradient-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 animate-pulse-bounce"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-xs">Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Create Account</span>{" "}
                        <ArrowRight size={14} />
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
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Signup */}
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  className="w-full border-2 border-border bg-white hover:shadow-md rounded-lg py-2 font-bold text-xs text-foreground transition-all flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
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
                      <span>Sign up with Google</span>
                    </>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-foreground/70 text-xs">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {step === "verify" && (
              <div className="bg-white rounded-lg border-2 border-border p-5 mb-4 shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-sm font-bold text-foreground mb-1 font-poppins uppercase tracking-wider">
                  Verify Your Email
                </h2>
                <p className="text-foreground/85 text-xs mb-4 font-medium">
                  We've sent a verification code to {formData.email}
                </p>

                <form onSubmit={handleVerify} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-foreground/95 mb-1">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="000000"
                      maxLength={6}
                      required
                      className="w-full bg-white border-2 border-border rounded-lg px-3 py-2 text-center text-lg tracking-widest text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-all font-mono font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gradient-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-glow transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-xs">Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Email</span> <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full border-2 border-white/20 text-foreground py-2 rounded-lg font-semibold text-xs hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                </form>
              </div>
            )}

            {step === "success" && (
              <div className="bg-white rounded-lg border-2 border-border p-5 mb-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={28} className="text-white" />
                  </div>
                </div>

                <h2 className="text-sm font-bold text-foreground mb-2 font-poppins">
                  Welcome to EduWrites!
                </h2>
                <p className="text-foreground/85 text-xs mb-4 font-medium">
                  Your account has been successfully created. You can now place
                  orders and access all our services.
                </p>

                <Link
                  href="/login"
                  className="w-full gradient-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-glow transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Go to Login <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* Back to Home */}
            <div className="text-center mt-4">
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
