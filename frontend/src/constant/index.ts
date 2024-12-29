import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";

// API URL
export const API_URL_LOCAL = "http://localhost:5000/api";

// Propose and Vote time constraint
export const PROPOSE_DURATION = 1036800; // 5 minutes in seconds
export const VOTE_DURATION = 172800; // 2 minutes in seconds;

// Homepage data
export const featureItems = [
    {
        title: 'Empower Collaborative Decision-Making',
        content: 'Propose, vote, and decide the future of games with time-bound, fair, and transparent voting powered by blockchain.',
        image: img1,
    },
    {
        title: 'Manage Game Assets Seamlessly',
        content: 'Submit, validate, and vote on game assets with clear timelines and secure integration through Google Drive API.',
        image: img2,
    },
    {
        title: 'Transparent Blockchain Integration',
        content: 'Winning assets and decisions are recorded on-chain, ensuring transparency and credibility while connecting with external tools like GitHub.',
        image: img3,
    },
];