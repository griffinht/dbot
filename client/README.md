# client

Minecraft bot built on the [mineflayer](https://github.com/PrismarineJS/mineflayer) framework

Written in Typescript, compiled to Javascript, run with Node.js, containerized with Docker, and deployed with Docker Compose.

## Usage

#### [Config](documentation/CONFIG.md)
#### [Commands](documentation/COMMANDS.md)

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

By default, the bot will connect to `localhost:25565` with username `bot`. See [Config](documentation/CONFIG.md) to change this.

