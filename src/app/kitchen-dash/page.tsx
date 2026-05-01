"use client";

import { useState } from "react";
import { ClipboardList, CheckCircle2 } from "lucide-react";

type Order = {
  id: number;
  orderTime: string;
  room: string;
  items: string[];
};

const mockOrders: Order[] = [
  { id: 1, orderTime: "Apr 30, 2026\n14:05 PM", room: "Room 101", items: ["burger", "paneer"] },
  { id: 2, orderTime: "Apr 30, 2026\n14:18 PM", room: "Room 203", items: ["pasta", "juice"] },
  { id: 3, orderTime: "Apr 30, 2026\n14:22 PM", room: "Room 312", items: ["sandwich", "coffee"] },
];

export default function ActiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-1">
        <ClipboardList className="text-orange-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">Active Orders</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6 ml-9">
        Orders currently being prepared in the kitchen.
      </p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-orange-100 p-16 text-center">
          <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">All orders delivered!</p>
          <p className="text-gray-400 text-sm">No active orders right now.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-orange-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-100 text-orange-900 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3.5 font-semibold">Order Time</th>
                <th className="text-left px-6 py-3.5 font-semibold">Room Number</th>
                <th className="text-left px-6 py-3.5 font-semibold">Items Ordered</th>
                <th className="text-left px-6 py-3.5 font-semibold">Status</th>
                <th className="text-left px-6 py-3.5 font-semibold">Action</th>
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
                    <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      Preparing
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setOrders((prev) => prev.filter((o) => o.id !== order.id))}
                      className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <CheckCircle2 size={13} />
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}