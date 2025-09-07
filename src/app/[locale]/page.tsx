"use client";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import FeaturesGrid from "@/components/FeaturesGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatsAppIconWithTooltip from "@/components/WhatsAppIconWithTooltip";
import WhyUs from "@/components/WhyUs";
// import ContactButtons from "@/components/ContactButtons";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturesGrid />
      <About />
      {/* <section id="standards" className="py-10 bg-gray-50">
        <MinistryStandards />
      </section> */}
      {/* <WhyChooseUs /> */}
      {/* <Packages /> */}
      <WhyUs />
      {/* <Partners /> */}
      <ContactUs />
      <Footer />
      <WhatsAppIconWithTooltip />
      {/* <ContactButtons /> */}
    </div>
  );
}
