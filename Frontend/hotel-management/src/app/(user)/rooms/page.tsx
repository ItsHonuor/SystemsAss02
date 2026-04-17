"use client"
import React, { useState } from "react";
import Link from "next/link";

const allRooms = [
    { id: 1, name: "Standard Single", price: 89, rating: 8.4, reviews: 120, tag: "Solo Retreat", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800", desc: "A sanctuary of focused calm. Perfect for the modern solo traveler seeking efficiency without sacrificing luxury." },
    { id: 2, name: "Classic Double", price: 149, rating: 9.1, reviews: 340, tag: "Classic Comfort", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800", desc: "Spacious quarters featuring signature Atlantica bedding and curated local art." },
    { id: 3, name: "Executive Suite", price: 289, rating: 9.6, reviews: 85, tag: "VIP Access", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", desc: "Our highest standard. Includes a private lounge, panoramic views, and 24/7 concierge service." },
    { id: 4, name: "Deluxe King Room", price: 219, rating: 9.3, reviews: 210, tag: "Best Seller", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800", desc: "The perfect balance of space and intimacy. Features a king-size bed and a walk-in rainforest shower." },
    { id: 5, name: "Ocean View Suite", price: 350, rating: 9.8, reviews: 45, tag: "Premium", img: "https://images.unsplash.com/photo-1591088398332-8a77d399e843?w=800", desc: "Wake up to the horizon. Full-length glass walls ensure the ocean is your constant companion." },
    { id: 6, name: "Family Connecting", price: 199, rating: 8.9, reviews: 156, tag: "Group Stay", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800", desc: "Dual interconnected rooms designed for families who value both togetherness and privacy." },
];

export default function RoomsPage() {
    return (
        <div className="min-h-screen bg-[#FBFBFD] text-[#1d1d1f] antialiased" 
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>
            
            {/* 1. THE SIGNATURE ATLANTICA NAV (Glass Capsule) */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-6">
                <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 grid grid-cols-3 items-center shadow-lg">
                    <div className="text-xl font-black tracking-tighter uppercase text-black justify-self-start">
                        <Link href="/">Atlantica</Link>
                    </div>
                    
                    <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 justify-self-center">
                        <Link href="/rooms" className="text-black">Rooms</Link>
                        <Link href="/about" className="hover:text-black transition-all">Experience</Link>
                        <Link href="/dining" className="hover:text-black transition-all">Dining</Link>
                    </div>

            <Link href="/book">
                    <div className="justify-self-end">
                        <button className="bg-black text-white px-6 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md">
                            Book Now
                        </button>
                    </div>
                    </Link>
                </div>
            </nav>

            {/* SPACER FOR FIXED NAV */}
            <div className="h-32" />

            <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
                
                {/* 2. MINIMALIST SIDEBAR */}
                <aside className="w-full lg:w-72 space-y-12">
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Refine Stay</h3>
                        <div className="space-y-4">
                            {["Free WiFi", "Breakfast included", "Pool access", "Spa access"].map((filter) => (
                                <label key={filter} className="flex items-center gap-4 text-[14px] font-medium group cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-300 accent-black transition-all" />
                                    <span className="group-hover:text-black text-gray-500">{filter}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-200">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Nightly Budget</h3>
                        <input type="range" className="w-full accent-black mb-4" min="50" max="500" />
                        <div className="flex justify-between text-[12px] font-bold text-gray-400">
                            <span>£50</span>
                            <span className="text-black">£500+</span>
                        </div>
                    </div>
                </aside>

                {/* 3. LUXURY ROOM LISTINGS */}
                <main className="flex-1">
                    <div className="flex justify-between items-baseline mb-12">
                        <h1 className="text-4xl font-bold tracking-tight">{allRooms.length} properties</h1>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            Sort by
                            <select className="bg-transparent border-none text-black outline-none cursor-pointer">
                                <option>Recommended</option>
                                <option>Lowest Price</option>
                                <option>Top Rated</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {allRooms.map((room) => (
                            <div key={room.id} className="group bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-700">
                                
                                {/* Image Section */}
                                <div className="w-full md:w-[400px] h-72 md:h-auto overflow-hidden relative">
                                    <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {room.tag}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="flex-1 p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-3xl font-bold tracking-tight leading-none">{room.name}</h2>
                                            <div className="flex items-center gap-3">
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-right">
                                                    {room.reviews} <br/> Verified Reviews
                                                </div>
                                                <div className="bg-[#1d1d1f] text-white w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black italic shadow-lg">
                                                    {room.rating}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-md line-clamp-3 mb-4">
                                            {room.desc}
                                        </p>
                                        <div className="flex gap-4">
                                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Free Cancellation</span>
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Breakfast Incl.</span>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
                                        <div className="flex flex-col leading-none">
                                            <span className="text-[10px] text-gray-400 line-through mb-1 font-bold tracking-widest uppercase">£{Math.floor(room.price * 1.2)}</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black tracking-tighter">£{room.price}</span>
                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Per Night</span>
                                            </div>
                                        </div>
                                        <button className="bg-[#1d1d1f] text-white px-10 py-4 rounded-[20px] font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95">
                                            Reserve Suite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}