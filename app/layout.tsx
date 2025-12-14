// ============================================================================
// IMPORTS
// ============================================================================

// React & Next.js Core Types
import type React from "react";
import type { Metadata } from "next";

// Font Optimization
import { Geist, Geist_Mono } from "next/font/google";

// Vercel Analytics (Performance Tracking)
import { Analytics } from "@vercel/analytics/next";

// Global Styles
import "./globals.css";

// Application State Providers (Auth, Context, etc.)
import Providers from "@/app/providers";

// ============================================================================
// FONT CONFIGURATION
// ============================================================================
// Configures the Geist font family with CSS variables for Tailwind integration.
// ============================================================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================================
// METADATA CONFIGURATION
// ============================================================================
// SEO settings for the entire application.
// This controls what appears in browser tabs and search engine results.
// ============================================================================

export const metadata: Metadata = {
  title: "Smart AutoHub - Sameera Auto Traders",
  description: "Find your perfect vehicle at Sameera Auto Traders. Browse our complete inventory, book consultations, and get expert guidance.",
  icons: {
    icon: [
      {
        url: "/car32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/car32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: " ", // Placeholder for SVG or fallback icon
        type: "image/svg+xml",
      },
    ],
    apple: "/car128x128.png",
  },
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

/**
 * RootLayout
 * ----------------------------------------------------------------------------
 * The top-level wrapper for the entire Next.js application.
 * * Functionality:
 * - Defines the <html> and <body> tags.
 * - Applies global fonts and antialiasing.
 * - Wraps the app in global <Providers> (e.g., SessionProvider for Auth).
 * - Injects Vercel <Analytics> for traffic monitoring.
 *
 * @param {React.ReactNode} children - The page content to be rendered.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        
        {/* Providers Wrapper:
          Wraps all child components to ensure they have access to global contexts
          (like User Session, Theme, or Toast Notifications).
        */}
        <Providers>
          {children}
          
          {/* Real-time traffic analytics */}
          <Analytics />
        </Providers>

      </body>
    </html>
  );
}