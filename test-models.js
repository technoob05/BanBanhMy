const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

// Manual simple env parser
const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/GEMINI_API_KEYS="?([^"\n]+)"?/);
const keys = match ? match[1].split(',') : [];

console.log(`Found ${keys.length} keys.`);

const modelsToTest = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro",
    "gemini-2.5-flash-image"
];

async function testAllModels() {
    console.log("Starting Model Benchmark...\n");

    for (const modelName of modelsToTest) {
        console.log(`--- Testing Model: ${modelName} ---`);
        let success = false;

        // Try keys until one works
        for (const key of keys) {
            try {
                const genAI = new GoogleGenerativeAI(key);
                const model = genAI.getGenerativeModel({ model: modelName });

                const start = Date.now();
                const result = await model.generateContent("Hello");
                const duration = Date.now() - start;

                console.log(`✅ SUCCESS with key ${key.slice(0, 5)}... in ${duration}ms`);
                success = true;
                break;
            } catch (error) {
                let status = "Unknown";
                if (error.response) status = error.response.status;
                else if (error.message.includes("404")) status = "404 (Not Found)";
                else if (error.message.includes("429")) status = "429 (Quota)";

                // console.log(`   ❌ Key ${key.slice(0, 5)}... failed: ${status}`);
                if (status !== "429 (Quota)") {
                    // console.log(`      Msg: ${error.message.slice(0, 100)}...`);
                }
            }
        }

        if (!success) {
            console.log(`❌ FAILED: ${modelName} (All keys failed)`);
        } else {
            console.log(`✨ ${modelName} is WORKING!`);
        }
        console.log("\n");
    }
}

testAllModels();
