import db from '@/libs/db';
import DeleteBookBtn from '@/components/DeleteBookBtn';
import ChangePublishedBtn from '@/components/ChangePublishedBtn';
import { getCurrentUser } from '@/libs/session';

export default async function BookDetailPage({ params }) {
    const userPerfil = await getCurrentUser();
    const bookId = params.id;

    const book = await db.book.findFirst({
        where: {
            id: bookId,
        },
        include: {
            author: true,
        },
    });

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {userPerfil?.email === book?.author?.email && (
                <div className="mb-8 flex justify-between items-center">
                    <DeleteBookBtn bookId={book.id} />
                    {!book?.published ? (
                        <>
                            <span className="text-lg bg-red-400 text-white rounded-full px-4 py-2">No publicado</span>
                            <ChangePublishedBtn bookId={book?.id} published={true} label={"Publicar"} />
                        </>
                    ) : (
                        <>
                            <span className="text-lg bg-lime-400 text-black font-bold rounded-full px-4 py-2">Publicado</span>
                            <ChangePublishedBtn bookId={book?.id} published={false} label={"Ocultar"} />
                        </>
                    )}
                </div>
            )}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:flex-1 lg:pr-4">
                    <div className="text-center lg:text-left mb-8">
                        <h1 className="text-4xl font-bold text-gray-200 mb-2">{book?.title}</h1>
                        <p className="text-lg text-slate-500 mb-2">Escrito por: <span className="font-semibold">{book?.authorName}</span></p>
                        <p className="text-lg text-slate-500 mb-2">Género: <span className="font-semibold">{book?.genreName.join(', ')}</span></p>
                        <p className="text-lg text-slate-500 mb-4">Descripción: <span className="font-semibold">{book?.description}</span></p>
                    </div>
                    <div id="bookContent" dangerouslySetInnerHTML={{ __html: book?.content }} className="prose max-w-none text-gray-300"></div>
                </div>
                {book?.portada && (
                    <div className="lg:w-1/4 lg:pl-4 mt-4 lg:mt-0 flex justify-center lg:justify-end">
                        <img className="w-32 h-48 object-cover rounded-lg" src={book.portada} alt="Book Cover" />
                    </div>
                )}
            </div>
            
        </div>
    );
}

