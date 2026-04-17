"use client"
import React from "react";
import Link from "next/link";

const rooms = [
    { 
        id: 1, 
        name: "Single Room", 
        price: 89, 
        rating: 8.4, 
        desc: "Cosy and efficient. Perfect for solo travellers.", 
        img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800" 
    },
    { 
        id: 2, 
        name: "Double Room", 
        price: 149, 
        rating: 9.1, 
        desc: "Spacious comfort for couples or business guests.", 
        img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" 
    },
    { 
        id: 3, 
        name: "Executive Suite", 
        price: 289, 
        rating: 9.6, 
        desc: "Premium space with a dedicated living area.", 
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" 
    },
    { 
        id: 4, 
        name: "Deluxe King", 
        price: 219, 
        rating: 9.3, 
        desc: "Our signature room with luxury finishes throughout.", 
        img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800" 
    },
    ];

    export default function HomePage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
        
        {/* 1. NAVIGATION */}
        <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 text-white">
            <div className="text-2xl font-bold tracking-tighter uppercase">Atlantica</div>
            <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/rooms/" className="hover:text-blue-200 transition">Rooms</Link>
            <Link href="/about/" className="hover:text-blue-200 transition">About</Link>
            <Link href="/contact/" className="hover:text-blue-200 transition">Contact</Link>
            </div>
        {/* LINKED LOGIN BUTTON */}
        <Link href="/login">
            <button className="border border-white/50 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-black transition">
                Staff Login
            </button>
        </Link>
        </nav>

        {/* 2. HERO SECTION */}
        <header className="relative h-[75vh] flex items-center justify-center text-center">
            <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Luxury Resort"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="relative z-10 w-full max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 drop-shadow-md">
                Your next stay starts here
            </h1>
            
            {/* PREMIUM SEARCH BAR */}
            <div className="bg-white rounded-2xl md:rounded-full p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto">
                <div className="flex-1 w-full px-6 py-2 text-left border-r border-gray-100">
                <label className="block text-[10px] uppercase font-black text-gray-400">Where to?</label>
                <input type="text" placeholder="Search destinations" className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-300" />
                </div>
                <div className="flex-1 w-full px-6 py-2 text-left border-r border-gray-100">
                <label className="block text-[10px] uppercase font-black text-gray-400">Dates</label>
                <button className="text-gray-400 text-sm">Select dates</button>
                </div>
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl md:rounded-full font-bold transition-all shadow-lg">
                Search
                </button>
            </div>
            </div>
        </header>

        {/* 3. REWARDS BANNER */}
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="bg-[#FAF7F0] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            <div className="flex-1 order-2 md:order-1">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">New</span>
                <h2 className="text-4xl md:text-5xl font-serif mt-6 text-[#001D4A] leading-tight">Learn About Us</h2>
                <p className="text-gray-600 my-8 text-lg">We create more than just places to stay.</p>
                <button className="bg-[#001D4A] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                How it works
                </button>
            </div>
            <div className="flex-1 order-1 md:order-2 w-full">
                <img 
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-3xl shadow-2xl w-full h-[350px] object-cover" 
                alt="Poolside relaxation" 
                />
            </div>
            </div>
        </section>

        {/* 4. FEATURED ROOMS */}
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-4xl font-serif text-slate-900 leading-none">Featured Stays</h2>
                <p className="text-gray-400 mt-3 font-medium">Handpicked luxury for your comfort.</p>
            </div>
            <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-800 transition">
                View all accommodation
            </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.map((room) => (
                <div key={room.id} className="group cursor-pointer">
                <div className="relative h-72 overflow-hidden rounded-3xl mb-5 shadow-sm">
                    <img 
                    src={room.img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={room.name} 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg font-bold text-xs shadow-sm">
                    ★ {room.rating}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{room.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-1 mb-4">{room.desc}</p>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col leading-none">
                    <span className="text-2xl font-black text-blue-600">£{room.price}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">avg per night</span>
                    </div>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-colors">
                    Reserve
                    </button>
                </div>
                </div>
            ))}
            </div>
        </section>

        </div>
    );
    }