"use client"
import React, { useState } from "react";
import { Guest } from "./types";
import { AddGuestModal } from "./AddGuestModal";

const initialGuests: Guest[] = [
    { id: "G001", name: "James Osei",   username: "@jamesosei",  phone: "07700900001", email: "james@email.com",  address: "12 Baker St, London",       joinedDate: "Feb 20, 2026" },
    { id: "G002", name: "Ama Serwaa",   username: "@amaserwaa",  phone: "07700900002", email: "ama@email.com",    address: "Walk-in Guest",             joinedDate: "Feb 19, 2026" },
    { id: "G003", name: "Kwame Asante", username: "@kwamea",     phone: "07700900003", email: "kwame@email.com",  address: "34 Oxford Rd, Manchester",  joinedDate: "Feb 18, 2026" },
    { id: "G004", name: "Efua Mensah",  username: "@efuam",      phone: "07700900004", email: "efua@email.com",   address: "56 High St, Birmingham",    joinedDate: "Feb 17, 2026" },
    { id: "G005", name: "Kofi Boateng", username: "@kofib",      phone: "07700900005", email: "kofi@email.com",   address: "78 Church Lane, Leeds",     joinedDate: "Feb 16, 2026" },
    ];

    export const GuestsTable = () => {
    const [guests, setGuests] = useState<Guest[]>(initialGuests);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id: string) => setGuests(prev => prev.filter(g => g.id !== id));
    const handleAdd = (guest: Guest) => setGuests(prev => [...prev, guest]);

    return (
        <>
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <div>
                <h2 className="text-base font-bold text-stone-800">All Guests</h2>
                <p className="text-xs text-stone-400">{guests.length} registered guests</p>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
                + Add Guest
            </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="text-xs text-stone-400 uppercase border-b border-stone-100">
                    <th className="text-left px-6 py-3">Guest</th>
                    <th className="text-left px-6 py-3">Contact Info</th>
                    <th className="text-left px-6 py-3">Address</th>
                    <th className="text-left px-6 py-3">Joined Date</th>
                    <th className="text-left px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {guests.map((g) => (
                    <tr key={g.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">

                    {/* Guest */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <img
                            src={`https://api.dicebear.com/9.x/glass/svg?seed=${g.name}`}
                            className="size-9 rounded-xl shrink-0"
                            alt={g.name}
                        />
                        <div>
                            <p className="font-semibold text-stone-800">{g.name}</p>
                            <p className="text-xs text-stone-400">{g.username}</p>
                        </div>
                        </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                        <p className="text-stone-600">📞 {g.phone}</p>
                        <p className="text-stone-400 text-xs">✉️ {g.email}</p>
                    </td>

                    {/* Address */}
                    <td className="px-6 py-4 text-stone-600 text-xs">{g.address}</td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 text-stone-500 text-xs">{g.joinedDate}</td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors text-stone-400">✏️</button>
                        <button onClick={() => handleDelete(g.id)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-stone-400">🗑️</button>
                        </div>
                    </td>

                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        <AddGuestModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onAdd={handleAdd}
            guestCount={guests.length}
        />
        </>
    );
};