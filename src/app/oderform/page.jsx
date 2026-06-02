"use client";
import {
    Button,
} from "@heroui/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const bikeName = searchParams.get("bikename") || searchParams.get("bikeName") || searchParams.get("name") || "";
    const price = searchParams.get("price") || "";

    const [payment, setPayment] = useState("cash");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order Confirmed Successfully!");
    };
    const handleCancel = () => {
        const confirmCancel = confirm("Are you sure you want to cancel?");
        if (confirmCancel) {
            document.querySelector("form").reset();
        }
    };

    return (
        <div className="p-10 space-y-8 max-w-4xl mx-auto shadow my-10 rounded-2xl bg-white border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Checkout details</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-slate-700">Full Name</label>
                        <input type="text" placeholder="Full Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none" required />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-slate-700">Phone Number</label>
                        <input type="tel" placeholder="Phone Number" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none" required />
                    </div>
                </div>

                {/* Bike Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Bike Name</label>
                        <input type="text" value={bikeName || ""} readOnly className="w-full rounded-2xl bg-slate-100 p-3 border border-slate-200 cursor-not-allowed outline-none font-semibold text-slate-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Bike Price</label>
                        <input type="text" value={price ? (isNaN(Number(price)) ? price : `৳ ${Number(price).toLocaleString()}`) : ""} readOnly className="w-full rounded-2xl bg-slate-100 p-3 border border-slate-200 cursor-not-allowed outline-none font-bold text-green-600" />
                    </div>
                </div>


                <div className="space-y-1">
                    <label className="block text-sm font-bold text-slate-700">Shipping Address</label>
                    <textarea placeholder="Shipping Address" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 resize-none" rows="3" required />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-bold text-slate-700">City</label>
                    <input type="text" placeholder="City" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" required />
                </div>

                {/* Payment */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <label className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all flex items-center justify-center gap-2 ${payment === 'cash' ? 'border-green-600 bg-green-50 text-green-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            <input type="radio" name="pay" className="hidden" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                            <span className="font-bold text-sm">💵 Cash on Delivery</span>
                        </label>
                        <label className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all flex items-center justify-center gap-2 ${payment === 'online' ? 'border-green-600 bg-green-50 text-green-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            <input type="radio" name="pay" className="hidden" checked={payment === 'online'} onChange={() => setPayment('online')} />
                            <span className="font-bold text-sm">💳 Online / Mobile</span>
                        </label>
                    </div>

                    {payment === 'online' && (
                        <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 bg-white font-semibold text-slate-700">
                            <option value="">Choose an option</option>
                            <option value="bkash">bKash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-green-600 text-white font-bold text-lg">Confirm Order</Button>
                    <Button type="button" color="danger" variant="flat" onClick={handleCancel} className="w-full">Cancel</Button>
                </div>

            </form>
        </div>
    );
}

// মূল এক্সপোর্ট
export default function CheckoutForm() {
    return (
        <Suspense fallback={<div className="text-center py-10 font-semibold text-slate-500">Loading form...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}