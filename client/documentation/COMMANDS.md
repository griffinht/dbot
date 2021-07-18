# Commands

The bot can be commanded by whispering to it.

`/tell bot command [arguments]`

Only players on the ops list may command the bot. Others will be ignored. See [Config](CONFIG.md) to add a player to the ops list

| command | description | example |
| ------- | ----------- | ------- |
| farm start (x y z) length width rows input (x y z) | Farms crops in a rectangle | See [Farm](commands/FARM.md) |
| move [wasdj] | Moves bot in a direction (wasd and j to jump) | move wwwja - Moves forward three times, jumps, then moves right |
| moveto x y z | Moves bot to a specified position. Make sure there are no jumps or turns, as the bot can only move to a specific point, and cannot do any pathfinding. | move 0 0 0 - Moves to the point (0, 0, 0) |
| look x y z | Looks at a specified position | look 0 0 0 - Looks at the point (0, 0, 0) |
