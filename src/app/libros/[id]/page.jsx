import db from '@/libs/db';
import DeleteBookBtn from '@/components/DeleteBookBtn';
import ChangePublishedBtn from '@/components/ChangePublishedBtn';
import { getCurrentUser } from '@/libs/session';

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

                    {!books?.published ? (
                        <>
                            <span className='text-lg bg-red-400 rounded-3xl p-3 '>No publicado</span>
                            <ChangePublishedBtn bookId={books?.id} published={true} label={"Publicar"}/>
                        </> ) :
                    (
                        <>
                            <span className='text-lg bg-lime-400 text-black font-black rounded-3xl p-3'>Publicado</span>
                            <ChangePublishedBtn bookId={books?.id} published={false} label={"Ocultar"}/>
                        </>
                    
                    )}

                </ul>
                
                <h1 id='bookTitle' contentEditable="true" oninput="handleTextChange(this.innerHTML)" className="text-3xl font-bold">{books?.title}</h1>
                <span>Escrito por: </span>
                <span className='m-2 text-lg'>{books?.authorName} </span>
                <span className='m-2 text-lg'>{books?.genreName} </span>
                <span id='bookDescription' contentEditable="true" oninput="handleTextChange(this.innerHTML)" className='m-2 text-lg'>{books?.description} </span>
                <div id='bookContent' contentEditable="true" oninput="handleTextChange(this.innerHTML)" className="mt-4 text-lg " dangerouslySetInnerHTML={{ __html: books?.content}}/>
            </div>
        )
    }
    </>
  )
}

