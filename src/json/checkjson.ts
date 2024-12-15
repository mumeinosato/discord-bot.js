import { readJson } from "./rwjson";

export const checkJson = (chId: string, path: string): boolean => {
    const data = readJson(path);
    if (data.includes(chId)) {
        return true;
    } else {
        return false;
    }
}