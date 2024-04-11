import db from '@/libs/db';
import DeleteBookBtn from '@/components/DeleteBookBtn';
import { getCurrentUser } from '@/libs/session';
import UpdateBookBtn from '@/components/UpdateBookBtn';

export default async function BookDetailPage({params}) {
      
    const userPerfil = await getCurrentUser();
    const bookId = parseInt(params.id, 10);

    const books = await db.book.findFirst({
        where: {
            id: bookId,
        },
        include: {
            author: true,
            genre: true,
        },
    });

  return (
    <>
    {userPerfil?.email !== books?.author?.email ? (

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-bold">{books?.title}</h1>
                <span>Escrito por: </span>
                <span className='m-2 text-lg'>{books?.authorName} </span>
                <span className='m-2 text-lg'>{books?.genreName} </span>
                <div className="mt-4 text-lg "> {books?.content} </div>
            </div>

            ):(

            <div className="max-w-4xl mx-auto py-8">
                <ul className='flex justify-end gap-10'>
                    <DeleteBookBtn bookId={books.id}/>
                    <UpdateBookBtn
                    bookId={books.id}
                    initialTitle={books?.title}
                    initialDesc={books?.description}
                    initialContent={books?.content}
                    />
                </ul>
                
                <h1 id='bookTitle' contentEditable="true" className="text-3xl font-bold">{books?.title}</h1>
                <span>Escrito por: </span>
                <span className='m-2 text-lg'>{books?.authorName} </span>
                <span className='m-2 text-lg'>{books?.genreName} </span>
                <span id='bookDescription' contentEditable="true" className='m-2 text-lg'>{books?.description} </span>
                <div id='bookContent' contentEditable="true" className="mt-4 text-lg "> {books?.content} </div>
            </div>
        )
    }
    </>
  )
}

