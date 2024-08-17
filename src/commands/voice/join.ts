import { joinVoiceChannel } from "@discordjs/voice";

export async function join(interaction: any): Promise<[string, { embed: Record<string, any> }]> {
    const member = interaction.member;
    let emobj: { embed: Record<string, any> } = { embed: {} };
    const type = 'embed';

    if(member){
        const voiceChannel = member.voice.channel;
        if(voiceChannel?.type === 2){
            if(!voiceChannel){
                emobj = {
                    embed: {
                        color: 0x4169e1,
                        description: 'ボイスチャンネルに接続してください'
                    }
                };
            }
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            emobj = {
                embed: {
                    color: 0x4169e1,
                    description: '接続しました'
                }
            };
        } else {
            emobj = {
                embed: {
                    color: 0x4169e1,
                    description: 'このコマンドはボイスチャンネルでのみ使用できます'
                }
            };
        }
    } else {
        emobj = {
            embed: {
                color: 0x4169e1,
                description: 'エラーが発生しました'
            }
        };
    }
    
    return [type, emobj];
}