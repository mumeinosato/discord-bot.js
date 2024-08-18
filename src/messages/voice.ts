import { Message } from "discord.js";
import { voicevox } from "../api/voicevox";
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import {
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    getVoiceConnection
} from '@discordjs/voice';
import ffmpegPath from 'ffmpeg-static'; 

export async function voice(message: Message) {
    const filename = `${randomUUID()}.wav`;
    const filepath = path.join('voice_data', filename);
    
    try{
        await voicevox(message.content, filename);
        const voiceChannel = message.member?.voice.channel;
        const connection = getVoiceConnection(voiceChannel?.guild.id!);

        if(connection){
            const resource = createAudioResource(filepath);
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                player.stop();
                fs.unlink(filepath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            });
        }
    } catch (error){
        console.log(error)
    }
}