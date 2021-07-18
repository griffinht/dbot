# client

Minecraft bot built on the [mineflayer](https://github.com/PrismarineJS/mineflayer) framework

Written in Typescript, compiled to Javascript, run with Node.js

CommonJS is used only because mineflayer uses it :(


## Production

### Deploy

Deploy via Docker

## Development

### Build

Build with Typescript

`tsc`

Outputs Javascript to `./build/`

### Run

Requires Node.js 16.5.0 (https://nodejs.org/en/download/current/)

`node build`

Runs the Node.js application built in the previous step `./build/`

By default, the bot will connect to `localhost:25565` with username `bot`. See below to change these settings.

## Runtime flags

Runtime flags can be set via command line arguments or environment variables.

#### Command line arguments

`node build --flag=value`

#### Environment variables

Prefix each variable with `bot.`
```
bot.flag=value
```

### Runtime flags

| Flag | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| host | string | localhost | Host of Minecraft server to connect to |
| port | number | 25565 | Port of Minecraft server to connect to |
| username | string | bot | Username of bot |
| password | string | (empty) | Password of Mojang account to authenticate as. Leave empty to log in without online mode |
| ops | string[] | (empty) | Array of usernames that can control (operate) the bot via commands, separated by commas. Example: Player,OtherPlayer |
