"use client";

import { useEffect, useState } from "react";
import { Sparkles, Trash2, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

type Task = {
    id: number;
    roomNumber: string;
    taskType: string;
    priority: string;
    status: string;
    assignedTo: string | null;
};

const statusStyles: Record<string, string> = {
    Pending:      "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed:    "bg-green-100 text-green-700",
    Done:         "bg-green-100 text-green-700",
};

export default function HousekeepingAdminPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/housekeeping")
            .then((res) => res.json())
            .then((data) => {
                setTasks(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this task?")) return;
        setDeletingId(id);
        const res = await fetch(`/api/housekeeping/${id}`, { method: "DELETE" });
        if (res.ok) setTasks((prev) => prev.filter((t) => t.id !== id));
        setDeletingId(null);
    };

    const counts = {
        pending:    tasks.filter((t) => t.status === "Pending").length,
        inProgress: tasks.filter((t) => t.status === "In Progress").length,
        completed:  tasks.filter((t) => t.status === "Completed" || t.status === "Done").length,
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <Sparkles className="text-blue-600" size={24} />
                    <h1 className="text-2xl font-bold text-gray-800">Housekeeping Tasks</h1>
                </div>
                <Link href="/admin-portal/housekeeping/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                    + Add Task
                </Link>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">Manage and assign housekeeping tasks.</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Pending",     value: counts.pending,    icon: AlertCircle,  color: "bg-yellow-100 text-yellow-600" },
                    { label: "In Progress", value: counts.inProgress, icon: Clock,        color: "bg-blue-100 text-blue-600" },
                    { label: "Completed",   value: counts.completed,  icon: CheckCircle2, color: "bg-green-100 text-green-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
                        <span className={`p-2.5 rounded-xl ${color}`}><Icon size={18} /></span>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{value}</p>
                            <p className="text-xs text-gray-500">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">No tasks yet. Add one above.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-blue-50 text-blue-900 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Task Type</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Priority</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Assigned To</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-blue-50/40 transition-colors">
                                    <td className="px-6 py-3.5 font-medium text-gray-800">Room {task.roomNumber}</td>
                                    <td className="px-6 py-3.5 text-gray-600">{task.taskType}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            task.priority === "High" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                                        }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500 text-xs">{task.assignedTo ?? "—"}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[task.status] ?? "bg-gray-100 text-gray-500"}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            disabled={deletingId === task.id}
                                            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                                        >
                                            <Trash2 size={13} />
                                            {deletingId === task.id ? "Deleting..." : "Delete"}
                                        </button>
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