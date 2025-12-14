"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React & Next.js Core
import { useState } from "react";
import Link from "next/link";

// Layout & Custom Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// UI Components
import { Button } from "@/components/ui/button";

// Icons (Lucide React)
import { Star, ChevronLeft } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================
// TODO: In production, fetch this data using the ID from the URL.
// Endpoint Recommendation: GET /api/vehicles/:id
// ============================================================================

const vehiclesData = {
  1: {
    id: 1,
    name: "2022 Toyota Prius",
    price: 17500000,
    status: "Available",
    location: "Nugegoda Branch",
    make: "Toyota",
    model: "Prius",
    year: 2022,
    condition: "Registered",
    mileage: 25000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    image: "/toyota-prius-2022-front.jpg",
    description:
      "Premium hybrid vehicle with excellent fuel efficiency. Recently serviced, no accidents, single owner. Features include cruise control, alloy wheels, and modern infotainment system.",
    reviews: [
      { author: "John D.", rating: 5, text: "Excellent vehicle! Very reliable." },
      { author: "Sarah M.", rating: 4, text: "Great fuel efficiency, highly recommended." },
    ],
  },
  2: {
    id: 2,
    name: "2021 Honda Civic",
    price: 15200000,
    status: "Available",
    location: "Nugegoda Branch",
    make: "Honda",
    model: "Civic",
    year: 2021,
    condition: "Registered",
    mileage: 35000,
    transmission: "Manual",
    fuelType: "Petrol",
    image: "/honda-civic-2021-red.jpg",
    description:
      "Sporty sedan with performance and style. Well-maintained with full service history. Features alloy wheels, ABS, power steering, and modern safety features.",
    reviews: [
      { author: "Mike P.", rating: 5, text: "Amazing performance!" },
      { author: "Lisa R.", rating: 5, text: "Perfect daily driver." },
    ],
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * VehicleDetailsPage Component
 * ----------------------------------------------------------------------------
 * Dynamic page component representing a single vehicle's details.
 * * * Features:
 * - Dynamic Data Loading: Uses `params.id` to load specific car data.
 * - Image Gallery: Main image + thumbnails.
 * - Key Specs Grid: Displays mileage, transmission, fuel, etc.
 * - Booking Integration: Pre-fills consultation form via URL query params.
 * - Leasing Calculator: Client-side financial estimation tool.
 */
export default function VehicleDetailsPage({ params }) {
  
  // 1. Load Data
  // Fallback to ID "1" if the specific ID isn't found in mock data
  const vehicle = vehiclesData[params.id] || vehiclesData["1"];

  // 2. Calculator State
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(vehicle.price);
  const [downPayment, setDownPayment] = useState(0);
  const [loanTerm, setLoanTerm] = useState(5); // Default to 5 years

  /**
   * Calculates the estimated monthly payment using standard amortization.
   * Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
   */
  const calculatePayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = 0.06 / 12; // Assumed 6% annual interest
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPaymentCalc =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
    setMonthlyPayment(monthlyPaymentCalc);
  };

  // ==========================================================================
  // RENDER UI
  // ==========================================================================

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* --- Navigation: Back Button --- */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/vehicles">
            <ChevronLeft size={18} className="mr-2" />
            Back to Search
          </Link>
        </Button>

        {/* --- Top Section: Images & Key Info --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* LEFT COLUMN: IMAGE GALLERY */}
          <div className="lg:col-span-1">
            {/* Main Featured Image */}
            <div className="bg-muted rounded-lg overflow-hidden mb-4 h-80">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails Grid */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted rounded h-20">
                  <img
                    src={`/vehicle-angle-.jpg?height=100&width=100&query=vehicle angle ${i}`}
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded cursor-pointer hover:opacity-75 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: VEHICLE INFORMATION */}
          <div className="lg:col-span-2">
            
            {/* Header Info (Name, Price, Status) */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3">{vehicle.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  LKR {vehicle.price.toLocaleString()}
                </span>
                {/* Dynamic Status Badge */}
                <span
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    vehicle.status === "Available"
                      ? "bg-green-500/20 text-green-700"
                      : "bg-yellow-500/20 text-yellow-700"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
              <p className="text-lg text-muted-foreground">{vehicle.location}</p>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Make</p>
                  <p className="font-semibold">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-semibold">{vehicle.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-semibold">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold">{vehicle.fuelType}</p>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex gap-4">
              {/* Pass vehicle details via URL params to auto-fill the form */}
              <Link
                href={`/consultation?make=${vehicle.make}&model=${vehicle.model}&year=${vehicle.year}`}
                passHref
              >
                <Button as="a" className="flex-1 h-12" size="lg">
                  Book Appointment
                </Button>
              </Link>
              
              <Button variant="outline" className="flex-1 h-12 bg-transparent" size="lg">
                Book Technical Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Description --- */}
        <div className="bg-card rounded-lg border border-border p-6 mb-12">
          <h3 className="font-bold text-xl mb-4">Description</h3>
          <p className="text-foreground leading-relaxed">{vehicle.description}</p>
        </div>

        {/* --- Middle Section: Leasing Calculator --- */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-border p-8 mb-12">
          <h3 className="font-bold text-2xl mb-6">Estimate Your Monthly Payment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input: Loan Amount */}
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Amount (LKR)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Input: Down Payment */}
            <div>
              <label className="block text-sm font-semibold mb-2">Down Payment (LKR)</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Input: Loan Term */}
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Term (Years)</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
            </div>

            {/* Action: Calculate */}
            <div className="flex items-end">
              <Button onClick={calculatePayment} className="w-full h-12">
                Calculate Payment
              </Button>
            </div>
          </div>

          {/* Result: Monthly Payment Display */}
          {monthlyPayment > 0 && (
            <div className="mt-6 p-4 bg-primary/20 rounded-lg border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
              <p className="text-3xl font-bold text-primary">
                LKR {monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
            </div>
          )}
        </div>

        {/* --- Bottom Section: Reviews --- */}
        <div className="mb-12">
          <h3 className="font-bold text-2xl mb-6">Customer Reviews</h3>

          <div className="space-y-4 mb-8">
            {vehicle.reviews.map((review, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold">{review.author}</p>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground">{review.text}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full h-12 bg-transparent">
            Write a Review (Sign in required)
          </Button>
        </div>
      </div>

      {/* Global Widgets */}
      <ChatBot />
      <Footer />
      
    </div>
  )
}