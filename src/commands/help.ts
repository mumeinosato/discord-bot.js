export function help(): [string, { embed: Record<string, any> }] {
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
}