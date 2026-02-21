import React from "react";
import { LuUsers } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineCurrencyPound } from "react-icons/hi";

const cards = [
    { title: "Total Staff",       value: "5",       sub: "↑ 1 this month",   Icon: LuUsers,                  bg: "bg-indigo-50",  icon: "text-indigo-600" },
    { title: "Clocked In Today",  value: "3",       sub: "2 yet to clock in", Icon: MdAccessTime,             bg: "bg-green-50",   icon: "text-green-600"  },
    { title: "On Leave",          value: "1",       sub: "Returns Monday",    Icon: FaRegCalendarCheck,       bg: "bg-orange-50",  icon: "text-orange-600" },
    { title: "Monthly Payroll",   value: "£148,000", sub: "Due in 8 days",   Icon: HiOutlineCurrencyPound,   bg: "bg-purple-50",  icon: "text-purple-600" },
];

export const StaffCards = () => {
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