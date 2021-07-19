import {Vec3} from "vec3";
import {Bot} from "mineflayer";
import {Item} from "minecraft-data";
import {getBlock} from "./util.js";
import MoveHandler from "./MoveHandler.js";

// maximum amount to withdraw each refill
const INGREDIENT_AMOUNT = 512
const FAR = 1
const CLOSE = .1
const WIDTH = 9
const COLLECT_WIDTH = 3

export default class FarmHandler {
    running: boolean = false
    bot: Bot
    moveHandler: MoveHandler

    constructor(bot: Bot, moveHandler: MoveHandler) {
        this.bot = bot
        this.moveHandler = moveHandler
    }

    stop() {
        this.running = false
    }

   /* async farm(seedType: Item, start: Vec3, length: number, width: number, input: Vec3) {
        this.running = true

        let a = 1;
        let waypoints: Vec3[] = []
        for (let waypoint of waypoints) {
            await this.moveHandler.moveTo(this.bot, start, FAR, CLOSE)
            await this.moveHandler.moveTo(this.bot, start, FAR, CLOSE)
            let pos = start.clone()
                .subtract(new Vec3(-Math.floor(WIDTH / 2), 0, 0))
            for (let k = 0; k < WIDTH; k++) {
                if (!this.running) {
                    return
                }
                if (this.bot.heldItem === null) {
                    if (this.bot.inventory.findInventoryItem(seedType.id, null, false) === null) {
                        if (!await getAndWithdraw(this.moveHandler, this.bot, input, seedType, INGREDIENT_AMOUNT)) {
                            throw new Error('Can\'t find any ' + seedType.displayName + ' in player inventory or input inventory at ' + input)
                        }
                        // bot just moved away, now it needs to move back
                        await this.moveHandler.moveTo(this.bot, start, FAR, CLOSE)
                    }
                    if (this.bot.heldItem === null // bot#equip errors when hand is already full
                        // @ts-ignore idk why this is an error
                        || this.bot.heldItem.type !== seedType.id) {
                        try {
                            // @ts-ignore bot#equip is able to take itemType/id number instead of Item reference
                            await this.bot.equip(seedType.id, 'hand');
                        } catch (e) {
                            if (e instanceof Error) {
                                throw new Error('Error while equipping ' + seedType.id + '. ' + e.message + ', ' + this.bot.inventory.items().toString())
                            } else {
                                throw e
                            }
                        }
                    }
                }
                this.bot.dig(getBlock(this.bot, pos)).catch((e) => {
                    if (e instanceof Error) {
                        throw new Error('Error while digging at ' + pos + '. ' + e.message)
                    } else {
                        throw e
                    }
                })
                this.bot.placeBlock(getBlock(this.bot, pos), new Vec3(0, 1, 0))
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
                await this.bot.waitForTicks(1)
                pos.add(new Vec3(-1, 0, 0))
            }
            if (j !== length) {
                start.add(new Vec3(0, 0, a))
                console.log(a)
            }
        }

        // collect by going backward
        let w = []

    }*/

    async collect(start: Vec3, length: number, width: number) {
        let far = true
        await this.moveHandler.moveTo(start, FAR, CLOSE)
        let max = width / COLLECT_WIDTH
        for (let i = 0; i < max; i++) {
            console.log(i, i * COLLECT_WIDTH, (far ? 1 : 0) * length)
            await this.moveHandler.moveTo(start.clone()
                .add(new Vec3(i * COLLECT_WIDTH, 0, (far ? 1 : 0) * length)), FAR, CLOSE)
            if (i !== max) {
                await this.moveHandler.moveTo(start.clone()
                    .add(new Vec3((i + 1) * COLLECT_WIDTH, 0, (far ? 1 : 0) * length)), FAR, CLOSE)
            }
            far = !far
        }
    }
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

async function getAndWithdraw(moveHandler: MoveHandler, bot: Bot, location: Vec3, item: Item, maxAmount: number): Promise<boolean> {
    await moveHandler.moveTo(location, 2, 2);
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