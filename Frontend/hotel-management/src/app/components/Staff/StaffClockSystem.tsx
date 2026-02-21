"use client"

import React, { useState } from "react";
import { MdAccessTime } from "react-icons/md";

const initialStaff = [
    { id: "EMP001", name: "James Osei",   role: "Receptionist" },
    { id: "EMP002", name: "Ama Serwaa",   role: "Housekeeping" },
    { id: "EMP003", name: "Kwame Asante", role: "Kitchen"      },
    { id: "EMP004", name: "Efua Mensah",  role: "Manager"      },
    { id: "EMP005", name: "Kofi Boateng", role: "Security"     },
    ];

    type LogEntry = {
    staffId: string;
    type: "IN" | "OUT";
    time: string;
    };

    export const StaffClockSystem = () => {
    const [clockedIn, setClockedIn] = useState<Record<string, boolean>>({});
    const [log, setLog] = useState<LogEntry[]>([]);
    const [selectedId, setSelectedId] = useState(initialStaff[0].id);

    const selectedStaff = initialStaff.find(s => s.id === selectedId)!;
    const isIn = clockedIn[selectedId];

    const handleClock = () => {
        const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setClockedIn(prev => ({ ...prev, [selectedId]: !isIn }));
        setLog(prev => [{ staffId: selectedId, type: isIn ? "OUT" : "IN", time: now }, ...prev]);
    };

    return (
        <div className="grid grid-cols-3 gap-6">

        {/* Clock In Panel */}
        <div className="col-span-1 bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col items-center gap-6">
            <div>
            <h2 className="text-base font-bold text-stone-800 text-center">Clock In / Out</h2>
            <p className="text-xs text-stone-400 text-center mt-1">Select staff member and clock in</p>
            </div>

            {/* Staff Selector */}
            <div className="w-full space-y-2">
            {initialStaff.map(s => (
                <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all border ${
                    selectedId === s.id
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-stone-100 hover:bg-stone-50"
                }`}
                >
                <div className="relative shrink-0">
                    <img
                    src={`https://api.dicebear.com/9.x/glass/svg?seed=${s.name}`}
                    className="size-9 rounded-xl"
                    alt={s.name}
                    />
                    <div className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white ${
                    clockedIn[s.id] ? "bg-green-400" : "bg-stone-300"
                    }`} />
                </div>
                <div className="text-left">
                    <p className={`text-sm font-semibold ${selectedId === s.id ? "text-indigo-700" : "text-stone-800"}`}>{s.name}</p>
                    <p className="text-xs text-stone-400">{s.role}</p>
                </div>
                <div className="ml-auto">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    clockedIn[s.id] ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"
                    }`}>
                    {clockedIn[s.id] ? "In" : "Out"}
                    </span>
                </div>
                </button>
            ))}
            </div>

            {/* Clock Button */}
            <button
            onClick={handleClock}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                isIn
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            >
            {isIn ? `⏹ Clock Out ${selectedStaff.name}` : `▶ Clock In ${selectedStaff.name}`}
            </button>
        </div>

        {/* Activity Log */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <div>
                <h2 className="text-base font-bold text-stone-800">Clock Activity Log</h2>
                <p className="text-xs text-stone-400">Today's clock in/out history</p>
            </div>
            <MdAccessTime className="text-indigo-400 text-xl" />
            </div>

            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {log.length === 0 ? (
                <div className="text-center py-12">
                <p className="text-stone-300 text-4xl mb-2">🕐</p>
                <p className="text-stone-400 text-sm">No activity yet today</p>
                <p className="text-stone-300 text-xs">Clock in a staff member to get started</p>
                </div>
            ) : (
                log.map((entry, i) => {
                const staff = initialStaff.find(s => s.id === entry.staffId)!;
                return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <img
                        src={`https://api.dicebear.com/9.x/glass/svg?seed=${staff.name}`}
                        className="size-9 rounded-xl shrink-0"
                        alt={staff.name}
                    />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-stone-800">{staff.name}</p>
                        <p className="text-xs text-stone-400">{staff.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        entry.type === "IN"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}>
                        {entry.type === "IN" ? "▶ Clocked In" : "⏹ Clocked Out"}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{entry.time}</span>
                    </div>
                );
                })
            )}
            </div>
        </div>

        </div>
    );
    };