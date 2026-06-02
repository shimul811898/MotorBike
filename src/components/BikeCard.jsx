"use client";
import { FaStar, FaMotorcycle, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
const BikeCard = ({ allbike }) => {
  const { _id, name, brand, price, cc, condition, image, rating } = allbike;

  return (
    <div className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      {/* Image Section */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-700 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
          {condition}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">

        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 leading-tight">
              {name}
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1 flex items-center gap-1">
              <FaMotorcycle className="text-green-500" /> {brand} • {cc} CC
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.round(rating) ? "fill-current" : "text-slate-200"} />
            ))}
          </div>
          <span className="text-slate-600 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded">
            {rating}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Price</span>
            <h3 className="text-2xl font-black text-slate-900">
              ৳ {price.toLocaleString()}
            </h3>
          </div>

          <Link href={`/details/${_id}`}>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">
              Details <FaArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;