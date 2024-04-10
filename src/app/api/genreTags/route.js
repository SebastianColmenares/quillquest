import db from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET()
{
    try{
        const genreTags = await db.genres.findMany();
        return NextResponse.json(genreTags, {status: 200});
    } catch(error)
    {
        return NextResponse.json({message: 'No se encontraron genres'}, {status: 500});
    }
}