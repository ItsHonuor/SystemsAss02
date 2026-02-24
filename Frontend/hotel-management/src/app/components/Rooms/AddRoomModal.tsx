"use client"
import React, { useState } from "react";
import { Room } from "./types";

const types = ["Single Room", "Double Room", "Executive Suite", "Deluxe King"];
const statuses = ["Available", "Occupied", "Cleaning", "Maintenance"];
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-blue-300";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (room: Room) => void;
  roomCount: number;
};

export const AddRoomModal = ({ open, onClose, onAdd, roomCount }: Props) => {
  const [form, setForm] = useState({ number: "", type: "Single Room", price: "", guests: "", status: "Available" });
  const [error, setError] = useState("");

  if (!open) return null;

  const handleAdd = () => {
    if (!form.number || !form.price || !form.guests) {
      setError("Please fill in all fields.");
      return;
    }
    onAdd({
      id: `R00${roomCount + 1}`,
      number: form.number,
      type: form.type,
      price: Number(form.price),
      guests: Number(form.guests),
      status: form.status as Room["status"],
    });
    setForm({ number: "", type: "Single Room", price: "", guests: "", status: "Available" });
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-stone-800">Add New Room</h2>
            <p className="text-xs text-stone-400">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
        </div>

        {error && <p className="text-red-500 text-xs mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">Room Number</label>
            <input type="text" placeholder="e.g. 205" value={form.number}
              onChange={e => setForm({ ...form, number: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">Room Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputClass}>
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">Price/Night (£)</label>
              <input type="number" placeholder="e.g. 129" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">Max Guests</label>
              <input type="number" placeholder="e.g. 2" value={form.guests}
                onChange={e => setForm({ ...form, guests: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputClass}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
            Add Room
          </button>
        </div>

      </div>
    </div>
  );
};