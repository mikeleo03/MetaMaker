import React, { createContext, useState, useEffect, useContext } from 'react';
import { PROPOSE_DURATION, VOTE_DURATION } from '@/constant';
import { PhaseApi } from '@/api';

type Phase = 'propose' | 'vote';

interface TimerContextType {
    phase: Phase;
    remainingTime: number;
    nextPhase: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [phase, setPhase] = useState<Phase>('propose');
    const [remainingTime, setRemainingTime] = useState(PROPOSE_DURATION);
    const [startTime, setStartTime] = useState<number>(Date.now());

    // Initialize stored state
    useEffect(() => {
        const fetchPhase = async () => {
            try {
                const phaseResponse: { startTime: string } = await PhaseApi.get(); // Receive string
                const startTimeParsed = Number(BigInt(phaseResponse.startTime)); // Parse to BigInt, then Number
                setStartTime(startTimeParsed * 1000);
    
                console.log(startTimeParsed * 1000); // Debugging the parsed value
    
                // Determining the phase
                const currentTime = Date.now();
                console.log(currentTime);
                console.log(startTimeParsed * 1000 + PROPOSE_DURATION * 1000);
                console.log(currentTime <= (startTimeParsed + PROPOSE_DURATION) * 1000);
                if (currentTime <= (startTimeParsed + PROPOSE_DURATION) * 1000) {
                    setPhase('propose');
                } else {
                    setStartTime((startTimeParsed + PROPOSE_DURATION) * 1000);
                    setPhase('vote');
                }
            } catch (error) {
                console.error("Error fetching Phase:", error);
            }
        };
    
        fetchPhase();
    }, []);    

    // Handle timer logic and phase transitions
    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);

            if (phase === 'propose' && elapsed >= PROPOSE_DURATION) {
                nextPhase();
            } else if (phase === 'vote' && elapsed >= VOTE_DURATION) {
                nextPhase();
            } else {
                const duration = phase === 'propose' ? PROPOSE_DURATION : VOTE_DURATION;
                setRemainingTime(duration - elapsed);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [phase, startTime]);

    const nextPhase = () => {
        const newPhase = phase === 'propose' ? 'vote' : 'propose';
        const newDuration = newPhase === 'propose' ? PROPOSE_DURATION : VOTE_DURATION;

        setPhase(newPhase);
        setRemainingTime(newDuration);

        const now = Date.now();
        setStartTime(now);
    };

    return (
        <TimerContext.Provider value={{ phase, remainingTime, nextPhase }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
};
