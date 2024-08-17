import { readJson, writeJson } from '../json/rwjson';

export function chat(interaction: any): [string, { embed: Record<string, any> }] {
    const chId = interaction.channelId;
    const type = 'epre';
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
}
