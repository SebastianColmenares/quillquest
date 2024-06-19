'use client'
import { Oswald } from "next/font/google";
import { useState } from "react";

const oswald = Oswald ({
    weight: '400',
    subsets: ['latin'],
  })

export default function Books({id, title, description, authorName, dateCreated, genre, color})
    {

        const [expanded, setExpanded] = useState(false);

        const toggleExpand = () => {
            setExpanded(!expanded);
        };

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
                        <p className="p-2 mt-2 text-lg bg-gray-700 text-gray-300 line-clamp-5"  style={{ maxHeight: expanded ? 'none' : '7.5em', overflow: 'hidden' }}>{description}</p>
                        <button onClick={toggleExpand} className="text-blue-500 hover:underline mb-2">
                            {expanded ? 'Mostrar menos' : 'Leer más'}
                         </button>
                    </div>
                </div>
        </div>
    )}