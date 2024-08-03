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
            {userPerfil?.email !== book?.author?.email ? (
                <>
                    <div className="mb-4">
                        <h1 className="text-4xl font-bold text-gray-300">{book?.title}</h1>
                        <p className="text-lg text-gray-600">Escrito por: <span className="font-semibold">{book?.authorName}</span></p>
                        <p className="text-lg text-gray-600">Género: <span className="font-semibold">{book?.genreName.join(', ')}</span></p>
                    </div>
                    <div id="bookContent" dangerouslySetInnerHTML={{ __html: book?.content }} className="prose max-w-none text-gray-300"></div>
                </>
            ) : (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-gray-300">{book?.title}</h1>
                        <div className="flex items-center gap-4">
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
                    </div>
                    <div className="mb-4">
                        <p className="text-lg text-gray-600">Escrito por: <span className="font-semibold">{book?.authorName}</span></p>
                        <p className="text-lg text-gray-600">Género: <span className="font-semibold">{book?.genreName.join(', ')}</span></p>
                        <p className="text-lg text-gray-600">Descripción: <span className="font-semibold">{book?.description}</span></p>
                    </div>
                    <div id="bookContent" dangerouslySetInnerHTML={{ __html: book?.content }} className="prose max-w-none text-gray-300"></div>
                </>
            )}
        </div>
    );
}

