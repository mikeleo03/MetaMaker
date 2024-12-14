import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuAlarmClock } from "react-icons/lu";
import logoWhite from "@/assets/logos/logo.png";
import podium from "@/assets/images/podium2.jpg"
import { Particles } from '@/components';

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
    const [remainingTime, setRemainingTime] = useState(300);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
    
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
    };    

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
        <div className="md:h-screen h-full bg-black flex flex-col mt-[-13vh] items-center justify-center relative overflow-hidden">
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

            {/* Countdown Timer */}
            <div className="md:absolute md:mt-0 mt-[13vh] md:bottom-12 md:left-16 flex flex-col items-start gap-2 z-30 bg-blue-500/10 border border-blue-500 backdrop-blur-md md:rounded-3xl p-6 md:px-8 pl-10 md:w-auto w-full text-white">
                <div className='text-xl font-bold'>Remaining Time</div>
                <div className='flex items-center space-x-4'>
                    <div className="md:w-64 w-52 bg-gray-800 rounded-full overflow-hidden h-4">
                        <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${(remainingTime / 300) * 100}%` }}
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
            <div className="md:absolute md:bottom-10 z-40 md:right-8 md:mb-0 mb-10">
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