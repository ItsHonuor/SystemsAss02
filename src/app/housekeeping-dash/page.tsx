"use client";

import { useState, useEffect } from "react";
import { Sparkles, Clock, CheckCircle2, AlertCircle, Timer } from "lucide-react";

type TaskStatus = "Pending" | "In Progress" | "Done" | "Completed";

type Task = {
    id: number;
    roomNumber: string;
    taskType: string;
    priority: string;
    status: TaskStatus;
    assignedTo: string | null;
};

const statusConfig: Record<string, { badge: string; next: string | null; nextLabel: string }> = {
    Pending:      { badge: "bg-yellow-100 text-yellow-700", next: "In Progress", nextLabel: "Start" },
    "In Progress": { badge: "bg-blue-100 text-blue-700",   next: "Completed",   nextLabel: "Mark Done" },
    Done:         { badge: "bg-green-100 text-green-700",   next: null,          nextLabel: "" },
    Completed:    { badge: "bg-green-100 text-green-700",   next: null,          nextLabel: "" },
};

export default function HousekeepingDashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [clockedIn, setClockedIn] = useState(false);
    const [clockLog, setClockLog] = useState<{ type: string; time: string }[]>([]);

    useEffect(() => {
        fetch("/api/housekeeping")
            .then((res) => res.json())
            .then((data) => {
                setTasks(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleClock = () => {
        const now = new Date().toLocaleString("en-GB");
        setClockLog((prev) => [...prev, { type: clockedIn ? "Clock Out" : "Clock In", time: now }]);
        setClockedIn((prev) => !prev);
    };

    const advanceStatus = async (id: number, currentStatus: string) => {
        const next = statusConfig[currentStatus]?.next;
        if (!next) return;

        const completedAt = next === "Completed" ? new Date().toISOString() : null;

        await fetch(`/api/housekeeping/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: next, ...(completedAt && { completedAt }) }),
        });

        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: next as TaskStatus } : t))
        );
    };

    const pending    = tasks.filter((t) => t.status === "Pending").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const done       = tasks.filter((t) => t.status === "Completed" || t.status === "Done").length;

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Sparkles className="text-teal-600" size={24} />
                        <h1 className="text-2xl font-bold text-gray-800">Housekeeping Dashboard</h1>
                    </div>
                    <p className="text-gray-500 text-sm ml-9">Manage your assigned rooms and track your shift.</p>
                </div>

                {/* Clock In/Out */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center min-w-[180px]">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Shift Status</p>
                    <div className={`flex items-center justify-center gap-1.5 mb-3 text-sm font-semibold ${clockedIn ? "text-green-600" : "text-gray-400"}`}>
                        <span className={`w-2 h-2 rounded-full ${clockedIn ? "bg-green-500 animate-pulse" : "bg-gray-300"}`} />
                        {clockedIn ? "Clocked In" : "Not Clocked In"}
                    </div>
                    <button
                        onClick={handleClock}
                        className={`w-full flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                            clockedIn ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-teal-600 text-white hover:bg-teal-700"
                        }`}
                    >
                        <Timer size={13} />
                        {clockedIn ? "Clock Out" : "Clock In"}
                    </button>
                    {clockLog.length > 0 && (
                        <div className="mt-2 text-left">
                            {clockLog.slice(-2).map((entry, i) => (
                                <p key={i} className="text-xs text-gray-400">{entry.type}: {entry.time}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Pending",     value: pending,    icon: AlertCircle,  color: "bg-yellow-100 text-yellow-600" },
                    { label: "In Progress", value: inProgress, icon: Clock,        color: "bg-blue-100 text-blue-600" },
                    { label: "Completed",   value: done,       icon: CheckCircle2, color: "bg-green-100 text-green-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
                        <span className={`p-3 rounded-xl ${color}`}><Icon size={20} /></span>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{value}</p>
                            <p className="text-xs text-gray-500 font-medium">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Task Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                    <h2 className="font-semibold text-gray-800">Today's Tasks</h2>
                    <p className="text-xs text-gray-400">Your assigned rooms for this shift.</p>
                </div>
                {loading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">No tasks assigned.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-teal-50 text-teal-900 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Task Type</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Priority</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tasks.map((task) => {
                                const cfg = statusConfig[task.status] ?? statusConfig["Pending"];
                                return (
                                    <tr key={task.id} className="hover:bg-teal-50/40 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">Room {task.roomNumber}</td>
                                        <td className="px-6 py-4 text-gray-600">{task.taskType}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                task.priority === "High" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                                            }`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {cfg.next ? (
                                                <button
                                                    onClick={() => advanceStatus(task.id, task.status)}
                                                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                                                >
                                                    {cfg.nextLabel}
                                                </button>
                                            ) : (
                                                <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
                                                    <CheckCircle2 size={13} /> Complete
                                                </span>
                                            )}
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