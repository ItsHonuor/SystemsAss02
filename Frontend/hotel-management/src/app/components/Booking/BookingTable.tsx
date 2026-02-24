"use client"
import React, { useState } from "react";
import { Booking } from "./types";
import { AddBookingModal } from "./AddBookingModal";

// Maps each status string to a Tailwind colour combo so the badge
// automatically turns the right colour without any if/else logic.
const statusColor: Record<string, string> = {
    Confirmed:    "bg-blue-100 text-blue-700",
    "Checked In": "bg-green-100 text-green-700",
    "Checked Out":"bg-stone-100 text-stone-600",
    Completed:    "bg-purple-100 text-purple-700",
    Cancelled:    "bg-red-100 text-red-600",
};

// The starting data shown when the page first loads.
const initialBookings: Booking[] = [
    { id: "B-1042", guestName: "James Osei",   guestId: "G001", room: "Room 204", roomType: "Deluxe King",     checkInPlan: "Feb 20", checkInActual: "15:08 Feb 20", checkOutPlan: "Feb 24", checkOutActual: "-",           status: "Confirmed"    },
    { id: "B-1041", guestName: "Ama Serwaa",   guestId: "G002", room: "Room 112", roomType: "Double Room",     checkInPlan: "Feb 19", checkInActual: "14:30 Feb 19", checkOutPlan: "Feb 21", checkOutActual: "-",           status: "Checked In"   },
    { id: "B-1040", guestName: "Kwame Asante", guestId: "G003", room: "Room 305", roomType: "Single Room",     checkInPlan: "Feb 18", checkInActual: "13:00 Feb 18", checkOutPlan: "Feb 20", checkOutActual: "11:00 Feb 20",status: "Completed"    },
    { id: "B-1039", guestName: "Efua Mensah",  guestId: "G004", room: "Room 501", roomType: "Executive Suite", checkInPlan: "Feb 17", checkInActual: "16:00 Feb 17", checkOutPlan: "Feb 22", checkOutActual: "-",           status: "Confirmed"    },
    { id: "B-1038", guestName: "Kofi Boateng", guestId: "G005", room: "Room 108", roomType: "Double Room",     checkInPlan: "Feb 16", checkInActual: "12:00 Feb 16", checkOutPlan: "Feb 18", checkOutActual: "10:30 Feb 18",status: "Completed"    },
];

export const BookingTable = () => {

    // "bookings" is the live list. Any add or delete updates this and React re-renders the table instantly.
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);

    // Controls whether the "New Booking" modal is visible or hidden.
    const [showModal, setShowModal] = useState(false);

    // Delete: keep every booking EXCEPT the one whose id matches.
    const handleDelete = (id: string) => setBookings(prev => prev.filter(b => b.id !== id));

    // Add: take the existing list and tack the new booking onto the end.
    const handleAdd = (booking: Booking) => setBookings(prev => [...prev, booking]);

    return (
        <>
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <div>
                <h2 className="text-base font-bold text-stone-800">All Bookings</h2>
                {/* bookings.length always reflects the current count in real time */}
                <p className="text-xs text-stone-400">{bookings.length} bookings total</p>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
                + New Booking
            </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="text-xs text-stone-400 uppercase border-b border-stone-100">
                    <th className="text-left px-6 py-3">Guest Info</th>
                    <th className="text-left px-6 py-3">Room</th>
                    <th className="text-left px-6 py-3">Check In</th>
                    <th className="text-left px-6 py-3">Check Out</th>
                    <th className="text-left px-6 py-3">Status</th>
                    <th className="text-left px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* Loop over every booking and render one <tr> row per booking */}
                {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">

                    {/* Guest Info */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        {/* Avatar generated from the guest's name — same name always gives the same avatar */}
                        <img
                            src={`https://api.dicebear.com/9.x/glass/svg?seed=${b.guestName}`}
                            className="size-9 rounded-xl shrink-0"
                            alt={b.guestName}
                        />
                        <div>
                            <p className="font-semibold text-stone-800">{b.guestName}</p>
                            <p className="text-xs text-stone-400">ID: {b.guestId}</p>
                        </div>
                        </div>
                    </td>

                    {/* Room */}
                    <td className="px-6 py-4">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">{b.room}</span>
                        <p className="text-xs text-stone-400 mt-1">{b.roomType}</p>
                    </td>

                    {/* Check In */}
                    <td className="px-6 py-4">
                        <p className="text-xs text-stone-400 uppercase font-medium">Plan</p>
                        <p className="text-stone-700 font-medium">{b.checkInPlan}</p>
                        <p className="text-xs text-green-500 uppercase font-medium mt-1">Actual</p>
                        <p className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-lg inline-block">{b.checkInActual}</p>
                    </td>

                    {/* Check Out */}
                    <td className="px-6 py-4">
                        <p className="text-xs text-stone-400 uppercase font-medium">Plan</p>
                        <p className="text-stone-700 font-medium">{b.checkOutPlan}</p>
                        <p className="text-xs text-orange-500 uppercase font-medium mt-1">Actual</p>
                        <p className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg inline-block">{b.checkOutActual}</p>
                    </td>

                    {/* Status — looks up the right colour from statusColor at the top */}
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[b.status]}`}>
                        {b.status}
                        </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors text-stone-400">✏️</button>
                        <button onClick={() => handleDelete(b.id)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-stone-400">🗑️</button>
                        </div>
                    </td>

                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* The modal lives here but stays hidden until showModal is true */}
        <AddBookingModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onAdd={handleAdd}
            bookingCount={bookings.length}
        />
        </>
    );
};