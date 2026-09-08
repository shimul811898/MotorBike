"use client";

import { FaStar, FaMotorcycle, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const BikeCard = ({ allbike }) => {
  if (!allbike) return null;
  const { _id, name, brand, price, cc, condition, image, rating } = allbike;

  return (
    <div className="group relative glass-card rounded-3xl overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"}
          alt={name || "Motorbike"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>

        {/* Condition Badge (Glass Tag) */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/15 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-lg">
          {condition || "New"}
        </div>

        {/* CC Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs px-3 py-1.5 rounded-full font-bold">
          {cc} CC
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-2">
            <FaMotorcycle />
            <span>{brand}</span>
          </div>

          <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 leading-tight">
            {name}
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-amber-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(Number(rating) || 0) ? "fill-current" : "text-slate-600"}
                />
              ))}
            </div>
            <span className="text-slate-300 font-extrabold text-xs bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
              {rating || 0}
            </span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
              Price
            </span>
            <h4 className="text-2xl font-black text-white">
              ৳ {(Number(price) || 0).toLocaleString()}
            </h4>
          </div>

          <Link href={`/details/${_id}`}>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 transition duration-300 cursor-pointer">
              Details <FaArrowRight size={12} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;