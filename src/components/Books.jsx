import db from '@/libs/db';
import { Oswald } from "next/font/google";

const oswald = Oswald ({
    weight: '400',
    subsets: ['latin'],
  })

export default function Books({id, title, description, authorName, dateCreated, genre, color})
    {
        return(
        <div>
                <div className='flex items-center justify-center m-2'>
                    <div className="container p-5 mx-auto bg-indigo-700 hover:bg-indigo-400 shadow-lg shadow-black rounded-2xl hover:scale-110 transition duration-300">
                        <div className="text-md mt-5">
                            <div className="text-center mb-12">
                                <div className={oswald.className}>
                                    <h1 className="text-3xl font-semibold leading-none text-white hover:text-indigo-600 transition duration-500 ease-in-out">{title}</h1>
                                </div>
                                </div>
                                
                                <p className="text-lg text-gray-100">{authorName}</p>
                                <p className="text-sm text-emerald-500">{genre}</p>
                                
                                <p className="mt-5 p-2 font-mono text-sm bg-emerald-900 text-emerald-200">{dateCreated}</p>
                            </div>
                        <p className="p-2 mt-2 text-lg bg-gray-700 text-gray-300">{description}</p>
                    </div>
                </div>
        </div>
    )}