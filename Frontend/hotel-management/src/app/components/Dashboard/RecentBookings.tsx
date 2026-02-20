    import React from "react";

    // Mock booking data - replace with real data later
    const bookings = [
    { id: "#B-1042", guest: "James Osei",   room: "Deluxe King 204",     checkIn: "Feb 20", checkOut: "Feb 24", status: "Confirmed",   amount: "£620"   },
    { id: "#B-1041", guest: "Ama Serwaa",   room: "Double Room 112",     checkIn: "Feb 19", checkOut: "Feb 21", status: "Checked In",  amount: "£280"   },
    { id: "#B-1040", guest: "Kwame Asante", room: "Single Room 305",     checkIn: "Feb 18", checkOut: "Feb 20", status: "Checked Out", amount: "£190"   },
    { id: "#B-1039", guest: "Efua Mensah",  room: "Executive Suite 501", checkIn: "Feb 17", checkOut: "Feb 22", status: "Confirmed",   amount: "£1,250" },
    { id: "#B-1038", guest: "Kofi Boateng", room: "Double Room 108",     checkIn: "Feb 16", checkOut: "Feb 18", status: "Checked Out", amount: "£260"   },
    ];

    // Each status gets a different colour badge
    const statusStyles: Record<string, string> = {
    "Confirmed":   "bg-blue-50 text-blue-600",
    "Checked In":  "bg-green-50 text-green-600",
    "Checked Out": "bg-stone-100 text-stone-500",
    };

    const RecentBookings = () => {
    return (
        // Card container
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
            <h2 className="text-sm font-semibold text-stone-700">Recent Bookings</h2>
            <p className="text-xs text-stone-400">Latest reservation activity</p>
            </div>
            <button className="text-xs text-indigo-500 font-medium hover:underline">
            View all
            </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-sm">

            {/* Table headings */}
            <thead>
                <tr className="text-left text-xs text-stone-400 uppercase tracking-wider border-b border-stone-100">
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Room</th>
                <th className="px-5 py-3 font-medium">Check-in</th>
                <th className="px-5 py-3 font-medium">Check-out</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
                </tr>
            </thead>

            {/* Table rows - one per booking */}
            <tbody>
                {bookings.map((row, i) => (
                <tr key={i} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs font-mono text-stone-400">{row.id}</td>
                    <td className="px-5 py-3.5 font-medium text-stone-700">{row.guest}</td>
                    <td className="px-5 py-3.5 text-stone-500">{row.room}</td>
                    <td className="px-5 py-3.5 text-stone-500">{row.checkIn}</td>
                    <td className="px-5 py-3.5 text-stone-500">{row.checkOut}</td>
                    <td className="px-5 py-3.5">
                    {/* Status badge with dynamic colour */}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[row.status]}`}>
                        {row.status}
                    </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-stone-700">{row.amount}</td>
                </tr>
                ))}
            </tbody>

            </table>
        </div>
        </div>
    );
    };

export default RecentBookings;