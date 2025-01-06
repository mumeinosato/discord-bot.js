import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { config } from "dotenv";
config();

const apiKey = process.env.APIKEY;

if (!apiKey) {
    throw new Error("APIKEY is not set");
}

const ai = new GoogleGenerativeAI(apiKey.toString());
const model = ai.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});


const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

export async function gemini(input: string): Promise<string> {
    const response = await model.generateContent(input);
    const text = response.response.text();
    console.log(response.response.usageMetadata);
    return text;
}