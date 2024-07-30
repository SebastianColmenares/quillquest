'use client';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
});

export default function RecentBookCard({ title, description, authorName, dateCreated, className }) {
  return (
    <div className={`flex items-center justify-center m-2 w-full ${className}`}>
      <div className="w-96 h-auto p-8 bg-slate-800 hover:bg-slate-700 shadow-lg shadow-black rounded-2xl hover:scale-110 transition duration-300 overflow-hidden">
        <div className="text-md">
          <div className="text-center mb-4">
            <div className={oswald.className}>
              <h1 className="text-3xl font-semibold leading-none text-white hover:text-indigo-600 transition duration-500 ease-in-out">
                {title}
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-100">{authorName}</p>
          <p className="mt-2 p-2 font-mono text-sm bg-slate-800 text-emerald-200">{dateCreated}</p>
        </div>
        <div className="p-4 mt-4 text-base bg-gray-700 text-gray-300 overflow-hidden">
          {description}
        </div>
      </div>
    </div>
  );
}
