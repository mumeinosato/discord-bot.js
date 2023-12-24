import * as fs from 'fs'
const chatPath = './data/chat.json';

export const readJson = (): string[] => {
    try {
        const data = fs.readFileSync(chatPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const writeJson = (data: string[]) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(chatPath, jsonData, 'utf8');
};