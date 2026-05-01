"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden text-[#1d1d1f]">
        
        {/* BACKGROUND IMAGE */}
        <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
            className="absolute inset-0 w-full h-full object-cover -z-10"
            alt="Private Dining"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] -z-10" />

        {/* CONTENT */}
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
                    Private Dining Enquiry
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Request a Quote
                    </h1>
                    <p className="text-gray-600">
                    Enter your details and preferred event time. Our concierge team will review your request.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        required
                        type="text"
                        placeholder="Full Name"
                        className="bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />
                    <input
                        required
                        type="email"
                        placeholder="Email Address"
                        className="bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />
                    </div>

                    <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input
                        required
                        type="date"
                        className="bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />

                    <select
                        required
                        name="eventTime"
                        className="bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    >
                        <option value="">Select time</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                    </select>

                    <select
                        required
                        className="bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    >
                        <option value="">Duration</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                        <option>3 hours</option>
                        <option>4+ hours</option>
                    </select>
                    </div>

                    <textarea
                    placeholder="Additional details, guest numbers, dietary requirements..."
                    className="w-full bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10 min-h-32"
                    />

                    <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
                    >
                    Submit Request
                    </button>
                </form>
                </>
            ) : (
                <div className="text-center py-16">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">
                    ✓
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                    Thank you
                </h1>

                <p className="text-gray-600 text-lg mb-10">
                    Your request has been received. We will respond within 24 hours.
                </p>

                <Link href="/">
                    <button className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                    Back to Home
                    </button>
                </Link>
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }