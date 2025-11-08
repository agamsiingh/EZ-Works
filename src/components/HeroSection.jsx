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
    <section className="min-h-[78vh] flex items-center" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="flex items-center justify-center relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
        >
          <motion.img
            src="/assets/mandala.png"
            alt="mandala"
            className="hero-mandala absolute left-0 md:left-8 -translate-x-4 md:translate-x-0 w-[280px] h-[280px] md:w-[520px] md:h-[520px] object-contain pointer-events-none z-0"
            style={{
              filter: 'brightness(1.02)',
              opacity: 0.22,
              mixBlendMode: 'multiply'
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          />

          <div className="absolute flex items-center justify-center z-20 pointer-events-auto">
            <img src="/assets/logo.png" alt="V Films logo" className="w-48 md:w-64 relative z-20" />
          </div>
        </motion.div>

        <div className="flex flex-col justify-center pr-4">
          <motion.h1
            id="hero-heading"
            variants={fadeRight}
            className="text-3xl md:text-5xl text-[rgb(23,54,92)] leading-tight font-['Island_Moments']"
            style={{ fontStyle: 'normal' }}
          >
            Varnan is where stories find
            <br />
            their voice and form
          </motion.h1>

          <motion.p variants={fadeRight} className="mt-6 text-lg md:text-xl text-[rgb(235,90,45)] font-medium">
            Films · Brands · Art
          </motion.p>

          <motion.p variants={fadeRight} className="mt-6 text-sm md:text-base text-gray-700 max-w-xl">
            Since 2009, V&apos;ve been telling stories — stories of people, their journeys, and the places that shape them.
            Some begin in polished boardrooms, others in humble village squares. But every story starts the same way — by listening with intention.
            V believes it takes trust, patience, and an eye for the unseen to capture what truly matters. V doesn&apos;t just tell stories — V honors them.
          </motion.p>
        </div>
      </div>
    </section>
  );
}