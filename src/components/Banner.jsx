"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "WHAT DO YOU WANT TO KNOW? 2024 KRÄMER HKR EVO2 R",
    subtitle: "Track Weapon & Engineering Marvel",
    tag: "Featured Review",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    link: "/all-bike",
  },
  {
    id: 2,
    title: "FIRST RIDE REVIEW — 2024 YAMAHA MT-10 SP",
    subtitle: "Hyper Naked King with Crossplane CP4",
    tag: "First Ride",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    link: "/all-bike",
  },
  {
    id: 3,
    title: "A WEEK WITH THE 2024 BMW K1600 GTL — INTRO",
    subtitle: "6-Cylinder Grand Touring Supremacy",
    tag: "Touring Special",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    link: "/all-bike",
  },
  {
    id: 4,
    title: "2024 DUCATI PANIGALE V4 S EXPERIENCE",
    subtitle: "Desmosedici Stradale Pure Adrenaline",
    tag: "Superbike",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1200&q=80",
    link: "/all-bike",
  },
  {
    id: 5,
    title: "OFF-ROAD ADVENTURE: KTM 890 RALLY",
    subtitle: "Ready To Race Any Terrain on Earth",
    tag: "Adventure",
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80",
    link: "/all-bike",
  },
];

const Banner = () => {
  const [startIndex, setStartIndex] = useState(0);

 
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [startIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % slides.length);
  };

  // Get 3 visible cards based on circular index
  const visibleCards = [
    slides[startIndex],
    slides[(startIndex + 1) % slides.length],
    slides[(startIndex + 2) % slides.length],
  ];

  return (
    <div className="w-full bg-[#1c1d1f] text-white shadow-2xl">
      {/* 3-Panel Split Showcase Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition shadow-lg cursor-pointer border border-white/10"
        >
          <FaChevronLeft size={18} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition shadow-lg cursor-pointer border border-white/10"
        >
          <FaChevronRight size={18} />
        </button>

        {/* 3 Side-by-Side Cards (Responsive: 1 on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-black/30">
          {visibleCards.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={item.link}
              className={`group relative h-64 sm:h-72 lg:h-80 overflow-hidden block ${
                idx === 2 ? "hidden lg:block" : idx === 1 ? "hidden md:block" : "block"
              }`}
            >
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Shade on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all"></div>

              {/* Tag / Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Translucent Dark Title Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/75 backdrop-blur-md px-5 py-3.5 border-t border-white/10 group-hover:bg-green-700/90 transition-colors duration-300">
                <p className="text-white text-xs sm:text-sm font-black uppercase tracking-wider line-clamp-1 group-hover:text-white">
                  {item.title}
                </p>
                <p className="text-slate-300 text-[11px] font-medium mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modern Sub-header / Brand Bar (Matching the Reference Image) */}
      <div className="bg-[#242528] border-t border-b border-black/40 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Wordmark (Bikeurious Style with Motorcycle Silhouette) */}
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center">
              Moto
              <span className="inline-flex items-center mx-1 text-emerald-400">
                {/* Custom Stylized Bike Vector Icon */}
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 19a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm14 6a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm-6.5-1l-2.7-5.4A2 2 0 0 0 8 7H5V5h3a4 4 0 0 1 3.58 2.21l1.92 3.84 2.65-2.65A2 2 0 0 1 17.56 8H20v2h-2.44a4 4 0 0 0-2.83 1.17l-2.23 2.23z"/>
                </svg>
              </span>
              <span className="text-emerald-400">Bike</span>
            </h2>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-slate-400 font-bold border-l border-slate-600 pl-3">
              The Premium Ride Hub
            </span>
          </div>

          {/* Quick Filter / Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-extrabold uppercase tracking-widest text-slate-300">
            <Link href="/all-bike" className="hover:text-emerald-400 transition">
              Explore All
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/all-bike" className="hover:text-emerald-400 transition">
              Sport
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/all-bike" className="hover:text-emerald-400 transition">
              Cruiser
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/all-bike" className="hover:text-emerald-400 transition">
              Touring
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/mybooking" className="hover:text-emerald-400 transition">
              My Bookings
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;