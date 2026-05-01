"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserNav() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const role = (session?.user as any)?.role;

    // Staff roles → Dashboard link
    const getDashboardLink = () => {
        switch (role) {
        case "Admin":
            return "/admin-portal";
        case "Receptionist":
            return "/reception-dash";
        case "Housekeeping":
            return "/housekeeping-dash";
        case "Kitchen Staff":
            return "/kitchen-dash";
        default:
            return "/account"; // guests go to account page
        }
    };

    const menuLabel = ["Admin", "Receptionist", "Housekeeping", "Kitchen Staff"].includes(role || "")
        ? "Dashboard"
        : "My bookings";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (status === "loading") return null;

    if (!session) {
        return (
        <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-6 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
        >
            Login
        </button>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 hover:bg-gray-100 px-4 py-2 rounded-2xl transition-all group"
        >
            <div className="w-8 h-8 bg-blue-600 text-white text-lg font-bold rounded-2xl flex items-center justify-center shadow-inner">
            {session.user?.name?.[0] || "A"}
            </div>
            <div className="text-left">
            <div className="text-sm font-semibold text-black leading-none">
                {session.user?.name}
            </div>
            <div className="text-[10px] text-gray-400">Account</div>
            </div>
            <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
        </button>

        {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-gray-100 py-2 z-[200] overflow-hidden">
            <Link
                href={getDashboardLink()}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
                {menuLabel}
            </Link>

            <div className="border-t border-gray-100 my-1" />

            <button
                onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
                }}
                className="flex w-full items-center gap-3 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
                Logout
            </button>
            </div>
        )}
        </div>
    );
    }