"use client";

import { useState, useEffect } from "react";
import { BookOpen, CheckCircle2, Clock, XCircle, Search } from "lucide-react";

type BookingStatus = "Confirmed" | "Checked In" | "Checked Out" | "Cancelled";

type Booking = {
    id: number;
    guestName: string;
    roomNumber: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: BookingStatus;
    createdAt: string;
};

const statusConfig: Record<BookingStatus, { style: string; icon: React.ReactNode }> = {
    "Confirmed":   { style: "bg-blue-100 text-blue-700",   icon: <Clock size={11} /> },
    "Checked In":  { style: "bg-green-100 text-green-700", icon: <CheckCircle2 size={11} /> },
    "Checked Out": { style: "bg-gray-100 text-gray-500",   icon: <XCircle size={11} /> },
    "Cancelled":   { style: "bg-red-100 text-red-600",     icon: <XCircle size={11} /> },
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function getNights(checkIn: string, checkOut: string) {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function getRef(id: number) {
    return `ATL-${String(id).padStart(4, "0")}`;
}

export default function AllBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [roomTypes, setRoomTypes] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<BookingStatus | "All">("All");

    useEffect(() => {
        // Fetch bookings and rooms in parallel
        Promise.all([
            fetch("/api/bookings").then((res) => res.json()),
            fetch("/api/rooms").then((res) => res.json()),
        ]).then(([bookingData, roomData]) => {
            setBookings(Array.isArray(bookingData) ? bookingData : []);

            if (Array.isArray(roomData)) {
                const map: Record<string, string> = {};
                roomData.forEach((r: any) => { map[r.roomNumber] = r.type; });
                setRoomTypes(map);
            }

            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const filtered = bookings.filter((b) => {
        const ref = getRef(b.id);
        const matchSearch =
            b.guestName.toLowerCase().includes(search.toLowerCase()) ||
            ref.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "All" || b.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <BookOpen className="text-blue-600" size={24} />
                    <h1 className="text-2xl font-bold text-gray-800">All Bookings</h1>
                </div>
                <a href="/admin-portal/bookings/walk-in"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                    + Walk-in Booking
                </a>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">View and manage all guest bookings.</p>

            <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        placeholder="Search guest or ref..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                {(["All", "Confirmed", "Checked In", "Checked Out", "Cancelled"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                            filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
                        }`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading bookings...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">No bookings found.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-blue-50 text-blue-900 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Ref</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Guest</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Check In</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Check Out</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Nights</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Total</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((b) => {
                                const cfg = statusConfig[b.status] ?? statusConfig["Confirmed"];
                                const nights = getNights(b.checkIn, b.checkOut);
                                const type = roomTypes[b.roomNumber] || "";
                                return (
                                    <tr key={b.id} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="px-6 py-3.5 font-bold text-blue-700 text-xs">{getRef(b.id)}</td>
                                        <td className="px-6 py-3.5 font-medium text-gray-800">{b.guestName}</td>
                                        <td className="px-6 py-3.5 text-gray-500">
                                            #{b.roomNumber}{type && <span className="text-xs text-gray-400 ml-1">({type})</span>}
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-500 text-xs">{formatDate(b.checkIn)}</td>
                                        <td className="px-6 py-3.5 text-gray-500 text-xs">{formatDate(b.checkOut)}</td>
                                        <td className="px-6 py-3.5 text-gray-500">{nights}</td>
                                        <td className="px-6 py-3.5 font-semibold text-gray-700">
                                            £{b.totalPrice.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.style}`}>
                                                {cfg.icon} {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}