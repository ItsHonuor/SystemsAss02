import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email, password } = await req.json();

        if (!firstName || !lastName || !email || !password) {
        return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
        return NextResponse.json({ message: "An account with this email already exists." }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);

        await prisma.user.create({
        data: { firstName, lastName, email, password: hashed },
        });

        return NextResponse.json({ message: "Account created successfully." }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
    }