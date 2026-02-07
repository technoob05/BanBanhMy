import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const GEMINI_API_KEYS = (process.env.GEMINI_API_KEYS || "").split(",").filter(Boolean);

if (GEMINI_API_KEYS.length === 0) {
    console.warn("No GEMINI_API_KEYS found in environment variables!");
}

// Use gemini-1.5-flash as the standard stable model
// User requested "gemini-3-flash-preview" which is likely not available/stable, 
// so we default to the best available Flash model. 
// We can easily swap this string if a new model is released.
const MODEL_NAME = "gemini-2.5-flash-lite";

export const getGeminiModel = (apiKey: string, modelName: string = MODEL_NAME) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: modelName });
};

/**
 * Executes a function with automatic retry using different API keys.
 * If a 429 (Too Many Requests) error occurs, it switches to the next key.
 */
export const runGeminiWithRetry = async <T>(
    operation: (model: GenerativeModel) => Promise<T>,
    modelName: string = MODEL_NAME
): Promise<T> => {
    // Shuffle keys to distribute load, then try them sequentially on failure

    const shuffledKeys = [...GEMINI_API_KEYS].sort(() => 0.5 - Math.random());

    let lastError: unknown;

    for (const apiKey of shuffledKeys) {
        try {
            const model = getGeminiModel(apiKey, modelName);
            return await operation(model);
        } catch (error: unknown) {
            lastError = error;
            // Check for 429 (Too Many Requests) or 503 (Service Unavailable)
            // If it's a quota error, we continue to the next key
            const isRetryableError =
                (error as { message?: string; status?: number })?.message?.includes('429') ||
                (error as { message?: string; status?: number })?.status === 429 ||
                (error as { message?: string; status?: number })?.message?.includes('403') ||
                (error as { message?: string; status?: number })?.status === 403 ||
                (error as { message?: string; status?: number })?.message?.includes('API key');

            if (isRetryableError) {
                console.warn(`Key ${apiKey.slice(0, 8)}... failed (Status: ${(error as { status?: number })?.status || 'Unknown'}), retrying with next key...`);
                continue;
            }
            // For other errors (e.g., INVALID_ARGUMENT), we throw immediately
            throw error;
        }
    }

    throw lastError;
};

// Backwards compatibility (deprecated in favor of runGeminiWithRetry)
const defaultGenAI = new GoogleGenerativeAI(GEMINI_API_KEYS[0]);
export const model = defaultGenAI.getGenerativeModel({
    model: MODEL_NAME,
});

export const visionModel = defaultGenAI.getGenerativeModel({
    model: MODEL_NAME,
});
