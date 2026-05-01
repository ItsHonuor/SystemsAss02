"use client";

import { useEffect, useState } from "react";
import { History, CheckCircle2 } from "lucide-react";

type Task = {
    id: number;
    roomNumber: string;
    taskType: string;
    status: string;
    completedAt: string | null;
};

export default function CleaningHistoryPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/housekeeping")
            .then((res) => res.json())
            .then((data) => {
                const completed = Array.isArray(data)
                    ? data.filter((t: Task) => t.status === "Completed")
                    : [];
                setTasks(completed);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-1">
                <History className="text-teal-600" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Cleaning History</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">All completed housekeeping tasks.</p>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading history...</div>
                ) : tasks.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">No completed tasks yet.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-teal-50 text-teal-900 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Task Type</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Completed At</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-teal-50/40 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">Room {task.roomNumber}</td>
                                    <td className="px-6 py-4 text-gray-600">{task.taskType}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {task.completedAt
                                            ? new Date(task.completedAt).toLocaleString("en-GB", {
                                                day: "numeric", month: "short", year: "numeric",
                                                hour: "2-digit", minute: "2-digit"
                                              })
                                            : "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                                            <CheckCircle2 size={13} /> Completed
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