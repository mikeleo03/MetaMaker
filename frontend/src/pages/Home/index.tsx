import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";

const Home: React.FC = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                    modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    const [expandedIndex, setExpandedIndex] = useState(0);

    const items = [
        {
            title: 'Empower Collaborative Decision-Making',
            content: 'Propose, vote, and decide the future of games with time-bound, fair, and transparent voting powered by blockchain.',
            image: img1,
        },
        {
            title: 'Manage Game Assets Seamlessly',
            content: 'Submit, validate, and vote on game assets with clear timelines and secure integration through Google Drive API.',
            image: img2,
        },
        {
            title: 'Transparent Blockchain Integration',
            content: 'Winning assets and decisions are recorded on-chain, ensuring transparency and credibility while connecting with external tools like GitHub.',
            image: img3,
        },
    ];

    const resetAccordion = () => setExpandedIndex(0);

    return (
        <main className="flex flex-col w-full text-center items-center min-h-screen mt-[-13vh] bg-[#19181B] text-white relative overflow-hidden">
            {/* Hero Section */}
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0, y: 300 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 1.5, bounce: 0.25 }}
            >
                <div className="flex flex-col justify-center items-center h-[90vh] mt-[10vh] w-full relative z-10">
                    <div className="rounded-3xl border font-semibold p-2 px-6 mb-8 border-white/10 bg-white/10">🙋 Propose your game assets now!</div>
                    <div className="text-5xl font-bold pb-2">Unlock the Future of Game Creation,</div>
                    <div className="text-5xl font-bold pb-7">Governance, and Ownership!</div>
                    <div className="text-xl pb-1">MetaMaker is a blockchain platform where players and developers collaborate to</div>
                    <div className="text-xl">shape, control, and own immersive game experiences.</div>
                </div>
            </motion.div>

            {/* Glassmorphic Ornaments */}
            <div
                className="absolute top-[-250px] left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-1"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute top-[250px] left-[-150px] w-[350px] h-[375px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-2"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute top-[400px] right-[-150px] w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-3"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>

            <div className="bg-gradient-to-t from-black via-black to-transparent p-20 z-30 w-full backdrop-blur-md shadow-lg border-b border-white/10">
                <div className="text-3xl font-bold text-start mb-12">What MetaMaker can actually do?</div>
            
                <div 
                    className="flex w-full h-full overflow-hidden rounded-lg"
                    onMouseLeave={resetAccordion}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`flex-1 h-[55vh] mx-4 relative rounded-xl cursor-pointer border-4 overflow-hidden ${expandedIndex === index ? 'flex-[2]' : ''}`}
                            onMouseEnter={() => setExpandedIndex(index)}
                            initial={{ flex: 1 }}
                            animate={{ flex: expandedIndex === index ? 4 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`absolute inset-0 ${expandedIndex === index ? "bg-gradient-to-t from-black via-black to-transparent" : "bg-black/60"} opacity-90`} />
                            <img src={item.image} className="z-0 h-full w-full object-cover" alt="Illustration" />
                            <div className="absolute bottom-0 w-full text-start text-white p-6 rounded-b-xl">
                                {expandedIndex === index && (
                                    <motion.p
                                        className="text-lg mt-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "linear", duration: 1.25 }}
                                    >
                                        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                                        {item.content}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Shine Animation */}
            <style>{`
                @keyframes shineFade {
                    0% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.4;
                    }
                    100% {
                        opacity: 0.3;
                    }
                }
                .shine-animation {
                    animation: shineFade 5s infinite;
                }
                .delay-1 {
                    animation-delay: 0s;
                }
                .delay-2 {
                    animation-delay: 1.5s;
                }
                .delay-3 {
                    animation-delay: 3s;
                }
            `}</style>

            {init ? <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            /> : <></>}
        </main>
    );
};

export default Home;