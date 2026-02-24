export type Booking = {
    id: string;
    guestName: string;
    guestId: string;
    room: string;
    roomType: string;
    checkInPlan: string;
    checkInActual: string;
    checkOutPlan: string;
    checkOutActual: string;
    status: "Confirmed" | "Checked In" | "Checked Out" | "Completed" | "Cancelled";
    };