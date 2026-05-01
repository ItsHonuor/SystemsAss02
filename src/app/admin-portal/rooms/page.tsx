"use client";

import { useState, useEffect } from "react";
import { BedDouble, CheckCircle2, Clock, XCircle, Wrench, Trash2 } from "lucide-react";

type RoomStatus = "Available" | "Occupied" | "Housekeeping" | "Maintenance";
type Room = { id: number; number: string; type: string; floor: number; status: RoomStatus; guestName?: string; checkOut?: string; };

const statusConfig: Record<RoomStatus, { style: string; icon: React.ReactNode }> = {
    Available:    { style: "bg-green-100 text-green-700",   icon: <CheckCircle2 size={11} /> },
    Occupied:     { style: "bg-blue-100 text-blue-700",     icon: <Clock size={11} /> },
    Housekeeping: { style: "bg-yellow-100 text-yellow-700", icon: <XCircle size={11} /> },
    Maintenance:  { style: "bg-red-100 text-red-700",       icon: <Wrench size={11} /> },
};

const typeColors: Record<string, string> = {
    Standard:  "bg-gray-100 text-gray-600",
    Deluxe:    "bg-indigo-100 text-indigo-700",
    Suite:     "bg-purple-100 text-purple-700",
    Penthouse: "bg-amber-100 text-amber-700",
};

export default function RoomStatusPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [filter, setFilter] = useState<RoomStatus | "All">("All");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/rooms")
            .then((r) => r.json())
            .then((data) => {
                setRooms(data.map((r: any) => ({
                    id: r.id,
                    number: r.roomNumber,
                    type: r.type,
                    floor: r.floor,
                    status: r.status,
                    guestName: r.guestName,
                    checkOut: r.checkOut
                        ? new Date(r.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
                        : undefined,
                })));
                setLoading(false);
            });
    }, []);

    const updateStatus = async (id: number, status: RoomStatus) => {
        setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        await fetch(`/api/rooms/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
    };

    const deleteRoom = async (id: number, roomNumber: string) => {
        if (!confirm(`Are you sure you want to delete room #${roomNumber}? This cannot be undone.`)) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
            if (res.ok) {
                setRooms((prev) => prev.filter((r) => r.id !== id));
            } else {
                alert("Failed to delete room.");
            }
        } catch {
            alert("Something went wrong.");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = filter === "All" ? rooms : rooms.filter((r) => r.status === filter);
    const counts = {
        Available:    rooms.filter((r) => r.status === "Available").length,
        Occupied:     rooms.filter((r) => r.status === "Occupied").length,
        Housekeeping: rooms.filter((r) => r.status === "Housekeeping").length,
        Maintenance:  rooms.filter((r) => r.status === "Maintenance").length,
    };

    if (loading) return <div className="p-8 text-gray-400 text-sm">Loading rooms...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <BedDouble className="text-blue-600" size={24} />
                    <h1 className="text-2xl font-bold text-gray-800">Room Status</h1>
                </div>
                <a href="/admin-portal/rooms/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                    + Add Room
                </a>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">View and manage all room statuses.</p>

            <div className="grid grid-cols-4 gap-4 mb-6">
                {(Object.entries(counts) as [RoomStatus, number][]).map(([status, count]) => (
                    <button key={status} onClick={() => setFilter(status)}
                        className={`bg-white rounded-xl border p-4 shadow-sm text-left transition-all ${filter === status ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:border-blue-200"}`}>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${statusConfig[status].style}`}>
                            {statusConfig[status].icon} {status}
                        </span>
                        <p className="text-2xl font-bold text-gray-800">{count}</p>
                        <p className="text-xs text-gray-400">rooms</p>
                    </button>
                ))}
            </div>

            <div className="flex gap-2 mb-4">
                {(["All", "Available", "Occupied", "Housekeeping", "Maintenance"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                            filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
                        }`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-blue-50 text-blue-900 text-xs uppercase tracking-wider">
                            <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Type</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Floor</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Guest</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Check Out</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Update</th>
                            <th className="text-left px-6 py-3.5 font-semibold">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filtered.map((room) => (
                            <tr key={room.id} className="hover:bg-blue-50/40 transition-colors">
                                <td className="px-6 py-3.5 font-bold text-gray-800">#{room.number}</td>
                                <td className="px-6 py-3.5">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[room.type]}`}>
                                        {room.type}
                                    </span>
                                </td>
                                <td className="px-6 py-3.5 text-gray-500">Floor {room.floor}</td>
                                <td className="px-6 py-3.5">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[room.status].style}`}>
                                        {statusConfig[room.status].icon} {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3.5 text-gray-500 text-xs">{room.guestName ?? "—"}</td>
                                <td className="px-6 py-3.5 text-gray-500 text-xs">{room.checkOut ?? "—"}</td>
                                <td className="px-6 py-3.5">
                                    <select
                                        value={room.status}
                                        onChange={(e) => updateStatus(room.id, e.target.value as RoomStatus)}
                                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        <option>Available</option>
                                        <option>Occupied</option>
                                        <option>Housekeeping</option>
                                        <option>Maintenance</option>
                                    </select>
                                </td>
                                <td className="px-6 py-3.5">
                                    <button
                                        onClick={() => deleteRoom(room.id, room.number)}
                                        disabled={deletingId === room.id}
                                        className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                                    >
                                        <Trash2 size={13} />
                                        {deletingId === room.id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}