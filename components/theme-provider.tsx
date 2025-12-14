"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React Core
import * as React from "react";

// Theme Management Library
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

/**
 * ThemeProvider Component
 * ----------------------------------------------------------------------------
 * A robust client-side wrapper for 'next-themes'.
 * * * * Architecture Note:
 * Next.js App Router works primarily with Server Components. However, theme 
 * switching relies on React Context and LocalStorage (browser APIs). 
 * This component marks the boundary ('use client') where we inject that 
 * interactive functionality into the React tree.
 * * * * Usage:
 * Wrap the entire application in `layout.tsx` with this provider.
 * * @param {ThemeProviderProps} props - Configuration for the theme provider 
 * (e.g., attribute="class", defaultTheme="system").
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}