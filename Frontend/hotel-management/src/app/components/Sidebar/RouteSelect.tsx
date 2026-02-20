"use client"

import React from 'react'
import { IconType } from 'react-icons'
import { FaHome } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
import Link from "next/link"; // lets us navigate between pages
import { usePathname } from "next/navigation"; // tells us what page we're currently on

// Added href to each route so we know where to navigate
const routes = [
  { Icon: FaHome,             title: "Dashboard",        href: "/"        },
  { Icon: LuUsers,            title: "Staff Management", href: "/staff"   },
  { Icon: IoBedOutline,       title: "Rooms",            href: "/rooms"   },
  { Icon: TbToolsKitchen2,    title: "Kitchen",          href: "/kitchen" },
  { Icon: FaRegCalendarCheck, title: "Booking",          href: "/booking" },
  { Icon: LuUsers,            title: "Guests",           href: "/guests"  },
];

export const RouteSelect = () => {
  // usePathname gives us the current URL e.g "/staff"
  // we use this to know which button should be highlighted
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {routes.map(({ Icon, title, href }) => (
        <Route
          key={title}
          Icon={Icon}
          title={title}
          href={href}
          selected={pathname === href} // highlight if current URL matches
        />
      ))}
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  href,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  href: string;
}) => {
  return (
    // Link handles the page navigation like an <a> tag but without reloading
    <Link href={href}>
      <button className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-all ${
        selected
          ? "bg-stone-950 text-white shadow-sm"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}>
        <Icon />
        <span>{title}</span>
      </button>
    </Link>
  );
};