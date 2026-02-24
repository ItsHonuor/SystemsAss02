import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import KitchenPage from "@/app/components/Kitchen/KitchenPage";

export default function Kitchen() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <KitchenPage />
      </div>
    </div>
  );
}
