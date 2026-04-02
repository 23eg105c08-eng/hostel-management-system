# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/hostel-management-1.0.jar app.jar

# Expose port (Render sets PORT internally, but we expose 8080 as standard Docker convention)
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
