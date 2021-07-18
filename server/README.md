# server

This is a simple Minecraft server containerized with Docker for testing purposes.

If you'd like, you may ignore this and use your own Minecraft server.

## Run with Docker

### Build

Builds this docker image in the current directory tagged `server-tag`

`docker build . --tag server-tag`

### Run

Runs the built docker image from the previous step

`docker run server-tag`

## Deploy with Compose

Deploying via Docker Compose is generally easier.

`docker-compose up server`