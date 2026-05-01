"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    BedDouble,
    CalendarDays,
    Users,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    CreditCard,
    User,
    Mail,
    Phone,
} from "lucide-react";

const rooms = [
    { id: 1, name: "Single Room", price: 89, type: "Solo Retreat", beds: "1 Single Bed", capacity: 1, description: "Cosy and comfortable for solo travellers", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Double Room", price: 149, type: "Classic Comfort", beds: "1 Double Bed", capacity: 2, description: "Elegant room with garden view", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Executive Suite", price: 289, type: "Modern Luxury", beds: "1 King Bed", capacity: 2, description: "Ocean-facing suite with private balcony", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Deluxe King", price: 219, type: "Signature Stay", beds: "1 King Bed", capacity: 2, description: "Spacious king room with premium amenities", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Family Room", price: 240, type: "Family", beds: "2 Double Beds", capacity: 4, description: "Spacious room ideal for families", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Penthouse", price: 650, type: "Penthouse", beds: "1 King + Lounge", capacity: 4, description: "Exclusive top-floor suite with panoramic views", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800" },
];

const steps = ["Room & Dates", "Guest Info", "Payment"];

function getNights(checkIn: string, checkOut: string) {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function BookNowPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);

    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("1");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const room = rooms.find((r) => r.id === selectedRoom);
    const nights = getNights(checkIn, checkOut);
    const total = room ? room.price * nights : 0;
    const bookingRef = `ATL-${Date.now().toString().slice(-6)}`;

    const canNext = () => {
        if (step === 0) return selectedRoom !== null && checkIn && checkOut && nights > 0;
        if (step === 1) return firstName && lastName && email && phone;
        if (step === 2) return cardName && cardNumber.replace(/\s/g, "").length >= 16 && expiry && cvv.length >= 3;
        return false;
    };

    const handleConfirmClose = () => {
        setShowConfirm(false);
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-white text-[#1d1d1f] antialiased"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif' }}>

            {/* NAV */}
            <nav className="fixed top-0 w-full z-[100] px-6 py-6">
                <div className="max-w-[1400px] mx-auto bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 flex justify-between items-center shadow-lg">
                    <div className="text-xl font-black tracking-tighter uppercase text-black">
                        <Link href="/">Atlantica</Link>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Secure Booking</span>
                    <Link href="/">
                        <button className="border border-gray-200 text-black px-6 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                            Cancel
                        </button>
                    </Link>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-6 pt-40 pb-20">

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-0 mb-16">
                    {steps.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    i < step ? "bg-black text-white" :
                                    i === step ? "bg-black text-white ring-4 ring-black/10" :
                                    "bg-gray-100 text-gray-400"
                                }`}>
                                    {i < step ? <CheckCircle2 size={18} /> : i + 1}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-widest ${i === step ? "text-black" : "text-gray-300"}`}>{s}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`w-24 h-px mx-3 mb-6 transition-all ${i < step ? "bg-black" : "bg-gray-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* STEP 1: Room & Dates */}
                {step === 0 && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight">Choose your room.</h2>
                            <p className="text-gray-400 mt-2">Select a room and your stay dates to continue.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {rooms.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setSelectedRoom(r.id)}
                                    className={`text-left rounded-[32px] overflow-hidden border-2 transition-all duration-300 ${
                                        selectedRoom === r.id ? "border-black shadow-xl scale-[1.02]" : "border-transparent shadow-sm hover:shadow-md hover:scale-[1.01]"
                                    }`}
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        <img src={r.img} className="w-full h-full object-cover" alt={r.name} />
                                        {selectedRoom === r.id && (
                                            <div className="absolute top-3 right-3 bg-black text-white rounded-full p-1">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 bg-white">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{r.type}</div>
                                        <div className="font-bold text-lg tracking-tight">{r.name}</div>
                                        <div className="text-xs text-gray-400 mt-1 mb-3">{r.description}</div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                                <BedDouble size={12} /> {r.beds}
                                            </div>
                                            <div className="font-black text-lg">£{r.price}<span className="font-normal text-xs text-gray-400">/night</span></div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Dates + Guests */}
                        <div className="bg-gray-50 rounded-[32px] p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
                                    <CalendarDays size={12} className="inline mr-1" />Check-In
                                </label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
                                    <CalendarDays size={12} className="inline mr-1" />Check-Out
                                </label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    min={checkIn || new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
                                    <Users size={12} className="inline mr-1" />Guests
                                </label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>

                        {nights > 0 && room && (
                            <div className="bg-black text-white rounded-[24px] px-8 py-5 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold">{room.name}</div>
                                    <div className="text-gray-400 text-xs mt-0.5">{nights} night{nights > 1 ? "s" : ""} · {guests} guest{Number(guests) > 1 ? "s" : ""}</div>
                                </div>
                                <div className="text-2xl font-black">£{total.toLocaleString()}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 2: Guest Info */}
                {step === 1 && (
                    <div className="space-y-8 max-w-xl mx-auto">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight">Guest details.</h2>
                            <p className="text-gray-400 mt-2">Tell us a bit about yourself.</p>
                        </div>
                        <div className="bg-gray-50 rounded-[32px] p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                                    <div className="relative">
                                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                                    <div className="relative">
                                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input type="tel" placeholder="+44 7700 000000" value={phone} onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                                </div>
                            </div>
                        </div>

                        {room && (
                            <div className="bg-black text-white rounded-[24px] px-8 py-5 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold">{room.name}</div>
                                    <div className="text-gray-400 text-xs mt-0.5">{nights} night{nights > 1 ? "s" : ""}</div>
                                </div>
                                <div className="text-2xl font-black">£{total.toLocaleString()}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 3: Payment */}
                {step === 2 && (
                    <div className="space-y-8 max-w-xl mx-auto">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight">Payment.</h2>
                            <p className="text-gray-400 mt-2">Enter your card details to complete the booking.</p>
                        </div>
                        <div className="bg-gray-50 rounded-[32px] p-8 space-y-5">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                    <CreditCard size={16} /> Card Details
                                </div>
                                <div className="flex gap-2">
                                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-black">VISA</span>
                                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-black">MC</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Name on Card</label>
                                <input type="text" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Card Number</label>
                                <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={cardNumber}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                                        setCardNumber(val.replace(/(.{4})/g, "$1 ").trim());
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black font-mono tracking-widest transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Expiry</label>
                                    <input type="text" placeholder="MM/YY" maxLength={5} value={expiry}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                            setExpiry(val.length > 2 ? val.slice(0, 2) + "/" + val.slice(2) : val);
                                        }}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">CVV</label>
                                    <input type="password" placeholder="•••" maxLength={4} value={cvv}
                                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all" />
                                </div>
                            </div>
                        </div>

                        {room && (
                            <div className="bg-gray-50 rounded-[32px] p-8 space-y-3 border border-gray-200">
                                <div className="text-sm font-black uppercase tracking-widest mb-4">Booking Summary</div>
                                <div className="flex justify-between text-sm text-gray-500"><span>Room</span><span className="font-medium text-black">{room.name}</span></div>
                                <div className="flex justify-between text-sm text-gray-500"><span>Guest</span><span className="font-medium text-black">{firstName} {lastName}</span></div>
                                <div className="flex justify-between text-sm text-gray-500"><span>Check-in</span><span className="font-medium text-black">{checkIn}</span></div>
                                <div className="flex justify-between text-sm text-gray-500"><span>Check-out</span><span className="font-medium text-black">{checkOut}</span></div>
                                <div className="flex justify-between text-sm text-gray-500"><span>Nights</span><span className="font-medium text-black">{nights}</span></div>
                                <div className="flex justify-between font-black text-lg border-t border-gray-200 pt-4 mt-2"><span>Total</span><span>£{total.toLocaleString()}</span></div>
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12">
                    <button
                        onClick={() => setStep((s) => s - 1)}
                        disabled={step === 0}
                        className="flex items-center gap-2 px-8 py-4 rounded-[20px] border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={16} /> Back
                    </button>
                    {step < 2 ? (
                        <button
                            onClick={() => setStep((s) => s + 1)}
                            disabled={!canNext()}
                            className="flex items-center gap-2 px-10 py-4 rounded-[20px] bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                        >
                            Continue <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={!canNext()}
                            className="flex items-center gap-2 px-10 py-4 rounded-[20px] bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                        >
                            Confirm Booking <CheckCircle2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 text-center shadow-2xl">
                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={36} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-400 text-sm mb-8">Your reservation has been successfully placed.</p>
                        <div className="bg-gray-50 rounded-[24px] p-6 text-sm text-left space-y-3 mb-8 border border-gray-100">
                            <div className="flex justify-between"><span className="text-gray-400">Reference</span><span className="font-black font-mono">{bookingRef}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Room</span><span className="font-bold">{room?.name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Guest</span><span className="font-bold">{firstName} {lastName}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Check-in</span><span className="font-bold">{checkIn}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Check-out</span><span className="font-bold">{checkOut}</span></div>
                            <div className="flex justify-between border-t border-gray-200 pt-3 mt-1"><span className="text-gray-400">Total Paid</span><span className="font-black text-lg">£{total.toLocaleString()}</span></div>
                        </div>
                        <button onClick={handleConfirmClose}
                            className="w-full bg-black text-white rounded-[20px] py-4 text-sm font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}