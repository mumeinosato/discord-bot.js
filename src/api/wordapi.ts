import axios from 'axios';

const apiUrl = 'http://192.168.0.12:5008/word';

export async function sendRequest(arg1: string, arg2: string, arg3: boolean) {
        const response = await axios.post(apiUrl, {
            arg1,
            arg2,
            arg3,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //console.log(response.data);
        return response.data;
}
