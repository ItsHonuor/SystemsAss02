import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import { Dashboard } from "@/app/components/Dashboard/Dashboard";

    export default function Home() {
    return (
        <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-stone-50">
            <Dashboard />
        </div>
        </div>
    );
    }