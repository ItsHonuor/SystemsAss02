import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();

    const data: any = {};
    if (body.status)     data.status     = body.status;
    if (body.checkIn)    data.checkIn    = new Date(body.checkIn);
    if (body.checkOut)   data.checkOut   = new Date(body.checkOut);
    if (body.totalPrice) data.totalPrice = body.totalPrice;

    const booking = await prisma.booking.update({
        where: { id: parseInt(params.id) },
        data,
    });
    return NextResponse.json(booking);
}