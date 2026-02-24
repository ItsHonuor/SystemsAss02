"use client"
import React, { useState } from "react";
import { Guest } from "./types";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-pink-300";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (guest: Guest) => void;
    guestCount: number;
    };

    export const AddGuestModal = ({ open, onClose, onAdd, guestCount }: Props) => {
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
    const [error, setError] = useState("");

    if (!open) return null;

    const handleAdd = () => {
        if (!form.name || !form.phone || !form.email) {
        setError("Please fill in all required fields.");
        return;
        }
        onAdd({
        id: `G00${guestCount + 1}`,
        name: form.name,
        username: `@${form.name.toLowerCase().replace(" ", "")}`,
        phone: form.phone,
        email: form.email,
        address: form.address || "Walk-in Guest",
        joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        });
        setForm({ name: "", phone: "", email: "", address: "" });
        setError("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-base font-bold text-stone-800">Add New Guest</h2>
                <p className="text-xs text-stone-400">Fill in the guest details</p>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
            </div>

            {error && <p className="text-red-500 text-xs mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <div className="space-y-4">
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Full Name</label>
                <input type="text" placeholder="e.g. John Smith" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Phone</label>
                <input type="text" placeholder="e.g. 07700900006" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Email</label>
                <input type="email" placeholder="e.g. john@email.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Address <span className="text-stone-300">(optional)</span></label>
                <input type="text" placeholder="e.g. 12 Baker St, London" value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })} className={inputClass} />
            </div>
            </div>

            <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                Cancel
            </button>
            <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium transition-colors">
                Add Guest
            </button>
            </div>

        </div>
        </div>
    );
    };