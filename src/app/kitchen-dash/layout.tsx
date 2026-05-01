"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChefHat, ClipboardList, History, User, LogOut } from "lucide-react";

const navItems = [
    { label: "Active Orders", href: "/kitchen-dash",         icon: ClipboardList },
    { label: "History",       href: "/kitchen-dash/history", icon: History },
    { label: "My Profile",    href: "/kitchen-dash/profile", icon: User },
];

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen">
            <aside className="w-56 flex-shrink-0 flex flex-col" style={{ backgroundColor: "#7C2D12" }}>
                <div className="flex items-center gap-2.5 px-5 py-5 border-b border-orange-950">
                    <ChefHat size={20} className="text-orange-300" />
                    <span className="text-white font-bold text-base">Kitchen</span>
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
                                        ? "bg-orange-700 text-white"
                                        : "text-orange-200 hover:bg-orange-900/60 hover:text-white"
                                }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-orange-950">
                    <button
                        onClick={async () => {
                            await signOut({ redirect: false });
                            window.location.href = "/login";
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-orange-300 hover:text-white hover:bg-orange-900/60 w-full transition-colors"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 bg-orange-50 min-h-screen">
                {children}
            </main>
        </div>
    );
}