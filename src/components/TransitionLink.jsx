'use client'
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

export default function TransitionLink({href, label}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if(pathname !== href)
        {
            animatePageOut(href, router);
        }
    }
    return (
        <p className="cursor-pointer" onClick={handleClick}>
            {label}
        </p>
    )
}