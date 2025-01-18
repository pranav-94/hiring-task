# Practice Project

## Overview
This backend project is designed to provide a robust API for [describe the purpose, e.g., managing user data, handling transactions, etc.]. It is built using [insert technology stack, e.g., Node.js with Express, Python with Flask, etc.].

## Features
- User authentication and authorization
- CRUD operations for [specific resources, e.g., users, products]
- Integration with [any third-party services, e.g., payment gateways, external APIs]
- [Any other notable features]

## Technologies Used
- **Language:** Node.js
- **Framework:** Express
- **Database:** Postgres
- **Other tools:**  JWT for authentication

## Installation

### Prerequisites
- Node.js (version X.X.X)
- Postgres (or any other database you are using)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/pranav-94/hiring-task/.git
   
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
   
5. Set up environment variables:
   - Create a `.env` file and add the necessary variables (e.g., database connection string, JWT secret).

6. Run the application:
   ```bash
   npx nodemon src/index.ts
   ```

## API Documentation

### Todo Endpoints
- `POST /api/post` - Create a new todo.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "string",
      "userId": "number"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "Todo created",
      "data": { /* todo object */ }
    }
    ```

- `GET /api/get` - Retrieve todos for a specific user.
  - **Query Parameters:**
    - `userId`: The ID of the user.
  - **Response:**
    ```json
    {
      "msg": "Todos found",
      "data": [ /* array of todo objects */ ]
    }
    ```

- `DELETE /api/delete` - Delete a specific todo.
  - **Request Body:**
    ```json
    {
      "id": "number",
      "userId": "number"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "Todo deleted",
      "data": { /* result object */ }
    }
    ```

- `PUT /api/update` - Update a specific todo.
  - **Request Body:**
    ```json
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "string",
      "userId": "number"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "Todo updated",
      "data": { /* result object */ }
    }
    ```

### Authentication Endpoints
- `POST /api/signup` - Create a new user account.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "User created",
      "data": { "id": "number", "username": "string" }
    }
    ```

- `POST /api/login` - Log in a user.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "Login successful",
      "token": "string",
      "userId": "number"
    }
    ```

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to [any resources, libraries, or individuals you want to thank or mention].