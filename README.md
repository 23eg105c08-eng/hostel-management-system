# Hostel Management System

A full-stack web application to manage hostel operations efficiently.

## Tech Stack
- Backend: Spring Boot (Java)
- Frontend: React.js
- Database: MySQL

## Features
- Student registration and management
- Room allocation system
- Admin controls
- View available rooms
- Manage hostel data

## Project Structure
- /backend → Spring Boot API
- /frontend → React application

## How to Run

### Backend
1. Open backend folder
2. Run:
   mvn spring-boot:run

### Frontend
1. Open frontend folder
2. Run:
   npm install
   npm start

## Author
Bethi Goutham Reddy

## Features
- Student registration and management
- Room allocation system
- Admin controls
- View available rooms
- Manage hostel data

## System Flow
1. Admin manages rooms and student data
2. Students are assigned to rooms
3. System tracks availability and allocations

## Project Structure
- /backend → Spring Boot API
- /frontend → React application

  
  ## Sample API Request

POST /students

Request:
{
  "name": "John",
  "email": "john@example.com",
  "roomId": 101
}

Response:
{
  "id": 1,
  "name": "John",
  "roomId": 101
}

## Room Allocation Logic
- A student is assigned only if room capacity is available
- Each room has a fixed limit
- Allocation updates room availability automatically

- 
