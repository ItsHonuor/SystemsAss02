"use client"

import React, { useState, useEffect } from 'react'
import { FaRegClock } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { toZonedTime, format } from "date-fns-tz";

const UK_TIMEZONE = "Europe/London";

export const StaffTopBar = () => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const update = () => {
            const ukTime = toZonedTime(new Date(), UK_TIMEZONE);
            setTime(format(ukTime, "hh:mm:ss aa", { timeZone: UK_TIMEZONE }));
            setDate(format(ukTime, "EEEE, dd MMM yyyy", { timeZone: UK_TIMEZONE }));
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border-b border-stone-200 px-6 py-4 bg-white">
            <div className="flex items-center justify-between">
                
                {/* Left — icon + title + subtitle */}
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2.5 rounded-xl">
                        <LuUsers className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-stone-800">Staff Management</h1>
                        <p className="text-xs text-stone-400">View and manage all hotel employees</p>
                    </div>
                </div>

                {/* Right — date + clock */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400 hidden sm:block">{date}</span>
                    <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium">
                        <FaRegClock className="text-indigo-400" />
                        <span>{time}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}