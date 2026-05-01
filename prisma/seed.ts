import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // STAFF
    const staff = [
        { firstName: "Admin",  lastName: "User",   email: "admin@atlantica.com",      password: "admin123",    role: "Admin" },
        { firstName: "Daniel", lastName: "Topbar", email: "d.topbar@atlantica.com",   password: "password123", role: "Receptionist" },
        { firstName: "Priya",  lastName: "Sharma", email: "p.sharma@atlantica.com",   password: "password123", role: "Housekeeping" },
        { firstName: "James",  lastName: "Osei",   email: "j.osei@atlantica.com",     password: "password123", role: "Kitchen Staff" },
    ];

    for (const member of staff) {
        const hashedPassword = await bcrypt.hash(member.password, 10);
        await prisma.staff.upsert({
            where: { email: member.email },
            update: { password: hashedPassword },
            create: { ...member, password: hashedPassword, status: "Active" },
        });
    }
    console.log("✅ Staff seeded!");

    // ROOMS
    const rooms = [
        { roomNumber: "101", type: "Standard",  floor: 1, status: "Occupied",     guestName: "James Osei",     checkOut: new Date("2025-05-03") },
        { roomNumber: "102", type: "Standard",  floor: 1, status: "Available" },
        { roomNumber: "103", type: "Standard",  floor: 1, status: "Housekeeping" },
        { roomNumber: "201", type: "Deluxe",    floor: 2, status: "Available" },
        { roomNumber: "205", type: "Deluxe",    floor: 2, status: "Occupied",     guestName: "Priya Sharma",   checkOut: new Date("2025-05-05") },
        { roomNumber: "210", type: "Deluxe",    floor: 2, status: "Maintenance" },
        { roomNumber: "301", type: "Suite",     floor: 3, status: "Available" },
        { roomNumber: "312", type: "Suite",     floor: 3, status: "Occupied",     guestName: "Lucas Ferreira", checkOut: new Date("2025-05-04") },
        { roomNumber: "315", type: "Suite",     floor: 3, status: "Housekeeping" },
        { roomNumber: "401", type: "Penthouse", floor: 4, status: "Available" },
    ];

    for (const room of rooms) {
        await prisma.room.upsert({
            where: { roomNumber: room.roomNumber },
            update: {},
            create: room,
        });
    }
    console.log("✅ Rooms seeded!");

    // BOOKINGS
    const bookings = [
        { guestName: "James Osei",     roomNumber: "101", checkIn: new Date("2025-04-30"), checkOut: new Date("2025-05-03"), totalPrice: 360,  status: "Checked In" },
        { guestName: "Priya Sharma",   roomNumber: "205", checkIn: new Date("2025-05-01"), checkOut: new Date("2025-05-05"), totalPrice: 680,  status: "Confirmed" },
        { guestName: "Lucas Ferreira", roomNumber: "312", checkIn: new Date("2025-05-02"), checkOut: new Date("2025-05-04"), totalPrice: 500,  status: "Confirmed" },
        { guestName: "Amara Diallo",   roomNumber: "118", checkIn: new Date("2025-04-28"), checkOut: new Date("2025-04-30"), totalPrice: 240,  status: "Checked Out" },
        { guestName: "Sophie Grant",   roomNumber: "401", checkIn: new Date("2025-05-05"), checkOut: new Date("2025-05-08"), totalPrice: 1200, status: "Confirmed" },
    ];

    for (const booking of bookings) {
        await prisma.booking.create({ data: booking });
    }
    console.log("✅ Bookings seeded!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());