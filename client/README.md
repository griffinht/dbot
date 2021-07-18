# client

Minecraft bot built on the [mineflayer](https://github.com/PrismarineJS/mineflayer) framework

Written in Typescript, compiled to Javascript, run with Node.js, containerized with Docker, and deployed with Docker Compose.

## Usage

#### [Config](documentation/CONFIG.md)
#### [Commands](documentation/COMMANDS.md)

## Production

### Deploy

Deploy with [Docker Compose](https://docs.docker.com/compose/install/)

`docker-compose up client`

## Development

Requires [Node.js 16.5.0](https://nodejs.org/en/download/current/)

### Build

Install Typescript globally

`npm install -g typescript`

Build with Typescript

`tsc`

Outputs Javascript to `./build/`

### Run

`node build`

Runs the Node.js application built in the previous step in `./build/`

By default, the bot will connect to `localhost:25565` with username `bot`. See [Config](documentation/CONFIG.md) to change this.

