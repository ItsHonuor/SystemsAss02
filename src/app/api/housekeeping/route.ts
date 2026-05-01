import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const tasks = await prisma.housekeepingTask.findMany({
        orderBy: { id: "desc" },
    });
    return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const task = await prisma.housekeepingTask.create({
            data: {
                roomNumber: body.roomNumber,
                taskType: body.taskType,
                priority: body.priority || "Normal",
                status: body.status || "Pending",
                assignedTo: body.assignedTo || null,
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error: any) {
        console.error("❌ Housekeeping error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}