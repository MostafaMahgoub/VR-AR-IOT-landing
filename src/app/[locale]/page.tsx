"use client";
import About from "@/components/About";
import AnimatedGradientBG from "@/components/AnimatedGradientBG";
import ContactUs from "@/components/ContactUs";
import FeaturesGrid from "@/components/FeaturesGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sectors from "@/components/Sectors";
import WhatsAppIconWithTooltip from "@/components/WhatsAppIconWithTooltip";
import WhyUs from "@/components/WhyUs";
// import ContactButtons from "@/components/ContactButtons";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="relative overflow-hidden isolate">
        <AnimatedGradientBG />
        <Sectors />
        <FeaturesGrid />
        <About />
        <WhyUs />
        <ContactUs />
      </div>
      <Footer />
      <WhatsAppIconWithTooltip />
    </div>
  );
}
