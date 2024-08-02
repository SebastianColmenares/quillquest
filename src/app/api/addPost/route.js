import db from '@/libs/db';
import { NextResponse } from "next/server";
import { getCurrentUser } from '@/libs/session';

export async function POST(request){
    try {
        const res = await request.json();
        const { title, content, description, genres, image } = res;

        const session = await getCurrentUser();
        const email = session.email;

        const userUnique = await db.user.findUnique({
            where: { email },
        });

        if (!userUnique) {
            throw new Error('User not found');
        }

        const result = await db.book.create({
            data: {
                title: title,
                content: content,
                authorName: userUnique.username,
                description: description,
                genreName: genres,
                portada: image,
                published: true
            }
        });

        return NextResponse.json({ result });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.error(new Error('Failed to create book'));
    }
}