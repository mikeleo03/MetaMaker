// Frontend-related Types
// Data view templates
export interface GameAsset {
    id: number;
    image: string;
    title: string;
    proposer: string;
    description: string;
}

// Backend-related Types
// Requests and Responses
export interface AssetResponse {
    creator: string;
    name: string;
    link: string;
    desc: string;
}

export interface VoteRequest {
    proposer: string;
    assetIdx: number;
}