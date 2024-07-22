import Link from 'next/link';
import db from '@/libs/db';
import Books from '@/components/Books';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Rubik_Mono_One } from "next/font/google";

const rubik = Rubik_Mono_One({
  weight: '400',
  subsets: ['latin'],
});

async function getBooks() {
  const books = await db.book.findMany({
    take: 3,
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { username: true } } },
  });
  return books;
}

async function getPopularGenres() {
  try {
    const books = await db.book.findMany({
      where: { published: true },
      include: { genres: true },
    });

    const genreCounts = {};
    books.forEach(book => {
      book.genres.forEach(genre => {
        genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1;
      });
    });

    const sortedGenres = Object.keys(genreCounts)
      .map(id => ({ id, count: genreCounts[id] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(async ({ id }) => await db.genre.findUnique({ where: { id } }));

    return await Promise.all(sortedGenres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

async function getPopularBooks() {
  try {
    const books = await db.book.findMany({
      take: 5,
      where: { published: true },
      orderBy: { popularity: 'desc' },
      include: { author: { select: { username: true } } },
    });
    return books;
  } catch (error) {
    console.error('Error fetching popular books:', error);
    return [];
  }
}

async function HomePage() {
  const books = await getBooks();
  const genres = await getPopularGenres();
  const popularBooks = await getPopularBooks();
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-gray-900 text-gray-200 min-h-screen">
      <section className="w-full max-w-6xl mx-auto py-12 px-6 bg-gray-800 rounded-lg mb-12">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center mb-8">Últimos Libros</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.length ? (
            books.map((book) => {
              const dateString = new Date(book.createdAt).toDateString();
              return (
                <Link key={book.id} href={`/libros/${book.id}`} className="block">
                  <div className="bg-gray-800 text-gray-200 rounded-lg transform transition-transform hover:scale-105">
                    <Books
                      id={book.id}
                      title={book.title}
                      description={book.description}
                      authorName={book.author.username}
                      genres={book.genreName}
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
      </section>

      <section className="w-full max-w-6xl mx-auto py-12 px-6 bg-gray-800 rounded-lg mb-12">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center mb-8">Nuevas Recomendaciones</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularBooks.length ? (
            popularBooks.map((book) => {
              const dateString = new Date(book.createdAt).toDateString();
              return (
                <Link key={book.id} href={`/libros/${book.id}`} className="block">
                  <div className="bg-gray-800 text-gray-200 rounded-lg transform transition-transform hover:scale-105">
                    <Books
                      id={book.id}
                      title={book.title}
                      description={book.description}
                      authorName={book.author.username}
                      genres={book.genreName}
                      dateCreated={dateString}
                      className="p-6"
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No hay libros populares en este momento.</p>
          )}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto py-12 px-6 bg-gray-800 rounded-lg mb-12">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center mb-8">Géneros Populares</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {genres.length ? (
            genres.map((genre) => (
              <div key={genre.id} className="bg-gray-700 p-6 rounded-lg text-center">
                <h2 className="text-3xl font-semibold mb-2">{genre.name}</h2>
                <p className="text-gray-400">{genre.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No hay géneros populares en este momento.</p>
          )}
        </div>
      </section>

      <section className="w-full max-w-6xl py-10 mx-auto text-center">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center text-white mb-6">Navega</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center text-white shadow-lg flex flex-col items-center">
            <div className="mb-6 flex justify-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-teal-400 w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              ))}
            </div>
            <p className="text-gray-400">
              Un espacio donde tu creatividad puede fluir sin límites, donde las ideas se transformen en historias cautivadoras y los documentos cobren vida con un diseño atractivo.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-6 rounded-lg text-white shadow-lg flex flex-col gap-6 text-center">
            <h2 className="text-2xl font-bold">Únete a la Comunidad</h2>
            <p className="text-gray-200">
              Forma parte de una comunidad de escritores apasionados, comparte tus obras, recibe comentarios constructivos y descubre el talento de otros usuarios.
            </p>
            <button className="self-center px-4 py-2 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75">
              Regístrate Ahora
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-700 via-blue-700 to-purple-700 p-6 rounded-lg text-white shadow-lg flex flex-col gap-6 text-center">
            <h2 className="text-2xl font-bold">Explora y Descubre</h2>
            <p className="text-gray-200">
              Explora una vasta biblioteca de cuentos y documentos creados por otros usuarios, descubre nuevos géneros y estilos de escritura, y encuentra inspiración para tus propias creaciones.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto py-12 px-6 bg-gray-800 rounded-lg mb-12">
        <div className={rubik.className}>
          <h1 className="text-4xl font-bold text-center mb-8">Últimos Artículos</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h2 className="text-3xl font-semibold mb-2">Artículo Destacado</h2>
            <p className="text-gray-400">Este es un artículo destacado en la plataforma. Aprende más sobre temas interesantes aquí.</p>
            <Link href="/articulos/destacado" className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Leer Más</Link>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h2 className="text-3xl font-semibold mb-2">Artículos Recientes</h2>
            <p className="text-gray-400">Consulta los artículos más recientes y mantente al tanto de las novedades.</p>
            <Link href="/articulos/recientes" className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Ver Artículos</Link>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h2 className="text-3xl font-semibold mb-2">Artículos Populares</h2>
            <p className="text-gray-400">Descubre los artículos más populares entre nuestros usuarios.</p>
            <Link href="/articulos/populares" className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Leer Populares</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;