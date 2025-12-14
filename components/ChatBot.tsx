"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React Core
import React from "react";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ChatBot Component
 * ----------------------------------------------------------------------------
 * A Floating Action Button (FAB) representing the AI Assistant.
 * * * Visual Design:
 * - Positioned fixed at the bottom-right of the viewport.
 * - Uses a "Glow Ring" effect created by a blurred, spinning background div.
 * - Includes a hover tooltip and animated sparkle decorations.
 * * * Technical Note:
 * - Currently purely presentational (UI only).
 * - Logic for opening the chat window should be added to the <button> onClick.
 */
export default function ChatBot() {
  return (
    // Container: Fixed positioning z-index to ensure it sits above other content
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">

        {/* -----------------------------------------------------------------
           DECORATION: OUTER GLOW RING
           -----------------------------------------------------------------
           Creates a spinning, glowing border effect behind the button.
           - absolute -inset-1: Makes it slightly larger than the button.
           - blur-md: Softens the gradient to look like light.
           - animate-spin-slow: Custom animation (requires tailwind config).
        */}
        <div
          className="
            absolute -inset-1 rounded-full
            bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500
            opacity-70 blur-md
            animate-spin-slow group-hover:animate-spin-fast
            glow-pulse
          "
        ></div>

        {/* -----------------------------------------------------------------
           INTERACTIVE: MAIN BUTTON
           ----------------------------------------------------------------- */}
        <button
          className="
            relative p-4 rounded-full
            bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600
            text-white shadow-2xl
            transition-all duration-300
            hover:scale-110 active:scale-95
            cursor-pointer
          "
          aria-label="Open AI Assistant"
        >
          {/* AI Icon SVG (Extracted for readability) */}
          <AIIcon />

          {/* --- Sparkle Animations --- */}
          {/* Top-Right Sparkle */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
          
          {/* Bottom-Left Sparkle (Delayed) */}
          <div
            className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          
          {/* Top-Left Sparkle (Delayed further) */}
          <div
            className="absolute top-1 -left-1 w-2 h-2 bg-purple-200 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </button>

        {/* -----------------------------------------------------------------
           TOOLTIP
           ------------------------------------------------------------------
           Visible only on hover (group-hover:opacity-100).
        */}
        <div
          className="
            absolute bottom-full right-0 mb-2
            px-3 py-1 bg-black/80 text-white text-sm rounded-lg 
            opacity-0 group-hover:opacity-100 transition-opacity
            whitespace-nowrap pointer-events-none
          "
        >
          AI Assistant
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * AIIcon
 * ----------------------------------------------------------------------------
 * The SVG graphic used inside the main button.
 * Represents a "Brain" or "Network" concept.
 */
function AIIcon() {
  return (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757l-2.121-2.121" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}