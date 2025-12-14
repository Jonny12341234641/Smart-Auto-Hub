"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// Third-party Library
import { ThemeProvider as NextThemesProvider } from "next-themes";

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

/**
 * ThemeProvider Component
 * ----------------------------------------------------------------------------
 * A client-side wrapper around the 'next-themes' provider.
 * * * Purpose:
 * - Enables dynamic theme switching (Light/Dark mode) throughout the app.
 * - Persists user preference (e.g., 'dark' or 'light') in local storage.
 * - Prevents hydration mismatches by handling the initial theme load.
 * * * Usage:
 * - This component wraps the entire application in the Root Layout.
 * - It allows any child component to use the `useTheme()` hook.
 *
 * @param {React.ReactNode} children - The application content to be wrapped.
 * @param {Object} props - Additional config props passed to NextThemesProvider (e.g., attribute="class").
 */
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}