import { gorokuc } from '../goroku/main';

export async function goroku(interaction: any): Promise<[string, { embed: Record<string, any> }]> {
    const text = interaction.options.getString('text');
    const data = await gorokuc(text);
    const type = 'embed';
    let emobj: { embed: Record<string, any> } = { embed: {} };
    if (data.found === true) {
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
    } else {
        emobj = {
            embed:
            {
                color: 0x4169e1,
                description: '見つかりませんでした'
            }
        };
    }
    return [type, emobj];
}
