import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoWhite from "@/assets/logos/logo.png";

const Navbar: React.FC = () => {
    const location = useLocation(); // Get the current location

    return (
        <div className="flex items-center justify-between bg-none p-5 px-8 md:px-12 w-full sticky top-0 z-50 text-white backdrop-blur-md shadow-lg border-b border-white/10">
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
                <div className="flex space-x-4">
                    <a
                        href="#signup"
                        className="bg-gradient-to-t from-white/20 to-transparent text-white py-2 md:px-6 px-4 font-semibold rounded-3xl transition-transform duration-300 transform hover:scale-105 hover:bg-white/30 backdrop-blur-lg border border-white/30"
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;