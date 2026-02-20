    import React from "react";

    // 📊 This component shows a quick overview of each room type
    // with a progress bar showing how full each one is
    const roomStats = [
    { type: "Single Room",     total: 20, occupied: 14, color: "bg-indigo-500" },
    { type: "Double Room",     total: 15, occupied: 10, color: "bg-pink-500"   },
    { type: "Executive Suite", total: 10, occupied: 6,  color: "bg-emerald-500"},
    { type: "Deluxe King",     total: 5,  occupied: 3,  color: "bg-amber-500"  },
    ];

    const OccupancyStats = () => {
    return (
        // 🃏 White card container
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">

        {/* Card header */}
        <h2 className="text-sm font-semibold text-stone-700">Room Occupancy</h2>
        <p className="text-xs text-stone-400 mb-4">Current occupancy by room type</p>
        
        {/* Loop through each room type and show a progress bar */}
        <div className="space-y-4">
            {roomStats.map((room) => {
            // Calculate the percentage e.g 14/20 = 70%
            const percentage = Math.round((room.occupied / room.total) * 100);

            return (
                <div key={room.type}>

                {/* Row: room name on left, numbers on right */}
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-stone-600">{room.type}</span>
                    <span className="text-xs text-stone-400">
                    {room.occupied} / {room.total} rooms
                    <span className="ml-2 font-semibold text-stone-600">{percentage}%</span>
                    </span>
                </div>

                {/* Progress bar background (grey track) */}
                <div className="w-full bg-stone-100 rounded-full h-2">
                    {/* Coloured fill - width is based on the percentage */}
                    <div
                    className={`h-2 rounded-full ${room.color}`}
                    style={{ width: `${percentage}%` }}
                    />
                </div>

                </div>
            );
            })}
        </div>

        </div>
    );
    };

    export default OccupancyStats;