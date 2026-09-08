"use client";

import {
    Button,
} from "@heroui/react";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export const dynamic = "force-dynamic";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();
    const bikeName = searchParams.get("bikename") || searchParams.get("bikeName") || searchParams.get("name") || "";
    const price = searchParams.get("price") || "";

    const [payment, setPayment] = useState("cash");
    const [provider, setProvider] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const orderData = {
            bikeName,
            price: Number(price) || 0,
            customerName: e.target.customerName.value,
            userEmail: session?.user?.email || "",
            phone: e.target.phone.value,
            address: e.target.address.value,
            city: e.target.city.value,
            paymentMethod: payment === "online" && provider ? `Online (${provider})` : payment,
            status: "Pending",
            orderDate: new Date().toLocaleDateString()
        };

        try {
            const res = await fetch("http://localhost:5000/oders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
            
            if (res.ok) {
                const result = await res.json();
                const newId = result.insertedId || result._id;
                if (newId) {
                    orderData._id = newId;
                    localStorage.setItem(`booking_${newId}`, JSON.stringify(orderData));
                    alert("Order Confirmed Successfully!");
                    router.push(`/mybooking/${newId}`);
                    return;
                }
            }
        } catch (error) {
            console.error("Backend order submission error:", error);
        }

        // Fallback if backend is down
        const fallbackId = "local_" + Date.now();
        orderData._id = fallbackId;
        localStorage.setItem(`booking_${fallbackId}`, JSON.stringify(orderData));
        alert("Order Confirmed (Saved Locally)!");
        router.push(`/mybooking/${fallbackId}`);
    };

    const handleCancel = () => {
        const confirmCancel = confirm("Are you sure you want to cancel?");
        if (confirmCancel) {
            router.push("/all-bike");
        }
    };

    return (
        <div className="p-8 sm:p-10 space-y-8 max-w-4xl mx-auto my-10 rounded-3xl glass-panel relative overflow-hidden">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black text-white tracking-tight">Checkout Details</h2>
                {session?.user?.email && (
                    <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                        <span>🔒</span> Booking Account: <span className="font-bold text-white">{session.user.email}</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                        <input
                            type="text"
                            name="customerName"
                            defaultValue={session?.user?.name || ""}
                            placeholder="Full Name"
                            className="w-full glass-input rounded-2xl px-4 py-3.5 outline-none font-medium"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+880 1..."
                            className="w-full glass-input rounded-2xl px-4 py-3.5 outline-none font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Bike Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Selected Bike</label>
                        <input
                            type="text"
                            value={bikeName || ""}
                            readOnly
                            className="w-full rounded-xl bg-black/40 p-3 border border-white/10 cursor-not-allowed outline-none font-bold text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Total Price</label>
                        <input
                            type="text"
                            value={price ? (isNaN(Number(price)) ? price : `৳ ${Number(price).toLocaleString()}`) : ""}
                            readOnly
                            className="w-full rounded-xl bg-black/40 p-3 border border-white/10 cursor-not-allowed outline-none font-black text-emerald-400 text-lg"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Shipping Address</label>
                    <textarea
                        name="address"
                        placeholder="House no, Road, Area..."
                        className="w-full glass-input rounded-2xl px-4 py-3 outline-none resize-none font-medium"
                        rows="3"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Dhaka, Chittagong, Sylhet..."
                        className="w-full glass-input rounded-2xl px-4 py-3.5 outline-none font-medium"
                        required
                    />
                </div>

                {/* Payment Options */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <label className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                            payment === 'cash'
                                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold'
                                : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}>
                            <input type="radio" name="pay" className="hidden" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                            <span className="text-sm">💵 Cash on Delivery</span>
                        </label>

                        <label className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                            payment === 'online'
                                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold'
                                : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}>
                            <input type="radio" name="pay" className="hidden" checked={payment === 'online'} onChange={() => setPayment('online')} />
                            <span className="text-sm">💳 Online / Mobile</span>
                        </label>
                    </div>

                    {payment === 'online' && (
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="w-full glass-input rounded-2xl px-4 py-3.5 outline-none font-semibold text-white bg-[#0e1422]"
                        >
                            <option value="">Select Payment Gateway</option>
                            <option value="bKash">bKash (Instant)</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Credit/Debit Card">Credit/Debit Card (Visa/Mastercard)</option>
                        </select>
                    )}
                </div>

                <div className="flex gap-4 pt-2">
                    <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer"
                    >
                        {submitting ? "Confirming Booking..." : "Confirm Order Voucher"}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-slate-300 font-bold cursor-pointer"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default function CheckoutForm() {
    return (
        <Suspense fallback={<div className="text-center py-20 font-semibold text-slate-400">Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}