"use client"

import React from 'react'
import { FiSearch, FiCommand } from "react-icons/fi";
import { CommandMenu } from './CommandMenu';

export const Search = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div className="mb-4 relative rounded-xl flex items-center px-3 py-2 text-sm bg-stone-100 hover:bg-indigo-50 hover:ring-1 hover:ring-indigo-200 transition-all cursor-pointer"
                onClick={() => setOpen(true)}
            >
                {/* Search icon */}
                <FiSearch className="mr-2 text-stone-400 shrink-0" />

                {/* Fake input */}
                <input
                    onFocus={(e) => {
                        e.target.blur();
                        setOpen(true);
                    }}
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent border-none outline-none placeholder-stone-400 text-sm cursor-pointer"
                />

                {/* ⌘K badge */}
                <span className="flex items-center gap-0.5 text-xs text-stone-400 bg-white px-1.5 py-0.5 rounded-lg shadow-sm border border-stone-200 shrink-0">
                    <FiCommand className="text-xs" />K
                </span>
            </div>

            <CommandMenu open={open} setOpen={setOpen} />
        </>
    );
}