import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TransitionLink from './TransitionLink';
import TransitionImageLink from './TransitionImageLink';
import { Rubik_Mono_One } from "next/font/google";
import AuthModal from './AuthModal';

const rubik = Rubik_Mono_One({
  weight: '400',
  subsets: ['latin'],
});

async function Navbar() {

  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user ? (
        <>

          <nav className="bg-gray-800 p-4 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <TransitionImageLink href="/" />
                <Link href="/" className="text-2xl font-bold text-white dark:text-white light:text-[#A3C666]">QUILL QUEST</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`${rubik.className} p-1 sm:p-2`}>
                  <Link href="/biblioteca" className="text-white dark:text-white light:text-[#A3C666] hover:underline hover:text-sky-600 decoration-sky-600">Biblioteca</Link>
                </div>
                <div className={`${rubik.className} p-1 sm:p-2`}>
                  <AuthModal />
                </div>
              </div>
            </div>
          </nav>
          <div className="pt-24">
            <div className="text-slate-200 gap-4 sm:gap-20 md:gap-40 flex justify-center text-lg sm:text-2xl md:text-3xl border-b-2 border-t-2 mt-4 px-4 md:px-8">
              <span className="tracking-[0.5rem] sm:tracking-[1rem] mt-4">DESCUBRE TU PRÓXIMA HISTORIA </span>
            </div>
          </div>
        </>
      ) : (
        <>

          <nav className="bg-gray-800 p-2 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <TransitionImageLink href="/" />
                <Link href="/" className="text-2xl font-bold text-white dark:text-white light:text-[#A3C666]">QUILL QUEST</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-white dark:text-white light:text-[#A3C666] hover:underline hover:text-sky-600 decoration-sky-600">Menú</Link>
                <Link href="/biblioteca" className="text-white dark:text-white light:text-[#A3C666] hover:underline hover:text-sky-600 decoration-sky-600">Biblioteca</Link>
                <Link href="/nuevaEscritura" className="text-white dark:text-white light:text-[#A3C666] hover:underline hover:text-sky-600 decoration-sky-600">Escribir Historia</Link>
                <Link href="/client" className="text-white dark:text-white light:text-[#A3C666] hover:underline hover:text-sky-600 decoration-sky-600">Mi Perfil</Link>
                <Link href="/api/auth/signout" className="text-white dark:text-white light:text-[#A3C666] hover:underline hover:text-sky-600 decoration-sky-600">Salir</Link>
              </div>
            </div>
          </nav>
          <div className="pt-24"> 
            <div className="text-slate-200 gap-4 sm:gap-20 md:gap-40 flex justify-center text-lg sm:text-2xl md:text-3xl border-b-2 border-t-2 mt-4 px-4 md:px-8">
              <span className="tracking-[0.5rem] sm:tracking-[1rem]">DESCUBRE TU PRÓXIMA HISTORIA </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;