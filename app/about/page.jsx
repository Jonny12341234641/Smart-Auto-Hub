"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// Core Next.js Components
import Link from "next/link";

// Custom Layout Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// UI Components
import { Button } from "@/components/ui/button";

// Icons (Lucide React)
import { Award, MessageSquare, Target, Users, Zap } from 'lucide-react';

/**
 * AboutPage Component
 * ----------------------------------------------------------------------------
 * This page serves as the "About Us" landing for the Smart AutoHub platform.
 * * Purpose:
 * - To build trust with potential customers by sharing the company story.
 * - To showcase the team, mission, vision, and core values.
 * - To provide social proof through customer moments.
 * * * Design Features:
 * - Uses large, immersive hero images with gradients.
 * - Features responsive grids for team members and values.
 * - Incorporates "Card" designs for readability.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* ----------------- GLOBAL HEADER ----------------- */}
      <Header />

      {/* =======================================================================
        HERO SECTION
        =======================================================================
        - Large full-width background image with overlay.
        - Sets the tone for the page with a strong headline.
      */}
      <section
        className="relative h-96 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground flex items-center"
        style={{
          // Note: Placeholder image URL includes query for 'automotive dealership'
          backgroundImage:
            "url(/placeholder.svg?height=384&width=1920&query=modern automotive dealership building exterior professional facade)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-balance italic leading-tight">
            About Us
          </h1>
          <p className="text-xl lg:text-2xl opacity-95 text-balance max-w-2xl">
            Your trusted partner in finding the perfect vehicle since we started our journey in the automotive industry.
          </p>
        </div>
      </section>


      {/* =======================================================================
        MAIN CONTENT CONTAINER
        =======================================================================
        - Wraps all subsequent sections in a centered, constrained width container.
        - Adds vertical spacing (py-16) between the header/footer and content.
      */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        
        {/* ---------------------------------------------------------------------
          SECTION 1: COMPANY OVERVIEW ("OUR STORY")
          ---------------------------------------------------------------------
          - Split layout: Text on left, Image on right.
        */}
        <section>
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Story Text */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sameera Auto Traders has been a leading automotive dealership in Sri Lanka, dedicated to providing
                quality vehicles and exceptional customer service. With years of experience in the automotive industry,
                we have built a reputation for reliability and transparency.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our journey began with a simple vision: to offer customers a comprehensive selection of vehicles at
                competitive prices, coupled with professional support and guidance throughout their purchasing journey.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we've expanded our operations to multiple branches across the country, serving thousands of
                satisfied customers and continuing our commitment to excellence in the automotive sector.
              </p>
            </div>

            {/* Story Image */}
            <div className="relative h-96 bg-muted rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/luxury-car-showroom-interior-modern-vehicles-displ.jpg"
                alt="Showroom Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
          SECTION 2: OUR TEAM & SOCIAL PROOF
          ---------------------------------------------------------------------
          - Displays team members in a 4-column grid.
          - Followed by a "Happy Customer Moments" gallery.
        */}
        <section>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dedicated professionals committed to helping you find your perfect vehicle
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Member 1: Managing Director */}
            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="/professional-automotive-sales-manager-portrait-sri.jpg"
                  alt="Sales Manager"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="font-bold text-lg mb-1">Sameera Jayasinghe</h3>
              <p className="text-primary font-semibold mb-2">Managing Director</p>
              <p className="text-sm text-muted-foreground">15+ years in automotive industry</p>
            </div>

            {/* Member 2: Technical Consultant */}
            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="/professional-automotive-technical-consultant-femal.jpg"
                  alt="Technical Consultant"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="font-bold text-lg mb-1">Kavindi Perera</h3>
              <p className="text-primary font-semibold mb-2">Technical Consultant</p>
              <p className="text-sm text-muted-foreground">Expert in vehicle inspection</p>
            </div>

            {/* Member 3: Sales Executive */}
            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="/professional-automotive-sales-executive-male-sri-l.jpg"
                  alt="Sales Executive"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="font-bold text-lg mb-1">Rajitha Fernando</h3>
              <p className="text-primary font-semibold mb-2">Sales Executive</p>
              <p className="text-sm text-muted-foreground">Customer satisfaction specialist</p>
            </div>

            {/* Member 4: Service Manager */}
            <div className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src="/professional-automotive-service-manager-female-sri.jpg"
                  alt="Service Manager"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="font-bold text-lg mb-1">Nimesha Silva</h3>
              <p className="text-primary font-semibold mb-2">Service Manager</p>
              <p className="text-sm text-muted-foreground">After-sales support lead</p>
            </div>
          </div>

          {/* Happy Customers Gallery */}
          <div className="bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-6 text-center">Happy Customer Moments</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="relative h-48 rounded-xl overflow-hidden group shadow-lg">
                <img
                  src="/happy-customer-receiving-car-keys-from-salesperson.jpg"
                  alt="Customer Handover"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden group shadow-lg">
                <img
                  src="/smiling-customer-standing-next-to-new-car-at-deale.jpg"
                  alt="Happy Customer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden group shadow-lg">
                <img
                  src="/family-celebrating-new-car-purchase-at-automotive-.jpg"
                  alt="Family Celebration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden group shadow-lg">
                <img
                  src="/placeholder.svg?height=192&width=256"
                  alt="Successful Purchase"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>


        {/* ---------------------------------------------------------------------
          SECTION 3: MISSION & VISION
          ---------------------------------------------------------------------
          - Uses a distinct background styling to highlight corporate philosophy.
        */}
        <section className="bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Mission Statement */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide our customers with an exceptional automotive experience by offering quality vehicles,
                professional guidance, and innovative solutions that make finding the perfect car accessible and
                hassle-free.
              </p>
            </div>

            {/* Vision Statement */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted and innovative automotive dealership platform in Sri Lanka, revolutionizing how
                customers discover, consult, and purchase vehicles through digital transformation and customer-centric
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
          SECTION 4: CORE VALUES
          ---------------------------------------------------------------------
          - 4-column layout showcasing key pillars of the business.
          - Each card has a hover effect and unique gradient icon.
        */}
        <section>
          <h2 className="text-4xl font-bold mb-4 text-center">Our Core Values</h2>
          <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1: Quality */}
            <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Award className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-xl mb-3">Quality</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We ensure every vehicle meets our high standards for reliability and performance.
              </p>
            </div>

            {/* Value 2: Customer Focus */}
            <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Users className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-xl mb-3">Customer Focus</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your satisfaction and trust are at the heart of everything we do.
              </p>
            </div>

            {/* Value 3: Innovation */}
            <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-xl mb-3">Innovation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We leverage modern technology to enhance your automotive experience.
              </p>
            </div>

            {/* Value 4: Transparency */}
            <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Target className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-xl mb-3">Transparency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe in honest dealings and clear communication with all our customers.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
          SECTION 5: WHY CHOOSE US
          ---------------------------------------------------------------------
          - A dense grid of 6 cards explaining competitive advantages.
        */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Why Choose Sameera Auto Traders?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-3">Wide Selection</h3>
              <p className="text-muted-foreground">
                Browse from hundreds of quality vehicles across multiple branches with real-time inventory updates.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-3">Expert Support</h3>
              <p className="text-muted-foreground">
                Our technical consultants are available to answer your questions and guide you through the buying
                process.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-3">Online Convenience</h3>
              <p className="text-muted-foreground">
                Search, compare, consult, and book appointments entirely online at your own pace.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-3">Competitive Pricing</h3>
              <p className="text-muted-foreground">
                Get the best value for your money with our transparent and competitive pricing structure.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-3">Flexible Financing</h3>
              <p className="text-muted-foreground">
                Use our leasing calculator to explore payment options that work best for your budget.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-3">Customer Service</h3>
              <p className="text-muted-foreground">
                We're committed to providing exceptional support before, during, and after your purchase.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------
          SECTION 6: CALL TO ACTION (CTA)
          ---------------------------------------------------------------------
          - Final push to direct users to browse vehicles or book a consultation.
        */}
        <section className="bg-gradient-to-r from-primary to-accent rounded-lg p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our inventory or schedule a consultation with our experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" asChild>
              <Link href="/vehicles">Browse Vehicles</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/consultation">Book Consultation</Link>
            </Button>
          </div>
        </section>
      </div>

      {/* ----------------- GLOBAL FOOTER & CHATBOT ----------------- */}
      <ChatBot />
      <Footer />
      
    </div>
  )
}