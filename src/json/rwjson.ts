import * as fs from 'fs'
const chatPath = './data/chat.json';

export const readJson = (path: string): string[] => {
    const datapath = './data/' + path + '.json';
    try {
        const data = fs.readFileSync(datapath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const writeJson = (data: string[], path: string) => {
    const datapath = './data/' + path + '.json';
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(datapath, jsonData, 'utf8');
};