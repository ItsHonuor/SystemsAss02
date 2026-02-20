import React from 'react'
import { AccountToggle } from './AccountToggle'; // the profile button at the top
import { Search } from './Search';               // the search bar / command menu trigger
import { RouteSelect } from './RouteSelect';     // the nav links (Dashboard, Rooms, etc.)
import { Logout } from './Logout';               // the logout bar pinned to the bottom

// this is the main sidebar component — it just pulls all the pieces together
// AccountToggle + Search + RouteSelect sit in a scrollable area
// Logout is kept outside that scrollable area so it's always visible at the bottom
export const Sidebar = () => {
  return (
    <div>
        {/* this inner div is the scrollable part of the sidebar
            overflow-y-scroll lets it scroll if the nav links get too long
            sticky top-4 keeps it in view as the page scrolls
            h-[calc(100vh-32px-48px)] sets the height to fill the screen
            minus 32px (top-4 offset) and 48px (space for the Logout bar at the bottom) */}
        <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
            
            {/* Sidebar toggle here — placeholder comment for future feature */}
            <AccountToggle /> {/* profile pic, name, email at the top */}
            <Search />        {/* fake search bar that opens the command menu */}
            <RouteSelect />   {/* all the nav links */}

        </div>

        {/* Logout lives outside the scrollable div on purpose
            so it always sticks to the bottom no matter how far you scroll */}
        <Logout />
    </div>
  );
};