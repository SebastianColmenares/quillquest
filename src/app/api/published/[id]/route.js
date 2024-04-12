import { NextResponse } from "next/server";
import db from "@/libs/db";
import { getCurrentUser } from '@/libs/session';


export async function PUT(request, { params }) {
    const res = await request.json();
    const id = parseInt(params.id, 10);

    const session = await getCurrentUser();
        const email = session.email;

        const userUnique = await db.user.findUnique({
            where: { email },
        });

        if (!userUnique) {
            throw new Error('User not found');
        }

    const result = await db.book.update({
        where: {id},
        data: {published: res.published}
    })

    return NextResponse.json({ result });
}