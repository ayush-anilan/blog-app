
# Blog App 📝

A full-stack blog application built with MERN Stack (MongoDB, Express.js, React.js, Node.js). Users can create, read, update, and delete blog posts with authentication and cloud storage support.


## Features

- **✅ User Authentication (JWT)**
- **✅ Create, Read, Update, Delete (CRUD) for blog posts**
- **✅ Comment System**
- **✅ Image Upload (Cloudinary)**
- **✅ Responsive UI**:


## Tech Stack

#### Frontend
- __React.js__
- __Tailwind CSS__
- __Axios__
- __Vercel (Hosting)__

#### Backend
- __Node.js__
- __Express.js__
- __MongoDB + Mongoose__
- __Cloudinary (Image Upload)__
- __Passport.js (Authentication)__
- __Render (Hosting)__

## Installation
To set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ayush-anilan/blog-app.git
2. Install dependencies:
    #### Start Backend & Frontend
   ```bash
   cd server
   npm install

   cd client
   npm install

3. Setup Environment Variables:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
4. Run the Application Locally:
   ```bash
   cd server
   npm start

   cd client
   npm run dev

The application will be accessible at http://localhost:5173.

## Live Preview:
https://blog-app-seven-chi-35.vercel.app/





