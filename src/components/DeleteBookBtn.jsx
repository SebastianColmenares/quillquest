'use client'
import { useRouter } from "next/navigation";

export default function DeleteBookBtn({bookId}) {

    const router = useRouter();

    async function handleClick()
    {
        try {
                await fetch(`/api/book/${bookId}`, {
                method: 'DELETE',
                })
                router.push("/client");
                router.refresh();
            } catch(e) {
                console.error(e);
            }
    }

return (
    <button className="hover:bg-red-400 p-3 rounded-3xl border-2 border-slate-700 hover:border-red-400 transition duration-300" onClick={handleClick}>Borrar Libro</button>
)
}