"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, User, LogIn } from "lucide-react";

export default function AboutPage() {
    const router = useRouter();
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showInquireModal, setShowInquireModal] = useState(false);
    const [inquireSent, setInquireSent] = useState(false);
    const [inquireForm, setInquireForm] = useState({ name: "", email: "", message: "" });

    const handleInquireSubmit = () => {
        if (!inquireForm.name || !inquireForm.email || !inquireForm.message) return;
        setInquireSent(true);
    };

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
                                onClick={() => { setShowBookingModal(false); router.push("/"); }}
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
                            <button onClick={() => { setShowBookingModal(false); router.push("/login"); }} className="text-black font-bold hover:underline">Create one</button>
                        </p>
                    </div>
                </div>
            )}

            {/* INQUIRE MODAL */}
            {showInquireModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl relative">
                        <button onClick={() => { setShowInquireModal(false); setInquireSent(false); setInquireForm({ name: "", email: "", message: "" }); }} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-all">
                            <X size={18} className="text-gray-400" />
                        </button>

                        {inquireSent ? (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-6">✉️</div>
                                <h2 className="text-2xl font-black tracking-tight mb-3">Message Sent</h2>
                                <p className="text-gray-400 text-sm mb-8">Our team will be in touch within 24 hours.</p>
                                <button onClick={() => { setShowInquireModal(false); setInquireSent(false); setInquireForm({ name: "", email: "", message: "" }); }} className="bg-black text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all">
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-[26px] font-black tracking-tight mb-1">Get in touch</h2>
                                <p className="text-gray-400 text-sm mb-8">Our concierge team typically responds within 24 hours.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Jane Doe"
                                            value={inquireForm.name}
                                            onChange={(e) => setInquireForm({ ...inquireForm, name: e.target.value })}
                                            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-all bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={inquireForm.email}
                                            onChange={(e) => setInquireForm({ ...inquireForm, email: e.target.value })}
                                            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-all bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Message</label>
                                        <textarea
                                            placeholder="Tell us how we can help..."
                                            value={inquireForm.message}
                                            onChange={(e) => setInquireForm({ ...inquireForm, message: e.target.value })}
                                            rows={4}
                                            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-black transition-all bg-gray-50 resize-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleInquireSubmit}
                                        className="w-full bg-black hover:bg-zinc-800 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all mt-2"
                                    >
                                        Send Message →
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-6">
                <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 flex justify-between items-center shadow-lg">
                    <div className="text-xl font-black tracking-tighter uppercase text-black">
                        <Link href="/">Atlantica</Link>
                    </div>
                    <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        <Link href="/rooms" className="hover:text-black transition-all">Rooms</Link>
                        <Link href="/about" className="hover:text-black transition-all">Experience</Link>
                        <Link href="/dining" className="hover:text-black transition-all">Dining</Link>
                    </div>
                    <button onClick={() => setShowBookingModal(true)} className="bg-black text-white px-8 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                        Book Now
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
                <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1920"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                    alt="Heritage"
                />
                <div className="relative z-10 text-center">
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] mb-6 block opacity-80">Our Legacy</span>
                    <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter leading-[0.8] mb-8">The Story of <br /> Atlantica.</h1>
                    <div className="w-px h-24 bg-white/30 mx-auto mt-12 animate-bounce" />
                </div>
            </header>

            {/* PHILOSOPHY */}
            <section className="max-w-[1400px] mx-auto px-6 py-40 mt-24 mb-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[60px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">Where comfort <br /> meets the soul.</h2>
                        <div className="h-1 w-20 bg-black" />
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">Atlantica began as a single sanctuary in London with one vision: to prove that luxury isn&apos;t about gold-leaf ceilings, but about the profound peace of a perfectly curated moment.</p>
                        <p className="text-lg text-gray-500 leading-relaxed">Every detail—from the weight of our linens to the scent of our lobbys—is designed to be a quiet background to your most important memories. Established in 2014, we continue to redefine what it means to be &quot;at home&quot; anywhere in the world.</p>
                    </div>
                    <div className="relative group">
                        <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=1000"
                                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                alt="Detail"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 hidden md:block">
                            <p className="text-4xl font-black tracking-tighter italic">&quot;Pure.&quot;</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Vogue Travel</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STANDARDS */}
            <section className="bg-white py-40 px-6 border-y border-gray-100">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex justify-between items-end mb-24">
                        <h2 className="text-5xl font-bold tracking-tight">The Standards.</h2>
                        <p className="text-gray-400 text-lg uppercase font-bold tracking-widest">Global Protocol</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: "🌿", title: "Zero Impact", desc: "Our carbon-neutral properties are built to breathe with the local ecosystem, not against it." },
                            { icon: "🤍", title: "Intuitive Care", desc: "Our concierge team is trained to anticipate your needs before you've even voiced them." },
                            { icon: "🌍", title: "The Heartbeat", desc: "We only build in the core of global capitals, putting you exactly where the world is happening." }
                        ].map((val) => (
                            <div key={val.title} className="p-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[48px] hover:shadow-xl transition-all duration-500 border border-gray-300/50">
                                <div className="text-5xl mb-8">{val.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">{val.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
                    <section className="max-w-[1400px] mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div className="py-28 px-10 text-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-[60px]">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 mb-8 block">
                        Experience the legacy
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
                        Your room is waiting.
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/rooms" className="bg-black text-white px-12 py-5 rounded-[30px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                            Book Your Stay
                        </Link>
                        <Link href="/contact" className="border border-gray-400 text-black px-12 py-5 rounded-[30px] font-black uppercase tracking-widest hover:bg-gray-300 transition-all">
                            Inquire
                        </Link>
                    </div>
                </div>

                <div className="py-28 px-10 text-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-[60px]">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 mb-8 block">
                        Explore London
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
                        Local attractions await.
                    </h2>
                    <p className="text-gray-600 text-lg max-w-md mx-auto mb-12">
                        Discover nearby landmarks, dining spots and cultural experiences close to Atlantica.
                    </p>
                    <Link href="/about/attractions" className="bg-black text-white px-12 py-5 rounded-[30px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                        View Local Attractions
                        </Link>
                    </div>

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