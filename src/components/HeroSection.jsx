import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }
};

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="min-h-screen pt-20 sm:pt-24 pb-12 flex items-center" 
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Logo and Mandala Container */}
          <motion.div
            className="flex items-center justify-center relative order-1 lg:order-none py-8 sm:py-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
          >
            {/* Mandala Background */}
            <motion.img
              src="/assets/mandala.png"
              alt=""
              aria-hidden="true"
              className="hero-mandala absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] object-contain pointer-events-none"
              style={{
                filter: 'brightness(1.02)',
                opacity: 0.22,
                mixBlendMode: 'multiply'
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            />

            {/* Logo */}
            <div className="relative z-20 pointer-events-auto transform scale-90 sm:scale-100">
              <img 
                src="/assets/logo.png" 
                alt="V Films logo" 
                className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto" 
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left px-4 sm:px-6 lg:px-0">
            <motion.h1
              id="hero-heading"
              variants={fadeRight}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#17365C] leading-tight font-['Island_Moments']"
              style={{ fontStyle: 'normal' }}
            >
              Varnan is where stories find
              <br />
              their voice and form
            </motion.h1>

            <motion.p 
              variants={fadeRight} 
              className="text-base sm:text-lg md:text-xl text-[#EB5A2D] font-medium"
            >
              Films · Brands · Art
            </motion.p>

            <motion.p 
              variants={fadeRight} 
              className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Since 2009, V&apos;ve been telling stories — stories of people, their journeys, and the places that shape them.
              Some begin in polished boardrooms, others in humble village squares. But every story starts the same way — by listening with intention.
              V believes it takes trust, patience, and an eye for the unseen to capture what truly matters. V doesn&apos;t just tell stories — V honors them.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}