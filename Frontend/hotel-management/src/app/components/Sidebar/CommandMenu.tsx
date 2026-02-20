import React from 'react';
import { Command } from 'cmdk'; // cmdk is a library that gives us that sleek command palette ui
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FaRegClock } from "react-icons/fa"; // clock icon for work status
import { FaPlus } from "react-icons/fa6"; // plus icon for adding inventory
import { MdOutlineBedroomChild } from "react-icons/md"; // bed icon for room availability

// this component is the command menu popup (the thing that opens when you press ⌘K or CTRL+K)
// it takes in 'open' (is the menu visible rn?) and 'setOpen' (function to toggle it)
export const CommandMenu = ({
    open, 
    setOpen
}:{
    open: boolean; // true = menu is showing, false = menu is hidden
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; // setter to open/close it
}) => {
    const [value, setValue] = React.useState(''); // tracks whatever the user is typing in the search box

    // this useEffect sets up a keyboard shortcut listener
    // basically whenever the user hits ⌘K (mac) or CTRL+K (windows) it toggles the menu
    // the cleanup at the end (return) removes the listener when the component unmounts — good practice so it doesn't stack up
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault(); // stops the browser doing its own thing with that shortcut
                setOpen((open) => !open); // flip the menu open/closed
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down); // cleanup
    }, []);

    return (
        // Command.Dialog is the full screen overlay from cmdk
        // clicking the dark background (inset-0 bg-stone-950/50) closes the menu
        <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="fixed inset-0 bg-stone-950/50" onClick={() => setOpen(false)}>
            
            {/* this inner div is the actual white menu box in the centre of the screen
                stopPropagation stops clicks inside the box from bubbling up and closing the menu */}
            <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12'>
                
                {/* the search input at the top of the menu
                    focus:outline-none removes that ugly blue browser outline when focused */}
                <Command.Input 
                    value={value}
                    onValueChange={setValue}
                    placeholder="What do you need?"
                    className="relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
                />

                <Command.List>
                    {/* shows up when the search input doesn't match anything
                        displays whatever the user typed back at them in purple */}
                    <Command.Empty>No results found. {" "}
                        <span className='text-violet-500'>"{value}"</span>
                    </Command.Empty>

                    {/* a group of quick actions staff can take
                        the heading label sits above the items in grey */}
                    <Command.Group heading="Staff" className="text-sm mb-3 text-stone-400">
                        
                        {/* each Command.Item is a clickable action in the list
                            they all share the same base styles — hover highlight, icon + label in a row */}
                        <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2 font-semibold">
                            <FaRegClock />
                            Work Status
                        </Command.Item>
                        
                        <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2 font-semibold">
                            <FaPlus />
                            Add to Inventory
                        </Command.Item>
                        
                        <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2 font-semibold">
                            <MdOutlineBedroomChild />
                            Check Room Availability
                        </Command.Item>

                    </Command.Group>
                </Command.List>
            </div>
        </Command.Dialog>
    );
};