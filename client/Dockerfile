#
# Build
#
FROM node:16.5.0-alpine3.14 as build

WORKDIR /usr/src/app

COPY . .

RUN npm install
# Either rollup or tsc can be used to compile
# Rollup saves a few kilobytes
# Most of the space comes from node_modules :(
RUN npx rollup -c
# tsc will fail with errors because of mineflayer, but they can be ignored
#RUN npx tsc; exit 0


#
# Run
#
FROM node:16.5.0-alpine3.14

WORKDIR /usr/app/

COPY --from=build /usr/src/app/build build
COPY package.json .
RUN npm install --production

VOLUME /usr/app/

ENTRYPOINT [ "node", "." ]