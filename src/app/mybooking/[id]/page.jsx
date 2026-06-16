"use client";

import { useEffect, useState } from "react";
import OderCard from "@/components/OderCard";
import { useParams } from "next/navigation";

const MyBookingDetails = () => {
    const params = useParams();
    const id = params?.id;
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await fetch(`http://localhost:5000/oders/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
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
                setBooking(JSON.parse(localData));
            }
            setLoading(false);
        };

        if (id) {
            fetchBooking();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                <p className="text-slate-500 font-semibold">Loading booking details...</p>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
                <div className="text-red-500 text-5xl">⚠️</div>
                <h2 className="text-xl font-bold text-slate-700">Booking Not Found</h2>
                <p className="text-slate-400 text-sm">We couldn&apos;t retrieve the details for this booking ID.</p>
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
