"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React & Next.js Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Authentication
import { signIn } from "next-auth/react";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

// Custom Components
import ChatBot from "@/components/ChatBot";

/**
 * LoginPage Component
 * * A split-screen login interface featuring:
 * 1. Left side: Static branding with visual appeal.
 * 2. Right side: Interactive login form with Credential & Social authentication.
 * * @returns {JSX.Element} The rendered Login Page
 */
export default function LoginPage() {
  const router = useRouter();

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // Form input states
  const [email, setEmail]       = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // UI states (Loading spinner & Error messages)
  const [loading, setLoading]   = useState<boolean>(false);
  const [error, setError]       = useState<string>("");

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  /**
   * Handles the submission of the Email/Password form.
   * Uses NextAuth's `signIn` method with "credentials" provider.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload
    setLoading(true);
    setError("");

    // Attempt to sign in using the backend API
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // We handle redirection manually to check for errors first
    });

    setLoading(false);

    // Handle authentication failure
    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    // Handle success: Redirect to Homepage
    router.push("/");
  };

  // ==========================================================================
  // RENDER UI
  // ==========================================================================

  return (
    <main className="flex min-h-screen w-full bg-background text-foreground">
      
      {/* ----------------- LEFT SECTION: BRANDING ----------------- */}
      <BrandingSection />

      {/* ----------------- RIGHT SECTION: LOGIN FORM ----------------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-muted/20 relative">
        
        {/* Floating Card Container */}
        <div className="w-full max-w-md bg-card text-card-foreground shadow-2xl rounded-2xl border border-border p-8 md:p-10 z-10 relative ring-1 ring-inset ring-gray-300">
          
          <FormHeader />

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Password</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium text-center animate-pulse">
                {error}
              </div>
            )}

            {/* Submit Button (Component extracted for cleaner JSX) */}
            <SubmitButton loading={loading} />
          </form>

          {/* Social Login Options */}
          <Divider />
          <SocialLoginButtons />

        </div>
      </div>

      {/* Floating Chatbot Widget */}
      <ChatBot />
      
    </main>
  );
}

// ============================================================================
// SUB-COMPONENTS
// Extracted to improve readability and separation of concerns.
// ============================================================================

/**
 * Renders the left-side branding panel with logo and background gradient.
 * Hidden on mobile screens.
 */
function BrandingSection() {
  return (
    <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-red-900 text-primary-foreground">
      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
        <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 p-6 ring-4 ring-white/20">
          <div className="relative w-full h-full">
            <Image
              src="/images/Logo.jpg"
              alt="Smart Auto Hub Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>
        <h2 className="text-4xl font-bold tracking-tight mb-2">
          Smart Auto Hub
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-md">
          Experience the future of automotive management.
        </p>
      </div>
    </div>
  );
}

/**
 * Renders the Title and Subtitle for the login form.
 */
function FormHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome Back
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
    </div>
  );
}

/**
 * Renders the main submit button with loading state support.
 */
function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      disabled={loading}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-900 text-primary-foreground hover:bg-red-800 h-10 w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging in...
        </span>
      ) : (
        "Sign In"
      )}
    </button>
  );
}

/**
 * Renders a visual divider with text.
 */
function Divider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-muted"></span>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
}

/**
 * Renders the Google and Facebook login buttons.
 */
function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-3">
      {/* Google Button */}
      <button
        type="button"
        onClick={() => signIn("google")}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-full gap-2"
      >
        <FcGoogle size={20} />
        Google
      </button>

      {/* Facebook Button */}
      <button
        type="button"
        onClick={() => signIn("facebook")}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 h-10 w-full gap-2"
      >
        <FaFacebook size={20} />
        Facebook
      </button>
    </div>
  );
}