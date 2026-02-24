import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import GuestsPage from "@/app/components/Guests/GuestsPage";

export default function Guests() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <GuestsPage />
      </div>
    </div>
  );
}
