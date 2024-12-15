import { readJson, writeJson } from "../json/rwjson";

export async function gchat(interaction: any): Promise<[string, { embed: Record<string, any> }]> {
    const type = 'epre';
    let reobj: { embed: Record<string, any> } = { embed: {} };

    const chId = interaction.channelId;
    const wbname = 'mgchat';

    const webhooks = await interaction.channel.fetchWebhooks();
    const webhook = webhooks?.find((v: { token: any; }) => v.token) ?? await interaction.channel.createWebhook(wbname);

    if (webhook) {

        reobj = {
            embed:
            {
                color: 0x4169e1,
                description: '有効化しました'
            }
        };
    }

    return [type, reobj];
}