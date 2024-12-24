import { Message } from "discord.js";
import { chatbot } from "./messages/chatbot";
import { voice } from "./messages/voice";

export async function msg(message:Message) {
    if(message.author.bot) return

    const voiceChannel = message.member?.voice.channel
    if(voiceChannel && message.channel.type === 2){
        //console.log('voice')
        await voice(message)
    }

    //console.log('chatbot')
    await chatbot(message)
}