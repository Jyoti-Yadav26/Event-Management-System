# Use Java 17 as the base image
FROM eclipse-temurin:17-jdk

# Copy the JAR from the target folder
COPY target/event-management-system-1.0.0-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8090

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]