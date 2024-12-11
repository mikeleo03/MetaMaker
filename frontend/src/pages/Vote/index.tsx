import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoWhite from "@/assets/logos/logo.png";
import podium from "@/assets/images/podium.jpg"

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
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };    

    const currentAsset = gameAssets[currentIndex];

    return (
        <div className="h-screen bg-black flex flex-col mt-[-13vh] items-center justify-center relative overflow-hidden">
            {/* Neon Light */}
            <div className="absolute z-30 top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[900px] shine-animation bg-gradient-to-b from-blue-500 via-transparent to-transparent opacity-30 rounded-full blur-2xl"></div>
            <div
                className="absolute z-30 top-[250px] left-[30px] w-[350px] h-[375px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-2"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute z-30 top-[280px] right-[10px] w-[300px] h-[300px] bg-purple-500 opacity-50 rounded-full blur-2xl shine-animation delay-3"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>

            {/* Podium Light */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[200px] w-full">
                <img src={podium}></img>
            </div>

            {/* Advice Vote */}
            <div className="absolute mt-[11vh] top-10 left-16 flex flex-col items-start pb-8 justify-start text-white backdrop-blur">
                <div className='text-5xl font-bold mb-1'>Vote Your Favorite</div>
                <div className='text-5xl font-bold mb-3'>Game Asset!</div>
                <div className='text-xl mb-0'>Make your voice count—vote for the</div>
                <div className='text-xl'>game asset that stands out!</div>
            </div>

            {/* Countdown Timer */}
            <div className="absolute bottom-12 left-16 flex flex-col items-start gap-2 z-50 bg-blue-500/10 border border-blue-500 backdrop-blur rounded-lg p-6 text-white">
                <div className='text-xl font-bold'>Remaining Time</div>
                <div className='flex items-center space-x-4'>
                    <div className="w-64 bg-gray-800 rounded-full overflow-hidden h-4">
                        <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${(remainingTime / 300) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center text-white text-lg">
                        <span className="material-icons mr-2"></span>
                        <span>{formatTime(remainingTime)}</span>
                    </div>
                </div>
            </div>

            {/* Game Asset Section */}
            <div className="flex items-center justify-center mt-12 w-full mb-10">
                {/* Previous Button */}
                <button
                    onClick={prevAsset}
                    className="text-white text-7xl p-2 z-50 items-start transition-transform duration-300 transform hover:scale-110"
                >
                    &#x3C;
                </button>

                {/* Floating Asset */}
                <motion.img
                    src={currentAsset.image}
                    alt={currentAsset.title}
                    className="w-60 h-60 object-contain mx-8"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />

                {/* Next Button */}
                <button
                    onClick={nextAsset}
                    className="text-white text-7xl p-2 z-50 transition-transform duration-300 transform hover:scale-110"
                >
                    &#x3E;
                </button>

                {/* Glassmorphism Info Section */}
                <div className="absolute z-50 top-[125px] right-[100px] w-[300px] h-[350px] bg-purple-500/20 border border-purple-500 backdrop-blur rounded-3xl p-6 text-white ml-8">
                    <h1 className="text-2xl font-bold mb-0">{currentAsset.title}</h1>
                    <p className="mt-2 text-sm">Proposed by: {currentAsset.proposer}</p>
                    <p className="mt-2 text-sm text-gray-300">{currentAsset.description}</p>
                </div>
            </div>

            {/* Vote Button */}
            <div className="absolute bottom-10 z-50 right-8">
                <button
                    onClick={voteAsset}
                    className="bg-gradient-to-b from-[#443173] to-[#6E5C99] text-white px-10 mr-8 p-2 text-xl font-semibold rounded-lg transition-transform duration-300 transform hover:scale-105"
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
        </div>
    );
};

export default Vote;