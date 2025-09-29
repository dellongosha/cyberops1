"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


// --- Config ---
const BRAND = {
  name: "Established Solutions",
  tagline: "Secure. Reliable. Professional.",
  description:
    "Established Solutions provides IT Consulting, Cybersecurity, Cloud Solutions, and Remote/On-Site Tech Support for businesses and individuals.",
};

type MenuItem = {
  label: string;
  href: string;
};

const MENU: MenuItem[] = [

  { label: "search", href: "#search" },
  { label: "Cart", href: "#cart" },
  { label: "Login", href: "#login" },
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about_us" },
  { label: "+263-771-254-430", href: "tel:+263771254430" },
];

const CATEGORY_ITEMS = [
  { icon: "ht-computer-support-outline", text: "Computers & Printers" },
  { icon: "ht-wifi-network-outline", text: "WiFi & Network" },
  { icon: "ht-mobile-tablet-outline", text: "Mobile Devices" },
  { icon: "ht-audio-video-outline", text: "Audio & Video" },
  { icon: "ht-tv-mounting-outline", text: "Cybersecurity" },
  { icon: "ht-smart-home-outline", text: "IT Consulting" },
  { icon: "ht-cat-icon-home-security", text: "Home & Office Security" },
  { icon: "ht-home-office-outline", text: "Around the Office" },
];

