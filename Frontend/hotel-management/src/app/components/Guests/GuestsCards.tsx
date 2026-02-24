import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { HiOutlineCurrencyPound } from "react-icons/hi";

const cards = [
    { title: "Total Guests",   value: "5",    sub: "Registered",       Icon: MdPeopleAlt,            bg: "bg-pink-50",   icon: "text-pink-600"   },
    { title: "Active Guests",  value: "3",    sub: "Currently staying", Icon: FaRegCheckCircle,      bg: "bg-green-50",  icon: "text-green-600"  },
    { title: "Check Ins",      value: "2",    sub: "This week",        Icon: MdOutlineLogin,         bg: "bg-blue-50",   icon: "text-blue-600"   },
    { title: "Total Spent",    value: "£4,820",sub: "All time",        Icon: HiOutlineCurrencyPound, bg: "bg-purple-50", icon: "text-purple-600" },
    ];

    export const GuestsCards = () => {
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