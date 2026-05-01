"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Calendar, LogOut, BedDouble, CheckCircle2, Clock, CalendarDays, X } from "lucide-react";

type Booking = {
    id: number;
    roomNumber: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: string;
};

type ChangeDates = {
    checkIn: string;
    checkOut: string;
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
    });
}

function toInputDate(dateStr: string) {
    return new Date(dateStr).toISOString().split("T")[0];
}

function getRef(id: number) {
    return `BK${String(id).padStart(3, "0")}`;
}

function getNights(checkIn: string, checkOut: string) {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

const statusStyles: Record<string, string> = {
    "Confirmed":   "bg-blue-100 text-blue-700",
    "Checked In":  "bg-green-100 text-green-700",
    "Checked Out": "bg-gray-100 text-gray-500",
    "Cancelled":   "bg-red-100 text-red-500",
};

export default function AccountPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [changingId, setChangingId] = useState<number | null>(null);
    const [savingId, setSavingId] = useState<number | null>(null);
    const [changeDates, setChangeDates] = useState<ChangeDates>({ checkIn: "", checkOut: "" });
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/bookings/my")
                .then((res) => res.json())
                .then((data) => {
                    setBookings(Array.isArray(data) ? data : []);
                    setLoadingBookings(false);
                })
                .catch(() => setLoadingBookings(false));
        }
    }, [status]);

    const openChangeDates = (b: Booking) => {
        setChangingId(b.id);
        setChangeDates({
            checkIn: toInputDate(b.checkIn),
            checkOut: toInputDate(b.checkOut),
        });
        setDateError("");
    };

    const handleSaveDates = async (booking: Booking) => {
        if (!changeDates.checkIn || !changeDates.checkOut) {
            setDateError("Please select both dates.");
            return;
        }
        const nights = getNights(changeDates.checkIn, changeDates.checkOut);
        if (nights <= 0) {
            setDateError("Check-out must be after check-in.");
            return;
        }

        // Recalculate price based on nights (use original per-night rate)
        const originalNights = getNights(booking.checkIn, booking.checkOut);
        const pricePerNight = originalNights > 0 ? booking.totalPrice / originalNights : booking.totalPrice;
        const newTotal = Math.round(pricePerNight * nights);

        setSavingId(booking.id);
        setDateError("");

        const res = await fetch(`/api/bookings/${booking.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                checkIn: new Date(changeDates.checkIn).toISOString(),
                checkOut: new Date(changeDates.checkOut).toISOString(),
                totalPrice: newTotal,
            }),
        });

        if (res.ok) {
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === booking.id
                        ? { ...b, checkIn: changeDates.checkIn, checkOut: changeDates.checkOut, totalPrice: newTotal }
                        : b
                )
            );
            setChangingId(null);
        } else {
            setDateError("Failed to update dates. Please try again.");
        }
        setSavingId(null);
    };

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Loading your account...</div>;
    }

    const upcomingBookings = bookings.filter(
        (b) => b.status !== "Cancelled" && b.status !== "Checked Out"
    );
    const pastBookings = bookings.filter(
        (b) => b.status === "Checked Out" || b.status === "Cancelled"
    );

    return (
        <div className="min-h-screen bg-[#FBFBFD] pt-24 pb-12 px-6">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Profile card */}
                <div className="bg-white rounded-3xl shadow border p-10">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-20 h-20 bg-blue-600 text-white text-4xl font-bold rounded-3xl flex items-center justify-center shadow-inner">
                            {session?.user?.name?.[0] || "?"}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">{session?.user?.name}</h1>
                            <p className="text-gray-500">{session?.user?.email}</p>
                            <span className="inline-block mt-2 px-4 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-2xl">
                                Gold Member
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => router.push("/rooms")}
                            className="w-full bg-black text-white py-5 rounded-3xl font-bold text-sm tracking-widest hover:bg-zinc-800 transition-all"
                        >
                            Browse Rooms →
                        </button>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center justify-center gap-3 py-4 text-red-600 hover:bg-red-50 rounded-3xl font-medium transition-all"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-3xl shadow border p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="text-blue-600" size={22} />
                        <h2 className="text-xl font-bold">Upcoming Bookings</h2>
                    </div>

                    {loadingBookings ? (
                        <p className="text-gray-400 text-sm text-center py-6">Loading bookings...</p>
                    ) : upcomingBookings.length === 0 ? (
                        <div className="text-center py-8">
                            <BedDouble className="mx-auto text-gray-300 mb-3" size={36} />
                            <p className="font-semibold text-gray-600">No upcoming bookings</p>
                            <p className="text-gray-400 text-sm mt-1">Your future stays will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {upcomingBookings.map((b) => {
                                const isChanging = changingId === b.id;
                                const nights = isChanging
                                    ? getNights(changeDates.checkIn, changeDates.checkOut)
                                    : getNights(b.checkIn, b.checkOut);
                                const pricePerNight = getNights(b.checkIn, b.checkOut) > 0
                                    ? b.totalPrice / getNights(b.checkIn, b.checkOut)
                                    : b.totalPrice;
                                const newTotal = isChanging ? Math.round(pricePerNight * nights) : b.totalPrice;

                                return (
                                    <div key={b.id} className={`border rounded-2xl p-5 transition-colors ${isChanging ? "border-blue-200 bg-blue-50/30" : "border-gray-100 hover:border-gray-200"}`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="font-bold text-gray-800">Room {b.roomNumber}</p>
                                                <p className="text-xs text-gray-400 font-mono mt-0.5">{getRef(b.id)}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[b.status] ?? "bg-gray-100 text-gray-500"}`}>
                                                {b.status}
                                            </span>
                                        </div>

                                        {/* Current dates */}
                                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={13} />
                                                {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                                            </span>
                                            <span className="font-bold text-gray-700">£{b.totalPrice.toLocaleString()}</span>
                                        </div>

                                        {/* Change dates form */}
                                        {isChanging && (
                                            <div className="mt-3 mb-4 bg-white border border-blue-100 rounded-2xl p-4 space-y-3">
                                                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Change Dates</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs text-gray-500 mb-1 font-medium">Check In</label>
                                                        <input
                                                            type="date"
                                                            value={changeDates.checkIn}
                                                            min={new Date().toISOString().split("T")[0]}
                                                            onChange={(e) => setChangeDates({ ...changeDates, checkIn: e.target.value })}
                                                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500 mb-1 font-medium">Check Out</label>
                                                        <input
                                                            type="date"
                                                            value={changeDates.checkOut}
                                                            min={changeDates.checkIn || new Date().toISOString().split("T")[0]}
                                                            onChange={(e) => setChangeDates({ ...changeDates, checkOut: e.target.value })}
                                                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        />
                                                    </div>
                                                </div>

                                                {nights > 0 && (
                                                    <div className="flex justify-between text-xs text-blue-700 bg-blue-50 rounded-xl px-3 py-2">
                                                        <span>{nights} night{nights > 1 ? "s" : ""}</span>
                                                        <span className="font-bold">New total: £{newTotal.toLocaleString()}</span>
                                                    </div>
                                                )}

                                                {dateError && (
                                                    <p className="text-xs text-red-500">{dateError}</p>
                                                )}

                                                <div className="flex gap-2 pt-1">
                                                    <button
                                                        onClick={() => handleSaveDates(b)}
                                                        disabled={savingId === b.id}
                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors disabled:opacity-50"
                                                    >
                                                        {savingId === b.id ? "Saving..." : "Confirm New Dates"}
                                                    </button>
                                                    <button
                                                        onClick={() => setChangingId(null)}
                                                        className="px-3 py-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action button */}
                                        {b.status !== "Checked In" && !isChanging && (
                                            <button
                                                onClick={() => openChangeDates(b)}
                                                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors"
                                            >
                                                <CalendarDays size={13} />
                                                Change Dates
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Past Bookings */}
                {pastBookings.length > 0 && (
                    <div className="bg-white rounded-3xl shadow border p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="text-gray-400" size={22} />
                            <h2 className="text-xl font-bold text-gray-600">Past Bookings</h2>
                        </div>
                        <div className="space-y-4">
                            {pastBookings.map((b) => (
                                <div key={b.id} className="border border-gray-100 rounded-2xl p-5 opacity-70">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-bold text-gray-700">Room {b.roomNumber}</p>
                                            <p className="text-xs text-gray-400 font-mono mt-0.5">{getRef(b.id)}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[b.status] ?? "bg-gray-100 text-gray-500"}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-gray-400">
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={13} />
                                            {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                                        </span>
                                        <span className="font-semibold">£{b.totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Personal Info */}
                <div className="bg-white rounded-3xl shadow border p-8">
                    <div className="flex gap-5 items-start">
                        <User className="text-gray-400 mt-1" size={22} />
                        <div>
                            <p className="font-semibold text-lg">Personal Information</p>
                            <p className="text-gray-500 text-sm">Update your details anytime</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}