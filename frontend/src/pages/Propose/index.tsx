import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTimer } from '@/contexts/TimerContext';
import { useWallet } from '@/contexts/WalletContext';
import { PROPOSE_DURATION } from '@/constant';

import { toast } from "react-toastify";
import { LuAlarmClock } from "react-icons/lu";
import { FaFileImage } from "react-icons/fa6";
import { Trash2, Upload, Loader2 } from "lucide-react";

import { ethers } from 'ethers';
import { ProposeApi } from "@/api";

const Propose: React.FC = () => {
    const { phase, remainingTime } = useTimer();
    const { account } = useWallet();
    const [address, setAddress] = useState<string | null>(null);
    const [countdownTime, setCountdownTime] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchENSName = async () => {
            if (account) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    await provider.send("eth_requestAccounts", []); 
                    const signer = await provider.getSigner();
                    const addressSigner = await signer.address;
                    setAddress(addressSigner || null);
                } catch (error) {
                    console.error("Error fetching ENS name:", error);
                }
            }
        };

        fetchENSName();
    }, [account]);
    
    useEffect(() => {
        if (phase !== 'propose') {
            const interval = setInterval(() => {
                setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCountdownTime(remainingTime);
        }
    }, [phase, remainingTime]);

    useEffect(() => {
        setCountdownTime(remainingTime);
    }, [remainingTime]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100 MB
    const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const [onUpdate, setOnUpdate] = useState(false);
    const [assetFile, setAssetFile] = useState<File | null>(null);
    const [assetUploaded, setAssetUploaded] = useState(false);
    const [assetUploadProgress, setAssetUploadProgress] = useState(0);
    const [assetPreviewUrl, setAssetPreviewUrl] = useState<string | null>(null);

    const FormSchema = z.object({
        title: z.string().min(1, { message: "Title is required and cannot be empty." }),
        desc: z.string().min(1, { message: "Description is required and cannot be empty." }),
        asset: z.any().refine((files) => (files?.[0]?.size <= MAX_FILE_SIZE || files == null), `Max image size is 10MB.`)
              .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type) || files == null, "Only .jpg, .jpeg, .png and .webp formats are supported.").optional()
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            desc: "",
            asset: undefined
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!address) {
            toast.error("Please log in first.");
            return;
        }
    
        setOnUpdate(true);
    
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("proposer", address as string);
            formData.append("description", data.desc);
            formData.append("asset", assetFile as File);
    
            await ProposeApi.add(formData);
            toast.success("Asset proposed successfully!");
        } catch (error: any) {
            console.error("Course failed to be added:", error);
            toast.error(
                (error.response?.data as { message: string })?.message ||
                "Server is unreachable. Please try again later."
            );
        } finally {
            setOnUpdate(false);
        }
    };        
    
    const handleAssetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setAssetFile(file);
    
        if (file) {
            setAssetPreviewUrl(URL.createObjectURL(file));
    
            const reader = new FileReader();
    
            // To track progress, you can use `onprogress` event
            reader.onprogress = (event: ProgressEvent<FileReader>) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    console.log(`Progress: ${progress}%`);
                    // Update video progress state
                    setAssetUploadProgress(progress);
                }
            };
    
            reader.onloadend = () => {
                if (reader.result) {
                    // Update the state
                    setAssetUploaded(true);
                    toast.success("Asset added successfully");
                }
            };
    
            reader.readAsDataURL(file);
        }
    };

    const removeAssetFile = () => {
        setAssetFile(null);
        setAssetUploadProgress(0);
    };

    return (
        <main className={`flex flex-col w-full ${phase !== 'propose' ? "h-screen" : "h-full"} min-h-screen bg-[#19181B] relative overflow-hidden md:mt-[-14vh] mt-[-12vh]`}>
            {/* Glassmorphic Ornaments */}
            <div
                className="absolute top-[-250px] left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-1"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute top-[250px] top-[400px] left-[60px] w-[500px] h-[475px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-2"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>
            <div
                className="absolute md:top-[850px] top-[1000px] right-[100px] w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full blur-2xl shine-animation delay-3"
                style={{
                    background: "linear-gradient(145deg, rgba(128, 0, 255, 0.6), rgba(153, 51, 255, 0.4))",
                }}
            ></div>

            {/* Conditional Overlay for Voting Phase */}
            {phase !== 'propose' && (
                <div className="absolute inset-0 z-40 bg-[#2D2841]/80 backdrop-blur-lg flex flex-col items-center justify-center">
                    {/* Decorative Background */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-purple-500 via-blue-500 to-transparent opacity-40 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/3 left-1/3 transform -translate-x-1/3 -translate-y-1/3 w-[200px] h-[200px] bg-gradient-to-tl from-blue-500 via-purple-500 to-transparent opacity-50 rounded-full blur-2xl"></div>

                    {/* Content */}
                    <div className="relative z-50 text-center flex flex-col text-white items-center space-y-4 mt-[10vh]">
                        {/* Countdown */}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="white"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m0 0a2 2 0 100-4 2 2 0 000 4zm6-6V7a6 6 0 10-12 0v4m12 0H6m12 0a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2"
                                />
                            </svg>
                        </div>
                    
                        {/* Title and Description */}
                        <h2 className="text-4xl font-bold">Proposing is Locked</h2>
                        <p className="text-lg text-gray-300 md:max-w-lg max-w-72">
                            Proposing isn't open at the moment. Please come back later or take one of the actions below!
                        </p>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => navigate('/vote')}
                                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                            >
                                Vote Asset
                            </button>
                        </div>

                        {/* Countdown Timer */}
                        <p className="text-lg text-gray-300 max-w-lg mb-4">
                            Proposing period starts in {formatTime(countdownTime)}
                        </p>
                    </div>
                </div>
            )}

            <Form {...form}>
                {/* Title */}
                <div className="z-30 top-10 flex flex-col text-center items-center md:px-0 px-8 justify-center text-white backdrop-blur mb-3 mt-[18vh] md:mt-[20vh]">
                    <div className='glow text-4xl md:text-5xl font-bold mb-3.5'>Propose Your Best Game Asset!</div>
                    <div className='text-xl block mb-0'>Showcase your creativity—submit your best game asset for the community to decide!</div>
                </div>

                {/* Forms */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-10 mt-5 z-30">
                    {/* Judul Aset */}
                    <div className="flex flex-col bg-blue-500/10 border border-blue-500 z-2 backdrop-blur-md rounded-3xl p-8 md:my-10 m-6 md:mx-40 mx-8 text-white">
                        <div className="flex flex-col h-full md:mx-4">
                            <div className='text-xl font-bold mb-3'>Remaining Time</div>
                            <div className='flex items-center space-x-4'>
                                <div className="w-full bg-gray-800 rounded-full overflow-hidden h-4">
                                    <div
                                        className="bg-blue-500 h-full"
                                        style={{ width: `${(remainingTime / PROPOSE_DURATION) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center text-white text-lg space-x-2">
                                    <span><LuAlarmClock /></span>
                                    <span>{formatTime(remainingTime)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Judul Aset */}
                    <div className="flex flex-col bg-purple-500/20 border border-purple-500 backdrop-blur-md rounded-3xl p-8 md:my-10 m-6 md:mx-40 mx-8 text-white">
                        <div className="flex flex-col w-full h-full">
                            <div className="flex flex-col h-full md:mx-4">
                                <div className="flex text-3xl font-bold items-center h-full">
                                    Game Asset Title
                                </div>
                                <Separator className="mt-3.5 mb-2 h-[1px] bg-white"></Separator>
                            </div>
                        </div>
                    
                        <div className="flex flex-col justify-center items-center space-y-3 my-3 md:mx-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="w-full rounded-3xl">
                                        <FormLabel className="self-start text-lg" htmlFor="title">
                                            Asset Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Insert the title here..."
                                                {...field}
                                                className="md:text-sm text-base rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-left" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem className="w-full rounded-3xl">
                                        <FormLabel className="self-start text-lg" htmlFor="desc">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Insert the description here..."
                                                className="resize-none h-24 border-main1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
            
                    {/* Unggah Aset */}
                    <div className="flex flex-col bg-purple-500/20 border border-purple-500 backdrop-blur-md rounded-3xl p-8 md:my-10 m-6 md:mx-40 mx-8 text-white">
                        <div className='flex flex-col justify-center items-center space-y-3 my-3 md:mx-4'>
                            <div className="flex text-3xl text-white w-full font-bold justify-start text-start h-full">
                                Upload File Asset
                            </div>
                            <FormField
                                control={form.control}
                                name="asset"
                                render={({ field }) => (
                                    <FormItem className='w-full rounded-3xl flex flex-col items-center'>
                                        <FormControl>
                                            <>
                                                <input
                                                    id="asset"
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                    onChange={handleAssetFileChange}
                                                    className="hidden"
                                                    ref={field.ref}
                                                />
                                                <label
                                                    htmlFor="asset"
                                                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-lg w-full cursor-pointer"
                                                >
                                                    {assetUploaded && assetPreviewUrl ? (
                                                        <div className="w-full">
                                                            <img
                                                                src={assetPreviewUrl}
                                                                className="w-full h-auto rounded-lg"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center text-main2 py-10">
                                                            <Upload className="w-12 h-12 mb-2" />
                                                            <span className="text-sm font-medium text-gray-600 bg-yellow py-2.5 px-6 font-semibold rounded-2xl transition-transform duration-300 transform hover:scale-110">Upload Asset</span>
                                                        </div>
                                                    )}
                                                </label>
                                                {assetFile && (
                                                    <div className="w-full h-full mt-6 flex border-main1 border-yellow items-center card-glow-yellow bg-white rounded-xl">
                                                        <div className="w-20 flex items-center justify-center">
                                                            <FaFileImage size={35} className="text-gray-600" />
                                                        </div>
                                                        <div className="h-full w-1">
                                                            <Separator className="h-[3.5rem] w-[1.5px] bg-gray-300"></Separator>
                                                        </div>
                                                        <div className="w-full h-full px-5 py-5 flex justify-start items-center">
                                                            <div className="flex w-full items-center flex-col flex-start">
                                                                <div className="text-sm text-left w-full text-black">
                                                                    {assetUploadProgress != 100 ? 
                                                                        <p>File <span className="font-bold">{assetFile.name}</span> is uploading...</p> :
                                                                        <p>File <span className="font-bold">{assetFile.name}</span> is uploaded</p>
                                                                    }
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                                                    <div
                                                                        className="bg-purple-500 h-2.5 rounded-full"
                                                                        style={{ width: `${assetUploadProgress}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        </FormControl>
                                        {assetFile && (
                                            <div className="w-full flex justify-end">
                                                <Button
                                                    type="button"
                                                    className="mt-4 bg-red-500 hover:bg-red-500 transition-transform duration-300 transform hover:scale-110 text-white flex items-center px-3 py-2 rounded-lg"
                                                    onClick={removeAssetFile}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Erase uploaded asset
                                                </Button>
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
            
                    {/* Submit Button */}
                    <div className="flex justify-center items-center">
                        <Button
                            type="submit"
                            className="text-lg bg-gradient-to-b from-[#443173] to-[#6E5C99] text-white transition-transform duration-300 transform hover:scale-105 rounded-3xl px-10 font-semibold py-3 mb-16"
                            disabled={onUpdate}
                        >
                            {onUpdate ? (
                                <>
                                    <Loader2 className="animate-spin inline-block mr-2" /> 
                                    Proposing
                                </>
                            ) : (
                                "Propose Asset"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            {/* Shine Animation */}
            <style>{`
                @keyframes shineFade {
                    0% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.4;
                    }
                    100% {
                        opacity: 0.3;
                    }
                }
                .shine-animation {
                    animation: shineFade 5s infinite;
                }
                .delay-1 {
                    animation-delay: 0s;
                }
                .delay-2 {
                    animation-delay: 1.5s;
                }
                .delay-3 {
                    animation-delay: 3s;
                }
            `}</style>

            {/* Particles */}
            <Particles />
        </main>
      );
};

export default Propose;