import axios from 'axios';
require('dotenv').config();

const apiUrl = 'http://192.168.0.132:5000/chat';

export async function sendRequestChat(data: string): Promise<string> {
    try {
        const response = await axios.post(apiUrl, data, {
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
