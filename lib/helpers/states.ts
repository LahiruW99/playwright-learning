import { randomValueFromArray } from "@helpers/arrays";

export function randomState() {
    const states = ["AL", "AX", "LK"];
    return randomValueFromArray(states);
}
