"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AllStaffPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/staff")
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            setError(data.error);
            } else {
            setStaff(Array.isArray(data) ? data : []);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to load staff");
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading staff members...</div>;
    }

    if (error) {
        return (
        <div className="p-8 text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-2xl"
            >
            Retry
            </button>
        </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">👥 All Staff</h1>
            <p className="text-gray-500 mt-1">Manage all hotel staff members.</p>
            </div>
            <Link
            href="/admin-portal/staff/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2"
            >
            + Add Employee
            </Link>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
            <table className="w-full">
            <thead>
                <tr className="bg-gray-50 border-b">
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Role</th>
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Email</th>
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Phone</th>
                <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                </tr>
            </thead>
            <tbody>
                {staff.map((person) => (
                <tr key={person.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                        {person.name?.[0] || "?"}
                        </div>
                        <span className="font-medium">{person.name}</span>
                    </div>
                    </td>
                    <td className="px-8 py-6">
                    <span className="px-4 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                        {person.role}
                    </span>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{person.email}</td>
                    <td className="px-8 py-6 text-gray-600">{person.phone || "—"}</td>
                    <td className="px-8 py-6">
                    <span className={`inline-flex px-4 py-1 text-xs font-medium rounded-full ${
                        person.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                        {person.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }