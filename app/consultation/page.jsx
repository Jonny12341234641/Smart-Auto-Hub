"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React & Next.js Hooks
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Layout & Custom Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// UI Components
import { Button } from "@/components/ui/button";

// Icons (Lucide React)
import { Calendar, Clock, User, MapPin } from 'lucide-react';

/**
 * ConsultationPage Component
 * ----------------------------------------------------------------------------
 * Handles the booking of vehicle consultations and test drives.
 * * * Key Features:
 * - Dynamic Form Pre-filling: Uses URL Search Params (?make=Toyota&model=Prius)
 * to auto-fill vehicle details if the user navigates from a vehicle listing.
 * - Form State Management: Handles multiple inputs (text, select, radio) in one object.
 * - User Feedback: Shows a success message upon submission.
 */
export default function ConsultationPage() {
  
  // Hook to read URL query parameters
  const searchParams = useSearchParams();

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================

  // Single state object for all form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleDetails: "", // Auto-filled from URL
    vehicleType: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  // UI state for submission feedback
  const [submitted, setSubmitted] = useState(false);

  // ==========================================================================
  // SIDE EFFECTS (Logic)
  // ==========================================================================

  /**
   * Effect: Check URL parameters on component mount.
   * If a user clicks "Book Appointment" on a car details page, the URL will look like:
   * /consultation?make=Toyota&model=Prius&year=2022
   * This effect captures those values and updates the form state automatically.
   */
  useEffect(() => {
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");

    if (make && model && year) {
      setFormData((prev) => ({
        ...prev,
        vehicleDetails: `${year} ${make} ${model}`,
        message: `I'm interested in the ${year} ${make} ${model}. Please provide more details.`
      }));
    }
  }, [searchParams]);

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  // Updates specific field in formData state based on input name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Mock Submission Handler
   * In a real integration, this would use fetch() to POST formData to the backend.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulate API delay and reset form
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        vehicleType: "",
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  // ==========================================================================
  // RENDER UI
  // ==========================================================================

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ---------------------------------------------------------------------
        HERO SECTION
        --------------------------------------------------------------------- */}
      <section
        className="relative h-96 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground flex items-center mb-24"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=384&width=1600&query=professional car consultation advisor customer meeting)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-6xl font-bold mb-4 text-balance">Book an</h1> <h1 className="text-6xl font-bold mb-4 text-balance italic">Appointment</h1>
          <p className="text-xl opacity-90 text-balance max-w-2xl">
            Connect with our technical experts for personalized vehicle guidance and advice.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
        MAIN CONTENT GRID
        --------------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* === LEFT COLUMN: BENEFITS SIDEBAR === */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Benefit Card 1: Expert Guidance */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/10">
                    <User className="text-blue-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Expert Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized advice from our experienced technical consultants.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit Card 2: Flexible Scheduling */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-500/10">
                    <Clock className="text-green-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a time that works best for you, at your convenience.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit Card 3: Locations */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/10">
                    <MapPin className="text-purple-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Multiple Locations</h3>
                  <p className="text-sm text-muted-foreground">
                    Meet at any of our branches or schedule an online consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === RIGHT COLUMN: BOOKING FORM === */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
              <h2 className="text-3xl font-bold mb-6">Schedule Your Consultation</h2>

              {/* Success Message Banner */}
              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 animate-in fade-in">
                  <p className="text-green-800 font-semibold">
                    Thank you! We've received your consultation request. Our team will contact you shortly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* --- Input: Full Name --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* --- Input: Email --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                </div>

                {/* --- Input: Phone --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="0771234567"
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* --- Input: Auto-Filled Vehicle Details (Read Only) --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Selected Vehicle</label>
                  <input
                    type="text"
                    name="vehicleDetails"
                    value={formData.vehicleDetails}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-muted-foreground cursor-not-allowed"
                  />
                </div>

                {/* --- Dropdown: Vehicle Type --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Interested Vehicle Type *</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a vehicle type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="van">Van</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* --- Radio Buttons: Consultation Type --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Consultation Type *</label>
                  <div className="space-y-2">
                    {["General Inquiry", "Test Drive", "Finance Options", "Trade-in Valuation"].map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                        <input
                          type="radio"
                          name="consultationType"
                          value={type}
                          checked={formData.consultationType === type}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* --- Input: Date Selection --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* --- Dropdown: Time Selection --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a time slot</option>
                    <option value="09:00-10:00">09:00 - 10:00 AM</option>
                    <option value="10:00-11:00">10:00 - 11:00 AM</option>
                    <option value="11:00-12:00">11:00 - 12:00 PM</option>
                    <option value="14:00-15:00">02:00 - 03:00 PM</option>
                    <option value="15:00-16:00">03:00 - 04:00 PM</option>
                    <option value="16:00-17:00">04:00 - 05:00 PM</option>
                  </select>
                </div>

                {/* --- Textarea: Message --- */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your needs..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* --- Submit Button --- */}
                <Button type="submit" className="w-full" size="lg">
                  <Calendar className="mr-2" size={18} />
                  Schedule Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Global Widgets */}
      <ChatBot />
      <Footer />
      
    </div>
  )
}