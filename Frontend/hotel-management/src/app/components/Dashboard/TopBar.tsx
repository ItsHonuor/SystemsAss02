"use client" // using useState and useEffect so we need this in Next.js

import React, { useState, useEffect } from 'react'
import { FaRegClock } from "react-icons/fa"; // clock icon for the time button
import { toZonedTime, format } from "date-fns-tz"; // date-fns-tz handles timezone conversion for us

// hardcoded to UK time — change this string if you need a different timezone
// full list of timezone strings here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
const UK_TIMEZONE = "Europe/London";

// this is the top bar that sits above the dashboard content
// shows a greeting on the left and a live UK clock on the right
export const TopBar = () => {
    const [time, setTime] = useState(""); // stores the current time as a formatted string

    useEffect(() => {
        // update() grabs the current time, converts it to UK timezone, and formats it
        // e.g. "05:29:17 AM"
        const update = () => {
            const ukTime = toZonedTime(new Date(), UK_TIMEZONE); // convert current time to UK time
            setTime(format(ukTime, "hh:mm:ss aa", { timeZone: UK_TIMEZONE })); // format it nicely
        };

        update(); // run it immediately so there's no blank flash on first render

        // then run it every 1000ms (1 second) to keep the clock ticking
        const interval = setInterval(update, 1000);

        // cleanup — when the component unmounts we clear the interval
        // without this it would keep running in the background and cause memory leaks
        return () => clearInterval(interval);
    }, []); // empty array means this only runs once when the component first mounts

    return (
        // bottom border + spacing to separate the topbar from the dashboard content below
        <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
            <div className="flex items-center justify-between p-0.5">
                
                {/* left side — greeting and subtitle */}
                <div>
                    <span className="text-sm font-bold block">🚀 Good Morning, Admin</span>
                    <span className="text-sm block text-stone-500">Welcome back to your dashboard!</span>
                </div>

                {/* right side — live clock button
                    it's a button styled to look like a pill/badge
                    {time} updates every second thanks to the interval above */}
                <button className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-stone-200 px-3 py-1.5 rounded'>
                    <FaRegClock />
                    <span>{time}</span>
                </button>

            </div>
        </div>
    );
}