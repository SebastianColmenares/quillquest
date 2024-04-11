import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request) {
  try {
    const res = await request.json();
    const { title, content, description } = res;

    if (!title || !content || !description) {
      return NextResponse.json({ message: 'Missing required fields in request body' }, { status: 400 });
    }

    const id = parseInt(request.query.id, 10);
    const book = await db.book.update({
      where: { id },
      data: {
        title,
        content,
        description,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: 'Error updating book' }, { status: 500 });
  }
}