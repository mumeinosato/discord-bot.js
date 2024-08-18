import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';

const rpc = axios.create({baseURL:"http://192.168.0.133:50021", proxy: false})

export async function voicevox(text:string,filename: string) {
    try {
        const filepath = path.join('voice_data', filename)

        const audio_query = await rpc.post('audio_query',null,{
            params: {
                text: text,
                speaker: 8
            }
        })

        const synthesis = await rpc.post("synthesis", JSON.stringify(audio_query.data),{
            params: {speaker: 8},
            responseType: 'arraybuffer',
            headers: {
                "accept": "audio/wav",
                "Content-Type": "application/json"
            }
        })

        fs.writeFileSync(filepath, Buffer.from(synthesis.data), 'binary')
    } catch(error){
        console.error(error)
    }
}