import React from "react";
import { BookingTopBar } from "./BookingTopBar";
import { BookingCards } from "./BookingCards";
import { BookingTable } from "./BookingTable";

// This is the root page — it doesn't do any logic itself, it just
// arranges the three main building blocks in the right order.
const BookingPage = () => {
    return (
        <div className="bg-stone-50 min-h-screen">
            <BookingTopBar />
            {/* Everything below the top bar sits inside this padded container */}
            <div className="p-6 space-y-6">
                <BookingCards />
                <BookingTable />
            </div>
        </div>
    );
};

export default BookingPage;