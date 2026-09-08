import { FaStar, FaMotorcycle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Detailspage = async ({ params }) => {
    const { id } = await params;
    let bike = null;

    try {
        const res = await fetch(`http://localhost:5000/bikes/${id}`, {
            cache: "no-store",
        });
        if (res.ok) {
            const data = await res.json();
            if (data && !data.error) {
                bike = data;
            }
        }
    } catch (error) {
        console.error("Error fetching bike details:", error);
    }

    if (!bike) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
                <span className="text-6xl block mb-2">🏍️</span>
                <h1 className="text-3xl font-black text-white">Bike Not Found</h1>
                <p className="text-slate-400 max-w-sm mx-auto text-sm">
                    We could not find the details for this bike. It may have been removed or the server is unavailable.
                </p>
                <Link
                    href="/all-bike"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition"
                >
                    <FaArrowLeft size={14} /> Back to All Bikes
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            
            {/* Back Button */}
            <Link
                href="/all-bike"
                className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
            >
                <FaArrowLeft size={12} /> Back to Showroom
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* BIKE IMAGE (Glass Box) */}
                <div className="relative glass-panel rounded-3xl overflow-hidden shadow-2xl p-2 group">
                    <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={bike.image || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"}
                            alt={bike.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Condition Badge */}
                    <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                        {bike.condition || "Available"}
                    </div>
                </div>

                {/* BIKE DETAILS */}
                <div className="space-y-6">

                    {/* BRAND & NAME */}
                    <div>
                        <p className="text-emerald-400 font-extrabold uppercase tracking-widest text-xs flex items-center gap-2 mb-2">
                            <FaMotorcycle /> {bike.brand}
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                            {bike.name}
                        </h1>
                    </div>

                    {/* SPECS GRID (Glass Badges) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="p-4 rounded-2xl glass-panel border border-white/10 text-center">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                Engine
                            </p>
                            <p className="font-black text-white text-base sm:text-lg">
                                {bike.cc} CC
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl glass-panel border border-white/10 text-center">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                Condition
                            </p>
                            <p className="font-black text-emerald-400 text-base sm:text-lg">
                                {bike.condition}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl glass-panel border border-white/10 text-center">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                Rating
                            </p>
                            <p className="font-black text-amber-400 text-base sm:text-lg">
                                ★ {bike.rating || 0}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl glass-panel border border-white/10 text-center">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                Status
                            </p>
                            <p className="font-black text-emerald-400 text-base sm:text-lg">
                                In Stock
                            </p>
                        </div>
                    </div>

                    {/* PRICE PANEL */}
                    <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-500/5">
                        <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">
                            Price
                        </span>
                        <h2 className="text-4xl font-black text-white mt-1">
                            ৳ {bike.price?.toLocaleString()}
                        </h2>
                        <p className="text-slate-400 text-xs mt-1">
                            Verified price tag with warranty coverage
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                        {bike.description || "High performance premium motorcycle engineered for dynamic agility, peak acceleration, and reliable ride comfort."}
                    </p>

                    {/* CTA BUTTON */}
                    <div className="pt-2">
                        <Link href={`/oderform?bikeId=${bike._id}&bikeName=${encodeURIComponent(bike.name)}&price=${bike.price}`}>
                            <button className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition duration-300 cursor-pointer">
                                Book This Ride Now
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Detailspage;
