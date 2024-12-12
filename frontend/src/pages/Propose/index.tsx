import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { FaFileImage } from "react-icons/fa6";
import { Particles } from "@/components";
import { LuAlarmClock } from "react-icons/lu";

const Propose: React.FC = () => {
    const [remainingTime, setRemainingTime] = useState(300);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100 MB
    const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const [onUpdate, setOnUpdate] = useState(false);
    const [assetFile, setAssetFile] = useState<File | null>(null);
    const [assetBase64, setAssetBase64] = useState("");
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
        setOnUpdate(true);
        try {
            const payload = {
                title: data.title,
                description: data.desc,
                asset: assetFile ? assetBase64 : '',
            };
            
            // send the payload to backend
            console.log(payload);

        } catch (error) {
            console.error("Submit error:", error);
            toast.error(error as String || 'Server is unreachable. Please try again later.');
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
                    const base64String = reader.result as string;
                    console.log(base64String);
                    // Update the state
                    setAssetUploaded(true);
                    setAssetBase64(base64String);
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
        <main className="flex flex-col w-full min-h-screen bg-[#19181B] relative overflow-hidden mt-[-13vh]">
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
                                        style={{ width: `${(remainingTime / 300) * 100}%` }}
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
                                    <FormItem className="w-full rounded-2xl">
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
                                    <FormItem className="w-full rounded-2xl">
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
                                    <FormItem className='w-full rounded-2xl flex flex-col items-center'>
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
                                                            <span className="text-sm font-medium text-gray-600 bg-yellow py-2.5 px-6 font-semibold rounded-2xl transition-transform duration-300 transform hover:scale-110">Unggah Gambar</span>
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
                                                    Hapus gambar ini
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
                            className="text-lg bg-gradient-to-b from-[#443173] to-[#6E5C99] text-white transition-transform duration-300 transform hover:scale-105 rounded-lg px-10 font-semibold py-2.5 mt-1 mb-16"
                            disabled={onUpdate}
                        >
                            {onUpdate ? <Loader2 className="animate-spin" /> : "Simpan"}
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