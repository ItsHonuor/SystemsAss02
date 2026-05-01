"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ReviewPage() {
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden text-[#1d1d1f]">
        <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1920"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Restaurant review"
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
                    Website Feedback
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Leave a Review
                    </h1>
                    <p className="text-gray-600">
                    Tell us how easy the website was to use and share any extra feedback.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    />

                    <select
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10"
                    >
                    <option value="">Rate ease of use out of 10</option>
                    {[1,2,3,4,5,6,7,8,9,10].map((score) => (
                        <option key={score} value={score}>
                        {score} / 10
                        </option>
                    ))}
                    </select>

                    <textarea
                    required
                    placeholder="Write your feedback here..."
                    className="w-full bg-white/80 px-6 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black/10 min-h-36"
                    />

                    <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
                    >
                    Submit Review
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
                    Your review has been submitted.
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