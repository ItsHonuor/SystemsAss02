"use client";
import React from "react";
import {
    PieChart,  // The main chart container
    Pie,       // The actual donut/pie shape
    Cell,      // Each individual slice of the pie
    Tooltip,   // Popup on hover
    ResponsiveContainer, // Makes it resize with the screen
    } from "recharts";

    // Mock data - each room type with a percentage and colour
const roomData = [
    { name: "Single Room",     value: 30, color: "#6366f1" }, // indigo
    { name: "Double Room",     value: 40, color: "#f472b6" }, // pink
    { name: "Executive Suite", value: 20, color: "#34d399" }, // green
    { name: "Deluxe King",     value: 10, color: "#fbbf24" }, // amber
    ];

const RoomPopularityChart = () => {
    return (
        // Card container
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">

        {/* Card header */}
        <h2 className="text-sm font-semibold text-stone-700">Room Popularity</h2>
        <p className="text-xs text-stone-400 mb-4">Most booked room types</p>

        {/* Donut chart */}
        <ResponsiveContainer width="100%" height={180}>
            <PieChart>
            <Pie
                data={roomData}
                cx="50%"          // Centre horizontally
                cy="50%"          // Centre vertically
                innerRadius={50}  // Makes it a donut (hole in the middle)
                outerRadius={75}  // Outer size of the donut
                paddingAngle={3}  // Small gap between slices
                dataKey="value"   // Which key from data to use as the value
            >
                {/* Loop through each room and give it its colour */}
                {roomData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
                ))}
            </Pie>
            <Tooltip formatter={(v: unknown) => [`${Number(v)}%`, "Share"]} />
            </PieChart>
        </ResponsiveContainer>

        {/* Legend below the chart */}
        <div className="space-y-1.5 mt-2">
            {roomData.map((r) => (
            <div key={r.name} className="flex items-center justify-between text-xs">
                {/* Colour dot + room name */}
                <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                <span className="text-stone-500">{r.name}</span>
                </div>
                {/* Percentage on the right */}
                <span className="font-semibold text-stone-700">{r.value}%</span>
            </div>
            ))}
        </div>

        </div>
    );
    };

export default RoomPopularityChart;