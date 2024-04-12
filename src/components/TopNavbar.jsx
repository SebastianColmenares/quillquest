import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TransitionLink from './TransitionLink';
import TransitionImageLink from './TransitionImageLink';
import { Rubik_Mono_One } from "next/font/google";

const rubik = Rubik_Mono_One({
  weight: '400',
  subsets: ['latin'],
})

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user ? (
        <>
        <div className={rubik.className}>
          <div className="font-black text-slate-100 items-center flex justify-between px-48 text-4xl border-b-2 border-t-2 mt-4">
            <span className="tracking-[4rem]">QUILL</span>
            <TransitionImageLink href="/"/>
            <span className="tracking-[4rem]">QUEST</span>
          </div>
        </div>
          <div className="text-slate-200 gap-40 flex justify-center text-3xl border-b-2 border-t-2 mt-4">
            <span className="tracking-[1rem]">DESCUBRE</span>
            <span className="tracking-[1rem]">TU</span>
            <span className="tracking-[1rem]">PROXIMA</span>
            <span className="tracking-[1rem]">HISTORIA</span>
          </div>
          <div className="text-slate-100 text-2xl flex justify-center mt-4 mb-4">
            <ul className="flex gap-40">
                <div className=" p-2 hover:bg-lime-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/biblioteca" label="biblioteca"/>
                </div>
                <div className=" p-2 hover:bg-amber-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/auth/ingreso" label="ingreso"/>
                </div>
                <div className=" p-2 hover:bg-sky-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/auth/registro" label="registro"/>
                </div>
            </ul>
          </div>
        </>
        ) : (
        <>
        <div className={rubik.className}>
          <div className="font-black text-slate-100 items-center flex justify-between px-48 text-4xl border-b-2 border-t-2 mt-4">
            <span className="tracking-[4rem]">QUILL</span>
            <TransitionImageLink href="/"/>
            <span className="tracking-[4rem]">QUEST</span>
          </div>
        </div>
            <div className="text-slate-200 gap-40 flex justify-center text-3xl border-b-2 border-t-2 mt-4">
              <span className="tracking-[1rem]">DESCUBRE</span>
              <span className="tracking-[1rem]">TU</span>
              <span className="tracking-[1rem]">PROXIMA</span>
              <span className="tracking-[1rem]">HISTORIA</span>
            </div>
            <div className="text-slate-100 text-2xl flex justify-center mt-4 mb-4">
              <ul className="flex gap-40">
                <div className=" p-2 hover:bg-purple-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/" label="menu"/>
                </div>
                <div className=" p-2 hover:bg-lime-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/biblioteca" label="biblioteca"/>
                </div>
                <div className=" p-2 hover:bg-amber-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/nuevaEscritura" label="escribir historia"/>
                </div>
                <div className=" p-2 hover:bg-sky-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/client" label="mi perfil"/>
                </div>
                <div className=" p-2 hover:bg-rose-300 hover:text-black rounded-xl transition duration-400">
                  <TransitionLink href="/api/auth/signout" label="salir"/>
                </div>
              </ul>
            </div>
        </>
        )
      }
    </>
  );
};

export default Navbar;