    import React from "react";

    const StaffPage = () => {
    return (
        <div className="bg-stone-50 min-h-screen p-6">

        {/* Header row - title on left, add button on right */}
        <div className="flex items-center justify-between mb-6">
            <div>
            <h1 className="text-xl font-bold text-stone-800">Staff Management</h1>
            <p className="text-sm text-stone-400 mt-1">View and manage all hotel employees</p>
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
            + Add New Employee
            </button>
        </div>

        {/* Table will go here - we'll add it in the next step */}

        </div>
    );
    };

    export default StaffPage;