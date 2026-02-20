import React from "react";
import StatCard from "./StatCards"; // the individual stat card component
import { FiDollarSign, FiCalendar, FiUsers } from "react-icons/fi"; // icons for each card
import { IoBedOutline } from "react-icons/io5"; // bed icon for rooms occupied

// Grid is the main layout component for the dashboard
// right now it just holds the stat cards row at the top
// but this is where you'd add charts, tables, etc. as the project grows
const Grid = () => {
    return (
    // px-4 pb-4 = padding on the sides and bottom
    // grid grid-cols-12 = 12 column grid, standard layout system
    // everything inside uses col-span to decide how wide it should be
    <div className="px-4 pb-4 grid gap-3 grid-cols-12">

    {/* Stat Cards Row — spans all 12 columns so it's full width
        internally it splits into 1 col on mobile, 2 on tablet, 4 on desktop
          that's what the sm:grid-cols-2 xl:grid-cols-4 is doing — responsive layout */}
    <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* each StatCard gets a title, a value, a % change, whether it's up or down,
            an icon, and an accent colour for the icon background
            positive={true} = green arrow up, positive={false} = red arrow down */}
        <StatCard
            title="Total Revenue"
            value="£31,280"
            change="12.5%"
            positive={true}          // going up so green
            icon={<FiDollarSign />}
            accent="bg-indigo-500"   // purple icon background
            />
            <StatCard
            title="Total Bookings"
            value="1"
            change="8.2%"
            positive={true}
            icon={<FiCalendar />}
            accent="bg-pink-500"     // pink icon background
            />
            <StatCard
            title="Active Guests"
            value="34"
            change="3.1%"
            positive={false}         // going down so red
            icon={<FiUsers />}
            accent="bg-emerald-500"  // green icon background
            />
            <StatCard
            title="Rooms Occupied"
            value="27 / 50"
            change="5.4%"
            positive={true}
            icon={<IoBedOutline />}
            accent="bg-amber-500"    // orange icon background
            />

        </div>

        </div>
    );
};

export default Grid;