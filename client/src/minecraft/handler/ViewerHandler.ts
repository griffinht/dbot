import {Bot} from "mineflayer";
import {Block} from "prismarine-block";
import MoveHandler from "./MoveHandler";

//const viewerHandler = require('prismarine-viewer').mineflayer

export default class ViewerHandler {
    constructor(port: number, bot: Bot, moveHandler: MoveHandler) {
/*        console.log('Starting prismarine-viewer web server on port ' + port)
        viewerHandler(bot, {
            firstPerson: true,
            port: port
        })
        //@ts-ignore :(*
        bot.viewer.on('blockClicked', (block: Block) => {
            moveHandler.moveTo(block.position, 2, 1)
        })*/
    }
}