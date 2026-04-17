"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Redirect to dashboard if the user is an admin
                if (data.role === "admin") {
                    router.push("/admin/dashboard");
                } else {
                    alert(`Welcome ${data.name}. Staff portal redirect coming soon.`);
                }
            } else {
                alert(data.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            alert("A server error occurred. Is XAMPP running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-slate-900">
            {/* Left Side: Brand Visuals */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#001D4A]">
                <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Luxury Hotel Lobby"
                />
                <div className="relative z-10 flex flex-col justify-between p-12 text-white">
                    <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">Atlantica</Link>
                    <div>
                        <h1 className="text-5xl font-serif leading-tight mb-6">Welcome back to <br /> sophisticated travel.</h1>
                        <p className="text-blue-100 max-w-sm text-lg">Manage your reservations and access exclusive management tools.</p>
                    </div>
                    <div className="text-sm text-blue-200">© 2026 Atlantica Hotel Group</div>
                </div>
            </div>

            {/* Right Side: Interactive Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-serif text-[#001D4A] mb-2">Staff Sign In</h2>
                    <p className="text-gray-500 mb-10">Enter your credentials to access the management portal.</p>

                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Work Email</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                                placeholder="admin@hotel.com" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                                placeholder="••••••••" 
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#001D4A] text-white py-4 rounded-xl font-bold shadow-xl hover:bg-blue-900 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}