'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mic, Square, Loader2, Volume2, VolumeX, Radio, Sparkles, Send, AudioWaveform } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types for Web Speech API ---
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

// Extend Window interface
declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}
interface VoiceChatMessage {
    id: number;
    type: 'user' | 'bot' | 'error';
    text: string;
}

type TtsPreference = 'browser' | 'google';

export default function VoicePage() {
    // --- State ---
    const [currentMode, setCurrentMode] = useState<'stt' | 'audio_understanding'>('stt');
    const [ttsPreference, setTtsPreference] = useState<TtsPreference>('browser');
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [conversation, setConversation] = useState<VoiceChatMessage[]>([]);

    // --- Refs ---
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // --- Helper: Add Message ---
    const addMessage = useCallback((type: VoiceChatMessage['type'], text: string) => {
        setConversation(prev => [...prev, { id: Date.now(), type, text }]);
    }, []);

    // --- Scroll to bottom ---
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    // --- TTS Logic ---
    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    const stopSpeaking = useCallback(() => {
        if (synthRef.current?.speaking) {
            synthRef.current?.cancel();
        }
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
        }
        setIsSpeaking(false);
    }, []);

    const speakText = useCallback((text: string) => {
        stopSpeaking();
        if (!synthRef.current) return;

        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';

        // Try to find a Vietnamese voice
        const voices = synthRef.current.getVoices();
        const viVoice = voices.find(v => v.lang.includes('vi'));
        if (viVoice) utterance.voice = viVoice;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    }, [stopSpeaking]);

    const handleBotResponse = async (responseText: string) => {
        addMessage('bot', responseText);

        if (ttsPreference === 'browser') {
            speakText(responseText);
        } else {
            // For now, if 'google' is selected but we don't have a dedicated TTS API yet, fallback to browser
            // Or we could implement a Google TTS call here later.
            // Let's fallback to browser for simplicity in this port
            speakText(responseText);
        }
    };

    // --- API Interaction ---
    const sendTextToBackend = async (text: string) => {
        setIsProcessing(true);
        addMessage('user', text);

        try {
            const response = await fetch('/api/voice-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: 'stt', text }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'API Error');

            await handleBotResponse(data.response);
        } catch (error: any) {
            console.error(error);
            addMessage('error', 'Lỗi: ' + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const sendAudioToBackend = async (audioBlob: Blob) => {
        setIsProcessing(true);
        addMessage('user', '(Gửi đoạn âm thanh...)');

        try {
            // Convert blob to base64
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];

                const response = await fetch('/api/voice-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mode: 'audio_understanding',
                        audioData: base64Audio,
                        mimeType: audioBlob.type,
                        prompt: "Hãy nghe và trả lời người dùng bằng tiếng Việt một cách tự nhiên."
                    }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'API Error');

                await handleBotResponse(data.response);
            };
        } catch (error: any) {
            console.error(error);
            addMessage('error', 'Lỗi xử lý âm thanh: ' + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- Toggle Listening/Recording ---
    const toggleListening = useCallback(async () => {
        if (isSpeaking) stopSpeaking();

        if (isListening) {
            // STOP
            if (currentMode === 'stt' && recognitionRef.current) {
                recognitionRef.current.stop();
            } else if (currentMode === 'audio_understanding' && mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            setIsListening(false);
        } else {
            // START
            if (currentMode === 'stt') {
                const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                if (!SpeechRecognition) {
                    addMessage('error', 'Trình duyệt không hỗ trợ nhận diện giọng nói.');
                    return;
                }
                const recognition = new SpeechRecognition();
                recognition.lang = 'vi-VN';
                recognition.interimResults = false;

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onerror = (e: any) => {
                    console.error(e);
                    setIsListening(false);
                    addMessage('error', 'Lỗi nhận diện giọng nói.');
                };
                recognition.onresult = (e: any) => {
                    const transcript = e.results[0][0].transcript;
                    sendTextToBackend(transcript);
                };

                recognitionRef.current = recognition;
                recognition.start();

            } else {
                // Audio Understanding Mode
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;
                    audioChunksRef.current = [];

                    mediaRecorder.ondataavailable = (e) => {
                        if (e.data.size > 0) audioChunksRef.current.push(e.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Chrome records webm/opus
                        sendAudioToBackend(audioBlob);
                        stream.getTracks().forEach(track => track.stop());
                    };

                    mediaRecorder.start();
                    setIsListening(true);
                } catch (err) {
                    console.error(err);
                    addMessage('error', 'Không thể truy cập micro.');
                }
            }
        }
    }, [isListening, currentMode, isSpeaking, stopSpeaking, addMessage]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-amber-900 flex items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8 text-amber-600" />
                        Trợ Lý Giọng Nói
                    </h1>
                    <p className="text-amber-700">Trải nghiệm mua sắm rảnh tay thông minh</p>
                </div>

                {/* Main Chat Area */}
                <Card className="bg-white/80 backdrop-blur border-amber-200 shadow-xl overflow-hidden h-[60vh] flex flex-col">
                    <CardHeader className="bg-amber-100/50 border-b border-amber-200 p-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-amber-900">Cuộc trò chuyện</CardTitle>
                        {/* TTS Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setTtsPreference(prev => prev === 'browser' ? 'google' : 'browser')}
                            className="text-amber-700 hover:text-amber-900"
                            title={ttsPreference === 'browser' ? "Dùng giọng trình duyệt" : "Dùng giọng Google (giả lập)"}
                        >
                            {ttsPreference === 'browser' ? <Volume2 className="w-4 h-4 mr-1" /> : <AudioWaveform className="w-4 h-4 mr-1" />}
                            {ttsPreference === 'browser' ? 'Browser TTS' : 'Google TTS'}
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {conversation.length === 0 && (
                            <div className="text-center text-gray-500 mt-10 opacity-70">
                                <Mic className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>Nhấn micro để bắt đầu trò chuyện...</p>
                            </div>
                        )}

                        <AnimatePresence initial={false}>
                            {conversation.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={cn(
                                        "p-3 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed mb-2 shadow-sm",
                                        msg.type === 'user' ? "bg-amber-500 text-white ml-auto rounded-br-none" :
                                            msg.type === 'error' ? "bg-red-100 text-red-700 mr-auto" :
                                                "bg-white text-gray-800 border border-gray-100 mr-auto rounded-bl-none"
                                    )}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isProcessing && (
                            <div className="flex items-center gap-2 text-gray-500 text-sm ml-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>AI đang suy nghĩ...</span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </CardContent>
                </Card>

                {/* Controls */}
                <Card className="bg-white/90 backdrop-blur border-amber-200 shadow-lg p-4">
                    <div className="flex flex-col gap-4">

                        {/* Mode Selection */}
                        <div className="flex justify-center gap-4">
                            <Button
                                variant={currentMode === 'stt' ? "default" : "outline"}
                                onClick={() => setCurrentMode('stt')}
                                className={cn("rounded-full transition-all", currentMode === 'stt' ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-700")}
                            >
                                <span className="mr-2">📝</span> Chuyển đổi văn bản (Nhanh)
                            </Button>
                            <Button
                                variant={currentMode === 'audio_understanding' ? "default" : "outline"}
                                onClick={() => setCurrentMode('audio_understanding')}
                                className={cn("rounded-full transition-all", currentMode === 'audio_understanding' ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300 text-amber-700")}
                            >
                                <span className="mr-2">🧠</span> Hiểu âm thanh (Thông minh)
                            </Button>
                        </div>

                        {/* Main Interaction Button */}
                        <div className="flex justify-center items-center gap-4">
                            <motion.div
                                animate={isListening ? { scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px 0px rgba(245, 158, 11, 0.7)", "0px 0px 20px 10px rgba(245, 158, 11, 0)", "0px 0px 0px 0px rgba(245, 158, 11, 0)"] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="rounded-full"
                            >
                                <Button
                                    size="icon"
                                    className={cn(
                                        "w-20 h-20 rounded-full shadow-2xl transition-all duration-300 border-4",
                                        isListening
                                            ? "bg-red-500 hover:bg-red-600 border-red-200"
                                            : "bg-amber-500 hover:bg-amber-600 border-amber-200"
                                    )}
                                    onClick={toggleListening}
                                >
                                    {isListening ? (
                                        <Square className="w-8 h-8 text-white fill-current" />
                                    ) : (
                                        <Mic className="w-10 h-10 text-white" />
                                    )}
                                </Button>
                            </motion.div>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            {isListening
                                ? (currentMode === 'stt' ? "Đang nghe..." : "Đang ghi âm...")
                                : "Nhấn để bắt đầu nói"}
                        </p>
                    </div>
                </Card>

            </div>
        </div>
    );
}
