"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import ChatBot from "@/components/ChatBot";

/**
 * RegisterPage Component
 * * * A modern, split-screen registration interface.
 * * Features:
 * - "Popped-up" Material Design form card with elevation (shadows).
 * - Responsive split layout (Branding left, Form right).
 * - Full integration with global CSS variables for theming.
 */
export default function RegisterPage() {
    const router = useRouter();

    // -- State Management --
    // maintaining separate states for form clarity
    const [email, setEmail]             = useState("");
    const [username, setUsername]       = useState("");
    const [phone, setPhone]             = useState("");
    const [countryCode, setCountryCode] = useState("+94");
    const [password, setPassword]       = useState("");
    const [loading, setLoading]         = useState(false);
    const [err, setErr]                 = useState("");

    // -- Logic Handlers --
    
    // Handles the form submission to the local auth API
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErr("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    phone: `${countryCode}${phone}`,
                }),
            });
    
            setLoading(false);
    
            if (!res.ok) {
                setErr("Account already exists");
                return;
            }
    
            router.push("/login");
        } catch (error) {
            setLoading(false);
            setErr("An unexpected error occurred");
        }
    };

    // Redirects browser to Google OAuth endpoint
    const loginWithGoogle = () => {
        window.location.href = "/api/auth/google";
    };

    return (
        <main className="flex min-h-screen w-full bg-background text-foreground">
            
            {/* Left Section: Branding & Identity */}
            <BrandingSection />

            {/* Right Section: Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-muted/20 relative">
                
                {/* Floating Card Container */}
                <div className="w-full max-w-md bg-card text-card-foreground shadow-2xl rounded-2xl border border-border p-8 z-10 relative ring-1 ring-inset ring-gray-200">
                    
                    <FormHeader />

                    <SocialSignup onGoogleClick={loginWithGoogle} />

                    <Divider />

                    {/* Main Registration Form */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        
                        {/* Username Field */}
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

                        {/* Email Field */}
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

                        {/* Phone Number Group */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium leading-none">Phone Number</label>
                            <div className="flex gap-2">
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

                                <input
                                    type="number"
                                    placeholder="7xxxxxxx"
                                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
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

                        {/* Error Feedback */}
                        {err && (
                            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium text-center">
                                {err}
                            </div>
                        )}

                        {/* Submit Button */}
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

                    {/* Login Redirect Footer */}
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
            
            <ChatBot />
        </main>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function BrandingSection() {
    return (
        <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-red-900 text-primary-foreground">
            {/* Overlay Gradient for Texture */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
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