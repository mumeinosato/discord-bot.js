import * as fs from 'fs'
const chatPath = './data/chat.json';
import { readJson, writeJson } from '../json/rwjson';
import { goroku } from '../goroku/main';
import { sendRequest } from '../api/wordapi';

export async function cmd(cmdname: string, client: any, interaction: any): Promise<[string, { embed: Record<string, any> }]> {
    if (cmdname === 'help') {
        const tpy = "embed"
        const emobj = {
            embed: {
                color: 0x4169e1,
                title: "ヘルプ",
                description: "このBotのコマンド一覧です。",
                fields: [
                    {
                        name: "help",
                        value: "このコマンドです。"
                    },
                    {
                        name: "about",
                        value: "このBotについての情報を表示します。"
                    }
                ],
            }
        };
        return [tpy, emobj]
    } else if (cmdname === 'about') {
        const tpy = "embed"
        const emobj = {
            embed: {
                color: 0x4169e1,
                title: "このBotについて",
                description: "コードの書き直し中です",
                fields: [
                    {
                        name: "開発者",
                        value: "Mumeinosato"
                    },
                    {
                        name: "GitHub",
                        value: "https://github.com/mumeinosato/discord-bot.js"
                    },
                    {
                        name: "招待リンク",
                        value: "[ここをクリック](https://discord.com/api/oauth2/authorize?client_id=729668738877620255&permissions=8&scope=bot%20applications.commands)"
                    },
                    {
                        name: "サーバー数",
                        value: client.guilds.cache.size,
                        inline: true
                    },
                    {
                        name: "ユーザー数",
                        value: client.users.cache.size,
                        inline: true
                    }
                ],
            }
        };
        return [tpy, emobj]
    } else if (cmdname === 'chat') {
        const chId = interaction.channelId;

        const type = 'epre'
        let reobj: { embed: Record<string, any> } = { embed: {} };

        const modifyJson = (chId: string) => {
            const jsonData = readJson();
            const index = jsonData.indexOf(chId);

            if (index !== -1) {
                jsonData.splice(index, 1);
                reobj = {
                    embed: {
                        color: 0x4169e1,
                        description: '無効化しました'
                    }
                };
            } else {
                jsonData.push(chId);
                reobj = {
                    embed:
                    {
                        color: 0x4169e1,
                        description: '有効化しました'
                    }
                };
            }
            writeJson(jsonData);
        }

        modifyJson(chId);
        return [type, reobj];
    }else if(cmdname === 'goroku'){
        const text = interaction.options.getString('text');
        const data = await goroku(text);
        const type = 'embed';
        let emobj: { embed: Record<string, any> } = { embed: {} };
        if ((await data).found === true) {
            const highText = data.High.join(' ');
            const midText = data.Mid.join(' ');

            emobj = {
                embed: {
                    color: 0x4169e1,
                    title: '語録が見つかりました',
                    fields: [
                        {
                            name: '危険',
                            value: highText,
                        },
                        {
                            name: '注意',
                            value: midText,
                        },
                    ],
                },
            };
        }else{
            emobj = {
                embed:
                {
                    color: 0x4169e1,
                    description: '見つかりませんでした'
                }
            };
        }
        return [type, emobj];
    }else if(cmdname === 'word'){
        const type = 'embed';
        let emobj: { embed: Record<string, any> } = { embed: {} };
        const add = interaction.options.getString('add');
        if(interaction.options.getSubcommand() == 'math'){
            const subtract = interaction.options.getString('subtract');
            const data = await sendRequest(add, subtract, true);
            //console.log(data);
            emobj = {
                embed: {
                    color: 0x4169e1,
                    title: '計算結果',
                    fields: [
                        {
                            name: '加算',
                            value: add,
                        },
                        {
                            name: '減算',
                            value: subtract,
                        },
                        {
                            name: '結果',
                            value: data,
                        },
                    ],
                },
            };
        }else if(interaction.options.getSubcommand() == 'far'){
            const subtract = ''
            const data = await sendRequest(add, subtract,                                                                                       false);
            emobj = {
                embed: {
                    color: 0x4169e1,
                    title: '最も遠い単語',
                    fields: [
                        {
                            name: '単語',
                            value: add,
                        },
                        {
                            name: '結果',
                            value: data,
                        },
                    ],
                },
            };
        }
        return [type, emobj];
    }
    return ["embed", { embed: { color: 16757683, description: 'This is a test' } }]
}