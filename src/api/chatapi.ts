import axios from 'axios';
require('dotenv').config();

const apiUrl = 'http://192.168.0.132:5000/chat';

export async function sendRequestChat(data: string): Promise<string> {
    try {
        const base64Data = Buffer.from(data).toString('base64');
        const response = await axios.post(apiUrl, base64Data, {
            headers: {
            'Content-Type': 'text/plain',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return 'エラーが発生しました';
    }
}
