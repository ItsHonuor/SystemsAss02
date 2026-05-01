"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, CheckCircle2 } from "lucide-react";

type Room = {
    id: number;
    roomNumber: string;
    type: string;
    floor: number;
    status: string;
    price: number;
};

export default function WalkInPage() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        room: "",
        checkIn: "",
        checkOut: "",
        adults: "1",
    });

    useEffect(() => {
        fetch("/api/rooms")
            .then((res) => res.json())
            .then((data) => {
                const available = Array.isArray(data)
                    ? data.filter((r: Room) => r.status === "Available")
                    : [];
                setRooms(available);
            })
            .catch(() => setError("Failed to load rooms"));
    }, []);

    const getNights = () => {
        if (!form.checkIn || !form.checkOut) return 0;
        const diff = new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime();
        return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    };

    const selectedRoom = rooms.find((r) => r.roomNumber === form.room);
    const nights = getNights();
    const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

    const handleSubmit = async () => {
        if (!form.firstName || !form.lastName || !form.room || !form.checkIn || !form.checkOut) {
            setError("Please fill in all required fields.");
            return;
        }
        if (nights <= 0) {
            setError("Check-out must be after check-in.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guestName: `${form.firstName} ${form.lastName}`,
                    roomNumber: form.room,
                    checkIn: form.checkIn,
                    checkOut: form.checkOut,
                    totalPrice,
                    status: "Checked In",
                }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin-portal/bookings");
            } else {
                setError(data.error || "Failed to create booking");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const field = (label: string, key: keyof typeof form, type = "text", placeholder = "") => (
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
            <input
                type={type}
                placeholder={placeholder || label.replace(" *", "")}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );

    return (
        <div className="p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-1">
                <UserPlus className="text-blue-600" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Walk-in Booking</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">Register a guest who has arrived without a prior booking.</p>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                {/* Guest Details */}
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Guest Details</p>
                    <div className="grid grid-cols-2 gap-4">
                        {field("First Name *", "firstName")}
                        {field("Last Name *", "lastName")}
                        {field("Email", "email", "email", "guest@email.com")}
                        {field("Phone", "phone", "tel", "07700 000000")}
                    </div>
                </div>

                {/* Booking Details */}
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Booking Details</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Room *</label>
                            <select
                                value={form.room}
                                onChange={(e) => setForm({ ...form, room: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            >
                                <option value="">Select Room</option>
                                {rooms.map((r) => (
                                    <option key={r.id} value={r.roomNumber}>
                                        #{r.roomNumber} — {r.type} · £{r.price}/night
                                    </option>
                                ))}
                            </select>
                        </div>
                        {field("Check In *", "checkIn", "date")}
                        {field("Check Out *", "checkOut", "date")}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Adults</label>
                            <select
                                value={form.adults}
                                onChange={(e) => setForm({ ...form, adults: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            >
                                {["1", "2", "3", "4"].map((n) => <option key={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Price summary */}
                {nights > 0 && selectedRoom && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-4 space-y-2">
                        <div className="flex justify-between text-sm text-blue-700">
                            <span>Room #{selectedRoom.roomNumber} ({selectedRoom.type})</span>
                            <span>£{selectedRoom.price}/night</span>
                        </div>
                        <div className="flex justify-between text-sm text-blue-700">
                            <span>Duration</span>
                            <span>{nights} night{nights > 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex justify-between font-bold text-blue-800 border-t border-blue-200 pt-2 mt-1">
                            <span>Total</span>
                            <span>£{totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-3 justify-end pt-2">
                    <button
                        onClick={() => router.back()}
                        className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
                    >
                        <CheckCircle2 size={16} />
                        {loading ? "Creating..." : "Create Booking"}
                    </button>
                </div>
            </div>
        </div>
    );
}