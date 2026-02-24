import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { HiOutlineCurrencyPound } from "react-icons/hi";

// Each object here is one stat card. Instead of writing 4 separate cards in the HTML,
// we store the data here and loop over it below — way easier to update later.
const cards = [
    { title: "Total Bookings",   value: "12",    sub: "This month",      Icon: FaRegCalendarCheck,     bg: "bg-green-50",  icon: "text-green-600"  },
    { title: "Check Ins Today",  value: "3",     sub: "Expected today",  Icon: MdOutlineLogin,         bg: "bg-blue-50",   icon: "text-blue-600"   },
    { title: "Check Outs Today", value: "2",     sub: "Departing today", Icon: MdOutlineLogout,        bg: "bg-orange-50", icon: "text-orange-600" },
    { title: "Revenue",          value: "£4,200",sub: "This month",      Icon: HiOutlineCurrencyPound, bg: "bg-purple-50", icon: "text-purple-600" },
];

export const BookingCards = () => {
    return (
        // CSS grid that always shows 4 cards side by side with a gap between them.
        <div className="grid grid-cols-4 gap-4">

            {/* Loop over every card object and render the same layout for each one */}
            {cards.map(({ title, value, sub, Icon, bg, icon }) => (
                <div key={title} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex items-center gap-4">

                    {/* Icon bubble — bg and icon colours come from the card's own data above */}
                    <div className={`${bg} p-3 rounded-xl shrink-0`}>
                        <Icon className={`${icon} text-xl`} />
                    </div>

                    {/* The three lines of text: label, big number, small subtitle */}
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