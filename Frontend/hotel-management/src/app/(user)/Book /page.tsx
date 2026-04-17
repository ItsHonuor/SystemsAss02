"use client"
import React, { useState } from "react";
import Link from "next/link";

export default function BookNowPage() {
    return (
        <div className="min-h-screen bg-[#FBFBFD] text-[#1d1d1f] antialiased" 
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>
            
            {/* 1. MINIMAL NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-6">
                <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 flex justify-between items-center shadow-lg">
                    <div className="text-xl font-black tracking-tighter uppercase text-black">
                        <Link href="/">Atlantica</Link>
                    </div>
                    <Link href="/rooms" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-all">
                        ← Back to Rooms
                    </Link>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* 2. RESERVATION FORM (Left) */}
                    <div className="flex-[1.5] space-y-12">
                        <header>
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">Reservation</span>
                            <h1 className="text-5xl font-bold tracking-tighter">Secure your stay.</h1>
                        </header>

                        <section className="space-y-8">
                            {/* Step 1: Dates & Guests */}
                            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">1</span>
                                    Check-in Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date Range</label>
                                        <div className="w-full bg-[#F5F5F7] px-6 py-4 rounded-2xl font-medium">Apr 24 — Apr 28, 2026</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Guests</label>
                                        <select className="w-full bg-[#F5F5F7] px-6 py-4 rounded-2xl font-medium outline-none appearance-none">
                                            <option>2 Adults, 0 Children</option>
                                            <option>1 Adult</option>
                                            <option>2 Adults, 1 Child</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Personal Info */}
                            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">2</span>
                                    Guest Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" placeholder="First Name" className="bg-[#F5F5F7] px-6 py-4 rounded-2xl outline-none focus:ring-2 ring-black/5 transition-all" />
                                    <input type="text" placeholder="Last Name" className="bg-[#F5F5F7] px-6 py-4 rounded-2xl outline-none focus:ring-2 ring-black/5 transition-all" />
                                    <input type="email" placeholder="Email Address" className="bg-[#F5F5F7] px-6 py-4 rounded-2xl outline-none md:col-span-2 focus:ring-2 ring-black/5 transition-all" />
                                </div>
                            </div>

                            {/* Step 3: Payment */}
                            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">3</span>
                                    Payment Method
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-6 border-2 border-black rounded-2xl bg-black/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-8 bg-black rounded-md flex items-center justify-center text-[10px] text-white font-bold tracking-tighter">VISA</div>
                                            <span className="font-bold">•••• 4242</span>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Apple Pay Active</span>
                                    </div>
                                    <button className="w-full py-4 border border-dashed border-gray-300 rounded-2xl text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all">
                                        + Add New Card
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* 3. SUMMARY SIDEBAR (Right) */}
                    <div className="flex-1 lg:sticky lg:top-32 h-fit">
                        <div className="bg-[#1d1d1f] rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
                            {/* Decorative gradient blur */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-30" />
                            
                            <h2 className="text-2xl font-bold tracking-tight mb-8">Stay Summary</h2>
                            
                            <div className="flex gap-4 mb-8">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" className="w-full h-full object-cover" alt="Suite" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Selection</p>
                                    <p className="font-bold text-lg leading-tight">Executive Suite</p>
                                    <p className="text-sm text-gray-400">4 Nights • 2 Guests</p>
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-8 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">£289.00 x 4 nights</span>
                                    <span className="font-bold">£1,156.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Luxury Tax (12%)</span>
                                    <span className="font-bold">£138.72</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Spa Access</span>
                                    <span className="text-green-400 font-bold">Complimentary</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-10">
                                <span className="text-gray-400 font-medium">Total Price</span>
                                <span className="text-4xl font-black tracking-tighter">£1,294.72</span>
                            </div>

                            <button className="w-full bg-white text-black py-6 rounded-[24px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                                Confirm Booking
                            </button>
                            
                            <p className="text-[10px] text-center text-gray-500 mt-6 font-bold uppercase tracking-widest">
                                Secure Encrypted Transaction
                            </p>
                        </div>

                        {/* Secondary Help Card */}
                        <div className="mt-8 p-8 border border-gray-200 rounded-[32px] flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">🛎️</div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Need help?</p>
                                <p className="font-bold">Contact Concierge</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* MINIMAL FOOTER */}
            <footer className="py-12 border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                    Atlantica Luxury Group • London • 2026
                </div>
            </footer>
        </div>
    );
}