import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { href: "#services", label: "Services" },
  { href: "#stories", label: "Their Stories" },
  { href: "#about", label: "Our Story" },
  { href: "#contact", label: "Let's Talk", isButton: true }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between bg-transparent">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/logo.png" 
            alt="V Films" 
            className="h-8 sm:h-9 w-auto object-contain" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-gray-700">
          {menuItems.map(({ href, label, isButton }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => scrollToSection(e, href)}
              className={isButton ? "button-primary" : "hover:underline transition-colors"}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 -mr-2 focus:outline-none"
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#17365C]">
            <path
              d={isMenuOpen 
                ? "M6 18L18 6M6 6l12 12" 
                : "M4 6h16M4 12h16M4 18h16"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl overflow-hidden border-t md:hidden"
            >
              <div className="flex flex-col py-4 px-6 gap-4">
                {menuItems.map(({ href, label, isButton }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => scrollToSection(e, href)}
                    className={`text-base py-2 ${
                      isButton
                        ? "button-primary text-center"
                        : "text-gray-700 hover:text-[#EB5A2D] transition-colors"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}