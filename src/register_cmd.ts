require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: "help",
        description: "コマンド一覧を表示します",
    },
    {
        name: "about",
        description: "このBotについて表示します",
    },
    {
        name: 'chat',
        description: 'AIの返信をon/offします',
    },
    {
        name: 'gchat',
        description: 'グローバルチャットをon/offします',
    },
    {
        name: 'join',
        description: '読み上げを開始します',
    },
    {
        name: 'bye',
        description: '読み上げを終了します',
    },
    {
        name: 'goroku',
        description: '文の中に語録があるかどうか調べます',
        options: [{
            name: 'text',
            description: '調べる文',
            type: 3,
            required: true
        }],
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

export async function setcmd(): Promise<void> {
    try {
        console.log('登録中です');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENTID),
            { body: commands },
        );
        console.log('登録完了しました');
        return;
    } catch (error) {
        console.error(error);
        return;
    }
}