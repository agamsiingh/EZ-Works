import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 space-y-20">
        <HeroSection />
        <ContactSection />
      </main>
    </div>
  );
}
