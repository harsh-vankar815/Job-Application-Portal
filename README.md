# Job Application Portal API

A simple **RESTful API** built with **Node.js** and **Express.js** that allows job candidates to register, log in, upload resumes, apply for job listings, and view their submitted applications.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Application/Resume Upload Notes](#applicationresume-upload-notes)
- [Environment Variables](#environment-variables)
- [Testing Job Application Portal API with Postman](#testing-job-application-portal-api-with-postman)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About

This API is designed for job seekers to easily manage job applications. Candidates can:

- Register and log in securely using JWT authentication.
- Upload resumes in PDF, DOC and DOCX format.
- Apply to predefined job listings [Added sample jobs for apply].
- Track their submitted applications.

---

## Features

- **User Authentication**
  - Secure registration and login with JWT.
  - Passwords hashed using bcrypt.
- **Resume Upload**
  - Handle file uploads using Multer.
  - Store resumes locally (or extend to cloud storage).
- **Job Applications**
  - Submit applications for sample jobs.
  - View all applications submitted by the logged-in user.
- **Sample Jobs**
  - Preloaded job listings for testing API endpoints.

---

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **File Uploads:** Multer locally / Cloudinary in production
- **Authentication:** JWT (JSON Web Tokens)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/job-application-portal.git
cd job-application-portal
```

2. **Install dependencies**

```npm i```
- This install all necessary packages which inclues: 
    - express → Web framework
    - mongoose → MongoDB ORM
    - bcrypt → Password hashing
    - jsonwebtoken → JWT authentication
    - multer → File uploads in development
    - cloudinary → File uploads in production
    - dotenv → Environment variables
    - morgan → Log requests in 'dev' format
    - helmet → Adds all default security headers
    - nodemon → Auto restart the server in development

3. **Setup MongoDB**
- You can use MongoDB Atlas (cloud) or local MongoDB

4. **Start the server**

- In production: ```npm start```
- In development: ```npm run dev```

---

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
# Server
PORT=5000

# MongoDB connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.kf3g8sd.mongodb.net/<DB_NAME>?retryWrites=true&w=majority&appName=Cluster0

# Node environment: development or production
NODE_ENV=development

# JWT secret for authentication
JWT_SECRET=<your_jwt_secret>

# Cloudinary configuration (for production file uploads) if you only give cloudinary_url is also work.
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
CLOUDINARY_KEY=<api_key>
CLOUDINARY_SECRET=<api_secret>
CLOUDINARY_NAME=<cloud_name>
```

## API endpoints

1. **Authentication: Register and Login**

| Method | Endpoint      | Description            | Body                                                                        |
| ------ | ------------- | ---------------------- | --------------------------------------------------------------------------- |
| POST   | /api/auth/register | Register a new user    | `{ "name": "John Doe", "email": "john@example.com", "password": "123456" }` |
| POST   | /api/auth/login    | Login user and get JWT | `{ "email": "john@example.com", "password": "123456" }`                     |

2. **Sample Jobs Data**
- A sample script is provided to insert 5 sample job listing into MongoDB,
run ```node seed/seedJobs.js``` this will add that sample data to mongoDB.

3. **Applications**
- This is in protected route so you need to provide token.

| Method | Endpoint          | Description                                       | Body                                                                    |
| ------ | ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| POST   | /api/applications | Submit a new job application (with resume upload) | Multipart/form-data: `jobId`, `coverLetter` (optional), `resume` (file) |
| GET    | /api/applications | Get all applications of logged-in user            | None                                                                    |

4. **Jobs**

| Method | Endpoint  | Description          | Body |
| ------ | --------- | -------------------- | ---- |
| GET    | /api/jobs | List all sample jobs | None |
| GET    | /api/jobs/:id | Get single job details | None |

---

## Application/Resume Upload Notes
- Development: resumes stored locally at /uploads/
- Production: resumes uploaded to Cloudinary (folder: resumes)
- Only PDF, DOC, DOCX files allowed

---

## Testing Job Application Portal API with Postman

This guide explains how to use Postman to test the Job Application Portal API.

---

This project includes a Postman collection with all tested APIs.

### Import Collection

1. Open Postman.
2. Click **File → Import**.
3. Select the file:  
   `postman/Job_Application_API.postman_collection.json`

### (Optional) Import Environment
If you want to use environment variables:
1. Go to **Environments** in Postman.
2. Click **Import**.
3. Select the file:  
   `postman/Job_Application_API.postman_environment.json`

### Available Requests
- Register User
- Login User
- List Jobs
- Submit Job Application (with resume upload)
- Get All Applications

## or if you want to do, own you can follow below content

### 1. Install Postman

- Download and install from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
- Open the app.

---

### 2. Create a new workspace/project

- Click **Workspaces → Create Workspace**
- Name it something like **Job Application Portal**

---

### 3. Create a new collection

- Collections let you group all API endpoints
- Click **New → Collection → Create Collection**
- Name it **Job Application API**

---

### 4. Add your endpoints

#### a. Register User (`POST /api/auth/register`)

1. Click **Add Request → Name: Register User**
2. Set **Method:** `POST`
3. Set **URL:** `http://localhost:5000/api/auth/register`
4. Go to **Body → Raw → JSON** and add:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

5. Click **Send**

6. You should see a **JSON** response with a success message or **JWT token**


#### b. Login User (`POST /api/auth/login`)

1. Click **Add New Request → Name: Login User**
2. Set **Method:** `POST`
3. Set **URL:** `http://localhost:5000/api/auth/login`
4. Go to **Body → Raw → JSON** and add:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

5. Click **Send**

6. Copy the returned **JWT token** for **protected routes**


#### c. Submit Application (`POST /api/applications`)

1. Click **Add New Request → Name: Submit Application**
2. Set **Method:** `POST`
3. Set **URL:** `http://localhost:5000/api/applications`
4. Go to **Headers → Add** and add:

```
Key: Authorization
Auth Type: Bearer Token
Token: <your_JWT_token>
```

4. Go to **Body → form-data** and add:

| Key         | Type | Value                                  |
| ----------- | ---- | -------------------------------------- |
| jobId       | Text | 12345                                  |
| coverLetter | Text | I am interested in this job (optional) |
| resume      | File | Select a PDF file                      |


5. Click **Send**

6. You should see a **JSON** response confirming the application


#### d. Get All Applications (`GET /api/applications`)

1. Click **Add New Request → Name: Submit Application**
2. Set **Method:** `GET`
3. Set **URL:** `http://localhost:5000/api/applications`
4. Go to **Headers → Add** and add:

```
Key: Authorization
Auth Type: Bearer Token
Token: <your_JWT_token>
```

5. Click **Send**

6. You’ll get a **list** of all **submitted applications**

#### e. Get Jobs (`GET /api/jobs`)

1. Click **Add New Request → Name: List Jobs**
2. Set **Method:** `GET`
3. Set **URL:** `http://localhost:5000/api/jobs`
5. Click **Send**
6. You’ll get all **sample jobs**

#### f. Get Jobs (`GET /api/jobs/:id`)

1. Click **Add New Request → Name: Get Specific Job**
2. Set **Method:** `GET`
3. Replace **/:id** to actual job id
3. Set **URL:** `http://localhost:5000/api/jobs/:id`
5. Click **Send**
6. You’ll get **specific job**

## Folder Structure

```bash
INTERVIEW_PROJECT/
├── config/                 # Configuration files
│   ├── cloudinary.js      # Cloudinary storage configuration
│   └── db.js              # Database connection settings
│
├── controllers/           # Route controllers
│   └── authController.js  # Authentication logic
│
├── middlewares/           # Custom middleware functions
│   ├── authMiddleware.js  # Authentication verification
│   └── upload.js          # File upload handling
│
├── models/                # Database models
│   ├── Application.js     # Job application schema
│   ├── Job.js            # Job posting schema
│   └── User.js           # User account schema
│ 
├── postman/               # for postmap api import
│   ├── Job_Application_API.postman_collection.json      # collection of all tested apis
│
├── routes/                # API route definitions
│   ├── applicationRoutes.js  # Application-related routes
│   ├── authRoutes.js     # Authentication routes
│   └── jobRoutes.js      # Job-related routes
│
├── seed/                  # Data seeding files
│   ├── jobs.json         # Sample job data
│   └── seedJobs.js       # Job seeding script
│
├── .env                  # Environment variables (not in github)
├── .env.example          # Environment variables examples
├── .gitignore           # Git ignore rules
├── package-lock.json    # NPM dependency lockfile
├── package.json         # Project dependencies and scripts
└── server.js            # Main application entry point
```
