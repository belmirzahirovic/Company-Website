# Company Portfolio Website

This project is a modern, React-based company portfolio website with a Node.js backend. It showcases company services, completed projects, and provides a contact form for potential clients. The site includes an admin panel for managing project content.

## Features

### Public Pages

1. **Modern, Responsive Design**
   - Sleek, minimalist aesthetic
   - Fully responsive layout for optimal viewing on all devices

2. **Services Showcase**
   - Detailed presentation of company services
   - Interactive service cards with flip animation

3. **Project Portfolio**
   - Grid layout displaying completed projects
   - Each project card shows:
     - Project title
     - Brief description
     - Location
     - Client name
     - Completion date
     - Project size
   - Image gallery for each project
   - Lightbox feature for full-screen image viewing

4. **Contact Form**
   - Direct communication channel for potential clients
   - Form submissions sent to a dedicated company email

5. **Smooth Scrolling Navigation**
   - Easy navigation between different sections of the website

### Admin Panel

The admin panel provides a secure interface for managing website content, accessible only to authenticated administrators. Key features include:

1. **Secure Authentication**
   - JWT-based authentication system
   - Protected routes accessible only to logged-in admin users

2. **Project Management**
   - Create new projects
   - Edit existing project details
   - Delete projects from the portfolio
   - Upload and manage project images

3. **Content Editing**
   - Add, edit, or remove project details:
     - Title
     - Description
     - Location
     - Client
     - Completion date
     - Project size
   - Reorder projects in the portfolio

4. **Image Handling**
   - Upload multiple images for each project
   - Set a main image for project thumbnails
   - Delete or replace existing project images

5. **User-Friendly Interface**
   - Intuitive dashboard for easy content management
   - Real-time preview of changes

6. **Data Validation**
   - Form validation to ensure data integrity
   - Error handling and success messages for admin actions

7. **Responsive Design**
   - Admin panel is fully responsive, allowing for content management on various devices

### Security Features

1. **Environment Variable Management**
   - Sensitive information stored in `.env` file
   - Excluded from version control for enhanced security

2. **Secure Password Storage**
   - Admin passwords hashed before storage in the database

3. **CORS Configuration**
   - Configured to accept requests only from authorized origins

4. **JWT Token Expiration**
   - Automatically log out inactive admin users after a set period

## Technology Stack

- Frontend: React, Redux
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - In the `backend` folder, create a `.env` file based on the `.env.example` file.
   - Fill in your specific details (database URI, JWT secret, etc.)

4. Set up the admin account:
   - First, ensure any existing admin accounts are removed:
     ```
     node deleteAdmin.js
     ```
   - Then, create a new admin account:
     ```
     node createAdmin.js
     ```
   - After successful creation, secure or remove the `createAdmin.js` and `deleteAdmin.js` scripts to prevent unauthorized admin creation.

5. Start the backend server:
   ```
   npm start
   ```

6. In a new terminal, start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```

The application should now be running on `http://localhost:3000` with the backend on `http://localhost:5001`.

## Environment Variables

The following environment variables need to be set in your `.env` file:

- `PORT`: The port number for the backend server (default: 5001)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation
- `ADMIN_USERNAME`: Username for the admin account
- `ADMIN_PASSWORD`: Password for the admin account

Example:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

## Admin Setup

To set up the admin account:

1. Ensure your `.env` file has `ADMIN_USERNAME` and `ADMIN_PASSWORD` set.
2. Run `node deleteAdmin.js` to remove any existing admin accounts.
3. Run `node createAdmin.js` to create a new admin account with the credentials from your `.env` file.
4. After successful creation, secure or remove these scripts to prevent unauthorized admin creation.
