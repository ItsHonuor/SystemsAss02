"use client"
import React, { useState } from "react";
import { AddEmployeeModal } from "./AddEmployeeModal";

const roleBadgeColor: Record<string, string> = {
    Receptionist: "bg-green-100 text-green-700",
    Housekeeping: "bg-purple-100 text-purple-700",
    Kitchen:      "bg-orange-100 text-orange-700",
    Manager:      "bg-blue-100 text-blue-700",
    Security:     "bg-red-100 text-red-700",
    };

    export type Staff = {
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    salary: number;
    exp: number;
    clockedIn: boolean;
    };

    export const initialStaff: Staff[] = [
    { id: "EMP001", name: "James Osei",   role: "Receptionist", phone: "07700900001", email: "james@hotel.com",  salary: 28000, exp: 3,  clockedIn: true  },
    { id: "EMP002", name: "Ama Serwaa",   role: "Housekeeping", phone: "07700900002", email: "ama@hotel.com",    salary: 24000, exp: 5,  clockedIn: true  },
    { id: "EMP003", name: "Kwame Asante", role: "Kitchen",      phone: "07700900003", email: "kwame@hotel.com",  salary: 26000, exp: 7,  clockedIn: false },
    { id: "EMP004", name: "Efua Mensah",  role: "Manager",      phone: "07700900004", email: "efua@hotel.com",   salary: 45000, exp: 10, clockedIn: true  },
    { id: "EMP005", name: "Kofi Boateng", role: "Security",     phone: "07700900005", email: "kofi@hotel.com",   salary: 25000, exp: 2,  clockedIn: false },
    ];

    export const StaffTable = () => {
    const [staff, setStaff] = useState<Staff[]>(initialStaff);
    const [showModal, setShowModal] = useState(false);

    const toggleClock = (id: string) => {
        setStaff(prev => prev.map(s => s.id === id ? { ...s, clockedIn: !s.clockedIn } : s));
    };

    const handleDelete = (id: string) => {
        setStaff(prev => prev.filter(s => s.id !== id));
    };

    const handleAdd = (newStaff: Staff) => {
        setStaff(prev => [...prev, newStaff]);
    };

    return (
        <>
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <div>
                <h2 className="text-base font-bold text-stone-800">All Employees</h2>
                <p className="text-xs text-stone-400">{staff.length} staff members</p>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
                + Add New Employee
            </button>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="text-xs text-stone-400 uppercase border-b border-stone-100">
                    <th className="text-left px-6 py-3">Employee</th>
                    <th className="text-left px-6 py-3">Role</th>
                    <th className="text-left px-6 py-3">Contact</th>
                    <th className="text-left px-6 py-3">Salary</th>
                    <th className="text-left px-6 py-3">Exp (Yrs)</th>
                    <th className="text-left px-6 py-3">Shift Status</th>
                    <th className="text-left px-6 py-3">Clock In/Out</th>
                    <th className="text-left px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {staff.map((s) => (
                    <tr key={s.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                            <img src={`https://api.dicebear.com/9.x/glass/svg?seed=${s.name}`} alt={s.name} className="size-9 rounded-xl" />
                            <div className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white ${s.clockedIn ? "bg-green-400" : "bg-stone-300"}`} />
                        </div>
                        <div>
                            <p className="font-semibold text-stone-800">{s.name}</p>
                            <p className="text-xs text-stone-400">ID: {s.id}</p>
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadgeColor[s.role] || "bg-stone-100 text-stone-600"}`}>
                        {s.role}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <p className="text-stone-600">📞 {s.phone}</p>
                        <p className="text-stone-400 text-xs">✉️ {s.email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-700">£{s.salary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-stone-600">{s.exp} yrs</td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.clockedIn ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>
                        {s.clockedIn ? "🟢 On Shift" : "⚪ Off Shift"}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <button
                        onClick={() => toggleClock(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                            s.clockedIn ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                        >
                        {s.clockedIn ? "Clock Out" : "Clock In"}
                        </button>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors text-stone-400">✏️</button>
                        <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-stone-400">🗑️</button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        <AddEmployeeModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onAdd={handleAdd}
            staffCount={staff.length}
        />
        </>
    );
    };