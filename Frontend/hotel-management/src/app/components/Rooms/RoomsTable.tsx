"use client"
import React, { useState } from "react";
import { Room } from "./types";
import { AddRoomModal } from "./AddRoomModal";
import { MdCleaningServices } from "react-icons/md";

const roomImages: Record<string, string> = {
  "Single Room":     "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
  "Double Room":     "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400",
  "Executive Suite": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
  "Deluxe King":     "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400",
};

const statusColor: Record<string, string> = {
  Available:   "bg-green-100 text-green-700",
  Occupied:    "bg-blue-100 text-blue-700",
  Cleaning:    "bg-orange-100 text-orange-700",
  Maintenance: "bg-red-100 text-red-700",
};

const initialRooms: Room[] = [
  { id: "R001", number: "101", type: "Single Room",     price: 89,  guests: 1, status: "Available"   },
  { id: "R002", number: "102", type: "Double Room",     price: 129, guests: 2, status: "Occupied"    },
  { id: "R003", number: "103", type: "Executive Suite", price: 249, guests: 2, status: "Cleaning"    },
  { id: "R004", number: "104", type: "Deluxe King",     price: 199, guests: 3, status: "Available"   },
  { id: "R005", number: "105", type: "Single Room",     price: 89,  guests: 1, status: "Maintenance" },
  { id: "R003", number: "103", type: "Executive Suite", price: 249, guests: 2, status: "Cleaning"    },
  { id: "R004", number: "104", type: "Deluxe King",     price: 199, guests: 3, status: "Available"   },
  { id: "R005", number: "105", type: "Single Room",     price: 89,  guests: 1, status: "Maintenance" },
];

export const RoomsTable = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: string) => setRooms(prev => prev.filter(r => r.id !== id));
  const handleAdd = (room: Room) => setRooms(prev => [...prev, room]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-stone-800">All Rooms</h2>
          <p className="text-xs text-stone-400">{rooms.length} rooms total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          + Add New Room
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">

            {/* Room Image */}
            <div className="relative">
              <img
                src={roomImages[r.type] || roomImages["Single Room"]}
                alt={r.type}
                className="w-full h-40 object-cover"
              />

              {/* Status badge on image */}
              <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[r.status]}`}>
                {r.status}
              </span>

              {/* Cleaning icon overlay */}
              {r.status === "Cleaning" && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white p-1 rounded-lg">
                  <MdCleaningServices className="text-sm" />
                </div>
              )}

              {/* Room number overlay */}
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-lg">
                Room {r.number}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-stone-800 text-sm">{r.type}</h3>
                <span className="text-blue-600 font-bold text-sm">£{r.price}<span className="text-xs text-stone-400">/night</span></span>
              </div>

              <p className="text-xs text-stone-400 mb-3">👥 {r.guests} guest{r.guests > 1 ? "s" : ""} max</p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 rounded-xl border border-blue-200 text-blue-600 text-xs font-medium hover:bg-blue-50 transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-1.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      <AddRoomModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAdd}
        roomCount={rooms.length}
      />
    </>
  );
};