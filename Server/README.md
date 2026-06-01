# 🖥️ Job Portal — Backend (Server)

A robust **RESTful API** built with **Node.js**, **Express.js**, and **MongoDB** for a full-featured Job Portal application. It handles authentication, job management, applications, results, complaints, feedback, and file uploads.

---

## 🚀 Tech Stack

| Technology   | Purpose                          |
|--------------|----------------------------------|
| Node.js      | JavaScript runtime               |
| Express.js   | Web framework / routing          |
| MongoDB       | NoSQL database                   |
| Mongoose     | ODM for MongoDB                  |
| JWT           | Authentication & authorization   |
| Bcryptjs     | Password hashing                 |
| Multer       | Resume / file uploads            |
| Nodemailer   | Email (forgot password)          |
| Dotenv       | Environment variable management  |
| CORS         | Cross-origin resource sharing    |

---

## 📁 Folder Structure

```
server/
├── src/
│   ├── app.js                  # Entry point — Express setup & routes
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middleware/
│   │   └── auth.middleware.js  # JWT token verification
│   ├── models/
│   │   ├── user.model.js
│   │   ├── job.model.js
│   │   ├── application.model.js
│   │   ├── result.model.js
│   │   ├── complain.model.js
│   │   ├── feedback.model.js
│   │   └── enquiry.model.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── job.controller.js
│   │   ├── application.controller.js
│   │   ├── result.controller.js
│   │   ├── complain.controller.js
│   │   ├── feedback.controller.js
│   │   └── admin.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   ├── result.routes.js
│   │   ├── complain.routes.js
│   │   ├── feedback.routes.js
│   │   └── admin.routes.js
│   └── utils/
│       ├── sendEmail.js        # Nodemailer helper
│       └── upload.js           # Multer config
├── uploads/
│   └── resumes/                # Uploaded resume files
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```bash
cp .env.example .env
```

Fill in your values:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
JWT_SECRET=your_jwt_secret_here
PORT=8080
FRONTEND_URL=http://localhost:5173

EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_USER=your@email.com
EMAIL_PASS=your_app_password
```

### 4. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:8080`

---

## 📡 API Endpoints

### 🔐 Auth — `/api/auth`
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/register`                 | Register new user        |
| POST   | `/login`                    | Login user               |
| POST   | `/forgot-password`          | Send password reset link |
| POST   | `/reset-password/:token`    | Reset password           |

### 👤 Users — `/api/users`
| Method | Endpoint         | Description              | Auth |
|--------|------------------|--------------------------|------|
| GET    | `/me`            | Get current user profile | ✅   |
| PUT    | `/me`            | Update profile + resume  | ✅   |
| POST   | `/enquiry`       | Submit enquiry           | ❌   |
| GET    | `/enquiries`     | Get all enquiries        | ❌   |
| DELETE | `/enquiry/:id`   | Delete enquiry           | ❌   |

### 💼 Jobs — `/api/jobs`
| Method | Endpoint   | Description       | Auth |
|--------|------------|-------------------|------|
| GET    | `/`        | Get all jobs      | ❌   |
| POST   | `/`        | Create job        | ❌   |
| PUT    | `/:id`     | Update job        | ❌   |
| DELETE | `/:id`     | Delete job        | ❌   |

### 📋 Applications — `/api/applications`
| Method | Endpoint         | Description                  | Auth |
|--------|------------------|------------------------------|------|
| POST   | `/`              | Apply for a job              | ❌   |
| GET    | `/my`            | Get my applications          | ❌   |
| GET    | `/all`           | Get all applications (admin) | ❌   |
| GET    | `/`              | Get applicants for a job     | ❌   |
| PUT    | `/:id/status`    | Update application status    | ❌   |
| DELETE | `/:id`           | Delete application           | ❌   |

### 📊 Results — `/api/results`
| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| PUT    | `/`                    | Create or update result |
| GET    | `/user/:jobSeekerId`   | Results by user         |
| GET    | `/:jobId`              | Results by job          |

### 📣 Complaints — `/api/complaints`
| Method | Endpoint  | Description             |
|--------|-----------|-------------------------|
| POST   | `/`       | Submit complaint        |
| GET    | `/`       | Get all complaints      |
| PUT    | `/:id`    | Update status           |
| DELETE | `/:id`    | Delete complaint        |

### 💬 Feedback — `/api/feedback`
| Method | Endpoint  | Description       | Auth |
|--------|-----------|-------------------|------|
| POST   | `/`       | Submit feedback   | ✅   |
| GET    | `/`       | Get all feedback  | ✅   |
| DELETE | `/:id`    | Delete feedback   | ✅   |

### 🛡️ Admin — `/api/admin`
| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/users`                  | Get all users            |
| GET    | `/jobseekers`             | Get all job seekers      |
| PATCH  | `/users/:id/status`       | Block / Approve user     |
| GET    | `/resume/:filename`       | Download resume          |

---

## 🗄️ Database Models

| Model       | Key Fields                                                    |
|-------------|---------------------------------------------------------------|
| User        | username, email, password, role, status, skills, resumeUrl   |
| Job         | title, company, location, qualification, experience, jobType |
| Application | jobId, jobSeekerId, status, resumeUrl, appliedAt             |
| Result      | jobId, jobSeekerId, status                                    |
| Complain    | subject, description, submittedBy, status                    |
| Feedback    | userId, role, message                                         |
| Enquiry     | name, email, number, message                                  |

---

## 🔒 Authentication Flow

```
User Logs In
    ↓
POST /api/auth/login
    ↓
Server verifies email + bcrypt password
    ↓
Returns JWT Token (expires in 1 day)
    ↓
Client stores token in localStorage
    ↓
Protected routes → send token in Authorization: Bearer <token>
    ↓
auth.middleware.js verifies token → attaches userId & role to req
```

---

## 🌱 Environment Variables

| Variable        | Description                        |
|-----------------|------------------------------------|
| `MONGO_URI`     | MongoDB connection string          |
| `JWT_SECRET`    | Secret key for JWT signing         |
| `PORT`          | Port to run server (default 8080)  |
| `FRONTEND_URL`  | Frontend URL for reset email link  |
| `EMAIL_HOST`    | SMTP host (e.g. smtp.zoho.com)     |
| `EMAIL_PORT`    | SMTP port (465 for SSL)            |
| `EMAIL_USER`    | Sender email address               |
| `EMAIL_PASS`    | Email app password                 |

---

## 👨‍💻 Author

**Dipanshu**
- GitHub: https://github.com/iamdipanshugupta
- LinkedIn: https://www.linkedin.com/in/dipanshu-kumar-sah-08302b331

---

## 📄 License

This project is licensed under the **ISC License**.