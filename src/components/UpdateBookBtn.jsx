'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function UpdateBookBtn({bookId, initialContent, initialTitle, initialDesc}) {

const [bookContent, setBookContent] = useState(initialContent);
  const [bookTitle, setBookTitle] = useState(initialTitle);
  const [bookDesc, setBookDesc] = useState(initialDesc)

  const router = useRouter();

  const handleContentChange = (event) => {
    setBookContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setBookDesc(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    

    try {
       const response = await fetch(`/api/editBook/${bookId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title: bookTitle, content: bookContent, description: bookDesc })
      })
      router.refresh()
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      console.log('Success:', await response.json());
      
    } catch (error) {
      console.error('Fetch error:', error.message);
    }

  };

return (
    <button className="hover:bg-lime-400 p-3 rounded-3xl border-2 border-slate-700 hover:border-lime-400 transition duration-300" onClick={handleClick}>Confirmar Cambios</button>
)
}