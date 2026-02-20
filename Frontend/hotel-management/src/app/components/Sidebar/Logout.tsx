import React from 'react'
import { TbLogout } from "react-icons/tb"; // logout icon from react-icons

// this is the little logout bar that sits at the very bottom of the sidebar
// shows the user's role and a logout button
export const Logout = () => {
    return (
        // this div sticks to the bottom of the sidebar no matter how long the nav list gets
        // the top-[calc(100vh_-_48px_-_16px)] is doing the heavy lifting here —
        // it's basically saying "sit 48px + 16px up from the bottom of the screen"
        // sticky + that calc value is a common trick to pin something to the bottom without using absolute positioning
        <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2">
            
            {/* inner row — space-between pushes the text to the left and the button to the right */}
            <div className="flex items-center justify-between">
                
                {/* left side — shows the role and a little subtitle */}
                <div>
                    <p className="text-xs font-bold">Admin</p>
                    <p className="text-xs text-stone-500">Go back to Home</p>
                </div>

                {/* logout button on the right
                    starts off grey and gets slightly darker on hover
                    pretty standard subtle button style */}
                <button className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 hover:bg-stone-200 px-2 py-1 rounded transition-colors">
                    <TbLogout />
                    <span>Logout</span>
                </button>

            </div>
        </div>
    );
};