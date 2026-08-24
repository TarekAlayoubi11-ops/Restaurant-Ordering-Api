# 🍽️ Restaurant Ordering API

A RESTful API for managing a restaurant ordering system, built with Node.js, Express.js, and MongoDB.

The project is structured using a layered architecture to separate routing, request handling, business logic, and data models, with a focus on security, authentication, authorization, and maintainability.

## 🚀 Features

### 👤 Users

* User registration and login
* Authentication using JWT
* Refresh token mechanism
* Authorization and access control
* Ownership-based access control

### 🛒 Orders

* Create and manage orders
* Retrieve user orders
* Update and delete orders based on authorization and ownership rules

### 🍔 Products

* Create, update, delete, and retrieve products
* Product information management
* Authorization for protected operations

### 🏷️ Categories

* Create and manage product categories
* Organize products by categories

## 🔐 Security

The API implements several security mechanisms, including:

* JWT Authentication
* Refresh Tokens
* Authorization
* Ownership-based access control
* Authorization Policies
* CORS
* Rate Limiting
* HTTPS
* Security Headers
* HSTS

Protected endpoints require proper authentication and authorization before allowing access to sensitive resources.

## 🏗️ Project Architecture

The project follows a layered structure:

src/
│
├── controllers/
│   └── Handle HTTP requests and responses
│
├── routes/
│   └── Define API endpoints and route protection
│
├── services/
│   └── Business logic and application operations
│
├── models/
│   └── Database schemas and data models
│
├── middleware/
│   └── Authentication, authorization, security and request processing
│
└── app.js
    └── Application configuration and server initialization
### Layer Responsibilities

Controllers

Responsible for handling HTTP requests, validating incoming data where required, calling the appropriate service, and returning responses.

Routes

Define API endpoints and connect them to controllers and middleware.

Services

Contain the main business logic of the application and keep business operations separate from HTTP-related code.

Models

Define the data structure and interact with MongoDB through the application's data models.

## 🧰 Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* REST API
* JavaScript

## 🔑 Authentication Flow

The API uses JWT-based authentication.

User Login
    ↓
Access Token + Refresh Token
    ↓
Authenticated Requests
    ↓
Access Token Expires
    ↓
Refresh Token
    ↓
New Access Token
Authorization is then applied to protected resources based on the authenticated user and their permissions/ownership.

## 🌐 Deployment

The API is deployed and available online.

Live API:
https://restaurant-ordering-api-pb80.onrender.com.

## ⚙️ Environment Variables

Create a .env file locally and configure the required environment variables.

MONGO_URI=your connection string
ACCESS_TOKEN_SECRET=some-super-long-random-secret
REFRESH_TOKEN_SECRET=another-super-long-random-secret
NODE_ENV=development
> Never commit your .env file or expose secrets in the repository.

## 📌 Purpose

This project was built as a practical backend project to apply concepts related to:

* RESTful API development
* Layered architecture
* Business logic separation
* Authentication and authorization
* Secure API design
* Database integration
* API deployment
* Backend development best practices

## 👨‍💻 Author

Tarek Alayoubi

Backend Developer
---