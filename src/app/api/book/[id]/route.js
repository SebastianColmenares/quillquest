import { NextResponse } from "next/server";
import db from "@/libs/db";


export async function DELETE(request, { params }) {
    const id = parseInt(params.id, 10);

    const book = await db.book.delete({
        where: {id},
    })

    return NextResponse.json(book);
}