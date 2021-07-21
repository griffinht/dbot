#
# Build
#
FROM adoptopenjdk/openjdk16:alpine-jre as build
RUN apk --no-cache add curl

WORKDIR /usr/src/app

# Dry run of server
# Paper will download and patch the server binaries, then automatically quit because the eula is not agreed to
RUN curl -o server.jar "https://papermc.io/api/v1/paper/1.16.5/latest/download"
RUN java -jar server.jar; exit 0

#
# Run
#
FROM adoptopenjdk/openjdk16:alpine-jre

WORKDIR /run

COPY --from=build /usr/src/app .
COPY source .

VOLUME /run

CMD java -Djline.terminal=jline.UnsupportedTerminal -jar server.jar nogui