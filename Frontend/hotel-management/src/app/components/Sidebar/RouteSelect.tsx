"use client"

import React from 'react'
import { IconType } from 'react-icons'
import { FaHome } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { Icon: FaHome,             title: "Dashboard",        href: "/"        },
  { Icon: LuUsers,            title: "Staff Management", href: "/staff"   },
  { Icon: IoBedOutline,       title: "Rooms",            href: "/rooms"   },
  { Icon: TbToolsKitchen2,    title: "Kitchen",          href: "/kitchen" },
  { Icon: FaRegCalendarCheck, title: "Booking",          href: "/booking" },
  { Icon: MdPeopleAlt,        title: "Guests",           href: "/guests"  },
];

export const RouteSelect = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {routes.map(({ Icon, title, href }) => (
        <Route
          key={title}
          Icon={Icon}
          title={title}
          href={href}
          selected={pathname === href}
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
    <Link href={href}>
      <button className={`flex items-center gap-3 w-full rounded-xl px-3 py-2 text-sm transition-all ${
        selected
          ? "bg-indigo-600 text-white shadow-sm"
          : "hover:bg-indigo-50 hover:text-indigo-600 bg-transparent text-stone-500"
      }`}>
        <Icon className={`text-base ${selected ? "text-white" : "text-stone-400"}`} />
        <span className="font-medium">{title}</span>
      </button>
    </Link>
  );
};