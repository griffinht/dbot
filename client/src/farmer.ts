import {Vec3} from "vec3";
import {Bot} from "mineflayer";
import {Item} from "minecraft-data";
import {getBlock} from "./util.js";
import {moveTo} from "./move.js"

const data = require('minecraft-data')('1.16.5')

// maximum amount to withdraw each refill
const INGREDIENT_AMOUNT = 512

async function getAndWithdraw(bot: Bot, location: Vec3, item: Item, maxAmount: number): Promise<boolean> {
    await moveTo(bot, location, 2, 2);
    await bot.waitForTicks(2)
    // @ts-ignore https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md#botopenchestchestblock-or-minecartchestentity
    // @ts-ignore
    let window = await bot.openChest(getBlock(bot, location));
    await bot.waitForTicks(2)
    let count = 0;
    while (count < maxAmount) {
        // @ts-ignore stupid incomplete type definition
        let i = window.slots[fixedWindowCount(window, item.id)];
        if (i === null) {
            break
        }
        let amt = i.count;
        try {
            // @ts-ignore
            await window.withdraw(item.id, null, amt);
        } catch (e) {
            throw new Error('Error withdrawing ' + amt + ' ' + item.name + ' from container at ' + location)
        }
        count += amt
    }
    if (count === 0) {
        return false
    }
    await bot.waitForTicks(2)
    await window.close();

    // https://github.com/PrismarineJS/mineflayer/issues/1500
    // seems to be required to update the player inventory
    // otherwise bot.inventory remains empty
    // @ts-ignore
    await (await bot.openContainer(getBlock(bot, location))).close();
    await bot.waitForTicks(2)
    return true;
}

// window#count always returns 0??
// todo what is the window type?
// finds largest stack and returns slot
function fixedWindowCount(window: any, itemType: number) {
    let maxSlot = 0
    for (let i = 0; i < window.slots.length; i++) {
        if ((i >= window.inventoryStart && i <= window.inventoryEnd)
            || window.slots[i] === null
            || window.slots[i].type !== itemType
            || window.slots[i] <= window.slots[maxSlot]) continue
        maxSlot = i
    }
    return maxSlot;
}

// Item of seed to plant
const SEED_TYPE: Item = data.itemsByName.wheat_seeds

export async function farm(bot: Bot, start: Vec3, length: number, width: number, rows: number, input: Vec3) {
    const FAR = 1
    const CLOSE = .1
    let a = 1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < length + 1; j++) {
            await moveTo(bot, start, FAR, CLOSE)
            let pos = start.clone()
                .subtract(new Vec3(-Math.floor(width / 2), 0, 0))
            for (let k = 0; k < width; k++) {
                if (bot.heldItem === null) {
                    if (bot.inventory.findInventoryItem(SEED_TYPE.id, null, false) === null) {
                        if (!await getAndWithdraw(bot, input, SEED_TYPE, INGREDIENT_AMOUNT)) {
                            throw new Error('Can\'t find any ' + SEED_TYPE.displayName + ' in player inventory or input inventory at ' + input)
                        }
                        // bot just moved away, now it needs to move back
                        await moveTo(bot, start, FAR, CLOSE)
                    }
                    if (bot.heldItem === null // bot#equip errors when hand is already full
                        // @ts-ignore idk why this is an error
                        || bot.heldItem.type !== SEED_TYPE.id) {
                        try {
                            // @ts-ignore bot#equip is able to take itemType/id number instead of Item reference
                            await bot.equip(SEED_TYPE.id, 'hand');
                        } catch (e) {
                            if (e instanceof Error) {
                                throw new Error('Error while equipping ' + SEED_TYPE.id + '. ' + e.message + ', ' + bot.inventory.items().toString())
                            } else {
                                throw e
                            }
                        }
                    }
                }
                bot.dig(getBlock(bot, pos)).catch((e) => {
                    if (e instanceof Error) {
                        throw new Error('Error while digging at ' + pos + '. ' + e.message)
                    } else {
                        throw e
                    }
                })
                bot.placeBlock(getBlock(bot, pos), new Vec3(0, 1, 0))
                    .catch((e) => {
                        if (e instanceof Error) {
                            if (!e.message.startsWith('No block has been placed')) {
                                console.log(e.message)
                            } else {
                                //ignored
                            }
                        } else {
                            //throw e
                        }
                    })
                await bot.waitForTicks(1)
                pos.add(new Vec3(-1, 0, 0))
            }
            if (j !== length) {
                start.add(new Vec3(0, 0, a))
            }
        }
        a *= -1
        start.add(new Vec3(9, 0, 0))
    }
}