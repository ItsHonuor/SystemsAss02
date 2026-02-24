"use client"
import React, { useState } from "react";
import { Booking } from "./types";

const roomOptions = ["Room 101 - Single Room", "Room 102 - Double Room", "Room 103 - Executive Suite", "Room 104 - Deluxe King"];
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-green-300";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (booking: Booking) => void;
    bookingCount: number;
};

export const AddBookingModal = ({ open, onClose, onAdd, bookingCount }: Props) => {

    // "form" holds everything the user is typing into the inputs. 
    // setForm() is how we update it when they type something new.
    const [form, setForm] = useState({ guestName: "", room: "Room 101 - Single Room", checkIn: "", checkOut: "" });

    // "error" is the message we show if the user tries to submit without filling everything in.
    const [error, setError] = useState("");

    // If the modal isn't supposed to be open, render nothing at all.
    if (!open) return null;

    const handleAdd = () => {
        // Basic validation — don't let them submit an incomplete form.
        if (!form.guestName || !form.checkIn || !form.checkOut) {
            setError("Please fill in all fields.");
            return;
        }

        // The room option looks like "Room 101 - Single Room", so we split it
        // into two parts: room = "Room 101", roomType = "Single Room".
        const [room, roomType] = form.room.split(" - ");

        // Build the new booking object and pass it up to the parent component.
        onAdd({
            id: `B-${1042 + bookingCount + 1}`,
            guestName: form.guestName,
            guestId: `G00${bookingCount + 6}`,
            room,
            roomType,
            checkInPlan: form.checkIn,
            checkInActual: "-",
            checkOutPlan: form.checkOut,
            checkOutActual: "-",
            status: "Confirmed",
        });

        // Reset the form back to empty so it's clean next time the modal opens.
        setForm({ guestName: "", room: "Room 101 - Single Room", checkIn: "", checkOut: "" });
        setError("");
        onClose();
    };

    return (
        // Dark overlay behind the modal — clicking outside does nothing here, but it dims the page.
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-base font-bold text-stone-800">New Booking</h2>
                        <p className="text-xs text-stone-400">Fill in the guest details</p>
                    </div>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
                </div>

                {/* Only shows up if "error" has text in it */}
                {error && <p className="text-red-500 text-xs mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-stone-600 block mb-1">Guest Name</label>
                        {/* Every keystroke updates form.guestName via setForm */}
                        <input type="text" placeholder="e.g. John Smith" value={form.guestName}
                            onChange={e => setForm({ ...form, guestName: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-stone-600 block mb-1">Room</label>
                        <select value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} className={inputClass}>
                            {roomOptions.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-stone-600 block mb-1">Check In</label>
                            <input type="date" value={form.checkIn}
                                onChange={e => setForm({ ...form, checkIn: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-stone-600 block mb-1">Check Out</label>
                            <input type="date" value={form.checkOut}
                                onChange={e => setForm({ ...form, checkOut: e.target.value })} className={inputClass} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                        Cancel
                    </button>
                    {/* Clicking this runs handleAdd which validates, builds the booking, and closes the modal */}
                    <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors">
                        Add Booking
                    </button>
                </div>

            </div>
        </div>
    );
};