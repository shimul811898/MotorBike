"use client";

import { useEffect, useState } from "react";
import OderCard from "@/components/OderCard";
import Link from "next/link";

export default function MyBookingsDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            let apiBookings = [];
            try {
                const res = await fetch("http://localhost:5000/oders");
                if (res.ok) {
                    apiBookings = await res.json();
                }
            } catch (error) {
                console.error("Backend fetch error:", error);
            }

            // Fallback & Merge with localStorage bookings
            const localBookings = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith("booking_")) {
                    try {
                        const item = JSON.parse(localStorage.getItem(key));
                        if (item) {
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

            allBookings.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

            setBookings(allBookings);
            setLoading(false);
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                <p className="text-slate-500 font-semibold">Loading dashboard bookings...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 pb-6 border-b">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">My Bookings Dashboard</h1>
                    <p className="text-slate-500 mt-2">Manage and track your motorbike orders</p>
                </div>
                <Link href="/all-bike" className="mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg text-center">
                    Book Another Bike
                </Link>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <span className="text-5xl block mb-4">🏍️</span>
                    <h2 className="text-xl font-bold text-slate-700">No Bookings Found</h2>
                    <p className="text-slate-400 mt-1 max-w-sm mx-auto">You haven't ordered any motorbikes yet. Visit our showroom to place your order!</p>
                    <Link href="/all-bike" className="inline-block mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition">
                        Explore Bikes
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="relative group">
                            <Link href={`/mybooking/${booking._id}`} className="absolute top-4 right-4 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-green-600 hover:text-white transition z-10 cursor-pointer shadow-sm">
                                View Details
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
