import {Bot} from "mineflayer";
import {Vec3} from "vec3";
import {Block} from "prismarine-block";

export function getBlock(bot: Bot, vec3: Vec3): Block {
    let block = bot.blockAt(vec3);
    if (block === null) {
        throw new Error('Block at ' + vec3 + ' not loaded');
    }

    return block;
}


export function strictParseInt(string: string): number {
    if (string == null) {
        throw new Error('Not enough arguments')
    }
    let number = parseInt(string)
    if (isNaN(number)) {
        throw new Error(string + ' is not a number')
    }
    return number
}
export function toVec3(numbers: number[]): Vec3 {
    return new Vec3(numbers[0], numbers[1], numbers[2])
}
export function strictParseInts(strings: string[], offset: number, amount: number): number[] {
    let numbers: number[] = [];

    for (let i = 0; i < amount && (amount <= 0 || i < amount); i++) {
        numbers[i] = strictParseInt(strings[i + offset])
    }

    return numbers;
}