import { Message } from "discord.js";
import { chatbot } from "./messages/chatbot";
import { voice } from "./messages/voice";

export async function msg(message:Message) {
    if(message.author.bot) return

    const voiceChannel = message.member?.voice.channel
    if(voiceChannel){
        await voice(message)
    }

    await chatbot(message)
}