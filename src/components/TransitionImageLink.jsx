'use client'
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";
import Image from "next/image";
import logoQQ from "../../public/img/Logo_y_Letras.svg";

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
        <Image className="cursor-pointer" onClick={handleClick} src={logoQQ} width={120}/>
    )
}