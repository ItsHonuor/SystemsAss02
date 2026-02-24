import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import RoomsPage from "@/app/components/Rooms/RoomsPage";

export default function Rooms() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <RoomsPage />
      </div>
    </div>
  );
}
