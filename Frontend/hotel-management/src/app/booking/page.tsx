import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import BookingPage from "@/app/components/Booking/BookingPage";

export default function Booking() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <BookingPage />
      </div>
    </div>
  );
}
