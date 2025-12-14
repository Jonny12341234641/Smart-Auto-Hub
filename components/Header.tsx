"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React & Next.js Core
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// UI Components (Shadcn/UI & Radix)
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons (Lucide React)
import { Menu, X, User, LayoutDashboard, Shield, LogOut } from "lucide-react";

// Data & Constants
import { headerMenuData } from "@/constants/data";

// Unused imports preserved from original code
import path from "path"; 

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Header Component
 * ----------------------------------------------------------------------------
 * The primary navigation bar for the application.
 * * * Features:
 * - Responsive Design: Adapts between Desktop (Horizontal) and Mobile (Hamburger) layouts.
 * - Dynamic Styling: Active link highlighting based on the current route (`usePathname`).
 * - Auth Integration (Mock): Switches between "Login/Register" buttons and "User Profile" dropdown.
 * - Branding: Includes Logo and Gradient Wordmark.
 */
export function Header() {
  
  // ==========================================================================
  // STATE & HOOKS
  // ==========================================================================

  // Controls the visibility of the mobile slide-down menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // (State preserved from original code, though currently unused in JSX)
  const [profileOpen, setProfileOpen] = useState(false);

  // Used to highlight the active navigation link
  const pathname = usePathname();

  // ==========================================================================
  // MOCK AUTHENTICATION (TODO: BACKEND INTEGRATION)
  // ==========================================================================
  // Backend Team: Replace these hardcoded values with `useSession()` from NextAuth.
  const isLoggedIn = true;
  const userRole = "admin";
  const isAdmin = true;
  const userName = "Kavindu";

  // Helper: Generates initials from a full name (e.g., "Kavindu Perera" -> "KP")
  const getInitials = (name: string) => {
    return name 
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // ==========================================================================
  // RENDER UI
  // ==========================================================================

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* -------------------------------------------------------------------
           LEFT: LOGO & BRANDING
           ------------------------------------------------------------------- */}
        <Link href="/" className="flex items-center gap-3">
          {/* Logo Image */}
          <Image
            src="/images/Logo.jpg"
            alt="Sameera Auto Traders Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />

          {/* Text Wordmark */}
          <div className="flex flex-col sm:flex-row leading-tight sm:items-center">
              
              {/* 'Smart' - Gradient Text Effect */}
              <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent transition-all duration-400 hover:brightness-200">
                Smart
              </span>

              {/* 'AutoHub' - Two-tone colors */}
              <span className="text-3xl font-extrabold sm:ml-2">
                <span className="text-black hover:text-red-700">Auto</span>
                <span className="text-red-700 hover:text-orange-500">Hub</span>
              </span>
          </div>
        </Link>

        {/* -------------------------------------------------------------------
           CENTER: DESKTOP NAVIGATION
           ------------------------------------------------------------------- */}
        <div className="hidden md:flex items-center gap-8">
          {headerMenuData?.map((item) => (
            <Link 
              key={item?.title}
              href={item?.href}
              className={`relative text-foreground font-medium hover:text-primary transition group ${pathname === item?.href && "text-primary"}`}>
                {item?.title}
                
                {/* Animated Underline Effect (Left & Right halves) */}
                <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-1/2 hover-effect group-hover:left-0 duration-150 ${pathname === item?.href && "w-1/2"}`}/>                
                <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-1/2 hover-effect group-hover:right-0 duration-150 ${pathname === item?.href && "w-1/2"}`}/>
            </Link>
          ))}
        </div>

        {/* -------------------------------------------------------------------
           RIGHT: DESKTOP AUTHENTICATION & PROFILE
           ------------------------------------------------------------------- */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            // --- LOGGED IN VIEW (Avatar + Dropdown) ---
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition">
                  {/* Avatar with Custom Multi-Color Border */}
                  <Avatar className="h-10 w-10 border-3 border-b-green-400 border-t-primary border-l-yellow-500 border-r-orange-500">
                    <AvatarImage src="/placeholder.svg" alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* User Name Label */}
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    {isAdmin && <p className="text-xs text-muted-foreground">Admin</p>}
                  </div>
                </button>
              </DropdownMenuTrigger>
              
              {/* Dropdown Content */}
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // --- LOGGED OUT VIEW (Login / Register Buttons) ---
            <>
              {/* Fallback Icon Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hover:opacity-80 transition" title="Open account menu">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarFallback className="bg-muted">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Login to See your Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Explicit Action Buttons */}
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* -------------------------------------------------------------------
           MOBILE: MENU TOGGLE BUTTON
           ------------------------------------------------------------------- */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* -------------------------------------------------------------------
         MOBILE: SLIDE-DOWN MENU
         ------------------------------------------------------------------- */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-4">
            
            {/* Mobile Navigation Links */}
            {headerMenuData.map((item) => (
              <Link key={item.href} href={item.href} className="block text-foreground hover:text-primary">
                {item.title}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              // Logged In State for Mobile
              <>
                <div className="border-t border-border my-4" />

                {/* User Info */}
                <div className="flex items-center gap-2 py-2">
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg" alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">
                    {userName}
                    {isAdmin && <span className="text-destructive ml-1">(Admin)</span>}
                  </span>
                </div>

                {/* Dashboard Links */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-foreground hover:text-primary py-2 pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-foreground hover:text-primary py-2 pl-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}

                <button
                  className="flex items-center gap-2 text-foreground hover:text-destructive py-2 pl-2 w-full text-left"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    // Add logout logic here
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Logged Out State for Mobile
              <>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  );
}