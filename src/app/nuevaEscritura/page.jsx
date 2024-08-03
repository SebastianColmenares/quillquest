'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditorText from '@/components/Editor';

export default function NuevaEscritura() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
  }

  const router = useRouter();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePublishedChange = (event) => {
    setPublished(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleGenreChange = (event) => {
    const selectedGenres = event.target.value.split(',').map(genre => genre.trim());
    setGenres(selectedGenres);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const postData = { title, content, description, genres, image, published };
      console.log('Sending data:', postData);
  
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      router.push("/client");
    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-16">
       <div className="mb-5 ">
        <select 
          id="published" 
          value={published} 
          onChange={handlePublishedChange}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md text-[#a7a6a6]"
        >
          <option value="true">Publico</option>
          <option value="false">Privado</option>
        </select>
      </div>
      <div className="mb-5">
        <input type="text" id="title" value={title} onChange={handleTitleChange}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md" placeholder='Titulo' />
      </div>
      <div className="mb-5">
        <input type="text" id="genre" value={genres.join(', ')} onChange={handleGenreChange}
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md" placeholder='Generos (Separalos con comas   " , ")' />
      </div>
      <div className="mb-5">
        <textarea value={description} onChange={handleDescriptionChange} rows="4"
          className="mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md" placeholder='Sinopsis'></textarea>
      </div>
      <div className="mt-1 block w-full px-4 shadow-inner text-[#a7a6a6] bg-[#222222] shadow-black py-3 rounded-md mb-5">
        <p>Portada:</p>
        <input type="file" accept="image/*" onChange={convertToBase64}/>
      </div>
      <div className="mb-5">
        <EditorText content={content} onChange={(newContent) => handleContentChange(newContent)} />
      </div>
      <button 
        type="submit" 
        className={`w-full px-4 py-2 rounded-md ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'}`} 
        disabled={loading}
      >
        {loading ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  );
}
