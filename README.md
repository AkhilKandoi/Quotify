# Quotify

A full-stack web application with user authentication (signup/signin) and random philosopher quotes. Built using React, Express, MongoDB, and JWT.

Link: https://quotify-io.onrender.com/

## Features

- User Signup and Login (JWT Authentication)
- Protected Home Page (requires login)
- Random philosopher quotes from external API
- Responsive UI
- Form validation and error handling

## Tech Stack
- React
- CSS
- Express
- MongoDB

## Project Structure

- `/client` - Frontend of project.
- `/client/public` - Images related to project.
- `/client/src` - Main frontend related files.(e.g: App.jsx, Home.jsx)
- `/client/src/pages` - Code files for different routes.
- `/server` - Backend of project.
- `/server/models` - Schema for user info.
- `/server/routes` - API routes for Authentication.
- `/server/index.js` - Server file.

## How to Run Locally
1. Clone the Repository
```
git clone https://github.com/AkhilKandoi/Quotify.git
cd Quotify
```
2. Install Dependencies
```
For the Frontend:

cd client 
npm install

For the Backend:(in a new terminal or on root folder)

cd server
npm install
```

3. Set Environment variable
```
In the server folder, create a '.env' file and add:

JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string

In client folder, create  a '.env' file and add:

VITE_API_URL=your_server_url
```

4. Start the application
```
For Backend:

cd server
node index.js

For Frontend:

cd client
npm run dev
```

### License

This project is licensed under the MIT License.