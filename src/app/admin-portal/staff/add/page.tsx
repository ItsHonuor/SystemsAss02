"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployeePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "Receptionist",
        phone: "",
        password: "password123",   // default password (you can change it)
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
        const res = await fetch("/api/staff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            alert(`✅ Employee created!\nDefault password: ${form.password}`);
            router.push("/admin-portal/staff");
        } else {
            setError(data.error || "Failed to create employee");
        }
        } catch (err: any) {
        setError("Something went wrong. Check console for details.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Employee</h1>

        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-2xl">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow p-10 space-y-6">
            <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                required
                />
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                required
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
            >
                <option value="Admin">Admin</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Kitchen Staff">Kitchen Staff</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">Password (default: password123)</label>
            <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">Phone (optional)</label>
            <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
            />
            </div>

            <div className="flex gap-4 pt-6">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-medium disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create Employee"}
            </button>
            </div>
        </form>
        </div>
    );
    }