"use client";

import { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

type RoomStatus = "Available" | "Occupied" | "Housekeeping" | "Maintenance" | "Dirty";

type Room = {
    id: number;
    roomNumber: string;
    type: string;
    status: RoomStatus;
    guestName?: string;
    checkOut?: string;
};

const statusConfig: Record<string, { dot: string; badge: string; border: string }> = {
    Available:    { dot: "bg-green-500",  badge: "bg-green-100 text-green-700",   border: "border-green-200" },
    Occupied:     { dot: "bg-red-500",    badge: "bg-red-100 text-red-700",       border: "border-red-200" },
    Housekeeping: { dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700", border: "border-yellow-200" },
    Dirty:        { dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700", border: "border-yellow-200" },
    Maintenance:  { dot: "bg-gray-400",   badge: "bg-gray-100 text-gray-600",     border: "border-gray-200" },
};

const statusNotes: Record<string, string> = {
    Housekeeping: "Needs cleaning before check-in.",
    Dirty:        "Needs cleaning before check-in.",
    Occupied:     "Guest checked in.",
    Maintenance:  "Under maintenance.",
    Available:    "",
};

export default function RoomStatusPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editStatus, setEditStatus] = useState<RoomStatus>("Available");

    useEffect(() => {
        fetch("/api/rooms")
            .then((res) => res.json())
            .then((data) => {
                setRooms(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSave = async (id: number) => {
        await fetch(`/api/rooms/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: editStatus }),
        });
        setRooms((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: editStatus } : r))
        );
        setEditingId(null);
    };

    if (loading) return <div className="p-8 text-gray-400 text-sm">Loading rooms...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-bold text-gray-800">Room Status</h1>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    {Object.entries(statusConfig).slice(0, 4).map(([key, val]) => (
                        <span key={key} className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
                            {key}
                        </span>
                    ))}
                </div>
            </div>
            <p className="text-gray-500 text-sm mb-6">Live view of hotel occupancy and housekeeping status.</p>

            <div className="grid grid-cols-3 gap-4">
                {rooms.map((room) => {
                    const cfg = statusConfig[room.status] ?? statusConfig["Available"];
                    const note = statusNotes[room.status] ?? "";
                    const isEditing = editingId === room.id;

                    return (
                        <div key={room.id} className={`bg-white rounded-xl border-2 p-5 relative ${cfg.border}`}>
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-xl font-bold text-gray-800">{room.roomNumber}</span>
                                {isEditing ? (
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => handleSave(room.id)} className="text-green-600 hover:text-green-800">
                                            <Check size={15} />
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="text-red-400 hover:text-red-600">
                                            <X size={15} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setEditingId(room.id); setEditStatus(room.status); }}
                                        className="text-yellow-500 hover:text-yellow-700"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                )}
                            </div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{room.type}</p>

                            {isEditing ? (
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value as RoomStatus)}
                                    className="mt-2 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                                >
                                    <option>Available</option>
                                    <option>Occupied</option>
                                    <option>Housekeeping</option>
                                    <option>Maintenance</option>
                                </select>
                            ) : (
                                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold ${cfg.badge}`}>
                                    {room.status.toUpperCase()}
                                </span>
                            )}

                            {!isEditing && note && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">⏰ Housekeeping Pending</p>
                                    <p className="text-xs text-yellow-600 italic mt-0.5">{note}</p>
                                </div>
                            )}

                            {!isEditing && room.guestName && room.status === "Occupied" && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">👤 {room.guestName}</p>
                                    {room.checkOut && (
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            Check-out: {new Date(room.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}