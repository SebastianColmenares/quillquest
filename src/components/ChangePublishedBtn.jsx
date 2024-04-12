'use client'
import { useRouter } from "next/navigation";

export default function ChangePublishedBtn({bookId, published, label}) {
    

    const router = useRouter();

    async function handleClick()
    {
        try {
                await fetch(`/api/published/${bookId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ published })
                })
                router.refresh();
                console.log('Success:', await response.json());

            } catch(e) {
                console.error(e);
            }
    }

return (
    <button className="hover:bg-gray-400 p-3 rounded-3xl border-2 border-slate-700 transition duration-300" onClick={handleClick}>{label}</button>
)
}