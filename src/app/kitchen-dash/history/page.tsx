import { History, CheckCircle2 } from "lucide-react";

const orders = [
    { id: 1, orderTime: "Nov 30, 2025\n13:13 PM", room: "Room 101", items: ["burger", "paneer"] },
    { id: 2, orderTime: "Nov 30, 2025\n10:50 AM", room: "Room 102", items: ["burger", "paneer"] },
    { id: 3, orderTime: "Nov 30, 2025\n10:48 AM", room: "Room 102", items: ["burger", "paneer"] },
    { id: 4, orderTime: "Nov 30, 2025\n10:07 AM", room: "Room 102", items: ["burger", "paneer"] },
    ];

    export default function OrderHistoryPage() {
    return (
        <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
            <History className="text-orange-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6 ml-9">All completed and delivered orders.</p>

        <div className="bg-white rounded-xl border border-orange-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
            <thead>
                <tr className="bg-orange-100 text-orange-900 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3.5 font-semibold">Order Time</th>
                <th className="text-left px-6 py-3.5 font-semibold">Room Number</th>
                <th className="text-left px-6 py-3.5 font-semibold">Items Ordered</th>
                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
                {orders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/60 transition-colors">
                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-pre-line leading-5">
                    {order.orderTime}
                    </td>
                    <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full text-xs font-medium">
                        {order.room}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                    {order.items.map((item) => (
                        <div key={item}>• {item}</div>
                    ))}
                    </td>
                    <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <CheckCircle2 size={13} />
                        Delivered
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