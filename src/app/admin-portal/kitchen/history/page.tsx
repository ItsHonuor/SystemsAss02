import { UtensilsCrossed, CheckCircle2 } from "lucide-react";

const history = [
    { id: 1, orderNum: "#ORD-097", room: "Room 118", items: ["Full English", "Coffee"],         completedAt: "30 Apr, 07:45 AM", total: "£18.50" },
    { id: 2, orderNum: "#ORD-098", room: "Room 203", items: ["Caesar Salad", "Sparkling Water"],completedAt: "30 Apr, 08:10 AM", total: "£14.00" },
    { id: 3, orderNum: "#ORD-095", room: "Room 305", items: ["Pancakes", "Orange Juice"],       completedAt: "29 Apr, 08:30 AM", total: "£12.00" },
    { id: 4, orderNum: "#ORD-094", room: "Room 401", items: ["Club Sandwich", "Tea"],           completedAt: "29 Apr, 12:15 PM", total: "£16.00" },
    ];

    export default function OrderHistoryPage() {
    return (
        <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
            <UtensilsCrossed className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6 ml-9">All completed kitchen orders.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
            <thead>
                <tr className="bg-blue-50 text-blue-900 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3.5 font-semibold">Order</th>
                <th className="text-left px-6 py-3.5 font-semibold">Room</th>
                <th className="text-left px-6 py-3.5 font-semibold">Items</th>
                <th className="text-left px-6 py-3.5 font-semibold">Completed At</th>
                <th className="text-left px-6 py-3.5 font-semibold">Total</th>
                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {history.map((entry) => (
                <tr key={entry.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-blue-700">{entry.orderNum}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-800">{entry.room}</td>
                    <td className="px-6 py-3.5 text-gray-500 text-xs">{entry.items.join(", ")}</td>
                    <td className="px-6 py-3.5 text-gray-400 text-xs">{entry.completedAt}</td>
                    <td className="px-6 py-3.5 font-semibold text-gray-700">{entry.total}</td>
                    <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <CheckCircle2 size={13} /> Completed
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