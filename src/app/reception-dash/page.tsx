import { LayoutDashboard, BedDouble, CalendarCheck, Users } from "lucide-react";

const stats = [
    { label: "Rooms Available", value: "18", sub: "6 occupied", icon: BedDouble, color: "bg-purple-100 text-purple-700" },
    { label: "Active Bookings", value: "12", sub: "+5 this week", icon: CalendarCheck, color: "bg-blue-100 text-blue-700" },
    { label: "Guests Today", value: "9", sub: "3 check-ins", icon: Users, color: "bg-emerald-100 text-emerald-700" },
    ];

    const recentBookings = [
    { guest: "James Osei", room: "Room 101", checkIn: "30 Apr", checkOut: "3 May", status: "Checked In" },
    { guest: "Priya Sharma", room: "Room 205", checkIn: "1 May", checkOut: "5 May", status: "Confirmed" },
    { guest: "Lucas Ferreira", room: "Room 312", checkIn: "2 May", checkOut: "4 May", status: "Confirmed" },
    { guest: "Amara Diallo", room: "Room 118", checkIn: "28 Apr", checkOut: "30 Apr", status: "Checked Out" },
    ];

    const statusStyles: Record<string, string> = {
    "Checked In": "bg-green-100 text-green-700",
    "Confirmed": "bg-blue-100 text-blue-700",
    "Checked Out": "bg-gray-100 text-gray-600",
    };

    export default function ReceptionDashboard() {
    return (
        <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
            <LayoutDashboard className="text-purple-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6 ml-9">Welcome back. Here's today's overview.</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
                <span className={`p-2 rounded-lg ${color}`}>
                    <Icon size={16} />
                </span>
                </div>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-400 mt-1">» {sub}</p>
            </div>
            ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
                <h2 className="font-semibold text-gray-800">Recent Bookings</h2>
                <p className="text-xs text-gray-400">Latest guest activity</p>
            </div>
            <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">View all →</button>
            </div>
            <table className="w-full text-sm">
            <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3 font-semibold">Guest</th>
                <th className="text-left px-6 py-3 font-semibold">Room</th>
                <th className="text-left px-6 py-3 font-semibold">Check In</th>
                <th className="text-left px-6 py-3 font-semibold">Check Out</th>
                <th className="text-left px-6 py-3 font-semibold">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {recentBookings.map((b) => (
                <tr key={b.guest} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-800">{b.guest}</td>
                    <td className="px-6 py-3.5 text-gray-500">{b.room}</td>
                    <td className="px-6 py-3.5 text-gray-500">{b.checkIn}</td>
                    <td className="px-6 py-3.5 text-gray-500">{b.checkOut}</td>
                    <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[b.status]}`}>
                        {b.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }