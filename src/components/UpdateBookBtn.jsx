'use client'
import { useRouter } from "next/navigation";

export default function UpdateBookBtn({bookId}) {

    const router = useRouter();

    async function handleClick()
    {
        try {
                await fetch(`/api/book/${bookId}`, {
                method: 'PUT',
                })
                router.push("/client");
                router.refresh();
            } catch(e) {
                console.error(e);
            }
    }

return (
    <button className="hover:bg-lime-400 p-3 rounded-3xl border-2 border-slate-700 hover:border-lime-400 transition duration-300" onClick={handleClick}>Confirmar Cambios</button>
)
}