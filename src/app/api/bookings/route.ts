import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newBooking = await prisma.booking.create({
            data: {
                guestName: body.guestName,
                guestEmail: body.guestEmail || null,
                roomNumber: body.roomNumber,
                checkIn: new Date(body.checkIn),
                checkOut: new Date(body.checkOut),
                totalPrice: body.totalPrice,
                status: body.status || "Confirmed",
            },
        });

        await prisma.room.update({
            where: { roomNumber: body.roomNumber },
            data: {
                status: "Occupied",
                guestName: body.guestName,
                checkOut: new Date(body.checkOut),
            },
        });

        return NextResponse.json(newBooking, { status: 201 });
    } catch (error: any) {
        console.error("❌ Booking error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}