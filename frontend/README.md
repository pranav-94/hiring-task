# React + TypeScript + Tailwind CSS + ShadCN

## Overview
This project is a React application built with TypeScript, utilizing Tailwind CSS for styling and ShadCN for component design. It provides a modern and responsive user interface.

## Features
- Type-safe components with TypeScript
- Responsive design using Tailwind CSS
- Pre-built components from ShadCN
- Fast Refresh for a smooth development experience

## Technologies Used
- **Language:** TypeScript
- **Framework:** React
- **Styling:** Tailwind CSS
- **Component Library:** ShadCN
- **Build Tool:** Vite

## Installation

### Prerequisites
- Node.js (version X.X.X)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-typescript-tailwind.git
   ```
2. Navigate to the project directory:
   ```bash
   cd frotend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm run dev
   ```

## Usage
Once the application is running, you can access it at `http://localhost:5173` (or the port specified in your Vite configuration).


## Testing
To run tests for the project, use:
```bash
npm test
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
- Thanks to the creators of Tailwind CSS, ShadCN, and Vite for their amazing tools and libraries.

## API Documentation

### Base URL
The base URL for the API is `http://localhost:3000/` (or the port specified in your server configuration).

### Endpoints

#### User Authentication

- **POST /signup**
  - **Description:** Create a new user.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - **201 Created**
      ```json
      {
        "msg": "User created",
        "data": {
          "id": "number",
          "username": "string"
        }
      }
      ```
    - **500 Internal Server Error**
      ```json
      {
        "msg": "Error creating user"
      }
      ```

- **POST /login**
  - **Description:** Log in a user and return a token.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - **200 OK**
      ```json
      {
        "msg": "Login successful",
        "token": "string",
        "userId": "number"
      }
      ```
    - **401 Unauthorized**
      ```json
      {
        "msg": "Invalid credentials"
      }
      ```
    - **500 Internal Server Error**
      ```json
      {
        "msg": "Error during login"
      }
      ```

#### Todo Management

- **POST /post**
  - **Description:** Create a new todo item.
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
    - **200 OK**
      ```json
      {
        "msg": "Todo created",
        "data": {
          // Todo item details
        }
      }
      ```
    - **500 Internal Server Error**
      ```json
      {
        "msg": "Error creating todo"
      }
      ```

- **GET /get**
  - **Description:** Retrieve todos for a specific user.
  - **Query Parameters:**
    - `userId`: The ID of the user.
  - **Response:**
    - **200 OK**
      ```json
      {
        "msg": "Todos found",
        "data": [
          // Array of todo items
        ]
      }
      ```
    - **500 Internal Server Error**
      ```json
      {
        "msg": "Error fetching todos"
      }
      ```

- **DELETE /delete**
  - **Description:** Delete a todo item.
  - **Request Body:**
    ```json
    {
      "id": "number",
      "userId": "number"
    }
    ```
  - **Response:**
    - **200 OK**
      ```json
      {
        "msg": "Todo deleted",
        "data": {
          // Deletion result
        }
      }
      ```
    - **400 Bad Request**
      ```json
      {
        "msg": "ID and userId are required"
      }
      ```
    - **404 Not Found**
      ```json
      {
        "msg": "Todo not found or not authorized to delete"
      }
      ```
    - **500 Internal Server Error**
      ```json
      {
        "msg": "Error deleting todo"
      }
      ```

- **PUT /update**
  - **Description:** Update an existing todo item.
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
    - **200 OK**
      ```json
      {
        "msg": "Todo updated",
        "data": {
          // Update result
        }
      }
      ```
    - **400 Bad Request**
      ```json
      {
        "msg": "ID and userId are required"
      }
      ```
    - **404 Not Found**
      ```json
      {
        "msg": "Todo not found or not authorized to update"
      }
      ```
    - **500 Internal Server Error**
      ```json
      {
        "msg": "Error updating todo"
      }
      ```
