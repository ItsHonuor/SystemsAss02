"use client"
import React, { useState } from "react";
import Link from "next/link";

const allRooms = [
    { id: 1, name: "Standard Single", price: 89, rating: 8.4, reviews: 120, tag: "Budget Friendly", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800", desc: "Comfortable single room perfect for solo travelers" },
    { id: 2, name: "Classic Double", price: 149, rating: 9.1, reviews: 340, tag: "Member Price", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800", desc: "Spacious double room with modern amenities" },
    { id: 3, name: "Executive Suite", price: 289, rating: 9.6, reviews: 85, tag: "VIP Access", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", desc: "Luxury suite with premium furnishings and services" },
    { id: 4, name: "Deluxe King Room", price: 219, rating: 9.3, reviews: 210, tag: "Best Seller", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800", desc: "Elegant king room with stunning views and full amenities" },
    { id: 5, name: "Ocean View Suite", price: 350, rating: 9.8, reviews: 45, tag: "Premium", img: "https://images.unsplash.com/photo-1591088398332-8a77d399e843?w=800", desc: "Spectacular oceanfront suite with private balcony" },
    { id: 6, name: "Family Connecting Room", price: 199, rating: 8.9, reviews: 156, tag: "Great for Groups", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800", desc: "Perfect for families with connecting room options" },
    ];

    export default function RoomsPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans">
        
        {/* 1. COMPACT SEARCH NAV */}
        <nav className="bg-[#001D4A] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tighter mr-8">ATLANTICA</Link>
            <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 gap-4 text-slate-800 text-sm w-full md:w-auto">
                <div className="flex-1 border-r border-gray-200">Where? <span className="font-bold ml-1">Current City</span></div>
                <div className="flex-1 border-r border-gray-200">Dates <span className="font-bold ml-1">Apr 20 - Apr 24</span></div>
                <div className="flex-1">Guests <span className="font-bold ml-1">2 adults</span></div>
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </button>
            </div>
            </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
            
            {/* 2. SIDEBAR FILTERS */}
            <aside className="w-full md:w-64 space-y-8">
            <div>
                <h3 className="font-bold text-lg mb-4">Filter by</h3>
                <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 accent-blue-600" />
                    <span>Free WiFi</span>
                </label>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 accent-blue-600" />
                    <span>Breakfast included</span>
                </label>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 accent-blue-600" />
                    <span>Pool access</span>
                </label>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Your budget</h3>
                <input type="range" className="w-full accent-blue-600" min="50" max="500" />
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                <span>£50</span>
                <span>£500+</span>
                </div>
            </div>
            </aside>

            {/* 3. ROOM LISTINGS */}
            <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">{allRooms.length} properties found</h1>
                <select className="bg-transparent border-none font-bold text-sm text-blue-600 outline-none cursor-pointer">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Guest Rating</option>
                </select>
            </div>

            <div className="space-y-6">
                {allRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row border border-gray-200">
                    {/* Image Section */}
                    <div className="w-full md:w-72 h-56 md:h-auto relative">
                    <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                    {room.tag && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                        {room.tag}
                        </div>
                    )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold hover:text-blue-600 cursor-pointer transition-colors font-serif">{room.name}</h2>
                        <div className="text-right flex items-center gap-2">
                            <div className="text-xs text-gray-500">{room.reviews} reviews</div>
                            <div className="bg-[#1F5D1A] text-white px-2 py-1 rounded-lg text-sm font-bold">{room.rating}</div>
                        </div>
                        </div>
                        <p className="text-sm text-green-700 font-medium mt-1">Fully refundable</p>
                        <p className="text-xs text-gray-500 mt-4 leading-relaxed line-clamp-2">{room.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-end">
                        <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">£{Math.floor(room.price * 1.2)}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black">£{room.price}</span>
                            <span className="text-xs text-gray-500 font-medium">per night</span>
                        </div>
                        <span className="text-[10px] text-gray-400">Includes taxes & fees</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-200/50">
                        Reserve
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