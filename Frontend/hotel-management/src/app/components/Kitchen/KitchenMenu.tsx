"use client"
import React, { useState } from "react";
import { MenuItem } from "./types";
import { AddMenuItemModal } from "./AddMenuItemModal";

const categoryColor: Record<string, string> = {
    Starter:  "bg-yellow-100 text-yellow-700",
    Main:     "bg-blue-100 text-blue-700",
    Dessert:  "bg-pink-100 text-pink-700",
    Drinks:   "bg-green-100 text-green-700",
    };

    const initialItems: MenuItem[] = [
    { id: "M001", name: "Caesar Salad",    category: "Starter", price: 8,  available: true,  image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400" },
    { id: "M002", name: "Grilled Salmon",  category: "Main",    price: 22, available: true,  image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" },
    { id: "M003", name: "Beef Burger",     category: "Main",    price: 16, available: true,  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { id: "M004", name: "Chocolate Cake",  category: "Dessert", price: 7,  available: false, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { id: "M005", name: "Orange Juice",    category: "Drinks",  price: 4,  available: true,  image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400" },
    { id: "M006", name: "Tomato Soup",     category: "Starter", price: 6,  available: true,  image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },
    ];

    export const KitchenMenu = () => {
    const [items, setItems] = useState<MenuItem[]>(initialItems);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
    const handleAdd = (item: MenuItem) => setItems(prev => [...prev, item]);
    const toggleAvailable = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));

    return (
        <>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <div>
            <h2 className="text-base font-bold text-stone-800">Restaurant Menu</h2>
            <p className="text-xs text-stone-400">{items.length} items on the menu</p>
            </div>
            <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
            + Add Item
            </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">

                {/* Image */}
                <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${item.available ? "bg-green-500 text-white" : "bg-red-400 text-white"}`}>
                    {item.available ? "Available" : "Unavailable"}
                </span>
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor[item.category]}`}>
                    {item.category}
                </span>
                </div>

                {/* Content */}
                <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-stone-800 text-sm">{item.name}</h3>
                    <span className="text-orange-600 font-bold text-sm">£{item.price}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <button
                    onClick={() => toggleAvailable(item.id)}
                    className="flex-1 py-1.5 rounded-xl border border-orange-200 text-orange-600 text-xs font-medium hover:bg-orange-50 transition-colors"
                    >
                    {item.available ? "Mark Unavailable" : "Mark Available"}
                    </button>
                    <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                    🗑️
                    </button>
                </div>
                </div>

            </div>
            ))}
        </div>

        <AddMenuItemModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onAdd={handleAdd}
            itemCount={items.length}
        />
        </>
    );
    };