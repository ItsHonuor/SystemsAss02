import React from "react";
import { StaffTopBar } from "./StaffTopBar";
import { StaffTable } from "./StaffTable";
import { StaffCards } from "./StaffCards";
import { StaffClockSystem } from "./StaffClockSystem";

const StaffPage = () => {
    return (
        <div className="bg-stone-50 min-h-screen">
        <StaffTopBar />
        <div className="p-6 space-y-6">
            <StaffCards />
            <StaffClockSystem />
            <StaffTable />
        </div>
        </div>
    );
};

export default StaffPage;