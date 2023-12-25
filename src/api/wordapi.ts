import axios from 'axios';

const apiUrl = 'http://192.168.0.12:5008/word';

async function sendRequest() {
        const response = await axios.post(apiUrl, {
            arg1: '王,女',
            arg2: '男',
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Response:', response.data);
}

sendRequest();

