import { Message } from "discord.js";
import { chatbot } from "./messages/chatbot";
import { geminiChat } from "./messages/gemini";
import { voice } from "./messages/voice";
import { checkJson } from "./json/checkjson";

export async function msg(message:Message) {
    if(message.author.bot) return

    const voiceChannel = message.member?.voice.channel
    if(voiceChannel && message.channel.type === 2){
        //console.log('voice')
        await voice(message)
    }

    const isin = checkJson(message.channel.id, 'chat')
    if(isin){
        if (Math.random() < 0.5) {
            await geminiChat(message)
        } else {
            await chatbot(message)
        }
    } else{
        await chatbot(message)
    }

}