import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="V Films" className="h-9" />
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#stories" className="hover:underline">Their Stories</a>
          <a href="#about" className="hover:underline">Our Story</a>
          <a href="#contact" className="button-primary">Let's Talk</a>
        </div>

        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#17365C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}