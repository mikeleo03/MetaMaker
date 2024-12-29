import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Particles } from '@/components';
import { Button } from "@/components/ui/button";
import { useTimer } from '@/contexts/TimerContext';
import { useWallet } from '@/contexts/WalletContext';
import { VOTE_DURATION } from '@/constant';

// import logoWhite from "@/assets/logos/logo.png";
import podium from "@/assets/images/podium2.jpg";
import { LuAlarmClock } from "react-icons/lu";
import { GameAsset, AssetResponse, VoteRequest } from '@/types';
import { convertGoogleDriveLink, hexToReadableString, formatTime } from '@/utils';
import { VoteApi } from '@/api';

import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Vote: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [onUpdate, setOnUpdate] = useState(false);
    const [countdownTime, setCountdownTime] = useState<number>(0);
    const [gameAssets, setGameAssets] = useState<GameAsset[]>([]);
    const [showWinner, setShowWinner] = useState(false);
    const [winner, setWinner] = useState<GameAsset | null>(null);
    const { phase, remainingTime } = useTimer();
    const { account } = useWallet();
    const [address, setAddress] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddress = async () => {
            if (account) {
                try {
                    // Directly set the account from the context
                    setAddress(account);
                } catch (error) {
                    console.error("Error fetching address or ENS name:", error);
                }
            } else {
                setAddress(null);
            }
        };
    
        fetchAddress();
    }, [account]);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const assetsResponse: AssetResponse[] = await VoteApi.all();

                // Converting to format
                const assetClean: GameAsset[] = assetsResponse.map((asset, index) => ({
                    id: index + 1, // Generating a unique ID
                    image: convertGoogleDriveLink(asset.link),
                    title: hexToReadableString(asset.name),
                    proposer: asset.creator,
                    description: asset.desc,
                }));

                setGameAssets(assetClean);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchAssets();
    }, []);

    useEffect(() => {
        if (phase !== 'vote') {
            const interval = setInterval(() => {
                setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
            setShowWinner(true);
            return () => clearInterval(interval);
        } else {
            setShowWinner(false);
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
    
    const voteAsset = async () => {
        if (!address) {
            toast.error("Please log in first.");
            return;
        }

        const payload: VoteRequest = {
            proposer: address,
            assetIdx: currentIndex
        };

        setOnUpdate(true);

        // Submit the response
        await VoteApi.vote(payload)
            .then(() => {
                toast.success("Your vote has been submitted!");
            })
            .catch((error) => {
                console.error("Vote failed to be proposed:", error);
                toast.error(
                    (error.response?.data as { message: string })?.message ||
                    "Server is unreachable. Please try again later."
                );
            })
            .finally(() => {
                setOnUpdate(false);
            });

        // setWinner(gameAssets[currentIndex]);
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
        <div className={`md:h-screen ${phase !== 'vote' ? "h-screen" : "h-full"} bg-black flex flex-col md:mt-[-14vh] mt-[-12vh] items-center justify-center relative overflow-hidden`}>
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

            {/* Winner Announcement */}
            {(winner && showWinner === true) && (
                <div className="absolute inset-0 top-0 z-50 md:h-screen h-full mb-[-2vh] backdrop-blur-lg bg-black/80 flex overflow-hidden flex-col items-center justify-center text-white text-center">
                    {/* Decorative Background */}
                    <div className="absolute z-40 top-1/2 right-1/2 transform translate-x-[40vw] translate-y-[5vh] w-[300px] h-[300px] bg-gradient-to-br from-purple-500 via-blue-500 to-transparent opacity-40 rounded-full blur-3xl"></div>
                    <div className="absolute z-40 top-1/3 left-1/3 transform -translate-x-[20vw] -translate-y-[20vh] w-[200px] h-[200px] bg-gradient-to-tl from-blue-500 via-purple-500 to-transparent opacity-50 rounded-full blur-2xl"></div>

                    <div className='md:max-w-4xl max-w-72 z-50'>
                        <h1 className="md:text-6xl text-4xl font-bold mb-6">Congratulations!</h1>
                        <div className="flex md:flex-row flex-col items-center md:space-x-20 space-y-6">
                            <img
                                src={winner.image}
                                alt={winner.title}
                                className="md:w-64 md:h-64 w-32 h-32 object-contain rounded-lg shadow-lg"
                            />
                            <div className="md:text-left text-center">
                                <h2 className="md:text-4xl text-3xl font-bold mb-4">{winner.title}</h2>
                                <p className="md:text-xl text-lg mb-2">Proposed by: {winner.proposer}</p>
                                <p className="md:text-lg text-gray-300 md:h-[25vh] h-[20vh] overflow-y-auto">{winner.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {setShowWinner(false); setWinner(null)}} // Clear winner and move to the next phase
                            className="mt-10 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

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
                    <div className="relative z-50 text-center flex flex-col text-white items-center space-y-4 mt-[10vh]">
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
            <div className="md:absolute md:mt-0 mt-[12vh] md:bottom-12 md:left-16 flex flex-col items-start gap-2 z-30 bg-blue-500/10 border border-blue-500 backdrop-blur-md md:rounded-3xl p-6 md:px-8 pl-10 md:w-auto w-full text-white">
                <div className='text-xl font-bold'>Remaining Time</div>
                <div className='flex items-center space-x-4'>
                    <div className="md:w-64 w-48 bg-gray-800 rounded-full overflow-hidden h-4">
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
                    {currentAsset && <motion.img
                        src={currentAsset.image}
                        alt={currentAsset.title}
                        className="md:w-60 w-36 z-30 object-contain mx-8"
                        initial={{ y: 0 }}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />}

                    {/* Next Button */}
                    <button
                        onClick={nextAsset}
                        className="text-white text-7xl p-2 z-30 transition-transform duration-300 transform hover:scale-110"
                    >
                        &#x3E;
                    </button>
                </div>

                {/* Glassmorphism Info Section */}
                {currentAsset && (
                    <div className="md:absolute z-30 md:top-[125px] md:mt-0 mt-16 md:right-[100px] md:w-[300px] w-[300px] md:h-[350px] h-full overflow-y-auto bg-purple-500/20 border border-purple-500 backdrop-blur-md rounded-3xl p-6 text-white md:ml-8">
                        <h1 className="text-3xl font-bold mb-0 break-words">{currentAsset.title}</h1>
                        <p className="mt-2 break-words">Proposed by: {currentAsset.proposer}</p>
                        <p className="mt-2 md:text-sm text-gray-300 break-words">{currentAsset.description}</p>
                    </div>
                )}
            </div>

            {/* Vote Button */}
            <div className="md:absolute md:bottom-10 z-30 md:right-8 md:mb-0 mb-10">
                <button
                    onClick={voteAsset}
                    className="bg-gradient-to-b from-[#443173] to-[#6E5C99] text-white px-10 mr-8 p-2 text-xl font-semibold rounded-3xl transition-transform duration-300 transform hover:scale-105"
                    disabled={gameAssets.length == 0 && onUpdate}
                >
                    {onUpdate ? (
                        <>
                            <Loader2 className="animate-spin inline-block mr-2" /> 
                            Voting
                        </>
                    ) : (
                        "Vote"
                    )}
                </button>
            </div>

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