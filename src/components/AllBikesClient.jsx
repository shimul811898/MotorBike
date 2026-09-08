"use client";

import { useState, useMemo } from "react";
import BikeCard from "@/components/BikeCard";
import { FaSearch, FaTimes, FaFilter, FaMotorcycle } from "react-icons/fa";

export default function AllBikesClient({ initialBikes = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [selectedCondition, setSelectedCondition] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    // Extract unique brands from bikes list
    const brands = useMemo(() => {
        const set = new Set();
        initialBikes.forEach((b) => {
            if (b.brand) set.add(b.brand);
        });
        return ["all", ...Array.from(set)];
    }, [initialBikes]);

    // Filter and sort bikes
    const filteredBikes = useMemo(() => {
        return initialBikes
            .filter((bike) => {
                // Search filter (matches name, brand, or cc)
                const query = searchTerm.toLowerCase().trim();
                const matchesSearch =
                    !query ||
                    bike.name?.toLowerCase().includes(query) ||
                    bike.brand?.toLowerCase().includes(query) ||
                    String(bike.cc).includes(query);

                // Brand filter
                const matchesBrand =
                    selectedBrand === "all" ||
                    bike.brand?.toLowerCase() === selectedBrand.toLowerCase();

                // Condition filter
                const matchesCondition =
                    selectedCondition === "all" ||
                    bike.condition?.toLowerCase() === selectedCondition.toLowerCase();

                return matchesSearch && matchesBrand && matchesCondition;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
                if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
                if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
                return 0;
            });
    }, [initialBikes, searchTerm, selectedBrand, selectedCondition, sortBy]);

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedBrand("all");
        setSelectedCondition("all");
        setSortBy("default");
    };

    const hasActiveFilters =
        searchTerm !== "" || selectedBrand !== "all" || selectedCondition !== "all" || sortBy !== "default";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Header Section */}
            <div className="text-center mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
                    <span>🏍️</span> Official Showroom Fleet
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    Find Your Dream <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Motorbike</span>
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
                    Search by model, brand, CC or filter by condition to locate the exact machine you desire.
                </p>
            </div>

            {/* Glass Search & Filter Control Bar */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl mb-12 space-y-4 border border-white/10 shadow-2xl">
                
                {/* Search Input Box */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-emerald-400">
                        <FaSearch className="text-lg" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search bike name (e.g. Yamaha R15, KTM, 160 CC, Honda)..."
                        className="w-full pl-12 sm:pl-14 pr-12 py-4 rounded-2xl glass-input outline-none font-semibold text-white placeholder-slate-400 text-sm sm:text-base"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                {/* Filter & Sorting Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
                        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-400 mr-1">
                            <FaFilter className="text-emerald-400" /> Filter:
                        </span>

                        {/* Brand Filter */}
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="glass-input rounded-xl px-3.5 py-2 outline-none font-bold text-slate-200 cursor-pointer text-xs bg-[#0f172a]"
                        >
                            <option value="all">All Brands</option>
                            {brands.filter((b) => b !== "all").map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>

                        {/* Condition Filter */}
                        <select
                            value={selectedCondition}
                            onChange={(e) => setSelectedCondition(e.target.value)}
                            className="glass-input rounded-xl px-3.5 py-2 outline-none font-bold text-slate-200 cursor-pointer text-xs bg-[#0f172a]"
                        >
                            <option value="all">All Conditions</option>
                            <option value="new">New Only</option>
                            <option value="used">Used Only</option>
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="glass-input rounded-xl px-3.5 py-2 outline-none font-bold text-slate-200 cursor-pointer text-xs bg-[#0f172a]"
                        >
                            <option value="default">Sort: Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated First</option>
                        </select>
                    </div>

                    {/* Active Match Counter & Reset Button */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400">
                            Found <strong className="text-emerald-400 text-sm">{filteredBikes.length}</strong> bikes
                        </span>

                        {hasActiveFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white transition text-xs font-bold border border-white/10 cursor-pointer"
                            >
                                <FaTimes size={10} /> Reset
                            </button>
                        )}
                    </div>

                </div>

            </div>

            {/* Bikes Grid */}
            {filteredBikes.length === 0 ? (
                <div className="text-center py-24 glass-panel rounded-3xl border border-white/10 max-w-md mx-auto space-y-4">
                    <span className="text-6xl block">🔍</span>
                    <h3 className="text-2xl font-black text-white">No Matching Bikes</h3>
                    <p className="text-slate-400 text-sm px-6">
                        No motorbikes matched your search for &quot;<span className="text-emerald-400 font-bold">{searchTerm}</span>&quot;. Try different keywords or reset filters.
                    </p>
                    <button
                        onClick={handleClearFilters}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 hover:scale-105 transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBikes.map((bike) => (
                        <BikeCard key={bike._id} allbike={bike} />
                    ))}
                </div>
            )}

        </div>
    );
}
