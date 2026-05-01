"use client";

import { useState, useEffect } from "react";
import { UserCheck, Mail, Star, Crown, Search, Users } from "lucide-react";

type LoyaltyTier = "Member" | "Bronze" | "Silver" | "Gold" | "Platinum";

type Guest = {
    name: string;
    email: string;
    stays: number;
    tier: LoyaltyTier;
    lastStay: string;
    totalSpent: number;
};

type Booking = {
    id: number;
    guestName: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: string;
};

const tierConfig: Record<LoyaltyTier, { style: string; icon: React.ReactNode; perks: string; min: number }> = {
    Member:   { style: "bg-blue-50 text-blue-500",       icon: <Users size={11} />,  perks: "No discount",                       min: 1 },
    Bronze:   { style: "bg-orange-100 text-orange-700",  icon: <Star size={11} />,   perks: "5% discount",                       min: 2 },
    Silver:   { style: "bg-gray-100 text-gray-600",      icon: <Star size={11} />,   perks: "10% discount + late checkout",      min: 5 },
    Gold:     { style: "bg-yellow-100 text-yellow-700",  icon: <Crown size={11} />,  perks: "15% discount + room upgrade",       min: 10 },
    Platinum: { style: "bg-purple-100 text-purple-700",  icon: <Crown size={11} />,  perks: "20% discount + complimentary upgrade", min: 20 },
};

function getTier(stays: number): LoyaltyTier {
    if (stays >= 20) return "Platinum";
    if (stays >= 10) return "Gold";
    if (stays >= 5)  return "Silver";
    if (stays >= 2)  return "Bronze";
    return "Member";
}

export default function GuestsPage() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<LoyaltyTier | "All">("All");

    useEffect(() => {
        fetch("/api/bookings")
            .then((res) => res.json())
            .then((bookings: Booking[]) => {
                if (!Array.isArray(bookings)) return;

                // Group bookings by guest name
                const map: Record<string, { stays: number; totalSpent: number; lastStay: string }> = {};

                bookings.forEach((b) => {
                    const name = b.guestName;
                    if (!map[name]) {
                        map[name] = { stays: 0, totalSpent: 0, lastStay: b.checkIn };
                    }
                    map[name].stays += 1;
                    map[name].totalSpent += b.totalPrice;
                    // Keep most recent check-in
                    if (new Date(b.checkIn) > new Date(map[name].lastStay)) {
                        map[name].lastStay = b.checkIn;
                    }
                });

                const derived: Guest[] = Object.entries(map).map(([name, data]) => ({
                    name,
                    email: `${name.toLowerCase().replace(" ", ".")}@gmail.com`,
                    stays: data.stays,
                    tier: getTier(data.stays),
                    lastStay: new Date(data.lastStay).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                    totalSpent: data.totalSpent,
                }));

                setGuests(derived);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = guests.filter((g) => {
        const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "All" || g.tier === filter;
        return matchSearch && matchFilter;
    });

    const counts = {
        Member:   guests.filter((g) => g.tier === "Member").length,
        Bronze:   guests.filter((g) => g.tier === "Bronze").length,
        Silver:   guests.filter((g) => g.tier === "Silver").length,
        Gold:     guests.filter((g) => g.tier === "Gold").length,
        Platinum: guests.filter((g) => g.tier === "Platinum").length,
    };

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-1">
                <UserCheck className="text-blue-600" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Guests</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-9">Manage guest profiles and loyalty status.</p>

            {/* Loyalty tier summary */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                {(Object.entries(counts) as [LoyaltyTier, number][]).map(([tier, count]) => {
                    const cfg = tierConfig[tier];
                    return (
                        <button key={tier} onClick={() => setFilter(tier)}
                            className={`bg-white rounded-xl border p-4 shadow-sm text-left transition-all ${
                                filter === tier ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:border-blue-200"
                            }`}>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${cfg.style}`}>
                                {cfg.icon} {tier}
                            </span>
                            <p className="text-2xl font-bold text-gray-800">{count}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{cfg.perks}</p>
                        </button>
                    );
                })}
            </div>

            {/* Search + filter */}
            <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input placeholder="Search guest..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                {(["All", "Member", "Bronze", "Silver", "Gold", "Platinum"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                            filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
                        }`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading guests...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">No guests found.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-blue-50 text-blue-900 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-3.5 font-semibold">Guest</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Email</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Stays</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Loyalty Tier</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Last Stay</th>
                                <th className="text-left px-6 py-3.5 font-semibold">Total Spent</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((g) => {
                                const cfg = tierConfig[g.tier];
                                return (
                                    <tr key={g.name} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                                                    {g.name[0]}
                                                </div>
                                                <span className="font-medium text-gray-800">{g.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-500 text-xs">
                                            <span className="flex items-center gap-1.5"><Mail size={11} />{g.email}</span>
                                        </td>
                                        <td className="px-6 py-3.5 font-semibold text-gray-700">{g.stays}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.style}`}>
                                                {cfg.icon} {g.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-400 text-xs">{g.lastStay}</td>
                                        <td className="px-6 py-3.5 font-semibold text-gray-700">£{g.totalSpent.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}