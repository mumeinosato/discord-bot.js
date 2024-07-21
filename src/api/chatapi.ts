import axios from 'axios';
require('dotenv').config();

const apiUrl = 'http://192.168.0.23:6001/chat';

export async function sendRequestChat(data: string): Promise<string> {
    const response = await axios.post(apiUrl, data, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
}
