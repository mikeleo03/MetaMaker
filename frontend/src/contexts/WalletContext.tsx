import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
    account: string | null;
    connectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                if (accounts.length == 0) {
                    alert("No authorized account found");
                }

                setAccount(accounts[0]);

            } catch (error) {
                console.error("Failed to connect wallet:", error);
            }
        } else {
            alert("Metamask is not installed yet!");
        }
    };

    return (
        <WalletContext.Provider value={{ account, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};