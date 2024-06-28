'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TipTap from '@/components/TipTap';

export default function NuevaEscritura() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const router = useRouter();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, description, genre })
      });
      router.push("/client");
      router.refresh();

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log('Success:', await response.json());
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-16 px-4 md:px-0">
      <div className="mb-5">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md"
          placeholder='Titulo'
        />
      </div>
      <div className="mb-5">
        <select
          value={genre}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md"
          onChange={handleGenreChange}
        >
          <option value="">--Selecciona un genero--</option>
          <option value="Ficcion">Ficcion</option>
          <option value="No-Ficticia">No-Ficticia</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Terror">Terror</option>
          <option value="Biografica">Biografica</option>
          <option value="Romance">Romance</option>
          <option value="Suspenso">Suspenso</option>
        </select>
      </div>
      <div className="mb-5">
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          rows="4"
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md"
          placeholder='Sinopsis'
        ></textarea>
      </div>
      <div className="mb-5">
        <TipTap content={content} onChange={handleContentChange} />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
