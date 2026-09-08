"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMotorcycle, FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard, FaEnvelope } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/api";

const OderCard = ({ allbike, onDeleteSuccess, onUpdateSuccess }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: allbike?.customerName || "",
    phone: allbike?.phone || "",
    address: allbike?.address || "",
    city: allbike?.city || "",
  });

  if (!allbike) return null;
  const { bikeName, price, customerName, phone, address, city, paymentMethod, status, orderDate, userEmail } = allbike;

  const handleSave = async () => {
    setSubmitting(true);
    const updated = {
      ...allbike,
      ...formData
    };

    try {
      if (allbike._id && !allbike._id.toString().startsWith("local_")) {
        const res = await fetch(`${API_BASE_URL}/oders/${allbike._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated)
        });
        if (!res.ok) throw new Error("Failed to update on backend");
      }
      
      localStorage.setItem(`booking_${allbike._id}`, JSON.stringify(updated));
      alert("Booking updated successfully!");
      setIsEditing(false);
      
      if (onUpdateSuccess) {
        onUpdateSuccess(updated);
      } else {
        router.refresh();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Error updating order: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this booking voucher?");
    if (!confirmDelete) return;

    try {
      if (allbike._id && !allbike._id.toString().startsWith("local_")) {
        const res = await fetch(`${API_BASE_URL}/oders/${allbike._id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete from backend");
      }

      localStorage.removeItem(`booking_${allbike._id}`);
      alert("Booking deleted successfully!");
      
      if (onDeleteSuccess) {
        onDeleteSuccess(allbike._id);
      } else {
        router.push("/mybooking");
        window.location.href = "/mybooking";
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting order: " + error.message);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 max-w-xl mx-auto my-6 space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>🎟️</span> Booking Voucher
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">Date: {orderDate || new Date().toLocaleDateString()}</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase rounded-full">
          {status || "Confirmed"}
        </span>
      </div>

      {/* Bike Info */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2.5 text-white font-bold text-base">
          <FaMotorcycle className="text-emerald-400 text-lg" />
          <span>{bikeName}</span>
        </div>
        <div className="text-xl font-black text-emerald-400">
          ৳ {Number(price || 0).toLocaleString()}
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-3.5 text-sm text-slate-300">
        {/* Customer Name */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
            <FaUser className="text-emerald-400" />
            <span>Customer Name:</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full glass-input rounded-xl px-3.5 py-2 outline-none"
            />
          ) : (
            <span className="text-white font-bold text-sm pl-6">{customerName}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
            <FaPhone className="text-emerald-400" />
            <span>Phone:</span>
          </div>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full glass-input rounded-xl px-3.5 py-2 outline-none"
            />
          ) : (
            <span className="text-white font-bold text-sm pl-6">{phone}</span>
          )}
        </div>

        {/* Address & City */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
            <FaMapMarkerAlt className="text-emerald-400" />
            <span>Address & City:</span>
          </div>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 outline-none"
              />
            </div>
          ) : (
            <span className="text-white font-bold text-sm pl-6">{address}, {city}</span>
          )}
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2">
          <FaCreditCard className="text-emerald-400" />
          <span className="text-slate-400 text-xs font-bold uppercase">Payment:</span>
          <span className="text-white font-bold text-xs uppercase px-2 py-0.5 rounded bg-white/10">
            {paymentMethod === "cash" ? "Cash on Delivery" : "Online Payment"}
          </span>
        </div>

        {/* User Account / Email */}
        {userEmail && (
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-emerald-400" />
            <span className="text-slate-400 text-xs font-bold uppercase">Account:</span>
            <span className="text-emerald-300 font-mono text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md truncate">
              {userEmail}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end border-t border-white/10 pt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={submitting}
              className="px-4 py-2 bg-emerald-500 text-white font-bold text-xs rounded-xl hover:bg-emerald-600 transition cursor-pointer"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  customerName,
                  phone,
                  address,
                  city
                });
              }}
              disabled={submitting}
              className="px-4 py-2 bg-white/10 text-slate-300 font-bold text-xs rounded-xl hover:bg-white/20 transition cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl hover:bg-amber-500 hover:text-white transition cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-300 font-bold text-xs rounded-xl hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OderCard;
