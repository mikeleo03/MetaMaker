import React, { useState } from 'react';
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

    const currentAsset = gameAssets[currentIndex];

    return (
        <div className="h-screen bg-black flex flex-col mt-[-13vh] items-center justify-center relative overflow-hidden">
            {/* Neon Light */}
            <div className="absolute z-50 top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[900px] shine-animation bg-gradient-to-b from-blue-500 via-transparent to-transparent opacity-30 rounded-full blur-2xl"></div>

            {/* Podium Light */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[200px] w-full">
                <img src={podium}></img>
            </div>

            {/* Game Asset Section */}
            <div className="flex items-center justify-center mt-12 w-full mb-10">
                {/* Previous Button */}
                <button
                    onClick={prevAsset}
                    className="text-white text-7xl p-2 items-start transition-transform duration-300 transform hover:scale-110"
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
                    className="text-white text-7xl p-2 transition-transform duration-300 transform hover:scale-110"
                >
                    &#x3E;
                </button>

                {/* Glassmorphism Info Section */}
                <div className="absolute right-[100px] w-[300px] bg-white/10 backdrop-blur rounded-lg p-6 text-white ml-8">
                    <h1 className="text-2xl font-bold">{currentAsset.title}</h1>
                    <p className="mt-2 text-sm">Proposed by: {currentAsset.proposer}</p>
                    <p className="mt-2 text-sm text-gray-300">{currentAsset.description}</p>
                </div>
            </div>

            {/* Vote Button */}
            <div className="absolute bottom-8 right-8">
                <button
                    onClick={voteAsset}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
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
            `}</style>
        </div>
    );
};

export default Vote;