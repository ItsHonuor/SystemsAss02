"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { X, User, LogIn } from "lucide-react";
import UserNav from "@/components/UserNav";

const rooms = [
    { id: 1, name: "Single Room", price: 89, rating: 8.4, type: "Solo Retreat", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Double Room", price: 149, rating: 9.1, type: "Classic Comfort", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Executive Suite", price: 289, rating: 9.6, type: "Modern Luxury", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Deluxe King", price: 219, rating: 9.3, type: "Signature Stay", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800" },
];

export default function HomePage() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [rewardsJoined, setRewardsJoined] = useState(false);
    const [rewardsForm, setRewardsForm] = useState({ name: "", email: "" });
    const [rewardsCard] = useState(() => "ATL-" + Math.floor(100000 + Math.random() * 900000));
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const handleBookNow = () => {
        if (sessionStatus === "loading") return;
        if (session) { router.push("/rooms"); return; }
        if (sessionStorage.getItem("guestConfirmed")) { router.push("/rooms"); return; }
        setShowBookingModal(true);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (destination) params.set("destination", destination);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        router.push(`/rooms?${params.toString()}`);
    };

    const formatDateRange = () => {
        if (!checkIn && !checkOut) return null;
        const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
        if (checkIn && checkOut) return `${fmt(checkIn)} — ${fmt(checkOut)}`;
        if (checkIn) return `From ${fmt(checkIn)}`;
        return null;
    };

    return (
        <div className="min-h-screen bg-white text-[#1d1d1f] antialiased"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>

            {/* BOOKING MODAL */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl relative">
                        <button onClick={() => setShowBookingModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-all">
                            <X size={18} className="text-gray-400" />
                        </button>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black tracking-tight mb-2">Before you book</h2>
                            <p className="text-gray-400 text-sm">Would you like to sign in or continue as a guest?</p>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => { setShowBookingModal(false); router.push("/login"); }}
                                className="w-full flex items-center justify-between bg-black text-white px-8 py-5 rounded-[20px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all group"
                            >
                                <div className="text-left">
                                    <div className="text-sm">Sign In</div>
                                    <div className="text-xs font-normal text-gray-400 normal-case tracking-normal mt-0.5">Save your booking & earn rewards</div>
                                </div>
                                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => {
                                    sessionStorage.setItem("guestConfirmed", "true");
                                    setShowBookingModal(false);
                                    router.push("/rooms");
                                }}
                                className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 text-black px-8 py-5 rounded-[20px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all group"
                            >
                                <div className="text-left">
                                    <div className="text-sm">Continue as Guest</div>
                                    <div className="text-xs font-normal text-gray-400 normal-case tracking-normal mt-0.5">No account needed</div>
                                </div>
                                <User size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-6">
                            Don&apos;t have an account?{" "}
                            <button onClick={() => { setShowBookingModal(false); router.push("/login"); }} className="text-black font-bold hover:underline">
                                Create one
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {/* DATE PICKER MODAL */}
            {showDatePicker && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4" onClick={() => setShowDatePicker(false)}>
                    <div className="bg-white rounded-[32px] p-8 shadow-2xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-black tracking-tight mb-6">Select Dates</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Check In</label>
                                <input type="date" value={checkIn} min={new Date().toISOString().split("T")[0]} onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-all bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Check Out</label>
                                <input type="date" value={checkOut} min={checkIn || new Date().toISOString().split("T")[0]} onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-all bg-gray-50" />
                            </div>
                            <button onClick={() => setShowDatePicker(false)}
                                className="w-full bg-black text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl mt-2 hover:bg-zinc-800 transition-all">
                                Confirm Dates
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REWARDS MODAL */}
            {showRewardsModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl relative">
                        <button
                            onClick={() => { setShowRewardsModal(false); setRewardsJoined(false); setRewardsForm({ name: "", email: "" }); }}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-all"
                        >
                            <X size={18} className="text-gray-400" />
                        </button>
                        {rewardsJoined ? (
                            <div className="text-center py-4">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[28px] p-8 mb-8 text-white text-left shadow-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-6">Atlantica Rewards</p>
                                    <p className="text-2xl font-black tracking-[0.15em] mb-6">{rewardsCard}</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1">Member</p>
                                            <p className="font-black text-sm">{rewardsForm.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1">Status</p>
                                            <p className="font-black text-sm">Gold</p>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-[26px] font-black tracking-tight mb-2">You&apos;re in.</h2>
                                <p className="text-gray-400 text-sm mb-8">Your rewards card is ready. Enjoy 15% off your first stay and exclusive member perks.</p>
                                <button
                                    onClick={() => { setShowRewardsModal(false); setRewardsJoined(false); }}
                                    className="bg-black text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all"
                                >
                                    Start Exploring
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-[26px] font-black tracking-tight mb-1">Stay &amp; Earn.</h2>
                                <p className="text-gray-400 text-sm mb-8">Join the Atlantica rewards program for exclusive access to penthouse suites and 15% off.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Full Name</label>
                                        <input type="text" placeholder="Jane Doe" value={rewardsForm.name}
                                            onChange={(e) => setRewardsForm({ ...rewardsForm, name: e.target.value })}
                                            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-all bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Email</label>
                                        <input type="email" placeholder="you@example.com" value={rewardsForm.email}
                                            onChange={(e) => setRewardsForm({ ...rewardsForm, email: e.target.value })}
                                            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-all bg-gray-50" />
                                    </div>
                                    <button
                                        onClick={() => { if (rewardsForm.name && rewardsForm.email) setRewardsJoined(true); }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all mt-2"
                                    >
                                        Join Now →
                                    </button>
                                </div>
                                <p className="text-center text-gray-300 text-xs mt-6">No spam. Cancel anytime.</p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-8">
                <div className="max-w-[1400px] mx-auto bg-white/20 backdrop-blur-2xl border border-white/30 rounded-[32px] px-10 py-5 grid grid-cols-3 items-center shadow-2xl">
                    <div className="text-2xl font-black tracking-tighter uppercase text-white drop-shadow-sm justify-self-start">
                        Atlantica
                    </div>
                    <div className="flex gap-12 text-[12px] font-bold uppercase tracking-[0.2em] text-white/90 justify-self-center">
                        <Link href="/rooms" className="hover:text-white transition-all">Rooms</Link>
                        <Link href="/about" className="hover:text-white transition-all">Experience</Link>
                        <Link href="/dining" className="hover:text-white transition-all">Dining</Link>
                    </div>
                    <div className="justify-self-end flex items-center gap-3">
                        <button
                            onClick={handleBookNow}
                            className="bg-white text-black px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all duration-300 shadow-xl"
                        >
                            Book Now
                        </button>
                        <UserNav />
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
                    className="absolute inset-0 w-full h-full object-cover scale-105" alt="Luxury Resort" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center px-4 max-w-6xl w-full">
                    <h1 className="text-7xl md:text-[110px] font-bold text-white tracking-tighter leading-[0.9] mb-12 drop-shadow-2xl">
                        Your next stay <br /> starts here
                    </h1>
                    <div className="bg-white/95 backdrop-blur-md rounded-[40px] p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4 w-full max-w-5xl mx-auto border border-white/50 text-left">
                        <div className="flex-[1.5] w-full px-10 py-4 md:border-r border-gray-100">
                            <label className="block text-[11px] uppercase font-black text-gray-400 tracking-widest mb-2">Where to?</label>
                            <input type="text" placeholder="Search destinations" value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full bg-transparent outline-none text-xl text-black font-medium placeholder-gray-300" />
                        </div>
                        <div className="flex-1 w-full px-10 py-4" onClick={() => setShowDatePicker(true)}>
                            <label className="block text-[11px] uppercase font-black text-gray-400 tracking-widest mb-2 cursor-pointer">Schedule</label>
                            <button className="text-xl font-medium text-left w-full transition-colors" style={{ color: formatDateRange() ? "#1d1d1f" : "#d1d5db" }}>
                                {formatDateRange() || "Select dates"}
                            </button>
                        </div>
                        <button onClick={handleSearch}
                            className="w-full md:w-auto bg-black text-white px-16 py-6 rounded-[30px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] hover:bg-zinc-800">
                            Search
                        </button>
                    </div>
                </div>
            </header>

            {/* BENTO GRID */}
            <section className="max-w-[1400px] mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 relative bg-gray-200 rounded-[48px] p-16 overflow-hidden min-h-[500px] flex flex-col justify-between group">
                        <div className="z-10 relative">
                            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">About Us</span>
                            <h2 className="text-5xl font-bold mt-6 tracking-tight text-[#1d1d1f]">We create<br />places to stay.</h2>
                            <p className="text-gray-500 mt-6 text-xl max-w-xs italic">&quot;A new standard for luxury.&quot;</p>
                        </div>
                        <Link href="/about" className="z-10 relative self-start">
                            <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all">Our Philosophy</button>
                        </Link>
                        <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000"
                            className="absolute right-0 top-0 w-1/2 h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="Pool" />
                    </div>
                    <div className="bg-[#1d1d1f] rounded-[48px] p-12 text-white flex flex-col justify-between items-center text-center">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold italic">Michelin</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-widest">Five Star Dining</p>
                        </div>
                        <p className="text-gray-400 leading-relaxed">Experience a culinary journey led by world-renowned chefs in our signature dining halls.</p>
                        <div className="w-12 h-px bg-white/20" />
                    </div>
                    <div className="bg-blue-600 rounded-[48px] p-12 text-white flex flex-col justify-center">
                        <h4 className="text-3xl font-bold mb-4 tracking-tight">Stay &amp; Earn.</h4>
                        <p className="opacity-80 mb-8">Join the Atlantica rewards program for exclusive access to penthouse suites and 15% off.</p>
                        <button onClick={() => setShowRewardsModal(true)}
                            className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl py-3 font-bold hover:bg-white/40 transition-all">
                            Join Now
                        </button>
                    </div>
                    <div className="md:col-span-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[48px] p-12 flex flex-col md:flex-row items-center justify-between border border-gray-100 gap-8">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight mb-4">Sustainability First.</h3>
                            <p className="text-gray-500 max-w-sm">Every Atlantica resort is built with carbon-neutral materials and powered by local solar arrays.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED STAYS */}
            <section className="bg-gray-200 rounded-[48px] max-w-[1400px] mx-auto px-10 py-16 mb-40">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <h2 className="text-5xl font-bold tracking-tight">Featured Stays</h2>
                        <p className="text-gray-400 mt-4">Handpicked luxury for your next escape.</p>
                    </div>
                    <Link href="/rooms">
                        <button className="text-blue-600 font-bold text-lg hover:underline underline-offset-8 transition-all">View all accommodations &gt;</button>
                    </Link>
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
                                    <button onClick={handleBookNow}
                                        className="bg-[#1d1d1f] text-white px-8 py-3.5 rounded-2xl font-bold text-xs hover:bg-black transition-all">
                                        Reserve Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
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
                                <Link href="/rooms" className="hover:text-black">The Rooms</Link>
                                <Link href="/dining" className="hover:text-black">The Spa</Link>
                                <Link href="/dining" className="hover:text-black">Dining</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}