import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Manual simple env parser since dotenv might not be installed or configured for this scope
const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/GEMINI_API_KEYS="?([^"\n]+)"?/);
const keys = match ? match[1].split(',') : [];

console.log(`Found ${keys.length} keys.`);

async function testModel() {
    const modelName = "gemini-2.5-flash-image";
    console.log(`Testing model: ${modelName}`);

    for (const key of keys) {
        console.log(`Trying key: ${key.slice(0, 10)}...`);
        try {
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent("Explain what is Pho in 1 sentence.");
            console.log("Success!");
            console.log("Response:", result.response.text());
            return;
        } catch (error) {
            console.error(`Error with key ${key.slice(0, 5)}...:`);
            console.error(error.message);
            if (error.response) {
                console.error("Status:", error.response.status);
            }
        }
    }
    console.log("All keys failed.");
}

testModel();
