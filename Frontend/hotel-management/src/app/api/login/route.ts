import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Look for the user in your XAMPP MySQL 'users' table
        const user = await prisma.users.findUnique({
        where: { email: email },
        });

        // Check if user exists and password matches what you set in phpMyAdmin
        if (user && user.password === password) {
        return NextResponse.json({ 
            role: user.role,
            name: user.name 
        });
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
    }