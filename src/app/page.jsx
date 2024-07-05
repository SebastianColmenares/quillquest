import Link from 'next/link';
import db from '@/libs/db';
import Books from '@/components/Books';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Rubik_Mono_One } from "next/font/google";

const rubik = Rubik_Mono_One({
  weight: '400',
  subsets: ['latin'],
})

async function getBooks(){
  const books = await db.book.findMany({
    take:3,
    where: {published: true},
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: { select: {username: true} },
      genre: { select: {name: true} }
    }
  })
  return books;
}

async function HomePage() {

  const books = await getBooks();
  const session = await getServerSession(authOptions);

  return (
      <>
        {!session?.user ? (
          <>
          <main className='flex flex-col items-center justify-center'>
                  <div className='w-screen h-fit border-b-2 flex flex-col items-center border-[#7f8990] p-10'>

                  <div className={rubik.className}>
                    <h1 className='text-2xl tracking-[0.8rem] mb-5 text-center text-slate-100'> RECIENTEMENTE AGREGADOS </h1>
                  </div>
                    
                    <div className='grid grid-cols-3 mt-5'>
                        {
                          books.map((book) => {
                            const dateString = new Date(book.createdAt).toDateString();

                            return (
                              
                                <Link key={book.id} href={`/libros/${book.id}`}>
                                <Books
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                description={book.description}
                                authorName={book.author.username}
                                genres={book.genre.name}
                                dateCreated={dateString}
                                />
                                </Link>
                            )
                          })
                        }
                    </div>
                  </div>


              <div className='mt-10 mb-7'>
                <div className={rubik.className}>
                  <h1 className='text-2xl tracking-[0.8rem] text-center text-slate-100'> NAVEGA </h1>
                </div>

              <div>
              <div className="text-gray-800 text-2xl flex justify-center mt-4 w-10/12">
                <section className="p-10 grid grid-cols-5 grid-rows-2 gap-[1.5px] w-full">
                    <div className="text-slate-200 text-xs flex justify-center items-center flex-col gap-1 col-span-1 row-span-2 p-3">
                        <section>
                            <div className="mb-5">
                                <div className="flex -space-x-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-emerald-500 w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-emerald-500 w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-emerald-500 w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="opacity-50"> Un espacio donde tu creatividad puede fluir sin límites, donde las ideas se transformen en historias cautivadoras y los documentos cobren vida con un diseño atractivo. Esa es la esencia de una aplicación web diseñada para crear y publicar cuentos y cualquier tipo de documento de texto. </p>
                        </section>
                    </div>

                    <div className="p-10 text-white bg-gradient-to-r from-indigo-700 flex flex-col gap-1 col col-span-4 row-span-1 hover:bg-indigo-900 transition duration-400">
                        <Link href="/biblioteca">BIBLIOTECA</Link>
                        <p className="text-sm">Navega por nuestra biblioteca, donde quizas encuentres la historia que buscas.</p>
                    </div>
                    <button className="p-10 text-white bg-gradient-to-r from-indigo-700 flex flex-col gap-1 col col-span-2 row-span-1 hover:bg-indigo-900 transition duration-400">
                        <Link href="/auth/ingreso">INGRESAR </Link>
                        <p className="text-sm">Si ya tienes una cuenta creada igresa a ella.</p>
                    </button>
                    <button className="p-10 text-white bg-gradient-to-r from-indigo-700 flex flex-col gap-1 col col-span-2 row-span-1 hover:bg-indigo-900 transition duration-400">
                        <Link href="/auth/registro">REGISTRARME</Link>
                        <p className="text-sm">Crea tu perfil.</p>
                    </button>
                </section>
            </div>
          </div>
              </div>
          </main>
        </>
        ):(
          <>
            <main className='flex flex-col items-center justify-center'>
                    <div className='w-screen h-fit border-b-2 flex flex-col items-center border-[#7f8990] p-10'>

                    <div className={rubik.className}>
                      <h1 className='text-2xl tracking-[0.8rem] mb-5 text-center text-slate-100'> RECIENTEMENTE AGREGADOS </h1>
                    </div>
                      
                      <div className='grid grid-cols-3 mt-5'>
                          {
                            books.map((book) => {
                              const dateString = new Date(book.createdAt).toDateString();

                              return (
                                
                                  <Link key={book.id} href={`/libros/${book.id}`}>
                                  <Books
                                  key={book.id}
                                  id={book.id}
                                  title={book.title}
                                  description={book.description}
                                  authorName={book.author.username}
                                  genre={book.genre.name}
                                  dateCreated={dateString}
                                  />
                                  </Link>
                              )
                            })
                          }
                      </div>
                    </div>


                <div className='mt-10 mb-7'>
                  <div className={rubik.className}>
                    <h1 className='text-2xl tracking-[0.8rem] text-center text-slate-100'> NAVEGA </h1>
                  </div>

                <div>
                <div className="text-gray-800 text-2xl flex justify-center mt-4 w-10/12">
                  <section className="p-10 grid grid-cols-5 grid-rows-2 gap-[1.5px] w-full">
                      <div className="text-slate-200 text-xs flex justify-center items-center flex-col gap-1 col-span-1 row-span-2 p-3">
                          <section>
                              <div className="mb-5">
                                  <div className="flex -space-x-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-emerald-500 w-10 h-10">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-emerald-500 w-10 h-10">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-emerald-500 w-10 h-10">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                          </svg>
                                      </div>
                                  </div>
                                  <p className="opacity-50"> Un espacio donde tu creatividad puede fluir sin límites, donde las ideas se transformen en historias cautivadoras y los documentos cobren vida con un diseño atractivo. Esa es la esencia de una aplicación web diseñada para crear y publicar cuentos y cualquier tipo de documento de texto. </p>
                          </section>
                      </div>

                      <div className="p-10 text-white bg-gradient-to-r from-indigo-700 flex flex-col gap-1 col col-span-4 row-span-1 hover:bg-indigo-900 transition duration-400">
                          <Link href="/biblioteca">BIBLIOTECA</Link>
                          <p className="text-sm">Navega por nuestra biblioteca, donde quizas encuentres la historia que buscas.</p>
                      </div>
                      <div className="p-10 text-white bg-gradient-to-r from-indigo-700 flex flex-col gap-1 col col-span-2 row-span-1 hover:bg-indigo-900 transition duration-400">
                          <Link href="/nuevaHistoria">ESCRIBIR HISTORIA</Link>
                          <p className="text-sm">Si tienes algun relato en mente, esta es la oportunidad para escribirlo y publicarlo.</p>
                      </div>
                      <button className="p-10 text-white bg-gradient-to-r from-indigo-700 flex flex-col gap-1 col col-span-2 row-span-1 hover:bg-indigo-900 transition duration-400">
                          <Link href="/client">MI PERFIL</Link>
                          <p className="text-sm">Revisa las historias que ya has escrito y publicado, editalas, o personaliza tu perfil.</p>
                      </button>
                  </section>
              </div>
            </div>
                </div>
            </main>
          </>
        )
      } 
    </>
    )
}

export default HomePage