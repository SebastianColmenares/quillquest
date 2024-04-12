'use client'
import { useGSAP } from "@gsap/react"
import { animatePageIn } from "@/utils/animations"

export default function Template({children})
{
    useGSAP(() => {
        animatePageIn()
    }, [])

    return (
        <div>
            
            <div id="banner-1" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-0 w-1/4"/>
            <div id="banner-2" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-1/4 w-1/4"/>
            <div id="banner-3" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-2/4 w-1/4"/>
            <div id="banner-4" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-3/4 w-1/4"/>
            
            {children}
        </div>
    )
}