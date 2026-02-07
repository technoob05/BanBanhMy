const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/GEMINI_API_KEYS="?([^"\n]+)"?/);
const keys = match ? match[1].split(',') : [];

async function testSimple() {
    const models = ["gemini-1.5-flash", "gemini-2.0-flash-exp"];

    for (const modelName of models) {
        console.log(`Checking ${modelName}...`);
        try {
            // Try random key
            const key = keys[Math.floor(Math.random() * keys.length)];
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: modelName });
            await model.generateContent("Hi");
            console.log(`✅ ${modelName} WORKS!`);
        } catch (e) {
            console.log(`❌ ${modelName} Failed: ${e.message.split(' ')[0]}`);
        }
    }
}
testSimple();
