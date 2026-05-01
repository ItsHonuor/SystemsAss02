"use client";

import React, { useState } from "react";
import Link from "next/link";

const timeSlots = {
    breakfast: ["07:00", "08:00", "09:00", "10:00", "11:00"],
    lunch: ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
    dinner: ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
    };

    export default function ReserveTablePage() {
    const [meal, setMeal] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const availableTimes = meal ? timeSlots[meal as keyof typeof timeSlots] : [];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden text-[#1d1d1f]">
        <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Restaurant"
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full max-w-2xl">
            <div className="bg-white/85 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/30">
            {!submitted ? (
                <>
                <Link
                    href="/dining"
                    className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black"
                >
                    ← Back to Dining
                </Link>

                <div className="mt-10 mb-10">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                    Atlantica Dining
                    </p>
                    <h1 className="text-5xl font-black tracking-tight mb-4">
                    Reserve a Table
                    </h1>
                    <p className="text-gray-600">
                    Choose a meal, time slot, party size and add any allergy notes.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        required
                        type="text"
                        placeholder="Full Name"
                        className="bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />

                    <input
                        required
                        type="email"
                        placeholder="Email Address"
                        className="bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />
                    </div>

                    <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        required
                        type="date"
                        className="bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />

                    <select
                        required
                        value={meal}
                        onChange={(e) => setMeal(e.target.value)}
                        className="bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    >
                        <option value="">Choose meal</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                        required
                        disabled={!meal}
                        className="bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50"
                    >
                        <option value="">
                        {meal ? "Select time" : "Choose meal first"}
                        </option>

                        {availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                        ))}
                    </select>

                    <select
                        required
                        className="bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    >
                        <option value="">Number of people</option>
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5 people</option>
                        <option value="6">6 people</option>
                    </select>
                    </div>

                    <textarea
                    placeholder="Allergies, dietary requirements or notes..."
                    className="w-full bg-white/80 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-black/10 min-h-36"
                    />

                    <button
                    type="submit"
                    className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
                    >
                    Confirm Reservation
                    </button>
                </form>
                </>
            ) : (
                <div className="text-center py-16">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">
                    ✓
                </div>

                <h1 className="text-5xl font-black tracking-tight mb-6">
                    Reservation Request Sent
                </h1>

                <p className="text-gray-600 text-lg mb-10">
                    Thank you. We will respond within 24 hours to confirm your table.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                    <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                        Back to Home
                    </button>
                    </Link>

                    <Link href="/dining/review">
                    <button className="bg-white text-black border border-gray-300 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                        Leave a Review
                    </button>
                    </Link>
                </div>

                </div>
            )}
            </div>
        </div>
        </div>
    );
    }