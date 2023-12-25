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
        name: 'goroku',
        description: '文の中に語録があるかどうか調べます',
        options: [{
            name: 'text',
            description: '調べる文',
            type: 3,
            required: true
        }],
    },
    {
        name: 'word',
        description: '単語',
        options: [
            {
                name: 'math',
                description: '計算',
                type: 1,
                required: false,
                options: [
                    {
                    name: 'add',
                    description: '足したい単語をカンマで区切ってください',
                    type: 3,
                    required: false
                    },
                    {
                        name: 'subtract',
                        description: '引きたい単語をカンマで区切ってください',
                        type: 3,
                        required: false
                    }
                ],
            },
            /*{
                name : 'far',
                description: '最も遠い単語を調べます',
                type: 1,
                options : [{
                    name : 'word',
                    description: '調べる単語',
                    type: 3,
                    required: true
                }]
            },*/
        ],
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

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