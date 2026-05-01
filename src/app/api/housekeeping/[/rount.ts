import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const task = await prisma.housekeepingTask.update({
        where: { id: parseInt(params.id) },
        data: {
            status: body.status,
            ...(body.completedAt && { completedAt: new Date(body.completedAt) }),
        },
    });
    return NextResponse.json(task);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.housekeepingTask.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ success: true });
}