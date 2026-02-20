import React from "react";

// this is the TypeScript interface for the props — basically a blueprint
// that says "hey, whenever you use StatCard you MUST pass in all of these"
// if you forget one, TypeScript will yell at you which is actually super helpful
interface StatCardProps {
    title: string;   // label at the top e.g. "Total Revenue"
    value: string;   // the big number in the middle e.g. "£31,280"
    change: string;  // the % change e.g. "12.5%"
    positive: boolean; // true = going up (green), false = going down (red)
    icon: React.ReactNode; // any React element, in our case the react-icons icons
    accent: string;  // tailwind bg color class for the icon background e.g. "bg-indigo-500"
}

// StatCard is the individual card component used in Grid.tsx
// it shows a single metric with a title, value, change indicator, and coloured icon
const StatCard = ({ title, value, change, positive, icon, accent }: StatCardProps) => {
    return (
        // the card itself — white background, rounded corners, subtle shadow
        <div className="bg-white rounded-2xl p-5 border border-stone-300 shadow-sm flex flex-col gap-4">
            
            {/* top row — title on the left, coloured icon on the right
                justify-between pushes them to opposite ends */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-400 uppercase tracking-widest">{title}</span>
                
                {/* icon background — the color changes based on the accent prop passed in
                    e.g. bg-indigo-500 for revenue, bg-pink-500 for bookings etc. */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-base ${accent}`}>
                    {icon}
                </div>
            </div>

            {/* bottom section — the big value and the change indicator below it */}
            <div>
                <p className="text-2xl font-bold text-stone-800">{value}</p>
                
                {/* change indicator — green with an up arrow if positive, red with a down arrow if not
                    the ternary handles both the colour class and which arrow symbol to show */}
                <p className={`text-xs mt-1 ${positive ? "text-green-500" : "text-red-400"}`}>
                    {positive ? "▲" : "▼"} {change} vs last week
                </p>
            </div>

        </div>
    );
};

export default StatCard;