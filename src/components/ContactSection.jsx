import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ContactSection.jsx
 * - responsive two-column layout
 * - mandala corners (absolute)
 * - accessible form with basic front-end validation
 * - API POST to https://vernanbackend.ezlab.in/api/contact-us/
 * - animated toast on success/error
 */

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const inputClass =
  "w-full p-3 rounded-md border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#EB5A2D] transition";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Name required (min 2 chars)";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message || form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    // phone is optional (but simple digits check if present)
    if (form.phone && !/^[+\d\s-]{6,15}$/.test(form.phone)) e.phone = "Enter a valid phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    } finally {
      // clear toast after 3.5s
      setTimeout(() => setStatus(null), 3500);
    }
  }

  return (
    <section className="relative py-24 bg-[url('/assets/bg.png')] bg-repeat bg-contain overflow-hidden">
      {/* Mandala corner decorations */}
      <img
        src="/assets/footer-top-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-56 md:w-80 opacity-85 transform translate-x-6 -translate-y-6"
        style={{ mixBlendMode: "multiply" }}
      />
      <img
        src="/assets/footer-bottom-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-56 md:w-80 opacity-85 transform -translate-x-6 translate-y-6"
        style={{ mixBlendMode: "multiply" }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Left copy */}
        <div className="pr-4 md:pr-8">
          <h3 className="h-serif text-2xl md:text-3xl text-[#17365C] mb-4">Whether you have an idea, a question, or simply want to explore how V can work together, V're just a message away.</h3>
          <p className="text-[#17365C] text-sm md:text-base leading-relaxed">
            Let's catch up over coffee.
            <br />
            Great stories always begin with a good conversation.
          </p>
        </div>

        {/* Right form */}
        <div>
          <h3 className="h-serif text-2xl md:text-3xl text-[#17365C] mb-2 text-center">Join the Story</h3>
          <p className="text-[#17365C] text-sm md:text-base mb-6 text-center">Ready to bring your vision to life? Let's talk.</p>

          <form onSubmit={onSubmit} className="space-y-4 bg-white/30 p-6 rounded-xl backdrop-blur-sm border border-white/40">
            <div>
              <input
                name="name"
                type="text"
                placeholder="Your name*"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                required
              />
              {errors.name && (
                <p id="err-name" className="text-xs text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Your email*"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                required
              />
              {errors.email && (
                <p id="err-email" className="text-xs text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && (
                <p id="err-phone" className="text-xs text-red-600 mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your message*"
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "err-message" : undefined}
                required
              />
              {errors.message && (
                <p id="err-message" className="text-xs text-red-600 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center w-full gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center button-primary px-6 py-2 rounded-full shadow-sm disabled:opacity-60"
                aria-busy={status === "loading" ? "true" : "false"}
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          {/* contact info */}
          <div className="mt-8 text-[#EB5A2D] font-medium flex flex-col md:flex-row items-center justify-center text-center gap-2 md:gap-4">
            <a className="hover:underline" href="mailto:vernita@varnanfilms.co.in">
              vernita@varnanfilms.co.in
            </a>
            <span className="hidden md:inline">|</span>
            <a className="hover:underline" href="tel:+919873684567">
              +91 98736 84567
            </a>
          </div>
        </div>
      </motion.div>

      {/* Floating toast */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-6 bottom-6 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg"
            role="status"
            aria-live="polite"
          >
            ✅ Form submitted. Thank you!
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-6 bottom-6 z-50 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg"
            role="alert"
          >
            ⚠️ Submission failed. Try again later.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
