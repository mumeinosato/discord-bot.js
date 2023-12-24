require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: "help",
        description: "コマンド一覧を表示します"
    },
    {
        name : "about",
        description: "このBotについて表示します"
    },
    {
        name : 'chat',
        description : 'AIの返信をon/offします'
    }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

export async function setcmd(): Promise<void> {
    try {
        console.log('登録中です');
        await rest.put(
            Routes.applicationCommands(process.env.clientId),
            { body: commands },
        );
        console.log('登録完了しました');
        return;
    } catch (error) {
        console.error(error);
        return;
    }
}