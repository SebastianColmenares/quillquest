'use client'
import { Oswald } from 'next/font/google'
import { useState } from 'react'

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
});

export default function BookCard({ title, description, authorName, dateCreated, genres }) {
  return (
    <div className="flex items-center justify-center m-2">
      <div className="w-80 h-96 p-6 bg-slate-800 hover:bg-slate-700 shadow-lg shadow-black rounded-2xl hover:scale-110 transition duration-300 overflow-hidden">
        <div className="text-md">
          <div className="text-center mb-4">
            <div className={oswald.className}>
              <h1 className="text-2xl font-semibold leading-none text-white hover:text-indigo-600 transition duration-500 ease-in-out">
                {title}
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-100">{authorName}</p>
          <p className="mt-2 p-2 font-mono text-sm bg-emerald-900 text-emerald-200">{dateCreated}</p>
        </div>
        <div className="px-3 pt-2 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {genres}
          </span>
        </div>
        <div className="p-2 mt-2 text-base bg-gray-700 text-gray-300 overflow-hidden">
          {description}
        </div>
      </div>
    </div>
  );
}


