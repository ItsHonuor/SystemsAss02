"use client" // using useState so we need this in Next.js

import React from 'react'
import { FiSearch, FiCommand } from "react-icons/fi"; // search icon and the ⌘ command icon
import { CommandMenu } from './CommandMenu'; // the popup menu we built earlier

// this is the search bar that sits at the top of the sidebar
// it looks like a normal search input but when you click it, it opens the command menu instead
// pretty common pattern you see in apps like Linear, Vercel, etc.
export const Search = () => {
    const [open, setOpen] = React.useState(false); // tracks whether the command menu is open or not

    return (
        <>
            {/* the fake search bar — it's styled to look like an input but doesn't actually let you type
                clicking it immediately opens the command menu instead */}
            <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
                
                {/* search icon on the left */}
                <div className="mr-2"><FiSearch /></div>
                
                {/* the input immediately loses focus when clicked (e.target.blur())
                    and opens the command menu instead — so it acts more like a button than a real input
                    this is a neat trick to fake a search bar while using cmdk under the hood */}
                <input 
                    onFocus={(e) => {
                        e.target.blur(); // instantly removes focus so the cursor doesn't appear
                        setOpen(true);   // opens the command menu
                    }}
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent border-none outline-none placeholder-stone-400"
                />

                {/* the ⌘K shortcut hint pinned to the right side of the search bar
                    just a visual reminder that users can also open the menu with CTRL+K / ⌘K
                    the actual keyboard shortcut logic lives in CommandMenu.tsx */}
                <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
                    <FiCommand />K
                </span>

            </div>

            {/* the actual command menu — hidden by default, shows when open is true
                we pass open and setOpen down so CommandMenu can control its own visibility */}
            <CommandMenu open={open} setOpen={setOpen} />
        </>
    );
}