"use client"
import React, { useState } from "react";
import { Staff } from "./types";

// the list of roles staff can have
const roles = ["Receptionist", "Housekeeping", "Kitchen", "Manager", "Security"];

// props = what this component needs from the parent
type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (staff: Staff) => void;
    staffCount: number;
    };

    export const AddEmployeeModal = ({ open, onClose, onAdd, staffCount }: Props) => {
    
    // form state - tracks what the user types
    const [form, setForm] = useState({
        name: "", role: "Receptionist", phone: "", email: "", salary: "", exp: ""
    });
    const [error, setError] = useState("");

    // don't show anything if modal is closed
    if (!open) return null;

    // runs when user clicks "Add Employee"
    const handleAdd = () => {
        // check all fields are filled
        if (!form.name || !form.phone || !form.email || !form.salary || !form.exp) {
        setError("Please fill in all fields.");
        return;
        }

        // pass the new staff up to the parent
        onAdd({
        id: `EMP00${staffCount + 1}`,
        name: form.name,
        role: form.role,
        phone: form.phone,
        email: form.email,
        salary: Number(form.salary),
        exp: Number(form.exp),
        clockedIn: false,
        });

        // reset and close
        setForm({ name: "", role: "Receptionist", phone: "", email: "", salary: "", exp: "" });
        setError("");
        onClose();
    };

  // helper so we don't repeat className on every input
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-indigo-300";

    return (
        // dark background behind modal
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        
        {/* white modal box */}
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {/* top row - title + close button */}
            <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-base font-bold text-stone-800">Add New Employee</h2>
                <p className="text-xs text-stone-400">Fill in the details below</p>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
            </div>

            {/* error message if fields are empty */}
            {error && <p className="text-red-500 text-xs mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            {/* form fields */}
            <div className="space-y-4">
            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Full Name</label>
                <input type="text" placeholder="e.g. John Smith" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={inputClass} />
            </div>

            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputClass}>
                {roles.map(r => <option key={r}>{r}</option>)}
                </select>
            </div>

            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Phone</label>
                <input type="text" placeholder="e.g. 07700900006" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className={inputClass} />
            </div>

            <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Email</label>
                <input type="email" placeholder="e.g. john@hotel.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={inputClass} />
            </div>

            {/* salary and experience side by side */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Salary (£)</label>
                <input type="number" placeholder="e.g. 28000" value={form.salary}
                    onChange={e => setForm({ ...form, salary: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Experience (Yrs)</label>
                <input type="number" placeholder="e.g. 3" value={form.exp}
                    onChange={e => setForm({ ...form, exp: e.target.value })}
                    className={inputClass} />
                </div>
            </div>
            </div>

            {/* cancel + add buttons */}
            <div className="flex gap-3 mt-6">
            <button onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                Cancel
            </button>
            <button onClick={handleAdd}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
                Add Employee
            </button>
            </div>

        </div>
        </div>
    );
    };