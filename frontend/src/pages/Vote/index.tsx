import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Particles } from '@/components';
import { useTimer } from '@/contexts/TimerContext';
import { VOTE_DURATION } from '@/constant';

import logoWhite from "@/assets/logos/logo.png";
import podium from "@/assets/images/podium2.jpg";
import { LuAlarmClock } from "react-icons/lu";

interface GameAsset {
    id: number;
    image: string;
    title: string;
    proposer: string;
    description: string;
}

const gameAssets: GameAsset[] = [
    {
        id: 1,
        image: logoWhite,
        title: 'Warrior Blade',
        proposer: 'Alex Johnson',
        description: 'The Warrior Blade is a legendary weapon forged in the depths of Mount Tyrion. This razor-sharp blade is said to be imbued with the spirit of ancient warriors, granting its wielder unmatched strength and agility. With intricate runes etched along its edge, the blade emits a faint glow during combat, symbolizing its immense power.',
    },
    {
        id: 2,
        image: logoWhite,
        title: 'Mystic Orb',
        proposer: 'Sarah Lin',
        description: 'The Mystic Orb is an enigmatic artifact pulsating with otherworldly energy. Crafted from an unknown crystalline substance, it radiates an ethereal glow and constantly shifts its color. Legends claim the orb can amplify magical abilities, allowing the user to manipulate the elements and foresee glimpses of the future.',
    },
    {
        id: 3,
        image: logoWhite,
        title: 'Shadow Cloak',
        proposer: 'David Kim',
        description: 'The Shadow Cloak is a mysterious garment woven from the fabric of twilight. It grants its wearer the ability to vanish into shadows, moving unseen and unheard. The cloak is adorned with subtle patterns that shimmer faintly under moonlight, reflecting the quiet elegance of its elusive nature.',
    },
];

