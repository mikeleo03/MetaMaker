// Helper function to convert a hex string to a readable string
export const hexToReadableString = (hex: string): string => {
    // Remove the "0x" prefix if present
    const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
    // Convert hex to characters and filter out null characters
    return cleanHex
        .match(/.{2}/g) // Split into pairs of two characters
        ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
        .filter(char => char !== "\u0000") // Remove null characters
        .join("")
        .trim() || ""; // Trim whitespace and join characters
};

// Helper function to convert Google Drive link to direct link
export const convertGoogleDriveLink = (url: string): string => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
};

// Helper function to format time for countdown view
export const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    if (days > 0) {
        return `${days < 10 ? '0' : ''}${days}d ${hours < 10 ? '0' : ''}${hours}h`;
    } else if (hours > 0) {
        return `${hours < 10 ? '0' : ''}${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
    } else {
        return `${minutes < 10 ? '0' : ''}${minutes}m ${secs < 10 ? '0' : ''}${secs}s`;
    }
};