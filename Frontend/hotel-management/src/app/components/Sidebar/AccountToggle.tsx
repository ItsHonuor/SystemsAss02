import React from "react";
import { HiChevronDown } from "react-icons/hi";

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-200">
      <button className="flex p-2 hover:bg-indigo-50 rounded-xl transition-colors relative gap-3 w-full items-center">

        {/* Avatar with indigo ring */}
        <div className="relative shrink-0">
          <img
            src="https://api.dicebear.com/9.x/glass/svg"
            alt="avatar"
            className="size-9 rounded-xl"
          />
          {/* green online dot */}
          <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-400 rounded-full border-2 border-white" />
        </div>

        {/* Name and email */}
        <div className="text-start">
          <span className="text-sm font-bold block text-stone-800">Staff Name</span>
          <span className="text-xs block text-stone-400">staff@hotel.com</span>
        </div>

        {/* Arrow */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400">
          <HiChevronDown />
        </div>

      </button>
    </div>
  );
};