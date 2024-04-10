import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TransitionLink from './TransitionLink';
import TransitionImageLink from './TransitionImageLink';

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user ? (
        <>
          <header className='max-w-screen flex flex-wrap items-center justify-between mx-auto p-4'>
                <nav className='flex justify-between items-center container mx-auto'>

                        <TransitionImageLink href='/' />

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
                        
                        <div className='group flex items-center uppercase text-lg rounded-3xl p-4 hover:bg-[#abfed4] hover:text-[#000] transition duration-300'>
                        <TransitionLink href="/auth/registro" label="Registrarme"/>
                        </div>
                        <div className='group flex items-center uppercase text-lg rounded-3xl p-4 hover:bg-[#fbffbc] hover:text-[#000] transition duration-300'>
                        <TransitionLink href="/auth/ingreso" label="Ingresar"/>
                        </div>
                    </div>
                </nav>
            </header>
        </>
        ) : (
        <>
            <header className='max-w-screen flex flex-wrap items-center justify-between mx-auto p-4'>
                <nav className='flex justify-between items-center container mx-auto'>
                <TransitionImageLink href='/' />
                    <ul className='flex flex-1 justify-center items-center gap-16'>
                    <li className="group flex items-center uppercase text-xl rounded-3xl p-4 cursor-pointer hover:bg-[#b09cff] hover:text-[#000] transition duration-300">
                            <TransitionLink href="/biblioteca" label="Biblioteca"/>                     
                      </li>
                      <li className="group flex items-center uppercase text-xl rounded-3xl p-4 cursor-pointer hover:bg-[#9cffe3] hover:text-[#000] transition duration-300">
                            <TransitionLink href="/nuevaEscritura" label="Escribir historia"/>
                      </li>
                    </ul>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
                        
                        <li className="group flex items-center uppercase text-xl rounded-3xl p-4 cursor-pointer hover:bg-[#f4feab] hover:text-[#000] transition duration-300">
                            <TransitionLink href="/client" label="Mi perfil"/>
                        </li>

                        <li className="group flex items-center uppercase text-md rounded-3xl p-4 cursor-pointer hover:bg-[#ffab9c] hover:text-[#000] transition duration-300">
                            <TransitionLink href="/api/auth/signout" label="Signout"/>
                        </li>
                    </div>
                </nav>
            </header>
        </>
        )
      }
    </>
  );
};

export default Navbar;