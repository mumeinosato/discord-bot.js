import { Message } from "discord.js";
import { sendRequestChat } from "../api/chatapi";
import { checkJson } from "../json/checkjson";


export async function chatbot(message: Message) {
    const sendText = message.content
    const isin = checkJson(message.channel.id, 'chat')
    let image = ''

    if(message.attachments.size > 0){
        message.attachments.forEach(attachment => {
            image = attachment.url
        })
    }

    if(isin){
        try {
            const result = await sendRequestChat(sendText + image)
            message.reply(result)
        } catch (error){
            message.reply('エラーが発生しました')
        }
    } else{
        await sendRequestChat(sendText + image)
    }
}