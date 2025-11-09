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
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 bg-[url('/assets/bg.png')] bg-repeat bg-contain overflow-hidden">
      {/* Mandala corner decorations */}
      <motion.img
        src="/assets/footer-top-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-40 sm:w-56 lg:w-80 opacity-85"
        style={{ mixBlendMode: "multiply" }}
        initial={{ opacity: 0, x: 20, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.img
        src="/assets/footer-bottom-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-40 sm:w-56 lg:w-80 opacity-85"
        style={{ mixBlendMode: "multiply" }}
        initial={{ opacity: 0, x: -20, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left copy */}
          <div className="text-center lg:text-left lg:pr-8">
            <h3 className="h-serif text-xl sm:text-2xl lg:text-3xl text-[#17365C] mb-4 leading-tight">
              Whether you have an idea, a question, or simply want to explore how V can work together, V're just a message away.
            </h3>
            <p className="text-[#17365C] text-sm sm:text-base leading-relaxed">
              Let's catch up over coffee.
              <br />
              Great stories always begin with a good conversation.
            </p>
          </div>

          {/* Right form */}
          <div>
            <h3 className="h-serif text-xl sm:text-2xl lg:text-3xl text-[#17365C] mb-2 text-center lg:text-left">
              Join the Story
            </h3>
            <p className="text-[#17365C] text-sm sm:text-base mb-6 text-center lg:text-left">
              Ready to bring your vision to life? Let's talk.
            </p>

            <form onSubmit={onSubmit} className="space-y-4 bg-white/30 p-6 rounded-xl backdrop-blur-sm border border-white/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name*"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass} hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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
                    className={`${inputClass} hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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
              </div>

              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`${inputClass} hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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

              <div className="flex items-center justify-center w-full">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`text-white px-6 py-2 sm:px-8 sm:py-3 text-base font-semibold rounded-full text-center shadow-lg shadow-orange-200/50 hover:from-[#FF906E] hover:to-[#FF7B4C] hover:shadow-xl active:scale-95 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed`}
                  style={{
                    background: "linear-gradient(180deg, #FF855E 0%, #FF6B3D 100%)",
                    boxShadow: "0 8px 18px rgba(235, 90, 45, 0.25)",
                    minWidth: 120,
                    fontFamily: "Inter, sans-serif",
                  }}
                  aria-busy={status === "loading"}
                  aria-disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {/* contact info */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <a
                href="mailto:vernita@varnanfilms.co.in"
                className="text-[#EB5A2D] hover:text-[#FF6B3D] transition-colors duration-200 text-base font-medium"
              >
                vernita@varnanfilms.co.in
              </a>
              <span className="text-[#EB5A2D]">|</span>
              <a
                href="tel:+919873684567"
                className="text-[#EB5A2D] hover:text-[#FF6B3D] transition-colors duration-200 text-base font-medium"
              >
                +91 98736 84567
              </a>
            </div>
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
            className="fixed left-4 right-4 sm:left-auto sm:right-6 bottom-6 z-50 bg-[#17365C] text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 flex items-center gap-2 max-w-[90vw] sm:max-w-md mx-auto sm:mx-0"
            role="status"
            aria-live="polite"
          >
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Form Submitted</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-4 right-4 sm:left-auto sm:right-6 bottom-6 z-50 bg-[#17365C] text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 flex items-center gap-2 max-w-[90vw] sm:max-w-md mx-auto sm:mx-0"
            role="alert"
            aria-live="assertive"
          >
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Something went wrong. Please try again later.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
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
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 bg-[url('/assets/bg.png')] bg-repeat bg-contain overflow-hidden">
      {/* Mandala corner decorations */}
      <motion.img
        src="/assets/footer-top-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-40 sm:w-56 lg:w-80 opacity-85"
        style={{ mixBlendMode: "multiply" }}
        initial={{ opacity: 0, x: 20, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.img
        src="/assets/footer-bottom-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-40 sm:w-56 lg:w-80 opacity-85"
        style={{ mixBlendMode: "multiply" }}
        initial={{ opacity: 0, x: -20, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left copy */}
          <div className="text-center lg:text-left lg:pr-8">
            <h3 className="h-serif text-xl sm:text-2xl lg:text-3xl text-[#17365C] mb-4 leading-tight">
              Whether you have an idea, a question, or simply want to explore how V can work together, V're just a message away.
            </h3>
            <p className="text-[#17365C] text-sm sm:text-base leading-relaxed">
              Let's catch up over coffee.
              <br />
              Great stories always begin with a good conversation.
            </p>
          </div>

          {/* Right form */}
          <div>
            <h3 className="h-serif text-xl sm:text-2xl lg:text-3xl text-[#17365C] mb-2 text-center lg:text-left">
              Join the Story
            </h3>
            <p className="text-[#17365C] text-sm sm:text-base mb-6 text-center lg:text-left">
              Ready to bring your vision to life? Let's talk.
            </p>

            <form onSubmit={onSubmit} className="space-y-4 bg-white/30 p-6 rounded-xl backdrop-blur-sm border border-white/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name*"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass} hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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
                    className={`${inputClass} hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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
              </div>

              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`${inputClass} hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none hover:border-[#17365C]/60 focus:ring-[#17365C]`}
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

              <div className="flex items-center justify-center w-full">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`text-white px-6 py-2 sm:px-8 sm:py-3 text-base font-semibold rounded-full text-center shadow-lg shadow-orange-200/50 hover:from-[#FF906E] hover:to-[#FF7B4C] hover:shadow-xl active:scale-95 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed`}
                  style={{
                    background: "linear-gradient(180deg, #FF855E 0%, #FF6B3D 100%)",
                    boxShadow: "0 8px 18px rgba(235, 90, 45, 0.25)",
                    minWidth: 120,
                    fontFamily: "Inter, sans-serif",
                  }}
                  aria-busy={status === "loading"}
                  aria-disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {/* contact info */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <a
                href="mailto:vernita@varnanfilms.co.in"
                className="text-[#EB5A2D] hover:text-[#FF6B3D] transition-colors duration-200 text-base font-medium"
              >
                vernita@varnanfilms.co.in
              </a>
              <span className="text-[#EB5A2D]">|</span>
              <a
                href="tel:+919873684567"
                className="text-[#EB5A2D] hover:text-[#FF6B3D] transition-colors duration-200 text-base font-medium"
              >
                +91 98736 84567
              </a>
            </div>
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
            className="fixed left-4 right-4 sm:left-auto sm:right-6 bottom-6 z-50 bg-[#17365C] text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 flex items-center gap-2 max-w-[90vw] sm:max-w-md mx-auto sm:mx-0"
            role="status"
            aria-live="polite"
          >
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Form Submitted</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-4 right-4 sm:left-auto sm:right-6 bottom-6 z-50 bg-[#17365C] text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 flex items-center gap-2 max-w-[90vw] sm:max-w-md mx-auto sm:mx-0"
            role="alert"
            aria-live="assertive"
          >
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Something went wrong. Please try again later.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
