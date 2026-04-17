"use client"
import React from "react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
        
        {/* 1. SIMPLE NAV (Dark themed for contrast) */}
        <nav className="bg-[#001D4A] text-white py-6 px-10 flex justify-between items-center sticky top-0 z-50">
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">Atlantica</Link>
            <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link>
            <Link href="/rooms" className="hover:text-blue-300 transition">Rooms</Link>
            <Link href="#" className="text-blue-300">Our Story</Link>
            </div>
        </nav>

        {/* 2. EDITORIAL HERO */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover brightness-75"
            alt="Our Heritage"
            />
            <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Our Heritage</h1>
            <p className="text-lg md:text-xl font-light tracking-widest uppercase">Redefining Luxury Since 2014</p>
            </div>
        </section>

        {/* 3. THE STORY SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-serif mb-6 leading-tight text-[#001D4A]">Where comfort meets elegance.</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                Atlantica started with a single vision: to create a sanctuary for the modern traveler. 
                We believe that a hotel is more than just a place to sleep—it’s a collection of 
                moments, smells, and experiences that stay with you long after you check out.
                </p>
                <p className="text-gray-600 leading-relaxed">
                From our hand-picked linens to our locally-sourced dining, every detail of the 
                Atlantica experience is designed to make you feel at home, while reminding you 
                that you’re somewhere extraordinary.
                </p>
            </div>
            <div className="relative">
                <img 
                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800" 
                className="rounded-2xl shadow-2xl relative z-10"
                alt="Interior Detail"
                />
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#FAF7F0] rounded-2xl z-0"></div>
            </div>
            </div>
        </section>

        {/* 4. VALUES GRID */}
        <section className="bg-[#FAF7F0] py-24 px-6">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif text-[#001D4A]">The Atlantica Standard</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="font-bold text-xl mb-2">Sustainability</h3>
                <p className="text-gray-500 text-sm">We are committed to a zero-plastic initiative and locally-sourced materials.</p>
                </div>
                <div className="text-center">
                <div className="text-4xl mb-4">🛎️</div>
                <h3 className="font-bold text-xl mb-2">24/7 Concierge</h3>
                <p className="text-gray-500 text-sm">Our world-class staff is dedicated to fulfilling your every request, any time.</p>
                </div>
                <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-bold text-xl mb-2">Prime Locations</h3>
                <p className="text-gray-500 text-sm">Every Atlantica property is situated in the heartbeat of the world's greatest cities.</p>
                </div>
            </div>
            </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section className="py-24 text-center max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-serif mb-8 text-[#001D4A]">Ready to experience it?</h2>
            <p className="text-gray-600 mb-10">Join thousands of travelers who choose Atlantica for their most important journeys.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms" className="bg-[#001D4A] text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition shadow-blue-900/20">
                Book Your Stay
            </Link>
            <Link href="/contact" className="border-2 border-[#001D4A] text-[#001D4A] px-10 py-4 rounded-full font-bold hover:bg-[#001D4A] hover:text-white transition">
                Contact Us
            </Link>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-gray-400 py-12 px-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white font-bold text-xl uppercase tracking-tighter">Atlantica</div>
            <p className="text-sm">© 2026 Atlantica Hotel Group. All rights reserved.</p>
            <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
                <Link href="#" className="hover:text-white transition">Privacy</Link>
                <Link href="#" className="hover:text-white transition">Terms</Link>
                <Link href="#" className="hover:text-white transition">Careers</Link>
            </div>
            </div>
        </footer>
        </div>
    );
    }