import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { MdCleaningServices } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineCurrencyPound } from "react-icons/hi";

const cards = [
  { title: "Total Rooms",     value: "50",   sub: "Across all types",   Icon: IoBedOutline,           bg: "bg-blue-50",   icon: "text-blue-600"   },
  { title: "Available",       value: "23",   sub: "Ready to book",      Icon: FaRegCheckCircle,       bg: "bg-green-50",  icon: "text-green-600"  },
  { title: "Needs Cleaning",  value: "4",    sub: "Flagged by staff",   Icon: MdCleaningServices,     bg: "bg-orange-50", icon: "text-orange-600" },
  { title: "Revenue Today",   value: "£620", sub: "From 3 checkouts",   Icon: HiOutlineCurrencyPound, bg: "bg-purple-50", icon: "text-purple-600" },
];

export const RoomsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(({ title, value, sub, Icon, bg, icon }) => (
        <div key={title} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex items-center gap-4">
          <div className={`${bg} p-3 rounded-xl shrink-0`}>
            <Icon className={`${icon} text-xl`} />
          </div>
          <div>
            <p className="text-xs text-stone-400">{title}</p>
            <p className="text-lg font-bold text-stone-800">{value}</p>
            <p className="text-xs text-stone-400">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};