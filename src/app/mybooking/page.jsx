"use client";

import { useEffect, useState } from "react";
import OderCard from "@/components/OderCard";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { FaPlus, FaLock, FaMotorcycle } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/api";

export default function MyBookingsDashboard() {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const userEmail = user?.email;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isPending) return;

        if (!userEmail) {
            setBookings([]);
            setLoading(false);
            return;
        }

        const fetchBookings = async () => {
            let apiBookings = [];
            try {
                const res = await fetch(`${API_BASE_URL}/oders?email=${encodeURIComponent(userEmail)}`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        apiBookings = data;
                    }
                }
            } catch (error) {
                console.error("Backend fetch error:", error);
            }

            // Fallback & Merge with localStorage bookings for this user only
            const localBookings = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith("booking_")) {
                    try {
                        const item = JSON.parse(localStorage.getItem(key));
                        if (item && item.userEmail && item.userEmail.toLowerCase() === userEmail.toLowerCase()) {
                            localBookings.push(item);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            const allBookings = [...apiBookings];
            localBookings.forEach((local) => {
                if (!allBookings.some((api) => api._id === local._id)) {
                    allBookings.push(local);
                }
            });

            allBookings.sort((a, b) => String(b._id || "").localeCompare(String(a._id || "")));

            setBookings(allBookings);
            setLoading(false);
        };

        fetchBookings();
    }, [isPending, userEmail]);

    if (isPending || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <p className="text-slate-400 font-semibold">Loading your bookings...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto px-6 py-24 text-center glass-panel rounded-3xl my-12 space-y-4 border border-white/10 shadow-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2">
                    <FaLock size={24} />
                </div>
                <h2 className="text-2xl font-black text-white">Login Required</h2>
                <p className="text-slate-400 text-sm">Please sign in to view and manage your booked motorbike vouchers.</p>
                <Link 
                    href="/login" 
                    className="inline-block mt-4 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold rounded-2xl hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105 transition duration-200"
                >
                    Sign In to Account
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 pb-6 border-b border-white/10 gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>📋</span> Personal Dashboard
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">My Bookings</h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Showing orders for account: <span className="font-mono text-emerald-400 font-bold bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10">{userEmail}</span>
                    </p>
                </div>

                <Link 
                    href="/all-bike" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition shadow-md text-sm"
                >
                    <FaPlus size={12} /> Book Another Bike
                </Link>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-24 glass-panel rounded-3xl border border-white/10 max-w-lg mx-auto space-y-4">
                    <span className="text-5xl block">🏍️</span>
                    <h2 className="text-2xl font-black text-white">No Bookings Yet</h2>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">
                        You haven&apos;t booked any motorbikes with this account yet. Explore our showroom fleet to place your first booking!
                    </p>
                    <Link 
                        href="/all-bike" 
                        className="inline-block mt-4 px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition text-sm"
                    >
                        Explore Fleet
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="relative group">
                            <Link 
                                href={`/mybooking/${booking._id}`} 
                                className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-emerald-500 hover:text-white transition z-10 cursor-pointer shadow-md backdrop-blur-sm"
                            >
                                View Voucher
                            </Link>
                            <OderCard 
                                allbike={booking} 
                                onDeleteSuccess={(id) => setBookings(prev => prev.filter(b => b._id !== id))}
                                onUpdateSuccess={(updated) => setBookings(prev => prev.map(b => b._id === updated._id ? updated : b))}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
