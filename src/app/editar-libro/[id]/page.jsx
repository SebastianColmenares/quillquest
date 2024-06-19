/* @jsxImportSource @client */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import db from '@/libs/db';
import Tiptap from '@/components/TipTap';

export default function EditBookPage() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (id) {
      fetchBookData(id);
    }
  }, [id]);

  const fetchBookData = async (bookId) => {
    try {
      const response = await db.book.findFirst({
        where: {
          id: parseInt(bookId, 10),
        },
      });

      if (response) {
        setTitle(response.title);
        setContent(response.content);
        setDescription(response.description);
        setGenre(response.genre);
      } else {
        console.error('Book not found');
      }
    } catch (error) {
      console.error('Error fetching book:', error.message);
    }
  };

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
      const response = await fetch(`/api/updateBook/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, description, genre }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log('Book updated successfully');
      router.push(`/book/${id}`);
    } catch (error) {
      console.error('Update error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-16">
      <div className="mb-5">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md"
          placeholder="Titulo"
        />
      </div>
      <div className="mb-5">
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          rows="4"
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md"
          placeholder="Sinopsis"
        ></textarea>
      </div>
      <div className="mb-5">
        <Tiptap content={content} onChange={handleContentChange} />
      </div>
      <div className="mb-5">
        <select
          value={genre}
          onChange={handleGenreChange}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md peer"
        >
          <option value="" disabled>
            Select a genre
          </option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Biography">Biography</option>
          <option value="Romance">Romance</option>
          <option value="Suspense">Suspense</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        Update
      </button>
    </form>
  );
}
