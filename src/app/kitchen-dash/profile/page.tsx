"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { User, Clock, CheckCircle2, Calendar, Timer, ChefHat } from "lucide-react";

type LogEntry = {
    date: string;
    clockIn: string;
    clockOut: string;
    hours: string;
};

function calcHours(clockIn: string, clockOut: string): string {
    const parse = (t: string) => {
        const [time, period] = t.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return h * 60 + m;
    };
    const diff = parse(clockOut) - parse(clockIn);
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
}

export default function KitchenProfilePage() {
    const { data: session } = useSession();
    const user = session?.user as any;

    const [clockedIn, setClockedIn] = useState(false);
    const [clockInTime, setClockInTime] = useState<string | null>(null);
    const [log, setLog] = useState<LogEntry[]>([]);

    const handleClock = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-GB", {
            hour: "2-digit", minute: "2-digit", hour12: true
        }).toUpperCase();
        const dateStr = now.toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric"
        });

        if (!clockedIn) {
            setClockInTime(timeStr);
            setClockedIn(true);
            setLog((prev) => [
                { date: dateStr, clockIn: timeStr, clockOut: "—", hours: "In progress" },
                ...prev,
            ]);
        } else {
            const hours = clockInTime ? calcHours(clockInTime, timeStr) : "—";
            setLog((prev) =>
                prev.map((entry, i) =>
                    i === 0 ? { ...entry, clockOut: timeStr, hours } : entry
                )
            );
            setClockedIn(false);
            setClockInTime(null);
        }
    };

    const initials = user?.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    return (
        <div className="p-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
                <User className="text-orange-700" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            </div>

            {/* Profile card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-2xl">
                        {initials}
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-800">{user?.name ?? "Kitchen Staff"}</p>
                        <p className="text-sm text-gray-500">{user?.role ?? "Kitchen Staff"}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} /> Joined Jan 2025
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 size={12} className="text-green-500" /> Active
                            </span>
                            <span className="flex items-center gap-1">
                                <ChefHat size={12} className="text-orange-500" /> Kitchen
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleClock}
                    className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                        clockedIn
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-orange-700 text-white hover:bg-orange-800"
                    }`}
                >
                    <Timer size={14} />
                    {clockedIn ? "Clock Out" : "Clock In"}
                </button>
            </div>

            {/* Clock log */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-orange-700" />
                        <h2 className="font-semibold text-gray-800">Clock-In / Clock-Out Log</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Your recent shift records.</p>
                </div>

                {log.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">
                        No shift records yet. Clock in to start.
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-orange-50 text-orange-900 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Date</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Clock In</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Clock Out</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Hours</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {log.map((entry, i) => (
                                <tr key={i} className="hover:bg-orange-50/40 transition-colors">
                                    <td className="px-6 py-3.5 font-medium text-gray-800">{entry.date}</td>
                                    <td className="px-6 py-3.5 text-gray-600">{entry.clockIn}</td>
                                    <td className="px-6 py-3.5 text-gray-500">{entry.clockOut}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`text-xs font-medium ${
                                            entry.hours === "In progress"
                                                ? "text-orange-600"
                                                : "text-gray-600"
                                        }`}>
                                            {entry.hours}
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