"use client"
import React from "react";
import Link from "next/link";

const rooms = [
    { id: 1, name: "Single Room", price: 89, rating: 8.4, type: "Solo Retreat", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Double Room", price: 149, rating: 9.1, type: "Classic Comfort", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Executive Suite", price: 289, rating: 9.6, type: "Modern Luxury", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Deluxe King", price: 219, rating: 9.3, type: "Signature Stay", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800" },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-[#1d1d1f] antialiased" 
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>
            
            {/* 1. THE BIG CENTERED CAPSULE NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-8">
                <div className="max-w-[1400px] mx-auto bg-white/20 backdrop-blur-2xl border border-white/30 rounded-[32px] px-10 py-5 grid grid-cols-3 items-center shadow-2xl">
                    
                    {/* LEFT: Brand Identity */}
                    <div className="text-2xl font-black tracking-tighter uppercase text-white drop-shadow-sm justify-self-start">
                        Atlantica
                    </div>
                    
                    {/* CENTER: Centered Links */}
                    <div className="flex gap-12 text-[12px] font-bold uppercase tracking-[0.2em] text-white/90 justify-self-center">
                        <Link href="/rooms" className="hover:text-white transition-all">Rooms</Link>
                        <Link href="/about" className="hover:text-white transition-all">Experience</Link>
                        <Link href="/dining" className="hover:text-white transition-all">Dining</Link>
                    </div>

                    {/* RIGHT: Action Side */}
                    <div className="justify-self-end">
                        <Link href="/auth/login">
                            <button className="bg-white text-black px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 shadow-xl">
                                Staff Login
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* 2. THE HERO SECTION (Original Image) */}
            <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
                    className="absolute inset-0 w-full h-full object-cover scale-105" 
                    alt="Luxury Resort"
                />
                <div className="absolute inset-0 bg-black/20" />
                
                <div className="relative z-10 text-center px-4 max-w-6xl">
                    <h1 className="text-7xl md:text-[110px] font-bold text-white tracking-tighter leading-[0.9] mb-12 drop-shadow-2xl">
                        Your next stay <br /> starts here
                    </h1>
                    
                    {/* PREMIUM SEARCH BAR */}
                    <div className="bg-white/95 backdrop-blur-md rounded-[40px] p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4 w-full max-w-5xl mx-auto border border-white/50 text-left">
                        <div className="flex-[1.5] w-full px-10 py-4 md:border-r border-gray-100">
                            <label className="block text-[11px] uppercase font-black text-gray-400 tracking-widest mb-2">Where to?</label>
                            <input type="text" placeholder="Search destinations" className="w-full bg-transparent outline-none text-xl text-black font-medium" />
                        </div>
                        <div className="flex-1 w-full px-10 py-4">
                            <label className="block text-[11px] uppercase font-black text-gray-400 tracking-widest mb-2">Schedule</label>
                            <button className="text-xl text-black font-medium text-left w-full">Select dates</button>
                        </div>
                        <button className="w-full md:w-auto bg-black text-white px-16 py-6 rounded-[30px] font-black uppercase tracking-widest transition-all hover:scale-[1.02]">
                            Search
                        </button>
                    </div>
                </div>
            </header>

            {/* 3. BENTO GRID (The "Full" Look) */}
            <section className="max-w-[1400px] mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Large Feature Card */}
                    <div className="md:col-span-2 relative bg-[#f5f5f7] rounded-[48px] p-16 overflow-hidden min-h-[500px] flex flex-col justify-between group">
                        <div className="z-10">
                            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">About Us</span>
                            <h2 className="text-5xl font-bold mt-6 tracking-tight text-[#1d1d1f]">We create<br/>places to stay.</h2>
                            <p className="text-gray-500 mt-6 text-xl max-w-xs italic">"A new standard for luxury."</p>
                        </div>
                        <button className="z-10 bg-black text-white px-10 py-4 rounded-full self-start font-bold text-sm hover:bg-zinc-800 transition-all">
                            Our Philosophy
                        </button>
                        <img 
                            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000" 
                            className="absolute right-0 top-0 w-1/2 h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                            alt="Pool" 
                        />
                    </div>

                    {/* Dark Callout */}
                    <div className="bg-[#1d1d1f] rounded-[48px] p-12 text-white flex flex-col justify-between items-center text-center">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold italic">Michelin</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-widest">Five Star Dining</p>
                        </div>
                        <p className="text-gray-400 leading-relaxed">Experience a culinary journey led by world-renowned chefs in our signature dining halls.</p>
                        <div className="w-12 h-px bg-white/20" />
                    </div>

                    {/* Stats/Rewards Card */}
                    <div className="bg-blue-600 rounded-[48px] p-12 text-white flex flex-col justify-center">
                        <h4 className="text-3xl font-bold mb-4 tracking-tight">Stay & Earn.</h4>
                        <p className="opacity-80 mb-8">Join the Atlantica rewards program for exclusive access to penthouse suites and 15% off.</p>
                        <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl py-3 font-bold hover:bg-white/40">Join Now</button>
                    </div>

                    {/* Wide Secondary Feature */}
                    <div className="md:col-span-2 bg-[#f5f5f7] rounded-[48px] p-12 flex flex-col md:flex-row items-center justify-between border border-gray-100 gap-8">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight mb-4">Sustainability First.</h3>
                            <p className="text-gray-500 max-w-sm">Every Atlantica resort is built with carbon-neutral materials and powered by local solar arrays.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FEATURED STAYS (The Room Grid) */}
            <section className="max-w-[1400px] mx-auto px-6 pb-40">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <h2 className="text-5xl font-bold tracking-tight">Featured Stays</h2>
                        <p className="text-gray-400 mt-4 text-lg">Handpicked luxury for your next escape.</p>
                    </div>
                    <button className="text-blue-600 font-bold text-lg hover:underline underline-offset-8 transition-all">
                        View all accommodations &gt;
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {rooms.map((room) => (
                        <div key={room.id} className="group cursor-pointer">
                            <div className="relative h-[480px] rounded-[40px] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                <img src={room.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={room.name} />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest text-black">
                                    ★ {room.rating} Rating
                                </div>
                            </div>
                            <div className="px-2">
                                <span className="text-blue-600 text-[10px] uppercase font-black tracking-[0.2em]">{room.type}</span>
                                <h3 className="text-2xl font-bold text-[#1d1d1f] mt-2 mb-6 tracking-tight">{room.name}</h3>
                                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                    <div className="flex flex-col leading-none">
                                        <span className="text-2xl font-black">£{room.price}</span>
                                        <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Avg / Night</span>
                                    </div>
                                    <button className="bg-[#1d1d1f] text-white px-8 py-3.5 rounded-2xl font-bold text-xs hover:bg-black transition-all">
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. MINIMAL FOOTER */}
            <footer className="bg-[#f5f5f7] py-24 border-t border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-2 space-y-6">
                        <h2 className="text-2xl font-black tracking-tighter uppercase">Atlantica</h2>
                        <p className="text-[#86868b] max-w-sm text-lg leading-relaxed">Just 5 Random Guys</p>
                    </div>
                    <div className="grid grid-cols-2 col-span-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#1d1d1f] uppercase text-xs tracking-widest">Discovery</h4>
                            <nav className="flex flex-col gap-3 text-sm text-[#86868b]">
                                <Link href="#" className="hover:text-black">The Rooms</Link>
                                <Link href="#" className="hover:text-black">The Spa</Link>
                                <Link href="#" className="hover:text-black">Dining</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}