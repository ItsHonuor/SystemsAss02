import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
    const staff = await prisma.staff.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(staff);
    }

    export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("📥 Received:", body);

        const hashedPassword = await bcrypt.hash(body.password || "password123", 10);

        const newStaff = await prisma.staff.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashedPassword,
            role: body.role,
            phone: body.phone || null,
            status: "Active",
        },
        });

        console.log("✅ Staff created:", newStaff.email);
        return NextResponse.json(newStaff, { status: 201 });
    } catch (error: any) {
        console.error("❌ Prisma error:", error);
        return NextResponse.json({ error: error.message || "Failed to create employee" }, { status: 500 });
    }
    }