import React from "react";
import { GuestsTopBar } from "./GuestsTopBar";
import { GuestsCards } from "./GuestsCards";
import { GuestsTable } from "./GuestsTable";

const GuestsPage = () => {
    return (
        <div className="bg-stone-50 min-h-screen">
        <GuestsTopBar />
        <div className="p-6 space-y-6">
            <GuestsCards />
            <GuestsTable />
        </div>
        </div>
    );
    };

export default GuestsPage;