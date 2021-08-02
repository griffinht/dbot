#
# Build (Gradle)
#
FROM gradle as build

WORKDIR /usr/src/app

COPY . .

RUN gradle shadowJar --no-daemon

#
# Runtime (Java 11)
#
FROM adoptopenjdk/openjdk11:alpine-jre
RUN apk --no-cache add curl

WORKDIR /usr/app

COPY --from=build /usr/src/app/build/libs/discord.jar .

#HEALTHCHECK --interval=5s --timeout=5s --retries=5 CMD curl --fail http://localhost:80/healthcheck || exit 1

ENTRYPOINT ["java", "-jar", "discord.jar"]