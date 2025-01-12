#Maven Build
FROM maven:3.8.3-openjdk-17-slim AS builder
COPY pom.xml /app/
COPY src /app/src
RUN --mount=type=cache,target=/root/.m2 mvn -f /app/pom.xml clean package -DskipTests

#Run
FROM openjdk:17.0.1-jdk-slim
VOLUME /log/cs2top-api
COPY --from=builder /app/target/MultiplayerChat-0.0.1-SNAPSHOT.jar MultiplayerChat.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "MultiplayerChat.jar"]