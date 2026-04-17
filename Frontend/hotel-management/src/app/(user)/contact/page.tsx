"use client"
import React from "react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
        
        {/* 1. MINIMAL NAV */}
        <nav className="bg-white border-b border-gray-100 py-6 px-10 flex justify-between items-center sticky top-0 z-50">
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase text-[#001D4A]">Atlantica</Link>
            <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/rooms" className="hover:text-blue-600 transition">Rooms</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
            </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* 2. LEFT SIDE: INFO & VIBE */}
            <div>
                <h1 className="text-5xl font-serif text-[#001D4A] mb-6">Get in touch</h1>
                <p className="text-gray-500 text-lg mb-12 max-w-md">
                Whether you're looking to book a suite or have a question about our amenities, 
                our concierge team is ready to assist you.
                </p>

                <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="bg-[#FAF7F0] p-3 rounded-xl text-2xl">📍</div>
                    <div>
                    <h3 className="font-bold text-slate-900">Our Location</h3>
                    <p className="text-gray-500 text-sm">123 Luxury Way, Kensington<br />London, W8 5NP</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-[#FAF7F0] p-3 rounded-xl text-2xl">📞</div>
                    <div>
                    <h3 className="font-bold text-slate-900">Reservations</h3>
                    <p className="text-gray-500 text-sm">+44 (0) 20 7123 4567</p>
                    <p className="text-gray-500 text-sm">reservations@atlantica.com</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-[#FAF7F0] p-3 rounded-xl text-2xl">💬</div>
                    <div>
                    <h3 className="font-bold text-slate-900">Live Concierge</h3>
                    <p className="text-gray-500 text-sm">Available 24/7 for our guests.</p>
                    </div>
                </div>
                </div>

                {/* Decorative Map Placeholder */}
                <div className="mt-12 rounded-3xl overflow-hidden grayscale opacity-80 hover:grayscale-0 transition-all duration-700 h-48 w-full bg-gray-200">
                    <img 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" 
                        className="w-full h-full object-cover" 
                        alt="Map Location" 
                    />
                </div>
            </div>

            {/* 3. RIGHT SIDE: PREMIUM FORM */}
            <div className="bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-8 md:p-12">
                <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="jane@example.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Subject</label>
                    <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none transition appearance-none">
                    <option>Booking Inquiry</option>
                    <option>Event Planning</option>
                    <option>Feedback</option>
                    <option>Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Message</label>
                    <textarea rows={4} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="How can we help you?"></textarea>
                </div>

                <button className="w-full bg-[#001D4A] text-white py-4 rounded-xl font-bold shadow-xl hover:bg-blue-900 transition-all transform hover:-translate-y-1">
                    Send Message
                </button>
                </form>
            </div>

            </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-20 py-10 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">© 2026 Atlantica Luxury Group</p>
        </footer>
        </div>
    );
    }