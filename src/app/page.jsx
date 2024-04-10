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
                      <h1 className='font-black text-2xl text-center'> Recientemente Agregados </h1>
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
                <section className='grid grid-cols-3 grid-rows-3 gap-4 w-fit mt-5'>
                  
                    <div className='p-6 border rounded-[12px] flex flex-col gap-1
                      bg-[#cefff2] shadow-md shadow-[#b192ff] hover:shadow-inner hover:shadow-[#b192ff] hover:bg-[#c8ceff] hover:translate-x-2 transition duration-500
                      relative overflow-hidden cursor-pointer group'>
                        <Link href='/nuevaEscritura'>
                          <Image src={fondo1} alt='Logo Quill Quest' className='absolute inset-0 bg-cover bg-center mix-blend-overlay'></Image>
                          <div className='absolute inset-0 bg-[#b192ff] hover:bg-[#9e78ff] opacity-10 group-hover:opacity-30 transition duration-500'/>
                          <div className='relative'>
                            <p className='text-[16px]'>Escribe una nueva historia</p>
                            <p className='text-[28px]'>Escritura</p>
                          </div>
                        </Link>
                    </div>
                  
                  <div className='p-6 border flex flex-col gap-1 col col-span-2 row-span-2
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

                  <div className='p-6 border flex flex-col gap-1
                  bg-[#fffee6] shadow-md shadow-[#b192ff] rounded-[12px] hover:shadow-inner hover:shadow-[#b192ff] hover:bg-[#c8ceff] hover:translate-x-2 transition duration-500
                      relative overflow-hidden cursor-pointer group'>
                        <Link href='/client'>
                          <Image src={fondo3} alt='Libros' className='absolute inset-0 bg-cover bg-center mix-blend-overlay'></Image>
                          <div className='absolute inset-0 bg-[#b192ff] hover:bg-[#9e78ff] opacity-10 group-hover:opacity-30 transition duration-500'/>
                          <div className='relative'>
                          <p className='text-[16px]'>Revisa tus cuentos</p>
                          <p className='text-[28px]'>Mi perfil</p>
                          </div>
                        </Link>
                    </div>
                </section>
                </div>
            </main>
          </>
        )
      } 
    </>
    )
}

export default HomePage