const ROTATING_DEVICES = [
  "Computer",
  "Network",
  "Server",
  "Cloud",
  "Printer",
  "Mobile",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_DEVICES.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>{`${BRAND.name}: IT Consulting, Cybersecurity, Cloud & Support`}</title>
        <meta name="description" content={BRAND.description} />
        <meta property="og:title" content={BRAND.name} />
        <meta property="og:description" content={BRAND.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={BRAND.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
{/* HEADER */}
<header className="sticky top-0 z-40 w-full border-b border-gray-200 shadow-[0_6px_8px_rgba(38,55,70,0.03)] bg-white backdrop-blur">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

    {/* Left: Logo + Hamburger */}
    <div className="flex items-center gap-3">
      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600" />
      <span className="text-xl font-extrabold tracking-tight text-blue-600" style={{ fontFamily: "InterTight, sans-serif" }}>
        {BRAND.name}
      </span>
    </div>

    {/* Desktop Menu (hidden on mobile) */}
    <nav className=" items-center gap-6 text-base font-medium">
      {MENU.filter(m => !["search", "Cart", "Login", "+263-771-254-430"].includes(m.label)).map((m) => (
        <a
          key={m.label}
          href={m.href}
          className="relative px-2 py-1 transition hover:text-[#0992E9] 
                     after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
                     after:bg-[#0992E9] after:transition-all hover:after:w-full"
        >
          {m.label}
        </a>
      ))}
      
    </nav>

    {/* Mobile Contact (visible only on mobile) */}
    <div className="">
      <a
        href={MENU.find(m => m.label.includes("+"))?.href}
        className="ml-2 px-4 py-2 rounded-lg bg-[#0992E9] text-white font-semibold shadow-md hover:bg-blue-800 transition"
      >
        {MENU.find(m => m.label.includes("+"))?.label}
      </a>
    </div>

  </div>

  {/* Mobile Dropdown */}
  <AnimatePresence>
    {menuOpen && (
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="md:hidden bg-white border-t shadow-lg flex flex-col p-4 gap-4"
      >
        {MENU.filter(m => ["Home", "Services", "About Us"].includes(m.label)).map((m) => (
          <a
            key={m.label}
            href={m.href}
            className="text-gray-700 hover:text-[#0992E9] text-lg"
            onClick={() => setMenuOpen(false)}
          >
            {m.label}
          </a>
        ))}
      </motion.nav>
    )}
  </AnimatePresence>
</header>


      {/* HERO */}
      <section className="relative bg-gradient-to-r from-[#0992E9] to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              In-Office & Online Support for your{" "}
              <span className="inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    {ROTATING_DEVICES[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="mt-4 text-lg opacity-90 max-w-xl">
              The best tech solution, ready to help you — anytime, anywhere.{" "}
              {BRAND.tagline}
            </p>

            {/* Dropdown */}
            <div className="mt-8 w-full md:w-[28rem] relative">
              <details className="group w-full">
                <summary className="flex justify-between items-center px-4 py-3 rounded-xl border bg-white text-gray-900 shadow cursor-pointer">
                  <span className="text-xl md:text-2xl font-bold">
                    I need help with…
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                  </svg>
                </summary>
                <div className="absolute top-full left-0 mt-2 w-full rounded-2xl border bg-white text-black shadow-xl p-2 flex flex-col gap-1 z-50">
                  {CATEGORY_ITEMS.map((c) => (
                    <a
                      key={c.text}
                      href="#contact"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-100"
                    >
                      {c.icon && <i className={`${c.icon} w-5 h-5 text-blue-600`} />}

                      <span className="text-sm font-medium">{c.text}</span>
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Right */}
          <div className="relative h-72 md:h-[460px] w-full rounded-3xl overflow-hidden">
<Image
  src="/herro.png"
  alt="Call"
  className="absolute inset-0 object-cover"
  fill
  priority
/>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5" />
          </div>
        </div>

      </section>

 




 {/* BANNER */}
<div className="bg-[#0992E9] text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-center gap-4">
    <div className="flex items-center gap-2 text-sm">
      <i className="ht-icon ht-toolkit text-lg" aria-hidden />
      <span className="font-bold text-lg">Ready to get started?</span>
    </div>

    {/* Book a Service Button */}
              <div className="flex-shrink-0">
                <a
                  href="#contact"
                  className="px-5 py-4 bg-white text-[#0992E9] font-semibold  hover:bg-gray-100 transition"
                >
                  Book A Service Now
                </a>
              </div>
  </div>
</div>








      {/* SERVICES SLIDER */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-3xl font-bold">Popular Services</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade solutions for small businesses to large organizations.
          </p>

          <div className="mt-10 relative">
            <div
              id="services-slider"
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-4 scrollbar-hide"
            >
              {[
                { title: "CCTV & Security Cameras", img: "/cameras.png" },
                { title: "IT Consulting", img: "/consulting.png" },
                { title: "Internet Speed & Wi-Fi Setup", img: "/internet.png" },
                { title: "Computer & Laptop Repairs", img: "/laptops.png" },
                { title: "Printers & Scanners Support", img: "/printer.png" },
                { title: "Remote Support", img: "/remote.png" },
              ].map((s) => (

                <div
                  key={s.title}
                  className="flex-shrink-0 snap-center flex flex-col items-center p-2 rounded-2xl bg-white hover:shadow-lg transition w-70"
                >
      <Image
        src={s.img}
        alt={s.title}
        width={120}
        height={120}
        className="object-contain mb-0"
      />
                  <h3 className="text-lg font-semibold text-blue-700">{s.title}</h3>
                  <a
                    href="#contact"
                    className="mt-2 text-sm font-medium text-blue-700 hover:underline"
                  >
                    Get a quote →
                  </a>
                </div>         
                
              ))}
            </div>
            {/* Arrows */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white transition-colors rounded-full p-3 shadow-lg z-10 flex items-center justify-center"
              onClick={() => {
                const slider = document.getElementById("services-slider");
                slider?.scrollBy({ left: -300, behavior: "smooth" });
              }}
              aria-label="Scroll Left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white transition-colors rounded-full p-3 shadow-lg z-10 flex items-center justify-center"
              onClick={() => {
                const slider = document.getElementById("services-slider");
                slider?.scrollBy({ left: 300, behavior: "smooth" });
              }}
              aria-label="Scroll Right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>




        </div>
      </section>

{/* INTERNET SPEED TEST SECTION */}
<section id="speedtest" className="py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
    
    {/* Left: Speed test iframe */}
    <div className="w-full h-[400px] md:h-[450px]">
      <iframe
        id="fast-iframe"
        src="https://fast.com"
        width="100%"
        height="100%"
        frameBorder="0"
        className="rounded-2xl"
        title="Internet Speed Test"
      ></iframe>
    </div>

    {/* Right: Text & button */}
    <div className="flex flex-col justify-center gap-6">
      <h2 className="text-3xl font-bold text-gray-900">Getting the speed you need?</h2>
      <p className="text-gray-600 text-lg">
        A fast connection is essential whether you’re working, playing, or relaxing. 
        Use our speed test to make sure your network is giving you what you need.
      </p>
      
      <button
        onClick={() => {
          const iframe = document.getElementById('fast-iframe') as HTMLIFrameElement;
          if (iframe) iframe.src = iframe.src; // Reload iframe to "run test"
        }}
        className=" w-1/3 px-6 py-4 bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
      >
        Run Speed Test
      </button>
      <p className="text-gray-500 text-sm">
        Free, instant, and easy to use. Works on any device.
      </p>
    </div>

  </div>
</section>

{/* COMMON PROBLEMS SLIDER */}
<section id="common-problems" className="py-5 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
    <h2 className="text-3xl font-bold">Common IT Problems We Solve</h2>
    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
      Day-to-day IT challenges faced by businesses and professionals.
    </p>

    <div className="mt-10 relative">
      <div
        id="problems-slider"
        className="flex flex-col gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-4"
      >
        {(() => {
          const problems = [
            "Microsoft 365 / Office Suite – Word, Excel, Outlook, Teams",
            "Windows OS – Desktop/server environments",
            "Zoom / Google Meet / Microsoft Teams – Remote meetings",
            "Network downtime & connectivity issues – Wired/wireless networks",
            "Slow internet speeds – ISPs & troubleshooting",
            "Virus, malware, ransomware attacks – Endpoint security & EDR/XDR",
            "Printer & peripheral failures – Office equipment support",
            "Cloud migration & data backup issues – Azure, AWS, M365",
            "Software updates / patch management – Keeping systems compliant",
            "Password management / identity security – Microsoft Entra ID / Azure AD",
          ];

          const odd = problems.filter((_, idx) => idx % 2 === 0);
          const even = problems.filter((_, idx) => idx % 2 === 1);

          const renderRow = (row: string[], rowKey: string) => (
            <div className="flex gap-6 snap-x snap-mandatory">
              {row.map((p, idx) => (
                <div
                  key={`${rowKey}-${idx}`}
                  className="flex-shrink-0 snap-center flex flex-col items-center p-6 rounded-2xl bg-white shadow hover:shadow-lg transition w-56"
                >
                  <span className="text-sm text-gray-700 text-center">{p}</span>
                </div>
              ))}
            </div>
          );

          return (
            <>
              {renderRow(odd, "odd")}
              {renderRow(even, "even")}
            </>
          );
        })()}
      </div>

      {/* Arrows */}
      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white transition-colors rounded-full p-3 shadow-lg z-10 flex items-center justify-center"
        onClick={() => {
          const slider = document.getElementById("problems-slider");
          slider?.scrollBy({ left: -300, behavior: "smooth" });
        }}
        aria-label="Scroll Left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white transition-colors rounded-full p-3 shadow-lg z-10 flex items-center justify-center"
        onClick={() => {
          const slider = document.getElementById("problems-slider");
          slider?.scrollBy({ left: 300, behavior: "smooth" });
        }}
        aria-label="Scroll Right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</section>


{/* --- WHY CHOOSE US SECTION (2 Columns) --- */}
<section id="about_us" className="py-16 bg-gray-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold">Why Choose CyberOPS?</h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Delivering fast, secure, and reliable IT solutions tailored to your business needs.
      </p>
    </div>

    {/* 2-Column Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-8">
      <div className="flex items-start gap-4">
        <div className="text-blue-700 text-3xl">💻</div>
        <p className="font-medium text-gray-700">
          Certified experts in cybersecurity, cloud, and networking.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="text-blue-700 text-3xl">⚡</div>
        <p className="font-medium text-gray-700">
          Rapid remote support or same-day on-site assistance.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="text-blue-700 text-3xl">🔒</div>
        <p className="font-medium text-gray-700">
          End-to-end cybersecurity & risk management.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="text-blue-700 text-3xl">🌐</div>
        <p className="font-medium text-gray-700">
          Wi-Fi, network setup, and computer repair services.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="text-blue-700 text-3xl">💡</div>
        <p className="font-medium text-gray-700">
          IT consulting and professional tech advice.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="text-blue-700 text-3xl">📈</div>
        <p className="font-medium text-gray-700">
          Fixed pricing with clear, documented solutions.
        </p>
      </div>
    </div>
  </div>
</section>





   {/* --- Partners Logos at bottom --- */}
    <div className="flex justify-center items-center gap-8 overflow-x-auto px-4 py-2 mt-auto scrollbar-hide">
      {[
        { name: "Liquid", img: "/liquidS.png" },
        { name: "Microsoft", img: "/microsoft.png" },
        { name: "Lenovo", img: "/lenovo.png" },
        { name: "HP", img: "/hp.png" },
        { name: "Dell", img: "/dell.png" },
        { name: "Trendnet", img: "/hikivision.png" },
      ].map((b) => (
        <div key={b.name} className="flex flex-col items-center justify-center w-28 flex-shrink-0">
          <Image src={b.img} alt={b.name} className="w-20 h-20 object-contain mb-2" />
        </div>
      ))}
    </div>





{/* CONTACT */}
<section id="contact" className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* Left: Text + Direct Contact Buttons */}
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold text-gray-900">Get in Touch</h2>
      <p className="text-gray-600 text-lg">
        Need help? Reach us instantly via WhatsApp, call, or email, or send us a quick message using the form. 
        We typically respond within a few hours.
      </p>

      {/* Direct Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://wa.me/263771254430"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition text-center"
        >
          WhatsApp Us
        </a>

        <a
          href="tel:+263771254430"
          className="flex-1 px-6 py-3 bg-[#0992E9] text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition text-center"
        >
          Call Us
        </a>

        <a
          href="mailto:info@cyberops.co.zw"
          className="flex-1 px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-900 transition text-center"
        >
          Email Us
        </a>
      </div>
    </div>

    {/* Right: Form Card */}
    <div className="bg-gray-50 p-8 rounded-3xl shadow-xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Or send us a message</h3>
      <form className="grid gap-4">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0992E9] focus:border-[#0992E9] transition"
          placeholder="Your Name"
        />
        <input
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0992E9] focus:border-[#0992E9] transition"
          placeholder="Email"
        />
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0992E9] focus:border-[#0992E9] transition"
          placeholder="Company (optional)"
        />
        <textarea
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0992E9] focus:border-[#0992E9] transition"
          rows={5}
          placeholder="Your Message"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#0992E9] text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>

  </div>
</section>


      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10" />
            <span className="font-semibold">{BRAND.name}</span>
          </div>
          <div className="text-sm opacity-80">© 2025 {BRAND.name}. All rights reserved.</div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

/*
  Notes:
  - This page mirrors the structure you shared: header with dropdown, hero with rotating device name,
    category menu, banner, service grid, reviews, about, contact, and footer — branded for Established Solutions.
  - Styling uses Tailwind utility classes. In a real Next.js app, ensure Tailwind is set up
    (tailwind.config.js + globals.css). If you prefer CSS Modules instead, we can convert.
  - Replace placeholder icon classes (ht-icon …) with your icon set or SVGs.
  - Replace hero/art blocks with real images under /public.
*/

