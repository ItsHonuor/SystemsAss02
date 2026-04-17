"use client"
import React from "react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FBFBFD] text-[#1d1d1f] antialiased" 
             style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>
            
            {/* 1. SIGNATURE GLASS NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-6">
                <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 flex justify-between items-center shadow-lg">
                    <div className="text-xl font-black tracking-tighter uppercase text-black">
                        <Link href="/">Atlantica</Link>
                    </div>
                    
                    <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        <Link href="/rooms" className="hover:text-black transition-all">Rooms</Link>
                        <Link href="/experience" className="hover:text-black transition-all">Experience</Link>
                        <Link href="/dining" className="hover:text-black transition-all">Dining</Link>
                    </div>

                    <button className="bg-black text-white px-8 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                        Book Now
                    </button>
                </div>
            </nav>

            {/* 2. EDITORIAL HERO (Full Height) */}
            <header className="relative h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
                <img 
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1920" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                    alt="Heritage"
                />
                <div className="relative z-10 text-center">
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] mb-6 block opacity-80">Our Legacy</span>
                    <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter leading-[0.8] mb-8">The Story of <br/> Atlantica.</h1>
                    <div className="w-px h-24 bg-white/30 mx-auto mt-12 animate-bounce" />
                </div>
            </header>

            {/* 3. PHILOSOPHY SECTION (Asymmetric Layout) */}
            <section className="max-w-[1400px] mx-auto px-6 py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">Where comfort <br/> meets the soul.</h2>
                        <div className="h-1 w-20 bg-black" />
                        <p className="text-xl text-gray-500 leading-relaxed font-medium">
                            Atlantica began as a single sanctuary in London with one vision: to prove that luxury isn't about gold-leaf ceilings, but about the profound peace of a perfectly curated moment.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Every detail—from the weight of our linens to the scent of our lobbys—is designed to be a quiet background to your most important memories. Established in 2014, we continue to redefine what it means to be "at home" anywhere in the world.
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=1000" 
                                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                alt="Detail"
                            />
                        </div>
                        {/* Decorative floating badge */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 hidden md:block">
                            <p className="text-4xl font-black tracking-tighter italic">"Pure."</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Vogue Travel</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. THE STANDARDS (Bento Cards) */}
            <section className="bg-white py-40 px-6 border-y border-gray-100">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex justify-between items-end mb-24">
                        <h2 className="text-5xl font-bold tracking-tight">The Standards.</h2>
                        <p className="text-gray-400 text-lg uppercase font-bold tracking-widest">Global Protocol</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: "", title: "Zero Impact", desc: "Our carbon-neutral properties are built to breathe with the local ecosystem, not against it." },
                            { icon: "", title: "Intuitive Care", desc: "Our concierge team is trained to anticipate your needs before you've even voiced them." },
                            { icon: "", title: "The Heartbeat", desc: "We only build in the core of global capitals, putting you exactly where the world is happening." }
                        ].map((val) => (
                            <div key={val.title} className="p-12 bg-[#FBFBFD] rounded-[48px] hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100">
                                <div className="text-5xl mb-8">{val.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">{val.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION (Minimal) */}
            <section className="py-40 text-center max-w-4xl mx-auto px-6">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 block">Experience the legacy</span>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16">Your room is waiting.</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/rooms" className="bg-black text-white px-16 py-6 rounded-[30px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                        Book Your Stay
                    </Link>
                    <Link href="/contact" className="border border-gray-200 text-black px-16 py-6 rounded-[30px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                        Inquire
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#f5f5f7] py-24 border-t border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-2xl font-black tracking-tighter uppercase">Atlantica</div>
                </div>
            </footer>
        </div>
    );
}