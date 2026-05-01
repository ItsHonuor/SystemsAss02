"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

type Booking = {
    id: number;
    guestName: string;
    roomNumber: string;
    checkIn: string;
    checkOut: string;
    status: string;
};

const statusStyles: Record<string, string> = {
    "Checked In":  "bg-green-100 text-green-700",
    "Confirmed":   "bg-blue-100 text-blue-700",
    "Checked Out": "bg-gray-100 text-gray-600",
    "Cancelled":   "bg-red-100 text-red-600",
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function GuestListPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/bookings")
            .then((res) => res.json())
            .then((data) => {
                setBookings(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-1">
                <Users className="text-purple-600" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Guest List</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">All current and recent hotel guests.</p>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading guests...</div>
                ) : bookings.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">No guests found.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Guest</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Check In</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Check Out</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                                                {b.guestName[0]}
                                            </div>
                                            <span className="font-medium text-gray-800">{b.guestName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500">Room {b.roomNumber}</td>
                                    <td className="px-6 py-3.5 text-gray-500">{formatDate(b.checkIn)}</td>
                                    <td className="px-6 py-3.5 text-gray-500">{formatDate(b.checkOut)}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[b.status] ?? "bg-gray-100 text-gray-600"}`}>
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}