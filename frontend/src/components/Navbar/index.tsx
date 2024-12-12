import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from "@/assets/logos/logo.png";

const Navbar: React.FC = () => {
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
                <div className="hidden md:flex space-x-10 bg-[#2D2841] backdrop-blur-md shadow-lg font-semibold border border-white/50 rounded-3xl p-2 px-8">
                    <a
                        href="/"
                        className="hover:text-[#8B5CF4] transition duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="/"
                        className="hover:text-[#8B5CF4] transition duration-300"
                    >
                        About
                    </a>
                    <a
                        href="/vote"
                        className="hover:text-[#8B5CF4] transition duration-300"
                    >
                        Vote
                    </a>
                    <a
                        href="/propose"
                        className="hover:text-[#8B5CF4] transition duration-300"
                    >
                        Propose
                    </a>
                </div>

                {/* Auth Buttons */}
                <div className="flex space-x-4">
                    <a
                        href="#signup"
                        className="bg-white text-black py-2 md:px-6 px-4 font-semibold rounded-3xl transition-transform duration-300 transform hover:scale-105"
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Navbar;