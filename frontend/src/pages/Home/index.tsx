import React, { useEffect, useMemo, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { ParallaxText } from "@/components";
import { featureItems } from "@/constant";
import scroll from "@/assets/gifs/scroll.gif";
import { Button } from "@/components/ui/button";
import { PiStarFourFill } from "react-icons/pi";
import dark from "@/assets/images/darko.jpg"

const Home: React.FC = () => {
    const [init, setInit] = useState(false);  // Particles
    const [expandedIndex, setExpandedIndex] = useState(0); // Expanded intro
    const resetAccordion = () => setExpandedIndex(0); // Accordion position rest
    const openingSectionRef = useRef<HTMLDivElement>(null); // Scroll ref

    // Particles useEffect
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
                    value: 100,
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
        }), []
    );

    const scrollToOpeningSection = () => {
        if (openingSectionRef.current) {
            openingSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="flex flex-col w-full text-center items-center min-h-screen mt-[-14vh] bg-[#19181B] text-white relative overflow-hidden">
            {/* Podium Light */}
            <div className="absolute top-0 transform w-screen">
                <img className="md:block hidden w-screen" src={dark}></img>
                <img className="md:hidden block h-screen mt-[13vh]" src={dark}></img>
            </div>
            
            {/* Hero Section */}
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0, y: 300 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 1.5, bounce: 0.25 }}
            >
                <div className="relative flex flex-col justify-center items-center h-[90vh] mt-[8vh] w-full z-10 p-8">
                    {/* Call to Action */}
                    <div className="z-30 rounded-3xl border-2 font-semibold p-2 px-6 mb-6 flex items-center border-white/30 bg-white/10">
                        <PiStarFourFill className="mr-3 text-white" /> Propose your game assets now!
                    </div>
                    <div className="z-30 md:text-5xl text-4xl font-bold md:pb-2">
                        Unlock the Future of Game Creation,
                    </div>
                    <div className="z-30 md:text-5xl text-4xl font-bold pb-7">
                        Governance, and Ownership!
                    </div>
                    <div className="z-30 md:text-xl text-lg md:pb-1 md:block hidden">
                        MetaMaker is a blockchain platform where players and developers collaborate to
                    </div>
                    <div className="z-30 md:text-xl text-lg md:block hidden">
                        shape, control, and own immersive game experiences.
                    </div>
                    <div className="z-30 md:text-xl text-lg md:pb-1 md:hidden block">
                        MetaMaker is a blockchain platform where players and developers collaborate to
                        shape, control, and own immersive game experiences.
                    </div>

                    {/* Glassmorphic Panels */}
                    <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
                        {/* <div
                            className="absolute top-[37%] left-[-27%] w-[350px] h-[350px] rounded-[30px] bg-gradient-to-t from-white/10 to-transparent backdrop-blur-lg border border-white/20 shadow-lg"
                            style={{ transform: "rotateX(20deg) rotateY(-60deg)" }}
                        ></div> */}

                        {/* Glass Panel 1 */}
                        <div
                            className="absolute md:block hidden top-[20%] left-[0%] w-[350px] h-[350px] rounded-[30px] bg-gradient-to-t from-white/10 to-transparent backdrop-blur-lg border border-white/20 shadow-lg"
                            style={{ transform: "rotateX(10deg) rotateY(-50deg)" }}
                        ></div>

                        {/* Glass Panel 2 */}
                        <div
                            className="absolute md:block hidden top-[15%] w-[250px] h-[350px] rounded-[30px] bg-gradient-to-t from-white/10 to-transparent backdrop-blur-md border border-white/15 shadow-lg"
                            style={{ transform: "rotateX(0deg) rotateY(15deg)" }}
                        ></div>

                        {/* Glass Panel 3 */}
                        <div
                            className="absolute md:block hidden top-[20%] right-[0%] w-[350px] h-[350px] rounded-[30px] bg-gradient-to-t from-white/10 to-transparent backdrop-blur-lg border border-white/20 shadow-lg"
                            style={{ transform: "rotateX(10deg) rotateY(50deg)" }}
                        ></div>

                        {/* <div
                            className="absolute top-[37%] right-[-27%] w-[350px] h-[350px] rounded-[30px] bg-gradient-to-t from-white/10 to-transparent backdrop-blur-lg border border-white/20 shadow-lg"
                            style={{ transform: "rotateX(20deg) rotateY(60deg)" }}
                        ></div> */}
                    </div>
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
                className="absolute top-[250px] top-[400px] left-[-150px] w-[350px] h-[375px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-2"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute md:top-[400px] top-[800px] right-[-150px] w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-3"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>

            <Button 
                onClick={scrollToOpeningSection}
                className="h-0 p-0"
            >
                <img className="absolute md:top-[500px] top-[550px] w-[100px] h-[100px] z-40" src={scroll}></img>
            </Button>
            
            <motion.div
                initial={{ opacity:0, y: 300 }}
                animate={{ opacity:1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
            >
                <div className="relative w-[100vw] rotate-3 mt-6">
                    <ParallaxText baseVelocity={-5}>MetaMaker  •</ParallaxText>
                    <ParallaxText baseVelocity={5}>Blockchain  •</ParallaxText>
                </div>
            </motion.div>

            <div ref={openingSectionRef} className="md:mb-0 mb-6"></div>

            <div className="bg-gradient-to-t from-black mt-12 via-black to-transparent md:p-20 p-10 z-30 w-full backdrop-blur-md shadow-lg border-b border-white/10">
                <motion.div
                    className="box"
                    initial={{ opacity: 0, scale: 0, y: 300 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", duration: 1.5, bounce: 0.25 }}
                >
                    <div className="text-4xl font-bold text-start mb-2">
                    What <span className="bg-gradient-to-r from-purple-500 via-purple-300 to-white text-transparent bg-clip-text">MetaMaker</span> can actually do?
                    </div>
                    <div className="text-xl mb-10 text-start">Discover the powerful features of MetaMaker!</div>
                
                    <div 
                        className="flex md:flex-row flex-col w-full md:h-full h-[84vh] overflow-hidden md:space-y-0 space-y-4"
                        onMouseLeave={resetAccordion}
                    >
                        {featureItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`flex-1 h-[55vh] md:mx-4 relative rounded-3xl cursor-pointer border-4 overflow-hidden ${expandedIndex === index ? 'flex-[2]' : ''}`}
                                onMouseEnter={() => setExpandedIndex(index)}
                                initial={{ flex: 1 }}
                                animate={{ flex: expandedIndex === index ? 4 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`absolute inset-0 ${expandedIndex === index ? "bg-gradient-to-t from-black via-black to-transparent" : "bg-black/60"} opacity-90`} />
                                <img src={item.image} className="z-0 h-full w-full object-cover" alt="Illustration" />
                                <div className="absolute bottom-0 w-full text-start text-white p-6">
                                    {expandedIndex === index && (
                                        <motion.p
                                            className="md:text-lg mt-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "linear", duration: 1.25 }}
                                        >
                                            <h2 className="md:text-2xl text-xl font-bold mb-2">{item.title}</h2>
                                            {item.content}
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
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