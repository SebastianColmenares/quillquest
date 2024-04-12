'use client'
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";
import Image from "next/image";
import logoQQ from "../../public/img/QQLogo_blanco.svg";

export default function TransitionImageLink({href}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if(pathname !== href)
        {
            animatePageOut(href, router);
        }
    }
    return (
        <Image className="cursor-pointer" onClick={handleClick} src={logoQQ} alt="Quill Quest" width={20}/>
    )
}