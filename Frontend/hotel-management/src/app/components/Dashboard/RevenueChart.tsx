"use client"; // Needed in Next.js for components that use browser features
import React from "react";
import {
  AreaChart,   // The main chart type (area = line with fill below it)
  Area,        // The actual data line + filled area
  XAxis,       // The horizontal axis (days)
  YAxis,       // The vertical axis (revenue amounts)
  CartesianGrid, // The background grid lines
  Tooltip,     // The popup that shows values when you hover
  ResponsiveContainer, // Makes the chart resize with the screen
} from "recharts";

// This is our mock data - each object is one day with a revenue value
// Later you can replace this with real data from your backend
const revenueData = [
    { day: "Mon", revenue: 2400 },
    { day: "Tue", revenue: 1398 },
    { day: "Wed", revenue: 5800 },
    { day: "Thu", revenue: 3908 },
    { day: "Fri", revenue: 4800 },
    { day: "Sat", revenue: 7200 },
    { day: "Sun", revenue: 6100 },
];

const RevenueChart = () => {
    return (
    // Card container - white box with border and rounded corners
    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
      {/* Card header - title and subtitle */}
    <div className="mb-4">
        <h2 className="text-sm font-semibold text-stone-700">Revenue Trends</h2>
        <p className="text-xs text-stone-400">7-Day Income Overview</p>
    </div>

      {/* ResponsiveContainer makes the chart fill its parent width */}
    <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          {/* Define a gradient fill for under the line - fades from purple to transparent */}
        <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
        </defs>

          {/* Light grey background grid lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f0ef" />

          {/* Bottom axis showing day names - styled to look minimal */}
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />

          {/* Left axis showing revenue numbers */}
        <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />

          {/* Hover tooltip - formats the number as a currency e.g "$2,400" */}
        <Tooltip
            contentStyle={{ borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: 12 }}
            formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
        />

          {/* The actual line + filled area below it */}
        <Area
            type="monotone"       // Smooth curved line
            dataKey="revenue"     // Which key from our data to use
            stroke="#6366f1"      // Line colour (indigo)
            strokeWidth={2.5}     // Line thickness
            fill="url(#revenueGrad)" // Use the gradient we defined above
            dot={{ r: 3, fill: "#6366f1" }}     // Small dot on each data point
            activeDot={{ r: 5 }}                // Bigger dot when hovered
    />

        </AreaChart>
    </ResponsiveContainer>
    </div>
);
};

export default RevenueChart;