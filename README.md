# 🏋️‍♂️ FitStore

FitStore is a premium, full-stack fitness e-commerce platform designed for selling sports nutrition, supplements, and gym accessories. Built from the ground up using the **MERN** stack (MongoDB, Express, React, Node.js).

## ✨ Features

- **Sleek UI/UX**: Premium dark mode design with smooth page transitions using Framer Motion.
- **Secure Authentication**: Custom login and registration system using JSON Web Tokens (JWT) stored in HTTP-only cookies.
- **Product Management**: Full CRUD operations for products, including categories, reviews, and featured badging.
- **Shopping Cart**: Fully functional cart system embedded within the user profile for seamless cross-device syncing.
- **Order Processing**: Checkout flow with order tracking and history.
- **Admin Dashboard**: Specialized admin routes for managing users, products, orders, and viewing store revenue stats.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router 7, Framer Motion, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas) & Mongoose
- **Security**: bcryptjs (password hashing), express-validator, cookie-parser

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/FitStore.git
```

### 2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
COOKIE_EXPIRE=30
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Run the app (Development)
Open two terminal windows:

```bash
# Terminal 1: Run the backend server
cd backend
npm run dev

# Terminal 2: Run the React frontend
cd frontend
npm run dev
```

## 📸 Overview
FitStore offers a smooth, highly-optimized shopping experience. With its clean MVC backend architecture and decoupled React context state, the codebase is modular and easy to scale.
