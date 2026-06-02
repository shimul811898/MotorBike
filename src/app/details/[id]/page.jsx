import Image from "next/image";
import { FaStar, FaMotorcycle, FaTags, FaCogs, FaChevronLeft } from "react-icons/fa";

import Link from "next/link";

const Detailspage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/bikes/${id}`, {
        cache: "no-store",
    });
    const bike = await res.json();



    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* BIKE IMAGE */}
                <div className="relative  bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <div className="absolute top-5 left-5 bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {bike.condition}
                    </div>
                </div>

                {/* BIKE DETAILS */}
                <div className="space-y-5">

                    {/* NAME */}
                    <h1 className="text-4xl font-black text-slate-900 leading-tight">
                        {bike.name}
                    </h1>

                    {/* BRAND */}
                    <p className="text-slate-600 font-medium flex items-center gap-2 text-lg">
                        <FaMotorcycle className="text-slate-700" />
                        {bike.brand}
                    </p>

                    {/* INFO GRID (DocAppoint style cards) */}
                    <div className="grid grid-cols-2 gap-4 pt-4">

                        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <p className="text-slate-400 text-xs font-semibold uppercase mb-1">
                                Engine
                            </p>
                            <p className="font-extrabold text-slate-800 text-lg">
                                {bike.cc} CC
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <p className="text-slate-400 text-xs font-semibold uppercase mb-1">
                                Condition
                            </p>
                            <p className="font-extrabold text-slate-800 text-lg">
                                {bike.condition}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <p className="text-slate-400 text-xs font-semibold uppercase mb-1">
                                Rating
                            </p>
                            <p className="font-extrabold text-amber-500 text-lg">
                                ★ {bike.rating || 0}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <p className="text-slate-400 text-xs font-semibold uppercase mb-1">
                                Availability
                            </p>
                            <p className="font-extrabold text-slate-800 text-lg">
                                In Stock
                            </p>
                        </div>

                    </div>

                   
                    <div className="pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">
                            Price
                        </span>
                        <h2 className="text-4xl font-black text-slate-900 mt-1">
                            ৳ {bike.price?.toLocaleString()}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Negotiable depending on seller
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-slate-600 leading-7 py-3.5 text-base ">
                        {bike.description || "High quality premium motorcycle with excellent performance and comfort."}
                    </p>

                    {/* BUTTON */}
                    <Link href={`/oderform?bikeId=${bike._id}&bikeName=${encodeURIComponent(bike.name)}&price=${bike.price}`}>
                        <button className="mt-6 w-full lg:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-extrabold text-lg hover:shadow-xl hover:shadow-green-500/20 transition duration-300 cursor-pointer">
                            Buy Now
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Detailspage;
