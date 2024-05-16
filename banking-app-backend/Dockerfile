
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /home/app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
COPY --from=build /home/app/target/*.jar /usr/local/lib/banking-app.jar
ENTRYPOINT ["java", "-jar", "/usr/local/lib/banking-app.jar"]