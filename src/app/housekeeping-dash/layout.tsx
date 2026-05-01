"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Sparkles, LayoutDashboard, History, User, LogOut } from "lucide-react";

const navItems = [
    { label: "Dashboard",        href: "/housekeeping-dash",         icon: LayoutDashboard },
    { label: "Cleaning History", href: "/housekeeping-dash/history", icon: History },
    { label: "My Profile",       href: "/housekeeping-dash/profile", icon: User },
];

export default function HousekeepingLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen">
            <aside className="w-56 flex-shrink-0 flex flex-col bg-teal-900">
                <div className="flex items-center gap-2.5 px-5 py-5 border-b border-teal-950">
                    <Sparkles size={20} className="text-teal-300" />
                    <span className="text-white font-bold text-base">Housekeeping</span>
                </div>

                <nav className="flex flex-col gap-0.5 p-3 flex-1">
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-teal-600 text-white"
                                        : "text-teal-200 hover:bg-teal-800 hover:text-white"
                                }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-teal-950">
                    <button
                        onClick={async () => {
                            await signOut({ redirect: false });
                            window.location.href = "/login";
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-teal-300 hover:text-white hover:bg-teal-800 w-full transition-colors"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 bg-gray-50 min-h-screen">
                {children}
            </main>
        </div>
    );
}