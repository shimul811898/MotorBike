"use client";

import { useEffect, useState } from "react";
import OderCard from "@/components/OderCard";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

const MyBookingDetails = () => {
    const params = useParams();
    const id = params?.id;
    const { data: session, isPending } = useSession();
    const userEmail = session?.user?.email;

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        if (isPending) return;

        const fetchBooking = async () => {
            try {
                const url = userEmail 
                    ? `${API_BASE_URL}/oders/${id}?email=${encodeURIComponent(userEmail)}` 
                    : `${API_BASE_URL}/oders/${id}`;
                const res = await fetch(url);
                if (res.status === 403) {
                    setAccessDenied(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        // Check if booking has userEmail and if it matches
                        if (data.userEmail && userEmail && data.userEmail.toLowerCase() !== userEmail.toLowerCase()) {
                            setAccessDenied(true);
                            setLoading(false);
                            return;
                        }
                        setBooking(data);
                        setLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.error("Backend fetch error:", error);
            }

            const localData = localStorage.getItem(`booking_${id}`);
            if (localData) {
                try {
                    const parsed = JSON.parse(localData);
                    if (parsed.userEmail && userEmail && parsed.userEmail.toLowerCase() !== userEmail.toLowerCase()) {
                        setAccessDenied(true);
                        setLoading(false);
                        return;
                    }
                    setBooking(parsed);
                } catch (e) {
                    console.error(e);
                }
            }
            setLoading(false);
        };

        if (id) {
            fetchBooking();
        }
    }, [id, isPending, userEmail]);

    if (isPending || loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                <p className="text-slate-500 font-semibold">Loading booking details...</p>
            </div>
        );
    }

    if (accessDenied) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-6">
                <div className="text-red-500 text-5xl">🚫</div>
                <h2 className="text-2xl font-black text-slate-800">Access Denied</h2>
                <p className="text-slate-500 max-w-md">
                    This booking voucher belongs to another user account. You can only view vouchers purchased with your logged-in email ({userEmail}).
                </p>
                <Link href="/mybooking" className="mt-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow">
                    Back to My Bookings
                </Link>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-6">
                <div className="text-amber-500 text-5xl">⚠️</div>
                <h2 className="text-xl font-bold text-slate-700">Booking Not Found</h2>
                <p className="text-slate-400 text-sm">We couldn&apos;t retrieve the details for this booking ID.</p>
                <Link href="/mybooking" className="mt-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition">
                    View My Bookings
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-xl mx-auto my-10">
            <OderCard allbike={booking} />
        </div>
    );
};

export default MyBookingDetails;
