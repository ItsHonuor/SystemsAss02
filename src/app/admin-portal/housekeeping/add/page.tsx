"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2 } from "lucide-react";

type Room = { id: number; roomNumber: string; type: string; };
type Staff = { id: number; firstName: string; lastName: string; role: string; };

export default function AddTaskPage() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        roomNumber: "",
        taskType: "Full Clean",
        priority: "Normal",
        assignedTo: "",
    });

    useEffect(() => {
        fetch("/api/rooms").then((r) => r.json()).then((data) => setRooms(Array.isArray(data) ? data : []));
        fetch("/api/staff").then((r) => r.json()).then((data) => {
            const hk = Array.isArray(data) ? data.filter((s: Staff) => s.role === "Housekeeping") : [];
            setStaff(hk);
        });
    }, []);

    const handleSubmit = async () => {
        if (!form.roomNumber || !form.taskType) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/housekeeping", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomNumber: form.roomNumber,
                    taskType: form.taskType,
                    priority: form.priority,
                    assignedTo: form.assignedTo || null,
                    status: "Pending",
                }),
            });
            if (res.ok) {
                router.push("/admin-portal/housekeeping");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to create task");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-xl">
            <div className="flex items-center gap-3 mb-1">
                <Sparkles className="text-blue-600" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Add Housekeeping Task</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">Assign a cleaning task to a room.</p>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Room *</label>
                    <select
                        value={form.roomNumber}
                        onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                        <option value="">Select Room</option>
                        {rooms.map((r) => (
                            <option key={r.id} value={r.roomNumber}>
                                #{r.roomNumber} — {r.type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Task Type *</label>
                    <select
                        value={form.taskType}
                        onChange={(e) => setForm({ ...form, taskType: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                        <option>Full Clean</option>
                        <option>Linen Change</option>
                        <option>Towel Change</option>
                        <option>Bathroom Clean</option>
                        <option>Turndown Service</option>
                        <option>Inspection</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Priority</label>
                    <select
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                        <option>Normal</option>
                        <option>High</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Assign To (Housekeeping Staff)</label>
                    <select
                        value={form.assignedTo}
                        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                        <option value="">Unassigned</option>
                        {staff.map((s) => (
                            <option key={s.id} value={`${s.firstName} ${s.lastName}`}>
                                {s.firstName} {s.lastName}
                            </option>
                        ))}
                    </select>
                </div>

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
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </div>
        </div>
    );
}