import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const rooms = await prisma.room.findMany({ orderBy: { roomNumber: "asc" } });
    return NextResponse.json(rooms);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { roomNumber, type, floor, status, price } = body;
    if (!roomNumber || !type || !floor) {
        return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }
    try {
        const room = await prisma.room.create({
            data: {
                roomNumber,
                type,
                floor: parseInt(floor),
                status: status || "Available",
                price: parseFloat(price) || 89,
            },
        });
        return NextResponse.json(room, { status: 201 });
    } catch {
        return NextResponse.json({ message: "Room number already exists." }, { status: 400 });
    }
}