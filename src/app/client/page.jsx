import Books from '@/components/Books';
import db from '@/libs/db';
import { getCurrentUser } from '@/libs/session';
import { Fugaz_One } from "next/font/google";
import Link from 'next/link';

const fugaz = Fugaz_One ({
    weight: '400',
    subsets: ['latin'],
  })

export default async function ClientPage()
{  
    const userPerfil = await getCurrentUser();
    console.log(userPerfil);

    const myBooks = await db.book.findMany({
        where: {
            authorName: userPerfil?.name,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            author: true,
        },
    });
    console.log(myBooks)

   { 
        return(
            <>
                <div className='container max-w-4xl mx-auto py-8'>
                    <div className={fugaz.className}>
                    <h1 className='text-4xl'>Mis Libros</h1>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-10'>
                    {
                myBooks.map((myBooks) => {
                    const dateString = new Date(myBooks.createdAt).toDateString();
                        return (
                    <Link key={myBooks.id} href={`/libros/${myBooks.id}`}>
                        <Books
                        key={myBooks.id}
                        id={myBooks.id}
                        title={myBooks.title}
                        description={myBooks.description}
                        authorName={myBooks.author?.username}
                        dateCreated={dateString}
                        />
                    </Link>
                        )
                    })
                    }
                    </div>
                </div>
            </>
        )
    }
}