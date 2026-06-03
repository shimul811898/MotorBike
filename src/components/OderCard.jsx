"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMotorcycle, FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

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
  const { bikeName, price, customerName, phone, address, city, paymentMethod, status, orderDate } = allbike;

  const handleSave = async () => {
    setSubmitting(true);
    const updated = {
      ...allbike,
      ...formData
    };

    try {
      if (allbike._id && !allbike._id.toString().startsWith("local_")) {
        const res = await fetch(`http://localhost:5000/oders/${allbike._id}`, {
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
        // Force refresh state by reloading page if not in dashboard list
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
        const res = await fetch(`http://localhost:5000/oders/${allbike._id}`, {
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
        // Force page reload/redirect
        window.location.href = "/mybooking";
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting order: " + error.message);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden p-6 max-w-xl mx-auto my-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Booking Voucher</h2>
          <p className="text-xs text-slate-400 mt-1">Date: {orderDate || new Date().toLocaleDateString()}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">
          {status || "Pending"}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <FaMotorcycle className="text-green-600 animate-pulse" />
          <span>{bikeName}</span>
        </div>
        <div className="text-lg font-black text-green-600">
          ৳ {Number(price || 0).toLocaleString()}
        </div>
      </div>

      <div className="border-t pt-4 space-y-3.5 text-sm text-slate-600">
        {/* Customer Name */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <FaUser className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-500">Name:</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-600 text-slate-700 bg-white"
            />
          ) : (
            <strong className="text-slate-850 pl-6">{customerName}</strong>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <FaPhone className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-500">Phone:</span>
          </div>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-600 text-slate-700 bg-white"
            />
          ) : (
            <strong className="text-slate-850 pl-6">{phone}</strong>
          )}
        </div>

        {/* Address & City */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-500">Address & City:</span>
          </div>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2 pl-0">
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-600 text-slate-700 bg-white"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-600 text-slate-700 bg-white"
              />
            </div>
          ) : (
            <strong className="text-slate-850 pl-6">{address}, {city}</strong>
          )}
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2">
          <FaCreditCard className="text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-500 uppercase">Payment:</span>
          <strong className="text-slate-800 uppercase">{paymentMethod === "cash" ? "Cash on Delivery" : "Online Payment"}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end border-t pt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-700 transition"
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
              className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl hover:bg-amber-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition"
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
