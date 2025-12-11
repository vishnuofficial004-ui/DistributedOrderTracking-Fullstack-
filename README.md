# DistributedOrderTracking

## Overview
DistributedOrderTracking is a full-stack distributed system built to simulate real-time order placement, tracking, and status updates. The project includes a Spring Boot backend, a React (Vite) frontend, a MySQL relational database, and RabbitMQ for asynchronous event-driven communication. The objective is to learn scalable backend architecture, RESTful API design, SQL schema modeling, frontend–backend integration, and clean code principles.

## Architecture
The system consists of:
- Backend (Spring Boot, Java 17)
- Frontend (React + Vite)
- Database (MySQL)
- Message Broker (RabbitMQ)
- REST API interface
- Asynchronous event flow for order updates

## Tech Stack
Backend:
- Java 17
- Spring Boot 3
- Spring Data JPA
- MySQL
- RabbitMQ
- Maven

Frontend:
- React
- Vite
- React Router
- Axios

Tools:
- Postman
- MySQL Workbench
- Git

## Folder Structure
<pre>
DistributedOrderTracking/
|
|-- backend/
|   |-- src/
|   |   |-- main/
|   |   |   |-- java/
|   |   |   |   |-- com/
|   |   |   |   |   |-- example/
|   |   |   |   |   |   |-- DistributedOrderTracking/
|   |   |   |   |   |   |   |-- controller/
|   |   |   |   |   |   |   |-- service/
|   |   |   |   |   |   |   |-- repository/
|   |   |   |   |   |   |   |-- model/
|   |   |   |   |   |   |   |-- config/
|   |   |   |
|   |   |-- resources/
|   |
|   |-- pom.xml
|   |-- application.properties
|
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|
|-- README.md
</pre>




## Database Schema
Tables:
- users
- product
- orders
- order_status

Relationships:
- One User → Many Orders
- One Product → Many Orders
- One Order → Many Order Status updates

## API Endpoints

### User APIs
POST /api/users/register → Register a user  
POST /api/users/login → User login  

### Product APIs
GET /api/products → Get all products  
POST /api/products → Add a product  

### Order APIs
POST /api/orders → Create an order  
GET /api/orders/{id} → Get order by ID  
GET /api/orders/user/{userId} → Get all orders of a user  

### Order Status APIs
POST /api/order-status → Add/update status  
GET /api/order-status/{orderId} → Get order status history  

## RabbitMQ Event Flow
1. Backend publishes an event when an order is created.  
2. RabbitMQ stores it in a queue.  
3. Consumer listens and updates order_status table.  
4. Frontend fetches updated status via API.  

## How to Run the Project

### Prerequisites
- Java 17
- Node.js 18+
- MySQL installed
- RabbitMQ running locally
- Maven installed
- Git installed

## Backend Setup
cd backend  
mvn clean install  

### Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:5030/distributed_order_tracking  
spring.datasource.username=postgres  
spring.datasource.password=2004
spring.jpa.hibernate.ddl-auto=update  

### Run backend
mvn spring-boot:run  

Backend default URL: http://localhost:8080

## Frontend Setup
cd frontend  
npm install  
npm run dev  

Frontend runs at: http://localhost:5173

## Features Completed
- User registration & login
- Product listing & addition
- Order creation
- Order tracking & order history
- Status updates stored in order_status table
- RabbitMQ event-driven updates
- MySQL relational database modeling
- Clean Spring Boot controllers, services, repositories
- React UI with routing and forms

## Future Enhancements
- JWT authentication
- Docker Compose for full environment automation
- WebSocket real-time notifications
- Admin dashboard
- Payment workflow simulation
- Microservice separation (Orders, Inventory, Notifications)

## Author
Vishnu  
Java | Spring Boot | React  
Distributed Systems & Backend Engineering Enthusiast
