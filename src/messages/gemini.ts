import { Message } from "discord.js";
import { gemini } from "../api/gemini";

export async function geminiChat(message: Message) {
    const sendText = message.content

    if (Math.random() < 1/3) {
        const result = await gemini(sendText)
        message.reply(result)
    }
} 