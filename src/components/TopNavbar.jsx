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
  // Obtener la sesión actual del usuario
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user ? (
        <>
          {/* Barra de navegación para usuarios no autenticados */}
          <nav className="bg-gray-800 p-2 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TransitionImageLink href="/" />
                <Link href="/" className="text-xl font-bold text-white dark:text-white light:text-[#A3C666]">QUILL QUEST</Link>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`${rubik.className} p-1`}>
                  <Link href="/biblioteca" className="text-white dark:text-white light:text-[#A3C666] hover:underline">Biblioteca</Link>
                </div>
                <div className={`${rubik.className} p-1`}>
                  <AuthModal />
                </div>
              </div>
            </div>
          </nav>
          <div className="pt-16"> {/* Ajustar el padding-top */}
            {/* Aquí se puede añadir el contenido principal de la página */}
          </div>
        </>
      ) : (
        <>
          {/* Barra de navegación para usuarios autenticados */}
          <nav className="bg-gray-800 p-2 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TransitionImageLink href="/" />
                <Link href="/" className="text-xl font-bold text-white dark:text-white light:text-[#A3C666]">QUILL QUEST</Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-white dark:text-white light:text-[#A3C666] hover:underline">Inicio</Link>
                <Link href="/biblioteca" className="text-white dark:text-white light:text-[#A3C666] hover:underline">Biblioteca</Link>
                <Link href="/nuevaEscritura" className="text-white dark:text-white light:text-[#A3C666] hover:underline">Escribir Historia</Link>
                <Link href="/client" className="text-white dark:text-white light:text-[#A3C666] hover:underline">Mi Perfil</Link>
                <Link href="/api/auth/signout" className="text-white dark:text-white light:text-[#A3C666] hover:underline">Salir</Link>
              </div>
            </div>
          </nav>
          <div className="pt-16"> {/* Ajustar el padding-top */}
            {/* Aquí se puede añadir el contenido principal de la página */}
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
