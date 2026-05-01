import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const room = await prisma.room.update({
        where: { id: parseInt(params.id) },
        data: body,
    });
    return NextResponse.json(room);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.room.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: "Room deleted." });
}