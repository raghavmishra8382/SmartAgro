import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, X, Camera, Aperture } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
    previewUrl: string | null;
    onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl, onClear }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Stop camera when component unmounts or camera closes
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
        setCameraError(null);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        setCameraError(null);
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" } 
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setCameraError("Could not access camera. Please allow camera permissions.");
        }
    };

    const takeSnapshot = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
                        onImageSelect(file);
                        stopCamera();
                    }
                }, "image/jpeg", 0.9);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageSelect(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
            >
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => {
                        if (!previewUrl && !isCameraOpen) {
                            document.getElementById('file-upload-gallery')?.click();
                        }
                    }}
                    className={`
            relative overflow-hidden rounded-3xl border-2 transition-all duration-500
            ${previewUrl || isCameraOpen
                ? 'border-forest-500/50 bg-forest-50/30 border-solid cursor-default'
                : isDragging
                    ? 'border-forest-500 bg-forest-50/50 scale-[1.01] shadow-xl ring-4 ring-forest-500/10 border-dashed cursor-pointer'
                    : 'border-slate-200 hover:border-green-400 bg-white hover:bg-slate-50 shadow-lg hover:shadow-xl border-dashed cursor-pointer'
            }
            min-h-[400px] flex flex-col items-center justify-center p-8
          `}
                >
                    <AnimatePresence mode="wait">
                        {isCameraOpen ? (
                            <motion.div
                                key="camera"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative w-full flex flex-col items-center gap-4"
                            >
                                {cameraError ? (
                                    <div className="text-center p-6 bg-rose-50 rounded-2xl">
                                        <p className="text-rose-600 font-bold mb-4">{cameraError}</p>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); stopCamera(); }}
                                            className="px-6 py-2 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
                                            <video 
                                                ref={videoRef} 
                                                autoPlay 
                                                playsInline 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); takeSnapshot(); }}
                                                className="flex items-center gap-2 px-8 py-3 bg-forest-600 text-white rounded-full font-bold shadow-lg shadow-green-600/20 hover:bg-forest-700 transition-all hover:-translate-y-0.5"
                                            >
                                                <Aperture size={20} />
                                                Capture Photo
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); stopCamera(); }}
                                                className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ) : previewUrl ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative w-full aspect-video max-w-4xl"
                            >
                                <img
                                    src={previewUrl}
                                    alt="Plant preview"
                                    className="w-full h-full object-contain rounded-2xl shadow-2xl"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClear();
                                    }}
                                    className="absolute -top-4 -right-4 bg-white text-slate-900 p-2.5 rounded-full shadow-xl hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 group/btn"
                                >
                                    <X size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <div className="relative mb-6">
                                    <motion.div
                                        animate={{
                                            y: isDragging ? -10 : 0,
                                            scale: isDragging ? 1.1 : 1
                                        }}
                                        className="w-24 h-24 bg-forest-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-forest-500/5 group-hover:ring-forest-500/10 transition-all duration-500"
                                    >
                                        <Upload className="w-10 h-10 text-forest-600" />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            scale: isDragging ? 1.2 : 1,
                                            opacity: isDragging ? 1 : 0
                                        }}
                                        className="absolute inset-0 bg-forest-500/20 blur-2xl rounded-full"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                    Drop your plant photo here
                                </h3>
                                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                                    Upload a clear image of the affected leaf or plant part for instant AI analysis
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById('file-upload-gallery')?.click();
                                        }}
                                        className="flex items-center gap-2 px-6 py-3 bg-forest-600 text-white rounded-2xl font-semibold shadow-lg shadow-green-600/20 hover:bg-forest-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <ImageIcon size={20} />
                                        Select from Gallery
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startCamera();
                                        }}
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <Camera size={20} />
                                        Take a Photo
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-6 text-xs font-medium text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        JPEG
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        PNG
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        WEBP
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <input
                    id="file-upload-gallery"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />
            </motion.div>
        </div>
    );
};
