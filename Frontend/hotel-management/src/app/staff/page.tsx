import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import StaffPage from "@/app/components/Staff/StaffPage";

export default function Staff() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <StaffPage />
      </div>
    </div>
  );
}
