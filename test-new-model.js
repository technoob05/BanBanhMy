const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '.env.local');
let apiKey = "";

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEYS=(.*)/);
    if (match && match[1]) {
        apiKey = match[1].replace(/['"]/g, '').split(',')[0].trim();
    }
} catch (e) {
    console.error("Could not read .env.local");
}

if (!apiKey) {
    console.error("No API Key found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// Using the requested model
const modelName = "gemini-2.5-flash-lite";
const model = genAI.getGenerativeModel({ model: modelName });

async function run() {
    try {
        console.log(`Testing ${modelName}...`);
        const result = await model.generateContent("Hello, are you functional?");
        const response = result.response;
        console.log("Response:", response.text());
        console.log(`SUCCESS: ${modelName} is working.`);
    } catch (error) {
        console.error("ERROR:", error.message);
        if (error.response) {
            console.error("Error details:", JSON.stringify(error.response, null, 2));
        }
    }
}

run();
