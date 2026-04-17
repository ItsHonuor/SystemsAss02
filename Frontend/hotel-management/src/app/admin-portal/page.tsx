"use client"
import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Users, DoorOpen, UtensilsCrossed, 
    CalendarCheck, UserCircle, Bell, Search, Plus, MoreHorizontal 
    } from 'lucide-react';

    export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
        {/* SIDEBAR - Based on Atlantica Reference */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
            <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <DoorOpen size={24} />
            </div>
            <div>
                <h1 className="font-bold text-slate-900 text-lg leading-tight">Atlantica</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hotel Group</p>
            </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <NavItem icon={<Users size={20}/>} label="Staff Management" active={activeTab === 'Staff'} onClick={() => setActiveTab('Staff')} />
            <NavItem icon={<DoorOpen size={20}/>} label="Rooms" active={activeTab === 'Rooms'} onClick={() => setActiveTab('Rooms')} />
            <NavItem icon={<UtensilsCrossed size={20}/>} label="Kitchen" active={activeTab === 'Kitchen'} onClick={() => setActiveTab('Kitchen')} />
            <NavItem icon={<CalendarCheck size={20}/>} label="Booking" active={activeTab === 'Booking'} onClick={() => setActiveTab('Booking')} />
            <NavItem icon={<UserCircle size={20}/>} label="Guests" active={activeTab === 'Guests'} onClick={() => setActiveTab('Guests')} />
            </nav>

            <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">AD</div>
                <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">Admin Account</p>
                <p className="text-[10px] text-slate-500 truncate">admin@hotel.com</p>
                </div>
            </div>
            </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 ml-64 p-8">
            {/* HEADER */}
            <header className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Good Morning, Admin</h2>
                <p className="text-slate-500 text-sm">Welcome back to your hotel management system.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search anything..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
                </div>
                <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
            </header>

            {/* STAT CARDS - Data from Reference Image */}
            <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard title="TOTAL REVENUE" value="£31,280" change="+12.5%" color="bg-indigo-600" />
            <StatCard title="TOTAL BOOKINGS" value="12" change="+8.2%" color="bg-pink-500" />
            <StatCard title="ACTIVE GUESTS" value="34" change="-3.1%" color="bg-emerald-500" />
            <StatCard title="ROOMS OCCUPIED" value="27 / 50" change="+5.4%" color="bg-orange-500" />
            </div>

            {/* REVENUE TRENDS (Visual placeholder for the chart in your ref) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Revenue Trends</h3>
                <select className="text-xs font-bold text-slate-500 bg-slate-50 p-2 rounded-lg outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                </select>
            </div>
            <div className="h-48 flex items-end justify-between px-4 gap-2">
                {[45, 30, 65, 40, 80, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-50 hover:bg-indigo-500 rounded-t-lg transition-all cursor-pointer group relative" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">£{h*100}</div>
                </div>
                ))}
            </div>
            </div>

            {/* STAFF LIST TABLE - Based on Staff Management Reference */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Recent Staff Activity</h3>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                <Plus size={18} />
                Add New Employee
                </button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Shift Status</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                <StaffRow name="James Osei" role="Receptionist" email="james@hotel.com" status="On Shift" />
                <StaffRow name="Ama Serwaa" role="Housekeeping" email="ama@hotel.com" status="On Shift" />
                <StaffRow name="Kwame Asante" role="Kitchen" email="kwame@hotel.com" status="Off Shift" />
                <StaffRow name="Efua Mensah" role="Manager" email="efua@hotel.com" status="On Shift" />
                </tbody>
            </table>
            </div>
        </main>
        </div>
    );
    }

    // Sidebar Item Component
    function NavItem({ icon, label, active, onClick }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
        active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
        }`}>
        {icon}
        {label}
        </button>
    );
    }

    // Stat Card Component
    function StatCard({ title, value, change, color }: any) {
    const isPositive = change.startsWith('+');
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white`}>
            <LayoutDashboard size={20} />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {change}
            </span>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        </div>
    );
    }

    // Staff Table Row Component
    function StaffRow({ name, role, email, status }: any) {
    return (
        <tr className="hover:bg-slate-50 transition-colors group">
        <td className="px-6 py-4">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                {name.charAt(0)}
            </div>
            <span className="text-sm font-bold text-slate-700">{name}</span>
            </div>
        </td>
        <td className="px-6 py-4 text-sm text-slate-500">{role}</td>
        <td className="px-6 py-4 text-sm text-slate-500">{email}</td>
        <td className="px-6 py-4">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
            status === 'On Shift' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
            }`}>
            {status}
            </span>
        </td>
        <td className="px-6 py-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <MoreHorizontal size={16} />
            </button>
        </td>
        </tr>
    );
    }