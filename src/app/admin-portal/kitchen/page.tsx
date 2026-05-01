"use client";

import { useState } from "react";
import { UtensilsCrossed, Clock, CheckCircle2, AlertCircle } from "lucide-react";

type OrderStatus = "Pending" | "Preparing" | "Ready";

type Order = {
    id: number;
    orderNum: string;
    room: string;
    items: string[];
    placedAt: string;
    status: OrderStatus;
    };

    const initialOrders: Order[] = [
    { id: 1, orderNum: "#ORD-001", room: "Room 101", items: ["Club Sandwich", "Orange Juice"], placedAt: "08:15 AM", status: "Preparing" },
    { id: 2, orderNum: "#ORD-002", room: "Room 205", items: ["Full English", "Coffee"],         placedAt: "08:30 AM", status: "Pending" },
    { id: 3, orderNum: "#ORD-003", room: "Room 312", items: ["Pancakes", "Tea"],                placedAt: "08:45 AM", status: "Ready" },
    { id: 4, orderNum: "#ORD-004", room: "Room 401", items: ["Caesar Salad"],                   placedAt: "09:00 AM", status: "Pending" },
    ];

    const statusConfig: Record<OrderStatus, { style: string; icon: React.ReactNode; next: OrderStatus | null; nextLabel: string }> = {
    Pending:   { style: "bg-yellow-100 text-yellow-700", icon: <AlertCircle size={11} />, next: "Preparing", nextLabel: "Start Preparing" },
    Preparing: { style: "bg-blue-100 text-blue-700",     icon: <Clock size={11} />,       next: "Ready",     nextLabel: "Mark Ready" },
    Ready:     { style: "bg-green-100 text-green-700",   icon: <CheckCircle2 size={11} />,next: null,        nextLabel: "" },
    };

    export default function ActiveOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    const advance = (id: number) =>
        setOrders((prev) =>
        prev.map((o) => {
            if (o.id !== id) return o;
            const next = statusConfig[o.status].next;
            return next ? { ...o, status: next } : o;
        })
        );

    const counts = {
        Pending:   orders.filter((o) => o.status === "Pending").length,
        Preparing: orders.filter((o) => o.status === "Preparing").length,
        Ready:     orders.filter((o) => o.status === "Ready").length,
    };

    return (
        <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
            <UtensilsCrossed className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Active Orders</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6 ml-9">Monitor and manage current kitchen orders.</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            {(Object.entries(counts) as [OrderStatus, number][]).map(([status, count]) => {
            const cfg = statusConfig[status];
            return (
                <div key={status} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
                <span className={`p-3 rounded-xl ${cfg.style}`}>{cfg.icon}</span>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{count}</p>
                    <p className="text-xs text-gray-500 font-medium">{status}</p>
                </div>
                </div>
            );
            })}
        </div>

        <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => {
            const cfg = statusConfig[order.status];
            return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-700 font-bold text-sm px-3 py-2 rounded-lg">{order.orderNum}</div>
                    <div>
                    <p className="font-semibold text-gray-800">{order.room}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.items.join(", ")}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={10} /> Placed at {order.placedAt}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.style}`}>
                    {cfg.icon} {order.status}
                    </span>
                    {cfg.next && (
                    <button onClick={() => advance(order.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                        {cfg.nextLabel}
                    </button>
                    )}
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
    }