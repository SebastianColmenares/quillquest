import { Oswald } from "next/font/google";

const oswald = Oswald ({
    weight: '400',
    subsets: ['latin'],
  })

export default function Books({id, title, description, authorName, dateCreated, genre, color})
    {
        return(
        <div>
                <div className='flex items-center justify-center m-4 '>
                    <div className="container p-10 mx-auto bg-[#ff88ef] hover:bg-[#fdd0f7] shadow-lg shadow-black rounded-2xl hover:scale-125 transition duration-300">
                        <div className="text-md mt-5">
                            <div className="text-center mb-12">
                                <div className={oswald.className}>
                                    <p className="text-2xl font-semibold leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">{title}</p>
                                </div>
                                </div>
                                
                                    <p className="text-md text-gray-600">{authorName}</p>
                                    <p className="text-md text-gray-600">{genre}</p>
                                
                                <p className=" font-mono text-sm text-indigo-600">{dateCreated}</p>
                            </div>
                        <p className="mt-2 text-md text-gray-900">{description}</p>
                    </div>
                </div>
        </div>
    )}