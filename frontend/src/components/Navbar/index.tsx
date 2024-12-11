import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from "@/assets/logos/logo.png";

const Navbar: React.FC = () => {
    return (
        <div className="flex items-center justify-between bg-none p-5 px-8 sticky top-0 z-50 text-white backdrop-blur-md shadow-lg border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <Link to="/" className="text-white text-lg flex items-center space-x-2 flex-row transition-transform duration-300 transform hover:scale-105">
                        <img src={logoWhite} className="w-10" alt="logo"></img> 
                        <div className='text-2xl'>MetaMaker</div>
                    </Link>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-10 bg-[#2D2841] backdrop-blur-md shadow-lg font-semibold border-[.25px] border-[#37334B] rounded-3xl p-2 px-8">
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
                        href="/"
                        className="hover:text-[#8B5CF4] transition duration-300"
                    >
                        Propose
                    </a>
                </div>

                {/* Auth Buttons */}
                <div className="flex space-x-4">
                    <a
                        href="#signup"
                        className="bg-gradient-to-b from-[#443173] to-[#6E5C99] text-white py-1.5 px-6 font-semibold rounded-lg transition-transform duration-300 transform hover:scale-105"
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Navbar;