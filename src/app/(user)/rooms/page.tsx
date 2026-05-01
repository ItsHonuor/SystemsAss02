"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { X, User, LogIn } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";

const typeImages: Record<string, string> = {
    Standard:  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
    Deluxe:    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    Suite:     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    Penthouse: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
};

const typeDescs: Record<string, string> = {
    Standard:  "A sanctuary of focused calm. Perfect for the modern solo traveler seeking efficiency without sacrificing luxury.",
    Deluxe:    "Spacious quarters featuring signature Atlantica bedding and curated local art.",
    Suite:     "Our highest standard. Includes a private lounge, panoramic views, and 24/7 concierge service.",
    Penthouse: "The pinnacle of luxury. Breathtaking views, a private terrace, and dedicated butler service.",
};

const typeTags: Record<string, string> = {
    Standard: "Solo Retreat", Deluxe: "Classic Comfort", Suite: "VIP Access", Penthouse: "Premium",
};

const typeRatings: Record<string, number> = {
    Standard: 8.4, Deluxe: 9.1, Suite: 9.6, Penthouse: 9.8,
};

export default function RoomsPage() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [allRooms, setAllRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/rooms")
            .then((r) => r.json())
            .then((data) => {
                const available = data.filter((r: any) => r.status === "Available");
                setAllRooms(available.map((r: any) => ({
                    id: r.id,
                    name: `${r.type} Room`,
                    roomNumber: r.roomNumber,
                    price: r.price,
                    rating: typeRatings[r.type] || 9.0,
                    reviews: Math.floor(50 + r.id * 30),
                    tag: typeTags[r.type] || r.type,
                    img: typeImages[r.type] || typeImages["Standard"],
                    desc: r.description || typeDescs[r.type] || "",
                })));
                setLoading(false);
            });
    }, []);

    const handleBookingClick = () => {
        if (sessionStatus === "loading") return;
        if (session) { router.push("/book"); return; }
        if (sessionStorage.getItem("guestConfirmed")) { router.push("/book"); return; }
        setShowBookingModal(true);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FBFBFD]">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading rooms...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FBFBFD] text-[#1d1d1f] antialiased"
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
                                onClick={() => { setShowBookingModal(false); router.push("/login?redirect=/book"); }}
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
                                    router.push("/book");
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
                        <p className="text-center text-xs text-gray-300 mt-6">
                            Don&apos;t have an account?{" "}
                            <button onClick={() => { setShowBookingModal(false); router.push("/login"); }} className="text-black font-bold hover:underline">
                                Create one
                            </button>
                        </p>
                    </div>
                </div>
            )}

            <PublicNavbar />
            <div className="h-32" />

            <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">

                {/* SIDEBAR */}
                <aside className="w-full lg:w-72 space-y-10 bg-gradient-to-br from-gray-200 to-gray-300 p-6 rounded-[32px] border border-gray-200 shadow-sm h-fit">
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

                {/* ROOM LISTINGS */}
                <main className="flex-1">
                    <div className="flex justify-between items-baseline mb-12">
                        <h1 className="text-4xl font-bold tracking-tight">
                            {allRooms.length} {allRooms.length === 1 ? "property" : "properties"} available
                        </h1>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            Sort by
                            <select className="bg-transparent border-none text-black outline-none cursor-pointer">
                                <option>Recommended</option>
                                <option>Lowest Price</option>
                                <option>Top Rated</option>
                            </select>
                        </div>
                    </div>

                    {allRooms.length === 0 ? (
                        <div className="text-center py-32">
                            <p className="text-3xl font-bold text-gray-200 mb-4">No rooms available</p>
                            <p className="text-gray-400 text-sm">Please check back soon or contact us directly.</p>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {allRooms.map((room) => (
                                <div key={room.id} className="group bg-gradient-to-br from-gray-200 to-gray-300 rounded-[40px] overflow-hidden flex flex-col md:flex-row border border-gray-200 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-700">
                                    <div className="w-full md:w-[400px] h-72 md:h-auto overflow-hidden relative">
                                        <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {room.tag}
                                        </div>
                                    </div>
                                    <div className="flex-1 p-10 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h2 className="text-3xl font-bold tracking-tight leading-none">{room.name}</h2>
                                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Room #{room.roomNumber}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-right">
                                                        {room.reviews} <br /> Verified Reviews
                                                    </div>
                                                    <div className="bg-[#1d1d1f] text-white w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black italic shadow-lg">
                                                        {room.rating}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed max-w-md line-clamp-3 mb-4">{room.desc}</p>
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
                                            <button
                                                onClick={handleBookingClick}
                                                className="bg-[#1d1d1f] text-white px-10 py-4 rounded-[20px] font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95"
                                            >
                                                Reserve Suite
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}