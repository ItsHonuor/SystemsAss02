"use client"
import React, { useState, useEffect } from "react";
import { FaRegClock, FaRegCalendarCheck } from "react-icons/fa";
import { toZonedTime, format } from "date-fns-tz";

const UK_TIMEZONE = "Europe/London";

export const BookingTopBar = () => {
    // These two pieces of state hold the clock string and date string we display.
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const update = () => {
            // Convert the current moment to UK time, then format it into readable strings.
            const ukTime = toZonedTime(new Date(), UK_TIMEZONE);
            setTime(format(ukTime, "hh:mm:ss aa", { timeZone: UK_TIMEZONE }));
            setDate(format(ukTime, "EEEE, dd MMM yyyy", { timeZone: UK_TIMEZONE }));
        };

        update(); // Run once immediately so the clock shows up straight away.

        // Then repeat every 1000ms (1 second) so the clock ticks in real time.
        const interval = setInterval(update, 1000);

        // Cleanup: when this component is removed from the page, stop the interval
        // so it's not running in the background for nothing.
        return () => clearInterval(interval);

    }, []); // The empty [] means this effect only sets up once when the component first loads.

    return (
        <div className="border-b border-stone-200 px-6 py-4 bg-white">
            <div className="flex items-center justify-between">

                {/* Left side — app icon and title */}
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2.5 rounded-xl">
                        <FaRegCalendarCheck className="text-green-600 text-xl" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-stone-800">Booking Desk</h1>
                        <p className="text-xs text-stone-400">Manage guest arrivals and departures</p>
                    </div>
                </div>

                {/* Right side — live date and ticking clock */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400 hidden sm:block">{date}</span>
                    <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-sm font-medium">
                        <FaRegClock className="text-green-400" />
                        <span>{time}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};