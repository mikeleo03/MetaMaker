import React from "react";

const Home: React.FC = () => {
    return (
        <main className="flex flex-col w-full text-center items-center min-h-screen mt-[-10vh] bg-[#19181B] text-white relative overflow-hidden">
            {/* Hero Section */}
            <div className="flex flex-col justify-center items-center h-[80vh] mt-[10vh] w-full relative z-10">
                <div className="text-5xl font-bold pb-2">Unlock the Future of Game Creation,</div>
                <div className="text-5xl font-bold pb-7">Governance, and Ownership!</div>
                <div className="text-xl pb-1">MetaMaker is a blockchain platform where players and developers collaborate to</div>
                <div className="text-xl">shape, control, and own immersive game experiences.</div>
            </div>

            {/* Glassmorphic Ornaments */}
            <div
                className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-2xl"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-2xl"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute bottom-[-150px] right-[-200px] w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-2xl"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
        </main>
    );
};

export default Home;