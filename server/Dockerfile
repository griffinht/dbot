FROM adoptopenjdk/openjdk11:alpine-jre
FROM adoptopenjdk/openjdk16:alpine-jre as build
RUN apk --no-cache add curl

WORKDIR /usr/src/app

RUN curl "https://papermc.io/api/v1/paper/1.16.5/latest/download" -o server.jar
RUN java -jar server.jar; exit 0

FROM adoptopenjdk/openjdk16:alpine-jre

WORKDIR /run

COPY --from=build /usr/src/app .
COPY source .

VOLUME /run

CMD java -Djline.terminal=jline.UnsupportedTerminal -jar server.jar nogui