#
# Build stage
#
FROM amazoncorretto:17 AS build
COPY ./ /home/app
WORKDIR /home/app
RUN chmod +x ./gradlew
RUN ./gradlew build

#
# Package stage
#
FROM amazoncorretto:17-alpine
COPY --from=build /home/app/build/libs/todoList-0.0.1-SNAPSHOT.jar /usr/local/lib/todoList.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","-Dfile.encoding=UTF-8","/usr/local/lib/todoList.jar"]