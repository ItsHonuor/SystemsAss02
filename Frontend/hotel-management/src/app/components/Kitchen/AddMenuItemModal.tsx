"use client"
import React, { useState } from "react";
import { MenuItem } from "./types";

const categories = ["Starter", "Main", "Dessert", "Drinks"];
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-orange-300";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (item: MenuItem) => void;
    itemCount: number;
    };

    export const AddMenuItemModal = ({ open, onClose, onAdd, itemCount }: Props) => {
    const [form, setForm] = useState({ name: "", category: "Starter", price: "", image: "" });
    const [error, setError] = useState("");

    if (!open) return null;

    const handleAdd = () => {
        if (!form.name || !form.price) {
        setError("Please fill in all fields.");
        return;
        }
        onAdd({
        id: `M00${itemCount + 1}`,
        name: form.name,
        category: form.category as MenuItem["category"],
        price: Number(form.price),
        available: true,
        image: form.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        });
        setForm({ name: "", category: "Starter", price: "", image: "" });
        setError("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-base font-bold text-stone-800">Add Menu Item</h2>
                <p className="text-xs text-stone-400">Fill in the details below</p>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
            </div>

            {error && <p className="text-red-500 text-xs mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <div className="space-y-4">
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Item Name</label>
                <input type="text" placeholder="e.g. Grilled Chicken" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                {categories.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Price (£)</label>
                <input type="number" placeholder="e.g. 12" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Image URL <span className="text-stone-300">(optional)</span></label>
                <input type="text" placeholder="https://..." value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })} className={inputClass} />
            </div>
            </div>

            <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                Cancel
            </button>
            <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                Add Item
            </button>
            </div>

        </div>
        </div>
    );
    };