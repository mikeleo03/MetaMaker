import React, { createContext, useState, useEffect, useContext } from 'react';
import { PROPOSE_DURATION, VOTE_DURATION } from '@/constant';

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
        const storedStartTime = localStorage.getItem('startTime');
        const storedPhase = localStorage.getItem('phase');

        if (storedStartTime && storedPhase) {
            setStartTime(parseInt(storedStartTime, 10));
            setPhase(storedPhase as Phase);
        } else {
            localStorage.setItem('startTime', String(Date.now()));
            localStorage.setItem('phase', 'propose');
        }
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
        localStorage.setItem('phase', newPhase);
        localStorage.setItem('startTime', String(now));
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
