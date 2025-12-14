"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React & Next.js Core
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Icons
import { FcGoogle } from "react-icons/fc";

// Custom Components
import ChatBot from "@/components/ChatBot";

/**
 * RegisterPage Component
 * ----------------------------------------------------------------------------
 * A responsive registration page featuring a split-screen layout.
 * * * Design Philosophy:
 * - Uses a "Card-based" elevation design for the form to make it pop.
 * - Split layout: Branding on the left (desktop only), Form on the right.
 * * * Functionality:
 * - Captures User Data: Email, Username, Password, and Phone Number.
 * - Country Code Selector: Pre-built options for international numbers.
 * - API Integration: POSTs data to local /api/auth/register endpoint.
 * - Social Auth: Provides a button for Google OAuth redirection.
 */
export default function RegisterPage() {
    const router = useRouter();

    // ========================================================================
    // STATE MANAGEMENT
    // ========================================================================
    
    // Form Data States
    // We keep these separate to allow for individual validation logic if needed later.
    const [email, setEmail]             = useState<string>("");
    const [username, setUsername]       = useState<string>("");
    const [password, setPassword]       = useState<string>("");
    const [phone, setPhone]             = useState<string>("");
    
    // Default to Sri Lanka (+94)
    const [countryCode, setCountryCode] = useState<string>("+94");

    // UI Feedback States
    const [loading, setLoading]         = useState<boolean>(false);
    const [err, setErr]                 = useState<string>("");

    // ========================================================================
    // LOGIC HANDLERS
    // ========================================================================
    
    /**
     * handleRegister
     * ------------------------------------------------------------------------
     * Submits the registration form to the backend.
     * 1. Prevents default HTML form submission.
     * 2. Sets loading state to true (disables button).
     * 3. Combines country code and phone number into a single string.
     * 4. Sends a POST request to the API.
     * 5. Redirects to Login page on success.
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErr(""); // Clear previous errors

        try {
            // Construct the payload matching the backend expectation
            const payload = {
                email,
                username,
                password,
                phone: `${countryCode}${phone}`, // e.g., "+94771234567"
            };

            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(payload),
            });
    
            setLoading(false);
    
            // Handle API Errors (e.g., 409 Conflict if user exists)
            if (!res.ok) {
                setErr("Account already exists");
                return;
            }
    
            // Success: Navigate user to login screen
            router.push("/login");

        } catch (error) {
            // Catch network errors or unexpected crashes
            setLoading(false);
            setErr("An unexpected error occurred");
        }
    };

    /**
     * loginWithGoogle
     * ------------------------------------------------------------------------
     * Redirects the user to the backend route that initiates the Google OAuth flow.
     * Note: We use window.location.href instead of router.push because this leaves
     * our Next.js app context to go to an external provider (Google).
     */
    const loginWithGoogle = () => {
        window.location.href = "/api/auth/google";
    };

    // ========================================================================
    // RENDER UI
    // ========================================================================

    return (
        <main className="flex min-h-screen w-full bg-background text-foreground">
            
            {/* ----------------- LEFT SECTION: BRANDING ----------------- */}
            {/* Visible only on large screens (lg:flex) */}
            <BrandingSection />

            {/* ----------------- RIGHT SECTION: REGISTRATION FORM ----------------- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-muted/20 relative">
                
                {/* Floating Card Container */}
                {/* Contains shadow-2xl for depth and rounded corners for modern look */}
                <div className="w-full max-w-md bg-card text-card-foreground shadow-2xl rounded-2xl border border-border p-8 z-10 relative ring-1 ring-inset ring-gray-200">
                    
                    {/* Header: Title & Subtitle */}
                    <FormHeader />

                    {/* Social Auth Buttons */}
                    <SocialSignup onGoogleClick={loginWithGoogle} />

                    {/* Divider: "OR" */}
                    <Divider />

                    {/* Main Registration Form */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        
                        {/* --- Username Input --- */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium leading-none">Username</label>
                            <input
                                type="text"
                                placeholder="johndoe123"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* --- Email Input --- */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* --- Phone Number Input Group --- */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium leading-none">Phone Number</label>
                            <div className="flex gap-2">
                                {/* Country Code Dropdown */}
                                <select
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    defaultValue="+94"
                                >
                                    <option value="+94">🇱🇰 +94</option>
                                    <option value="+91">🇮🇳 +91</option>
                                    <option value="+1">🇺🇸 +1</option>
                                    <option value="+44">🇬🇧 +44</option>
                                    <option value="+61">🇦🇺 +61</option>
                                </select>

                                {/* Phone Number Input */}
                                <input
                                    type="number"
                                    placeholder="7xxxxxxx"
                                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* --- Password Input --- */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium leading-none">Password</label>
                            <input
                                type="password"
                                placeholder="minimum 6 characters"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* --- Error Feedback Banner --- */}
                        {err && (
                            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium text-center animate-pulse">
                                {err}
                            </div>
                        )}

                        {/* --- Submit Button --- */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-red-900/90 h-10 w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>

                    {/* --- Footer: Redirect to Login --- */}
                    <div className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?
                        <button
                            onClick={() => router.push("/login")}
                            className="text-primary font-semibold pl-1 hover:underline focus:outline-none"
                        >
                            Login here
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Global Chatbot Widget */}
            <ChatBot />
        </main>
    );
}

// ============================================================================
// SUB-COMPONENTS
// Extracted to separate rendering logic from state logic for cleaner code.
// ============================================================================

/**
 * BrandingSection
 * ----------------------------------------------------------------------------
 * Displays the company logo and welcome message.
 * Only rendered on Desktop screens due to `hidden lg:flex`.
 */
function BrandingSection() {
    return (
        <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-red-900 text-primary-foreground">
            {/* Overlay Gradient for Texture/Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
                {/* Logo Container with Ring effect */}
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 p-6 ring-4 ring-white/20">
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
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                    Join Smart Auto Hub
                </h2>
                <p className="text-primary-foreground/80 text-lg max-w-md">
                    Create an account to start managing your vehicle journey today.
                </p>
            </div>
        </div>
    );
}

/**
 * FormHeader
 * ----------------------------------------------------------------------------
 * Title and subtitle for the registration card.
 */
function FormHeader() {
    return (
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Create Account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Enter your details to register
            </p>
        </div>
    );
}

/**
 * SocialSignup
 * ----------------------------------------------------------------------------
 * Renders the "Continue with Google" button.
 */
function SocialSignup({ onGoogleClick }: { onGoogleClick: () => void }) {
    return (
        <button
            onClick={onGoogleClick}
            className="w-full inline-flex items-center justify-center gap-3 border border-input bg-background py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition font-medium text-sm shadow-sm"
        >
            <FcGoogle size={20} />
            Continue with Google
        </button>
    );
}

/**
 * Divider
 * ----------------------------------------------------------------------------
 * Visual separator with "OR" text in the middle.
 */
function Divider() {
    return (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                    OR
                </span>
            </div>
        </div>
    );
}