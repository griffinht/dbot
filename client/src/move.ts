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
let move: Move | null = null
let mutex: Mutex = new Mutex()
/*bot.on('move', async () => {
    let release = await mutex.acquire()
    if (move === null) {
        release()
        return
    }
    if (!bot.getControlState('forward')) {
        await bot.setControlState('forward', true)
    }
    bot.lookAt(move.target)
    let distance = bot.entity.position.xzDistanceTo(move.target)
    if (!move.resolved) {
        if (distance < move.far) {
            move.resolved = true
            move.resolve()
        }
    } else {
        if (distance < move.close
            || distance > move.far) {
            await bot.setControlState('forward', false)
            move = null
        }
    }
    release()
})*/

export function moveTo(bot: Bot, target: Vec3, far: number, close: number): Promise<void> {
    return new Promise(async resolve => {
        let release = await mutex.acquire()
        if (move !== null) {
            move.resolve()
        }
        move = {
            target: target.clone().add(new Vec3(0.5, 1.5, 0.5)),
            far: far,
            close: close,
            resolved: false,
            resolve: resolve
        }
        release()
    })
}