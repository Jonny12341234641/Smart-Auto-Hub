// ============================================================================
// IMPORTS
// ============================================================================

// Next.js Link for client-side navigation
import Link from "next/link";

// Icons (Lucide React)
import { 
  Phone, Mail, MapPin, 
  Facebook, Twitter, Linkedin, Instagram 
} from "lucide-react";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Footer Component
 * ----------------------------------------------------------------------------
 * The global footer displayed at the bottom of every page.
 * * * Layout Strategy:
 * - Responsive Grid: Stacks vertically on mobile (1 column), expands to 4 columns on desktop.
 * - Section 1: Brand Identity.
 * - Section 2: Quick Navigation Links.
 * - Section 3: Contact Information (Phone, Email, Location).
 * - Section 4: Social Media External Links.
 */
export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* === COLUMN 1: BRAND INFO === */}
          <div>
            <h3 className="text-xl font-bold mb-4">Smart AutoHub</h3>
            <p className="text-sm opacity-90">
              Your trusted platform for finding the perfect vehicle.
            </p>
          </div>

          {/* === COLUMN 2: QUICK LINKS === */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicles" className="hover:text-primary transition">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-primary transition">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* === COLUMN 3: CONTACT INFO === */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              
              {/* Phone Number */}
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>077 232 9595</span>
              </li>

              {/* Email Address */}
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>sameeraautotraders@gmail.com</span>
              </li>

              {/* Physical Address */}
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>109 Sunethradevi Rd, Nugegoda</span>
              </li>
            </ul>
          </div>

          {/* === COLUMN 4: SOCIAL MEDIA === */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              {/* Note: Using Instagram icon but labelled as LinkedIn in aria-label in original code. 
                  kept functionality as provided. */}
              <a href="#" className="hover:text-primary transition" aria-label="LinkedIn">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* === COPYRIGHT FOOTER === */}
        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Sameera Auto Traders. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}