const Vote: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [countdownTime, setCountdownTime] = useState<number>(0);
    const { phase, remainingTime } = useTimer();
    const navigate = useNavigate();

    useEffect(() => {
        if (phase !== 'vote') {
            const interval = setInterval(() => {
                setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCountdownTime(remainingTime);
        }
    }, [phase, remainingTime]);

    useEffect(() => {
        setCountdownTime(remainingTime);
    }, [remainingTime]);
    
    const nextAsset = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gameAssets.length);
    };
    
    const prevAsset = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + gameAssets.length) % gameAssets.length);
    };
    
    const voteAsset = () => {
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
    };
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            prevAsset();
        } else if (event.key === 'ArrowRight') {
            nextAsset();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const currentAsset = gameAssets[currentIndex];

    return (
        <div className={`md:h-screen ${phase !== 'vote' ? "h-screen" : "h-full"} bg-black flex flex-col mt-[-12vh] items-center justify-center relative overflow-hidden`}>
            {/* Neon Light */}
            <div className="absolute z-30 top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[900px] shine-animation bg-gradient-to-b from-blue-500 via-transparent to-transparent opacity-30 rounded-full blur-2xl"></div>
            <div
                className="absolute z-30 md:top-[250px] bottom-[400px] left-[30px] w-[350px] h-[375px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-2"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute z-30 md:top-[280px] bottom-[10px] right-[10px] w-[300px] h-[300px] bg-purple-500 opacity-50 rounded-full blur-2xl shine-animation delay-3"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>

            {/* Podium Light */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[200px] w-full">
                <img src={podium}></img>
            </div>

            {/* Conditional Overlay for Voting Phase */}
            {phase !== 'vote' && (
                <div className="absolute inset-0 z-40 bg-[#2D2841]/80 backdrop-blur-lg flex flex-col items-center justify-center">
                    {/* Decorative Background */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-purple-500 via-blue-500 to-transparent opacity-40 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/3 left-1/3 transform -translate-x-1/3 -translate-y-1/3 w-[200px] h-[200px] bg-gradient-to-tl from-blue-500 via-purple-500 to-transparent opacity-50 rounded-full blur-2xl"></div>

                    {/* Content */}
                    <div className="relative z-50 text-center flex flex-col text-white items-center space-y-4">
                        {/* Countdown */}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="white"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m0 0a2 2 0 100-4 2 2 0 000 4zm6-6V7a6 6 0 10-12 0v4m12 0H6m12 0a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2"
                                />
                            </svg>
                        </div>
                    
                        {/* Title and Description */}
                        <h2 className="text-4xl font-bold">Voting is Locked</h2>
                        <p className="text-lg text-gray-300 md:max-w-lg max-w-72">
                            Voting isn't open at the moment. Please come back later or take one of the actions below!
                        </p>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => navigate('/propose')}
                                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                            >
                                Propose Asset
                            </button>
                        </div>

                        {/* Countdown Timer */}
                        <p className="text-lg text-gray-300 max-w-lg mb-4">
                            Voting period starts in {formatTime(countdownTime)}
                        </p>
                    </div>
                </div>
            )}

            {/* Countdown Timer */}
            <div className="md:absolute md:mt-0 mt-[13vh] md:bottom-12 md:left-16 flex flex-col items-start gap-2 z-30 bg-blue-500/10 border border-blue-500 backdrop-blur-md md:rounded-3xl p-6 md:px-8 pl-10 md:w-auto w-full text-white">
                <div className='text-xl font-bold'>Remaining Time</div>
                <div className='flex items-center space-x-4'>
                    <div className="md:w-64 w-52 bg-gray-800 rounded-full overflow-hidden h-4">
                        <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${(remainingTime / VOTE_DURATION) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center text-white text-lg space-x-2">
                        <span><LuAlarmClock /></span>
                        <span>{formatTime(remainingTime)}</span>
                    </div>
                </div>
            </div>

            {/* Advice Vote */}
            <div className="absolute z-30 top-10 md:left-16 left-12 flex flex-col items-start pr-2 justify-start text-white backdrop-blur mt-[30vh] md:mt-[11vh]">
                <div className='glow text-4xl md:text-5xl font-bold md:mb-1'>Vote Your Best</div>
                <div className='glow text-4xl md:text-5xl font-bold mb-3'>Game Asset!</div>
                <div className='text-xl md:block hidden mb-0'>Make your voice count—vote for the</div>
                <div className='text-lg md:hidden block mb-0'>Make your voice count—vote for</div>
                <div className='text-xl md:block hidden'>game asset that stands out!</div>
                <div className='text-lg md:hidden block'>the game asset that stands out!</div>
            </div>

            {/* Game Asset Section */}
            <div className="flex flex-col md:flex-row items-center justify-center md:mt-12 w-full mb-10 mt-64">
                <div className='flex'>
                    {/* Previous Button */}
                    <button
                        onClick={prevAsset}
                        className="text-white text-7xl p-2 z-30 items-start transition-transform duration-300 transform hover:scale-110"
                    >
                        &#x3C;
                    </button>

                    {/* Floating Asset */}
                    <motion.img
                        src={currentAsset.image}
                        alt={currentAsset.title}
                        className="md:w-60 w-36 z-30 object-contain mx-8"
                        initial={{ y: 0 }}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />

                    {/* Next Button */}
                    <button
                        onClick={nextAsset}
                        className="text-white text-7xl p-2 z-30 transition-transform duration-300 transform hover:scale-110"
                    >
                        &#x3E;
                    </button>
                </div>

                {/* Glassmorphism Info Section */}
                <div className="md:absolute z-30 md:top-[125px] md:mt-0 mt-16 md:right-[100px] md:w-[300px] w-[300px] md:h-[350px] h-full overflow-y-auto bg-purple-500/20 border border-purple-500 backdrop-blur-md rounded-3xl p-6 text-white md:ml-8">
                    <h1 className="text-3xl font-bold mb-0">{currentAsset.title}</h1>
                    <p className="mt-2">Proposed by: {currentAsset.proposer}</p>
                    <p className="mt-2 md:text-sm text-gray-300">{currentAsset.description}</p>
                </div>
            </div>

            {/* Vote Button */}
            <div className="md:absolute md:bottom-10 z-30 md:right-8 md:mb-0 mb-10">
                <button
                    onClick={voteAsset}
                    className="bg-gradient-to-b from-[#443173] to-[#6E5C99] text-white px-10 mr-8 p-2 text-xl font-semibold rounded-3xl transition-transform duration-300 transform hover:scale-105"
                >
                Vote
                </button>
            </div>

            {/* Confirmation Message */}
            {showConfirmation && (
                <motion.div
                    className="absolute bottom-8 text-white bg-green-500 px-4 py-2 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                Your vote has been submitted!
                </motion.div>
            )}

            {/* Shine Animation */}
            <style>{`
                @keyframes shineFade {
                    0% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                    100% {
                        opacity: 0.3;
                    }
                }
                .shine-animation {
                    animation: shineFade 5s infinite;
                }
                .delay-2 {
                    animation-delay: 1.5s;
                }
                .delay-3 {
                    animation-delay: 3s;
                }
            `}</style>

            {/* Particles */}
            <Particles />
        </div>
    );
};

export default Vote;