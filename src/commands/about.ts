export function about(client: any): [string, { embed: Record<string, any> }] {
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
}