import { readJson } from "./rwjson";

export const checkJson = (chId: string): boolean => {
    const data = readJson();
    if (data.includes(chId)) {
        return true;
    } else {
        return false;
    }
}