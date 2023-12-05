# api-typescript-express

## Description
This project is a RESTful API developed with Node.js, Express, MongoDB, and TypeScript. It is a practical example designed to demonstrate and practice modern programming and API development concepts. The project includes features such as data modeling with Mongoose, password security with bcrypt, and a well-organized and scalable application architecture.

## Technologies
- **Node.js**: JavaScript runtime environment for creating server-side applications.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB, managing data schemas and interactions with the database.
- **TypeScript**: A superset of JavaScript that adds static typing, enhancing code maintenance and development.
- **bcrypt**: Library for hashing passwords, providing security for user information.

## Prerequisites
- Node.js (version 18.18.2 or higher)
- MongoDB installed and running on your system

## Installation
Clone the repository:
```javascript
git clone https://github.com/magura13/api-typescript-express
```

And install the dependencies:
```javascript
npm install
```

## Execution
To start the application, run:
```javascript
npm start
```

For development mode, with hot reload:
```javascript
npm run dev
```

## Project Structure
- `src/app.ts`: Entry point of the application, setting up the Express server.
- `src/models`: Contains the Mongoose data models.
- `.eslintrc.json`: ESLint configurations to ensure code quality.

## Features
- RESTful endpoints for CRUD operations.
- Authentication and validation middleware.
- Password security with bcrypt.
- Automatic timestamps for user records (createdAt and updatedAt).

## Testing
Run tests with the command:

## Contributions
Contributions are welcome.

## License
ISC
