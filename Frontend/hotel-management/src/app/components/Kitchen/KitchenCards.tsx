"use client"
import React from "react";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdOutlineFoodBank } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineCurrencyPound } from "react-icons/hi";

const cards = [
  { title: "Total Items",   value: "24",   sub: "On the menu",       Icon: MdOutlineFoodBank,      bg: "bg-orange-50", icon: "text-orange-600" },
  { title: "Available",     value: "18",   sub: "Ready to order",    Icon: FaRegCheckCircle,       bg: "bg-green-50",  icon: "text-green-600"  },
  { title: "Categories",    value: "4",    sub: "Starter, Main...",  Icon: TbToolsKitchen2,        bg: "bg-blue-50",   icon: "text-blue-600"   },
  { title: "Revenue Today", value: "£340", sub: "From room service", Icon: HiOutlineCurrencyPound, bg: "bg-purple-50", icon: "text-purple-600" },
];

export const KitchenCards = () => {
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
