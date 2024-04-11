import { NextResponse } from "next/server";
import db from "@/libs/db";


export async function DELETE(request, { params }) {
    const id = parseInt(params.id, 10);

    const book = await db.book.delete({
        where: {id},
    })

    return NextResponse.json(book);
}

export async function UPDATE(request, { params }) {
    const res = await request.json();
    const { title, content, description } = res;


    const id = parseInt(params.id, 10);

    const result = await db.book.updateMany({
            where: {id},
            data: {
                title: title,
                content: content,
                description: description,
            }
        },
        
    )

    return NextResponse.json(result);
}