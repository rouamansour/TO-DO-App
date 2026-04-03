# TO-DO App

A full-stack to-do application built with Next.js (frontend) and Node.js/Express (backend).

## Features
- User authentication (signup, signin, logout)
- Add, edit, delete, and list todos
- Set priority and due date for todos
- Protected routes (only authenticated users can manage their todos)

## Project Structure

```
client/           # Next.js frontend
  app/            # Main app pages and components
  components/     # Shared React components
  public/         # Static assets
  ...

server/           # Node.js/Express backend
  controllers/    # Route controllers
  models/         # Mongoose models
  routes/         # API routes
  middleware/     # Auth and error handling
  config/         # Database config
  ...
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### 1. Backend Setup

```
cd server
npm install
# Create a .env file with your MongoDB URI and JWT secret
npm start
```

#### Example `.env` file:
```
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 2. Frontend Setup

```
cd client
npm install
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST   /api/auth/signup`   — Register a new user
- `POST   /api/auth/signin`   — Login
- `POST   /api/auth/logout`   — Logout
- `GET    /api/todos`         — List all todos (auth required)
- `GET    /api/todos/:id`     — Get a single todo (auth required)
- `POST   /api/todos`         — Add a new todo (auth required)
- `PUT    /api/todos/:id`     — Update a todo (auth required)
- `DELETE /api/todos/:id`     — Delete a todo (auth required)

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT authentication
- `PORT` — Backend server port (default: 5000)

