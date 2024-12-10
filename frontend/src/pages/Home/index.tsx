import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

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

    if (init) {
        return (
            <main className="flex flex-col w-full text-center items-center min-h-screen mt-[-10vh] bg-[#19181B] text-white relative overflow-hidden">
                {/* Hero Section */}
                <div className="flex flex-col justify-center items-center h-[80vh] mt-[10vh] w-full relative z-10">
                    <div className="text-5xl font-bold pb-2">Unlock the Future of Game Creation,</div>
                    <div className="text-5xl font-bold pb-7">Governance, and Ownership!</div>
                    <div className="text-xl pb-1">MetaMaker is a blockchain platform where players and developers collaborate to</div>
                    <div className="text-xl">shape, control, and own immersive game experiences.</div>
                </div>

                {/* Glassmorphic Ornaments */}
                <div
                    className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-2xl"
                    style={{
                        background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                    }}
                ></div>
                <div
                    className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-2xl"
                    style={{
                        background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                    }}
                ></div>
                <div
                    className="absolute bottom-[-150px] right-[-200px] w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-2xl"
                    style={{
                        background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                    }}
                ></div>
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
            </main>
        );
    }

    return <></>;
};

export default Home;