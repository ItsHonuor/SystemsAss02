import React from "react";
import { HiChevronDown } from "react-icons/hi"; // just a little down arrow icon from react-icons, nothing crazy

// this is the profile button thing at the top of the sidebar
// shows who's logged in basically — avatar, name, email, and a lil arrow
export const AccountToggle = () => {
  return (
    // this div is just a wrapper that puts a line at the bottom
    // so it looks separated from the nav links below it
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">

      {/* made this a <button> so the whole thing is clickable
          flex lines everything up in a row
          hover:bg-stone-200 gives it that grey highlight when you hover over it
          relative is important here — we need it so the arrow can be positioned on the right side
          w-full makes it stretch across the whole sidebar */}
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">

        {/* avatar image — using dicebear which is just a free api that generates
            placeholder avatars, super useful for projects like this
            size-8 = 32px, shrink-0 stops it from getting squished */}
        <img
          src="https://api.dicebear.com/9.x/glass/svg"
          alt="avatar"
          className="size-8 rounded shrink-0"
        />

        {/* this is just the name and email stacked on top of each other
            text-start keeps it left aligned */}
        <div className="text-start">
          {/* name up top, bold so it stands out */}
          <span className="text-sm font-bold block">Staff Name</span>

          {/* email underneath, smaller and grey so it doesn't compete with the name */}
          <span className="text-xs block text-stone-500">staff@hotel.com</span>
        </div>

        {/* the little down arrow pinned to the right side of the button
            absolute + right-2 sticks it to the right edge
            top-1/2 and -translate-y-1/2 together just vertically centre it
            classic trick for centring stuff absolutely */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
          <HiChevronDown />
        </div>

      </button>
    </div>
  );
};