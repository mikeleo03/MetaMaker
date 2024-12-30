interface Window {
    ethereum?: {
        isMetaMask?: boolean;
        request: (args: { method: string; params?: any[] }) => Promise<any>;
        on?: (event: string, callback: (...args: any[]) => void) => void;
        selectedAddress?: string;
        removeListener?: (eventName: string, callback: (...args: any[]) => void) => void;
    };
}