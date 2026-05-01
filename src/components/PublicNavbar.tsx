"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import UserNav from "./UserNav";

export default function PublicNavbar() {
    const router = useRouter();

    return (
        <nav className="fixed top-0 w-full z-[100] px-6 py-6">
        <div className="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] px-10 py-4 grid grid-cols-3 items-center shadow-lg">
            
            {/* Logo - now very reliable */}
            <div className="text-xl font-black tracking-tighter uppercase text-black justify-self-start">
            <Link href="/" className="hover:opacity-80 transition-opacity">
                Atlantica
            </Link>
            </div>
            
            <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 justify-self-center">
            <Link href="/rooms" className="hover:text-black transition-all">Rooms</Link>
            <Link href="/about" className="hover:text-black transition-all">Experience</Link>
            <Link href="/dining" className="hover:text-black transition-all">Dining</Link>
            </div>

            <div className="justify-self-end flex items-center gap-3">
            <button
                onClick={() => router.push("/rooms")}
                className="bg-black text-white px-8 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md"
            >
                Book Now
            </button>
            <UserNav />
            </div>
        </div>
        </nav>
    );
    }