"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  BedDouble,
  UtensilsCrossed,
  BookOpen,
  UserCheck,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin-portal", icon: LayoutDashboard },
  {
    label: "Staff Mgmt",
    icon: Users,
    children: [
      { label: "All Staff", href: "/admin-portal/staff" },
      { label: "Add Employee", href: "/admin-portal/staff/add" },
    ],
  },
  {
    label: "Rooms",
    icon: BedDouble,
    children: [
      { label: "Room Status", href: "/admin-portal/rooms" },
      { label: "Add Room", href: "/admin-portal/rooms/add" },
    ],
  },
  {
    label: "Kitchen",
    icon: UtensilsCrossed,
    children: [
      { label: "Active Orders", href: "/admin-portal/kitchen" },
      { label: "Order History", href: "/admin-portal/kitchen/history" },
    ],
  },
  {
    label: "Bookings",
    icon: BookOpen,
    children: [
      { label: "All Bookings", href: "/admin-portal/bookings" },
      { label: "Walk-in", href: "/admin-portal/bookings/walk-in" },
    ],
  },
  {
    label: "Housekeeping",
    icon: Sparkles,
    children: [
      { label: "All Tasks", href: "/admin-portal/housekeeping" },
      { label: "Add Task", href: "/admin-portal/housekeeping/add" },
    ],
  },
  { label: "Guests", href: "/admin-portal/guests", icon: UserCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Rooms"]);

  const toggle = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const renderIcon = (Icon: any) => <Icon size={16} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 flex-shrink-0 flex flex-col bg-blue-950 text-white">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-blue-900">
          <Building2 size={20} className="text-blue-300" />
          <span className="font-bold text-base">Atlantica</span>
        </div>

        <div className="px-5 pt-4 pb-1">
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
            ADMIN PANEL
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            if (item.children) {
              const isOpen = openMenus.includes(item.label);
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggle(item.label)}
                    className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      {renderIcon(item.icon)}
                      {item.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="ml-7 mt-1 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 text-xs rounded-lg transition-colors ${
                            pathname === child.href
                              ? "bg-blue-600 text-white"
                              : "text-blue-300 hover:bg-blue-900 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-blue-200 hover:bg-blue-900 hover:text-white"
                }`}
              >
                {renderIcon(item.icon)}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-blue-900 mt-auto">
          <button
            onClick={async () => {
              await signOut({ redirect: false });
              window.location.href = "/login";
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-300 hover:bg-blue-900 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}