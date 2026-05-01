"use client";

import { useState } from "react";
import { BedDouble, CheckCircle2 } from "lucide-react";

export default function AddRoomPage() {
    const [form, setForm] = useState({
        number: "",
        type: "",
        floor: "",
        capacity: "",
        pricePerNight: "",
        description: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.number || !form.type || !form.floor || !form.pricePerNight) {
        setError("Please fill in all required fields.");
        return;
        }

        setLoading(true);
        setError("");

        const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            roomNumber: form.number,
            type: form.type,
            floor: parseInt(form.floor),
            price: parseFloat(form.pricePerNight) || 89,
            status: "Available",
        }),
        });

        if (res.ok) {
        setSuccess(true);
        setForm({
            number: "",
            type: "",
            floor: "",
            capacity: "",
            pricePerNight: "",
            description: "",
        });
        setTimeout(() => setSuccess(false), 3000);
        } else {
        const data = await res.json();
        setError(data.message || "Failed to add room.");
        }
        setLoading(false);
    };

    const field = (
        label: string,
        key: keyof typeof form,
        type: string = "text",
        placeholder: string = ""
    ) => (
        <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder || label}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
    );

    return (
        <div className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-1">
            <BedDouble className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Add Room</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6 ml-9">
            Register a new room to the hotel inventory.
        </p>

        {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
            <CheckCircle2 size={16} /> Room added successfully!
            </div>
        )}

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm">
            {error}
            </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
            {field("Room Number *", "number", "text", "e.g. 101")}
            {field("Floor *", "floor", "number", "e.g. 1")}
            {field("Capacity (guests)", "capacity", "number", "e.g. 2")}
            {field("Price Per Night (£) *", "pricePerNight", "number", "e.g. 120")}

            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Room Type *
                </label>
                <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Penthouse">Penthouse</option>
                </select>
            </div>
            </div>

            <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Description
            </label>
            <textarea
                placeholder="Optional room description..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            </div>

            <div className="flex justify-end">
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
                <CheckCircle2 size={16} />
                {loading ? "Adding Room..." : "Add Room"}
            </button>
            </div>
        </div>
        </div>
    );
    }