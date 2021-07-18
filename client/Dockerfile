#
# Build
#
FROM node:16.5.0-alpine3.14 as build

WORKDIR /usr/src/app

COPY . .

RUN npm install
# mineflayer has typescript errors with this configuration, so ignore them
RUN npx tsc; exit 0


#
# Run
#
FROM node:16.5.0-alpine3.14

WORKDIR /usr/app/

COPY --from=build /usr/src/app/build .

RUN node .