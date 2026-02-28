import React from "react";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <AppAppBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </>
  );
}