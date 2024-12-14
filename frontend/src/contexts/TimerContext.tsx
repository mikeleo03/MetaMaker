import React, { createContext, useState, useEffect, useContext } from 'react';

type Phase = 'propose' | 'vote';

interface TimerContextType {
    phase: Phase;
    remainingTime: number;
    nextPhase: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [phase, setPhase] = useState<Phase>('propose');
    const [remainingTime, setRemainingTime] = useState(5 * 60); // 30 minutes

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev > 0) return prev - 1;
                return 0;
            });
        }, 1000);

        if (remainingTime === 0) {
            nextPhase();
        }

        return () => clearInterval(timer);
    }, [remainingTime]);

    const nextPhase = () => {
        if (phase === 'propose') {
            setPhase('vote');
            setRemainingTime(2 * 60); // 5 minutes for voting
        } else {
            setPhase('propose');
            setRemainingTime(5 * 60); // 30 minutes for proposing
        }
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
