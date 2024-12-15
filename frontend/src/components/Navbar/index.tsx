import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "@/assets/logos/logo.png";

const Navbar: React.FC = () => {
    const location = useLocation(); // Get the current location

    const [menuOpen, setMenuOpen] = useState(false); // State to toggle burger menu
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="flex flex-col items-center justify-between bg-none p-5 px-8 md:px-12 w-full sticky top-0 z-50 text-white backdrop-blur-md shadow-lg border-b border-white/10">
            <div className="mx-auto flex w-full justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold h-full">
                    <Link to="/" className="text-white text-lg flex items-center space-x-2 flex-row transition-transform duration-300 transform hover:scale-105">
                        <img src={logoWhite} className="w-10" alt="logo"></img> 
                        <div className='text-2xl'>MetaMaker</div>
                    </Link>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-2 bg-[#2D2841]/70 backdrop-blur-lg shadow-lg font-semibold border border-white/20 rounded-3xl p-2 px-8">
                    {[
                        { path: '/', label: 'Home' },
                        { path: '/', label: 'About', highlight: false },
                        { path: '/vote', label: 'Vote' },
                        { path: '/propose', label: 'Propose' },
                    ].map(({ path, label, highlight = true }) => (
                        <Link
                            key={path + label}
                            to={path}
                            className={`relative px-4 py-0.5 transition duration-300 rounded-lg 
                            ${
                                location.pathname === path && highlight
                                    ? 'text-[#8B5CF4]'
                                    : 'hover:text-[#8B5CF4]'
                            }`}
                        >
                            {label}
                            {location.pathname === path && highlight && (
                                <>
                                    {/* Glowing Line */}
                                    <span className="absolute bottom-[-.55rem] left-0 right-0 h-[2px] bg-[#8B5CF4] animate-pulse rounded-full"></span>
                                    
                                    {/* Light Beam */}
                                    <span className="absolute bottom-[-.55rem] left-0 right-0 h-[30px] bg-gradient-to-t from-white/10 to-transparent opacity-70 pointer-events-none"></span>
                                </>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="md:flex hidden space-x-4">
                    <a
                        href="#signup"
                        className="bg-gradient-to-t from-white/20 to-transparent text-white py-2 md:px-6 px-4 font-semibold rounded-3xl transition-transform duration-300 transform hover:scale-105 hover:bg-white/30 backdrop-blur-lg border border-white/30"
                    >
                        Sign up
                    </a>
                </div>

                {/* Burger Menu (Mobile) */}
                <button
                    className="md:hidden flex items-center space-x-2 p-3 border border-white/20 rounded-lg transition-transform duration-300 transform hover:scale-105 bg-white/10"
                    onClick={toggleMenu}
                >
                    <div className="space-y-1">
                        <span className="block w-6 h-[2px] bg-white"></span>
                        <span className="block w-6 h-[2px] bg-white"></span>
                        <span className="block w-6 h-[2px] bg-white"></span>
                    </div>
                </button>
            </div>

            {/* Fullscreen Menu (Mobile) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed z-50 h-screen overflow-hidden inset-0 bg-[#2D2841]/90 backdrop-blur-lg flex flex-col items-center justify-center space-y-6"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Glowing Elements */}
                        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#8B5CF4]/40 to-transparent opacity-70 pointer-events-none animate-pulse blur-2xl"></div>
                        <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full bg-gradient-to-tl from-[#8B5CF4]/40 to-transparent opacity-70 pointer-events-none animate-pulse blur-2xl"></div>

                        {/* Close Button */}
                        <button
                            className="absolute top-[-0.5vh] right-8 p-3 py-4 pb-5 rounded-lg bg-white/20 border border-white/20"
                            onClick={toggleMenu}
                        >
                            <span className="block w-6 h-[2px] bg-white rotate-45 translate-y-[2px]"></span>
                            <span className="block w-6 h-[2px] bg-white -rotate-45 -translate-y-[2px]"></span>
                        </button>

                        {/* Nav Links */}
                        {[
                            { path: "/", label: "Home" },
                            { path: "/", label: "About", highlight: false },
                            { path: "/vote", label: "Vote" },
                            { path: "/propose", label: "Propose" },
                        ].map(({ path, label }) => (
                            <Link
                                key={path + label}
                                to={path}
                                className="text-3xl font-bold text-white transition-transform duration-300 transform hover:scale-110"
                                onClick={toggleMenu}
                            >
                                {label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;