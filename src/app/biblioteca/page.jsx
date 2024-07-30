import db from '@/libs/db';
import Books from '@/components/Books';
import RecentBookCard from '@/components/RecentBookCard';
import Link from 'next/link';
import styles from './Library.module.css';
import { Rubik_Mono_One } from "next/font/google";

const rubik = Rubik_Mono_One({
  weight: '400',
  subsets: ['latin'],
});

async function getBooks() {
  const books = await db.book.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { username: true } },
      genre: { select: { name: true } }
    }
  });
  return books;
}

async function getRecentBooks() {
  const books = await db.book.findMany({
    take: 3,
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { username: true } } },
  });
  return books;
}

export default async function bibliotecaPage() {
  const books = await getBooks();
  const recentBooks = await getRecentBooks();

  return (
    <main className="bg-gray-full text-gray-200 min-h-screen">
      <section className="w-full max-w-6xl mx-auto py-12 px-6 bg-gray-800 rounded-lg mb-12">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center mb-8">Lo mas nuevo</h1>
        </div>
        <div className={`flex ${styles.recentBookContainer} w-full`}>
          {recentBooks.map((book) => {
            const dateString = new Date(book.createdAt).toDateString();

            return (
              <Link key={book.id} href={`/libros/${book.id}`}>
                <RecentBookCard
                  id={book.id}
                  title={book.title}
                  description={book.description}
                  authorName={book.author.username}
                  dateCreated={dateString}
                  className={`${styles.recentBookItem} w-full`}
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto py-12 px-6 bg-gray-800 rounded-lg mb-12">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center mb-8">Todos los Libros</h1>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${styles.bookGrid}`}>
          {books.length ? (
            books.map((book) => {
              const dateString = new Date(book.createdAt).toDateString();
              return (
                <Link key={book.id} href={`/libros/${book.id}`} className="block">
                  <div className="bg-gray-800 text-gray-200 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                    <Books
                      id={book.id}
                      title={book.title}
                      description={book.description}
                      authorName={book.author.username}
                      genres={book.genre.name}
                      dateCreated={dateString}
                      className="p-6"
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No hay libros disponibles en este momento.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-4 py-2 mx-1 bg-gray-700 rounded text-gray-200">
            Anterior
          </button>
          <span className="px-4 py-2 mx-1 bg-gray-800 rounded text-gray-200">
            Página X de Y
          </span>
          <button className="px-4 py-2 mx-1 bg-gray-700 rounded text-gray-200">
            Siguiente
          </button>
        </div>
      </section>
    </main>
  );
}
