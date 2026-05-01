"use client"
import React from "react";
import Link from "next/link";

const menus = [
    { title: "Breakfast", slug: "breakfast", hours: "07:00 — 11:00", highlight: "Truffle Eggs Benedict", img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800" },
    { title: "Lunch", slug: "lunch", hours: "12:30 — 15:30", highlight: "Seared Bluefin Tuna", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" },
    { title: "Dinner", slug: "dinner", hours: "18:30 — 22:30", highlight: "Wagyu A5 Filet", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" },
];

export default function DiningPage() {
    return (
        <div className="min-h-screen bg-[#FBFBFD] text-[#1d1d1f] antialiased" 
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>
            
            {/* 1. THE SIGNATURE GLASS NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-6">
                <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 grid grid-cols-3 items-center shadow-lg">
                    <div className="text-xl font-black tracking-tighter uppercase text-black justify-self-start">
                        <Link href="/">Atlantica</Link>
                    </div>
                    
                    <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 justify-self-center">
                        <Link href="/rooms" className="hover:text-black transition-all">Rooms</Link>
                        <Link href="/about" className="hover:text-black transition-all">Experience</Link>
                        <Link href="/dining" className="text-black">Dining</Link>
                    </div>

                    <div className="justify-self-end">
                        <Link href="/dining/reserve">
                            <button className="bg-black text-white px-8 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                                Reserve a Table
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* 2. CULINARY HERO SECTION */}
            <header className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1920" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Chef's Table"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-4">
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] mb-4 block">Michelin Star Excellence</span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">The Gastronomy</h1>
                </div>
            </header>

            {/* 3. DINING BENTO BOXES */}
            <section className="max-w-[1400px] mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-5xl font-bold tracking-tight mb-6">A taste for every hour.</h2>
                        <p className="text-gray-500 text-lg italic leading-relaxed">"From the ocean to the table, we celebrate the purity of seasonal ingredients handled with absolute precision."</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">🍷</div>
                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">🥂</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {menus.map((item) => (
                        <div key={item.title} className="group relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-[40px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-700">
                            <div className="h-64 overflow-hidden">
                                <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                            </div>
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.hours}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-8">Chef's Signature: <span className="text-black font-bold">{item.highlight}</span></p>
                                <Link href={`/dining/${item.slug}`}>
                                <div className="w-full py-4 text-center rounded-2xl border border-gray-100 font-bold text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer">
                                    View Menu
                                </div>
                            </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. PRIVATE DINING / CONTACT SECTION */}
            <section className="max-w-[1400px] mx-auto px-6 pb-32">
                <div className="bg-[#1d1d1f] rounded-[48px] p-12 md:p-24 text-white flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
                    <div className="relative z-10 flex-1 space-y-8">
                        <span className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em]">Exclusive Events</span>
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Private Dining <br/> & Galas</h2>
                        <p className="text-gray-400 text-lg max-w-md">Our cellar and private terrace are available for intimate gatherings or corporate banquets for up to 50 guests.</p>
                        <div className="flex flex-wrap gap-6 pt-4">
                        <Link href="/dining/quote">
                            <button className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
                                Request Quote
                            </button>
                        </Link>

                        <Link href="/dining/review">
                            <button className="border border-white/20 px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                Leave a Review
                            </button>
                        </Link>
                        </div>
                    </div>
                    <div className="relative z-10 flex-1 grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-64 w-full object-cover shadow-2xl" alt="Wine" />
                        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-64 w-full object-cover shadow-2xl mt-12" alt="Room" />
                    </div>
                </div>
            </section>
        </div>
    );
}