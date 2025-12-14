"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React Core
import { useState, useEffect } from "react";

// UI Components
import { Button } from "@/components/ui/button";

// Icons (Lucide React)
import { Trash2 } from "lucide-react";

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

/**
 * NewsletterTable Component
 * ----------------------------------------------------------------------------
 * A data display component for the Admin Dashboard.
 * * * Functionality:
 * - Fetches the list of newsletter subscribers from the backend API.
 * - Displays data in a responsive, scrollable table.
 * - Shows Email, Subscription Date, Source (User/Guest), and Status.
 * - Provides a (visual) delete action for managing the list.
 */
function NewsletterTable() {

    // ========================================================================
    // STATE MANAGEMENT
    // ========================================================================
    
    // Stores the array of subscriber objects fetched from the API
    const [subscribers, setSubscribers] = useState([]);

    // ========================================================================
    // SIDE EFFECTS (Data Fetching)
    // ========================================================================
    
    // Fetch subscribers when the component mounts
    useEffect(() => {
        fetch("/api/newsletter/listOfSubscriptions")
            .then((res) => res.json())
            .then((data) => setSubscribers(data));
    }, []);

    // ========================================================================
    // RENDER UI
    // ========================================================================

    return (
        // Container: Adds horizontal scroll for smaller screens
        <div className="overflow-x-auto">
            <table className="w-full">
                
                {/* --- Table Header --- */}
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold text-sm">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Source</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Status</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Actions</th>
                    </tr>
                </thead>

                {/* --- Table Body --- */}
                <tbody>
                    {/* Iterate through subscribers state to render rows */}
                    {subscribers.map((s) => (
                        <tr key={s.id} className="border-b border-border hover:bg-secondary/30 transition">
                            
                            {/* Column 1: Email Address */}
                            <td className="px-4 py-4">
                                {s.email}
                            </td>
                            
                            {/* Column 2: Date (Formatted) */}
                            <td className="px-4 py-4 text-sm text-muted-foreground">
                                {new Date(s.createdAt).toLocaleDateString()}
                            </td>

                            {/* Column 3: Source Badge (e.g., GUEST or USER) */}
                            <td className="px-4 py-4">
                                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-700">
                                    {s.source}
                                </span>
                            </td>

                            {/* Column 4: Status Badge (e.g., ACTIVE) */}
                            <td className="px-4 py-4">
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-medium">
                                    {s.status}
                                </span>
                            </td>

                            {/* Column 5: Actions (Delete Button) */}
                            <td className="px-4 py-4">
                                <Button size="sm" variant="ghost">
                                    <Trash2 size={14} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewsletterTable;