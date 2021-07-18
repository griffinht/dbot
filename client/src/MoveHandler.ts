import {Vec3} from "vec3";
import {Bot} from "mineflayer";

interface Move {
    target: Vec3,
    far: number,
    close: number,
    resolved: boolean,
    resolve: (value: void | PromiseLike<void>) => void
}

class Mutex {
    mutex: Promise<void> = Promise.resolve()

    acquire(): Promise<() => void> {
        let old = this.mutex
        let release: () => void = Promise.resolve
        this.mutex = new Promise<void>(resolve => {
            release = resolve
        })
        return new Promise<() => void>(resolve => {
            old.then(() => resolve(release))
        })
    }
}

export default class MoveHandler {
    bot: Bot
    move: Move | null = null
    mutex: Mutex = new Mutex()

    constructor(bot: Bot) {
        this.bot = bot
        this.bot.on('move', async () => {
            let release = await this.mutex.acquire()
            if (this.move === null) {
                release()
                return
            }
            if (!this.bot.getControlState('forward')) {
                await this.bot.setControlState('forward', true)
            }
            this.bot.lookAt(this.move.target)
            let distance = this.bot.entity.position.xzDistanceTo(this.move.target)
            if (!this.move.resolved) {
                if (distance < this.move.far) {
                    this.move.resolved = true
                    this.move.resolve()
                }
            } else {
                if (distance < this.move.close
                    || distance > this.move.far) {
                    await this.bot.setControlState('forward', false)
                    this.move = null
                }
            }
            release()
        })
    }

    moveTo(bot: Bot, target: Vec3, far: number, close: number): Promise<void> {
        return new Promise(async resolve => {
            let release = await this.mutex.acquire()
            if (this.move !== null) {
                this.move.resolve()
            }
            this.move = {
                target: target.clone().add(new Vec3(0.5, 1.5, 0.5)),
                far: far,
                close: close,
                resolved: false,
                resolve: resolve
            }
            release()
        })
    }
}