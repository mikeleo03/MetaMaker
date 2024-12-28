// Frontend-related Types
// Data view templates
export interface GameAsset {
    id: number;
    image: string;
    title: string;
    proposer: string;
    description: string;
}

export interface AssetResponse {
    creator: string;
    name: string;
    link: string;
    desc: string;
}

// Backend-related Types
// Requests and Responses