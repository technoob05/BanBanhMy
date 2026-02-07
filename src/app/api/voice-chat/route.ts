import { NextResponse } from 'next/server';
import { runGeminiWithRetry } from '@/lib/gemini';
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Use gemini-2.5-flash-lite which supports audio input well
const AUDIO_MODEL_NAME = "gemini-2.5-flash-lite";

// --- Gemini API Interaction (Text) ---
async function getGeminiTextResponse(inputText: string): Promise<string> {
    console.log(`[Voice Chat API - Text Mode] Received text for Gemini: "${inputText}"`);

    try {
        const generationConfig = {
            temperature: 0.8,
            topK: 1,
            topP: 1,
            maxOutputTokens: 256,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        // Use runGeminiWithRetry for robust key rotation and retry logic
        return await runGeminiWithRetry(async (model) => {
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: inputText }] }],
                generationConfig,
                safetySettings,
            });

            const response = result.response;
            if (!response) {
                throw new Error("Gemini response was empty or undefined.");
            }

            const promptFeedback = response.promptFeedback;
            if (promptFeedback?.blockReason) {
                throw new Error(`Gemini response blocked. Reason: ${promptFeedback.blockReason}`);
            }

            return response.text();
        }); // Uses default model from gemini.ts (gemini-3-flash-preview)

    } catch (error: any) {
        console.error("[Voice Chat API - Text Mode] Error calling Gemini API:", error);
        return `Đã xảy ra lỗi khi kết nối với AI (Text Mode): ${error.message || 'Lỗi không xác định'}`;
    }
}

// --- Gemini API Interaction (Audio) ---
async function getGeminiAudioResponse(audioData: string, mimeType: string, prompt: string): Promise<string> {
    console.log(`[Voice Chat API - Audio Mode] Received audio (${mimeType}, ${Math.round(audioData.length * 3 / 4 / 1024)} KB) with prompt: "${prompt}"`);

    try {
        const generationConfig = {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 512,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const contents = [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: audioData,
                },
            },
            {
                text: prompt
            }
        ];

        // Use runGeminiWithRetry with specific AUDIO_MODEL_NAME
        return await runGeminiWithRetry(async (model) => {
            const result = await model.generateContent({
                contents: [{ role: "user", parts: contents }],
                generationConfig,
                safetySettings,
            });

            const response = result.response;
            if (!response) {
                throw new Error("Gemini response was empty or undefined.");
            }

            const promptFeedback = response.promptFeedback;
            if (promptFeedback?.blockReason) {
                throw new Error(`Gemini response blocked. Reason: ${promptFeedback.blockReason}`);
            }

            return response.text();
        }, AUDIO_MODEL_NAME);

    } catch (error: any) {
        console.error("[Voice Chat API - Audio Mode] Error calling Gemini API:", error);
        return `Đã xảy ra lỗi khi kết nối với AI (Audio Mode): ${error.message || 'Lỗi không xác định'}`;
    }
}


export async function POST(request: Request) {
    let requestBody: any;
    try {
        requestBody = await request.json();
    } catch (error) {
        console.error("[Voice Chat API] Failed to parse request body:", error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const mode = requestBody.mode;

    try {
        let botResponse: string;

        if (mode === 'stt') {
            const text = requestBody.text;
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
                return NextResponse.json({ error: 'Missing or invalid "text" for STT mode' }, { status: 400 });
            }
            botResponse = await getGeminiTextResponse(text);
        } else if (mode === 'audio_understanding') {
            const audioData = requestBody.audioData; // base64 string
            const mimeType = requestBody.mimeType;
            const prompt = requestBody.prompt || "Describe this audio clip.";

            if (!audioData || typeof audioData !== 'string' || audioData.trim().length === 0) {
                return NextResponse.json({ error: 'Missing or invalid "audioData" for audio mode' }, { status: 400 });
            }
            if (!mimeType || typeof mimeType !== 'string') {
                return NextResponse.json({ error: 'Missing or invalid "mimeType" for audio mode' }, { status: 400 });
            }
            botResponse = await getGeminiAudioResponse(audioData, mimeType, prompt);
        } else {
            return NextResponse.json({ error: 'Invalid or missing "mode" in request body' }, { status: 400 });
        }

        console.log(`[Voice Chat API] Sending final response: "${botResponse.substring(0, 100)}..."`);
        return NextResponse.json({ response: botResponse });

    } catch (error: any) {
        console.error('[Voice Chat API] Unexpected error in POST handler:', error);
        return NextResponse.json({ error: `Failed to get bot response: ${error.message || 'Unknown error'}` }, { status: 500 });
    }
}
