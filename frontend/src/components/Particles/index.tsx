import React, { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

const ParticlesComponent: React.FC = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            initParticlesEngine(async (engine) => {
                await loadSlim(engine);
            }).then(() => setInit(true));
        }
    }, [init]);

    const options: ISourceOptions = {
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
                value: 120,
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
    };

    return init ? <Particles id="tsparticles" options={options} /> : null;
};

export default ParticlesComponent;