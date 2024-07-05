'use client';
import { useGSAP } from "@gsap/react";
import { animatePageIn } from "@/utils/animations";
import { useState, useEffect } from 'react';

export default function Template({ children }) {
    useGSAP(() => {
        animatePageIn();
    }, []);

    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, [isDarkMode]);

    return (
        <div>
            <button 
                onClick={toggleTheme}
                className="fixed top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
                Tema
            </button>
            <div id="banner-1" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-0 w-1/4"/>
            <div id="banner-2" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-1/4 w-1/4"/>
            <div id="banner-3" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-2/4 w-1/4"/>
            <div id="banner-4" className="min-h-screen bg-[#0d0d0d] z-10 fixed top-0 left-3/4 w-1/4"/>
            
            <div className={`min-h-screen ${isDarkMode ? 'dark-navbar' : 'light-navbar'}`}>
                {children}
            </div>
        </div>
    );
}
