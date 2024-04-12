import Image from 'next/image';
import Link from 'next/link';
import db from '@/libs/db';
import Books from '@/components/Books';
import logoQQ from "../../public/img/logoAmarillo.svg";
import fondo1 from '../../public/img/fondo1QQ.png';
import fondo2 from '../../public/img/fondo2.jpg';
import fondo3 from '../../public/img/fondo3.jpg';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TransitionLink from '@/components/TransitionLink';

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
            <main className='h-fit flex items-center justify-center'>
              
                <section className='grid grid-cols-4 grid-rows-3 gap-4 w-10/12'>
                  <div className='p-20 flex flex-col gap-1 col col-span-4 row-span-1
                    bg-[#cfe8fc] shadow-md shadow-[#8095bd] rounded-[12px] hover:shadow-inner hover:shadow-[#8095bd] hover:bg-[#b5d4ff] hover:translate-x-2 transition duration-500 cursor-pointer
                    relative overflow-hidden group'>
                      <Link href='/auth/registro'>
                      <Image src={logoQQ} alt="Fondo" height={200} className='absolute inset-0 bg-cover bg-center mix-blend-overlay'></Image>
                            <div className='absolute inset-0 bg-[#b192ff] hover:bg-[#9e78ff] opacity-10 group-hover:opacity-30 transition duration-500'/>
                            <div className='relative'>
                              <p className='text-[16px]'>Descubre tu próxima historia</p>
                              <p className='text-[28px]'>Quill Quest</p>
                            </div>
                      </Link>
                    </div>
                  
                    <div className='p-6 border rounded-[12px] flex flex-col gap-1 col col-span-2 row-span-1
                      bg-[#cefff2] shadow-md shadow-[#b192ff] hover:shadow-inner hover:shadow-[#b192ff] hover:bg-[#c8ceff] hover:translate-x-2 transition duration-500
                      relative overflow-hidden cursor-pointer group'>
                        <Link href='/auth/registro'>
                          <Image src={fondo1} alt="Logo Quill Quest" className='absolute inset-0 bg-cover bg-center mix-blend-overlay'></Image>
                          <div className='absolute inset-0 bg-[#b192ff] hover:bg-[#9e78ff] opacity-10 group-hover:opacity-30 transition duration-500'/>
                          <div className='relative'>
                            <p className='text-[16px]'>Registrate para publicar una historia</p>
                            <p className='text-[28px]'>Registrarme</p>
                          </div>
                        </Link>
                    </div>

                    <div className='p-6 border flex flex-col gap-1 col col-span-2 row-span-1
                  bg-[#fffee6] shadow-md shadow-[#b192ff] rounded-[12px] hover:shadow-inner hover:shadow-[#b192ff] hover:bg-[#c8ceff] hover:translate-x-2 transition duration-500
                      relative overflow-hidden cursor-pointer group'>
                        <Link href='/auth/ingreso'>
                          <Image src={fondo3} alt='Libros' className='absolute inset-0 bg-cover bg-center mix-blend-overlay'></Image>
                          <div className='absolute inset-0 bg-[#b192ff] hover:bg-[#9e78ff] opacity-10 group-hover:opacity-30 transition duration-500'/>
                          <div className='relative'>
                          <p className='text-[16px]'>Entra a tu cuenta</p>
                          <p className='text-[28px]'>Ingresar</p>
                          </div>
                        </Link>
                    </div>
                  
                  <div className='p-6 border flex flex-col gap-1 col col-span-4 row-span-1
                  bg-[#e6e9ff] shadow-md shadow-[#b192ff] rounded-[12px] hover:shadow-inner hover:shadow-[#b192ff] hover:bg-[#c8ceff] hover:translate-x-2 transition duration-500
                      relative overflow-hidden cursor-pointer group'>
                        <Link href='/biblioteca'>
                          <Image src={fondo2} alt='Libreria' className='absolute inset-0 bg-cover bg-center mix-blend-overlay'></Image>
                          <div className='absolute inset-0 bg-[#b192ff] hover:bg-[#9e78ff] opacity-10 group-hover:opacity-30 transition duration-500'/>
                          <div className='relative'>
                          <p className='text-[16px]'>Navega por las historias de otros autores</p>
                          <p className='text-[28px]'>Biblioteca</p>
                          </div>
                        </Link>
                    </div>

                  

                </section>
            </main>
          </>
        ):(
          <>
            <main className='flex flex-col items-center justify-center'>
                    <div className='w-screen h-fit border-b-2 flex flex-col items-center border-[#7f8990] p-10'>
                      <h1 className='font-black text-2xl tracking-[1rem] text-center text-slate-100'> RECIENTEMENTE AGREGADOS </h1>
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
                <h1 className='font-black text-2xl text-center'> Navega </h1>

                <div>
                <div id="qq" class="text-gray-800 text-2xl flex justify-center mt-4 w-10/12">
                  <section class="p-10 grid grid-cols-5 grid-rows-2 gap-[1.5px] w-full">
                      <div id="qq" class="text-slate-200 text-xs flex justify-center items-center flex-col gap-1 col-span-1 row-span-2 p-3">
                          <section>
                              <div class="mb-5">
                                  <div class="flex -space-x-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-10 h-10">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-10 h-10">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-10 h-10">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                          </svg>
                                      </div>
                                  </div>
                                  <p class="opacity-50"> Un espacio donde tu creatividad puede fluir sin límites, donde las ideas se transformen en historias cautivadoras y los documentos cobren vida con un diseño atractivo. Esa es la esencia de una aplicación web diseñada para crear y publicar cuentos y cualquier tipo de documento de texto. </p>
                          </section>
                      </div>

                      <div class="p-10 bg-pink-400 flex flex-col gap-1 col col-span-4 row-span-1 hover:bg-pink-500 transition duration-400">
                          <Link href="/biblioteca">BIBLIOTECA</Link>
                          <p class="text-sm">Navega por nuestra biblioteca, donde quizas encuentres la historia que buscas.</p>
                      </div>
                      <div class="p-10 bg-pink-400 flex flex-col gap-1 col col-span-2 row-span-1 hover:bg-pink-500 transition duration-400">
                          <Link href="/nuevaHistoria">ESCRIBIR HISTORIA</Link>
                          <p class="text-sm">Si tienes algun relato en mente, esta es la oportunidad para escribirlo y publicarlo.</p>
                      </div>
                      <button class="p-10 bg-pink-400 flex flex-col gap-1 col col-span-2 row-span-1 hover:bg-pink-500 transition duration-400">
                          <Link href="/client">MI PERFIL</Link>
                          <p class="text-sm">Revisa las historias que ya has escrito y publicado, editalas, o personaliza tu perfil.</p>
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