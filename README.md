# 🏢 Job Portal — Full Stack Web Application

A complete **Full Stack Job Portal** built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. The platform supports three types of users — **Public visitors**, **Job Seekers**, and **Admins** — each with their own dedicated interface and features.

> 🔗 **Live Demo:** [your-live-url.com](https://your-live-url.com) &nbsp;|&nbsp; 📁 **GitHub:** [github.com/your-username/job-portal](https://github.com/your-username/job-portal)

---

## ✨ Features Overview

### 🌐 Public
- Browse available jobs without logging in
- Submit enquiries / contact form
- View image gallery and services

### 👤 Job Seeker
- Register & login with secure JWT authentication
- Upload resume during registration
- Search and filter jobs by location, type, qualification
- Apply for jobs with cover letter
- Track application status
- View declared results
- Submit feedback and complaints

### 🛡️ Admin
- Full dashboard with stats overview
- Manage jobs (create, edit, delete)
- Review and update application statuses
- Declare job results per candidate
- Block / approve job seekers
- Manage complaints and feedback
- View user login history
- Handle enquiries

---

## 🚀 Tech Stack

### Frontend
| Technology        | Purpose                          |
|-------------------|----------------------------------|
| React.js 18       | UI library                       |
| React Router v6   | Routing & protected routes       |
| Axios             | API calls                        |
| Tailwind CSS      | Styling                          |
| DaisyUI           | UI components                    |
| Framer Motion     | Animations                       |
| React Hot Toast   | Notifications                    |
| Vite              | Build tool                       |

### Backend
| Technology   | Purpose                          |
|--------------|----------------------------------|
| Node.js      | JavaScript runtime               |
| Express.js   | Web framework                    |
| MongoDB       | Database                         |
| Mongoose     | ODM                              |
| JWT           | Authentication                   |
| Bcryptjs     | Password hashing                 |
| Multer       | File uploads (resumes)           |
| Nodemailer   | Password reset emails            |

---

## 📁 Project Structure

```
job-portal/
│
├── 📂 server/                         # Backend (Node.js + Express)
│   ├── src/
│   │   ├── app.js                     # Entry point
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.middleware.js     # JWT verification
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── job.model.js
│   │   │   ├── application.model.js
│   │   │   ├── result.model.js
│   │   │   ├── complain.model.js
│   │   │   ├── feedback.model.js
│   │   │   └── enquiry.model.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── job.controller.js
│   │   │   ├── application.controller.js
│   │   │   ├── result.controller.js
│   │   │   ├── complain.controller.js
│   │   │   ├── feedback.controller.js
│   │   │   └── admin.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── job.routes.js
│   │   │   ├── application.routes.js
│   │   │   ├── result.routes.js
│   │   │   ├── complain.routes.js
│   │   │   ├── feedback.routes.js
│   │   │   └── admin.routes.js
│   │   └── utils/
│   │       ├── sendEmail.js
│   │       └── upload.js
│   ├── uploads/resumes/
│   ├── .env.example
│   └── package.json
│
└── 📂 frontend/                       # Frontend (React.js + Vite)
    ├── src/
    │   ├── App.jsx                    # Root routes + ProtectedRoute
    │   ├── main.jsx
    │   ├── config/
    │   │   └── api.js                 # API base URL config
    │   ├── utils/
    │   │   └── auth.js                # Auth localStorage helpers
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── PublicLayout.jsx
    │   │   │   ├── AdminLayout.jsx
    │   │   │   └── JobSeekerLayout.jsx
    │   │   ├── common/
    │   │   │   ├── NavBar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   └── Testimonials.jsx
    │   │   ├── admin/
    │   │   │   ├── AdminSidebar.jsx
    │   │   │   └── AdminNavbar.jsx
    │   │   └── jobseeker/
    │   │       ├── JobSeekerSidebar.jsx
    │   │       └── JobSeekerNavbar.jsx
    │   └── pages/
    │       ├── auth/          Login, Register, ForgotPassword, ResetPassword
    │       ├── public/        Home, Services, Enquiry, ImageGallery, ViewJob
    │       ├── admin/         Dashboard, Jobs, Results, Feedback, Complaints...
    │       └── jobseeker/     Dashboard, SearchJob, ApplyJob, Results, Feedback...
    └── package.json
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm

---

### 1. Clone the repo
```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
```

---

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
JWT_SECRET=your_secret_key
PORT=8080
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_USER=your@email.com
EMAIL_PASS=your_app_password
```

```bash
npm run dev        # Starts on http://localhost:8080
```

---

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev        # Starts on http://localhost:5173
```

---

## 📡 API Reference

### 🔐 Auth — `/api/auth`
| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/register`              | Register new user        |
| POST   | `/login`                 | Login                    |
| POST   | `/forgot-password`       | Send reset email         |
| POST   | `/reset-password/:token` | Reset password           |

### 💼 Jobs — `/api/jobs`
| Method | Endpoint | Description          |
|--------|----------|----------------------|
| GET    | `/`      | Get all jobs (filter)|
| POST   | `/`      | Create job           |
| PUT    | `/:id`   | Update job           |
| DELETE | `/:id`   | Delete job           |

### 📋 Applications — `/api/applications`
| Method | Endpoint      | Description               |
|--------|---------------|---------------------------|
| POST   | `/`           | Apply for job             |
| GET    | `/my`         | My applications           |
| GET    | `/all`        | All applications (admin)  |
| PUT    | `/:id/status` | Update status (admin)     |
| DELETE | `/:id`        | Delete application        |

### 📊 Results — `/api/results`
| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| PUT    | `/`                  | Create/update result|
| GET    | `/user/:id`          | Results by user     |
| GET    | `/:jobId`            | Results by job      |

### 🛡️ Admin — `/api/admin`
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/users`              | All users            |
| GET    | `/jobseekers`         | All job seekers      |
| PATCH  | `/users/:id/status`   | Block / approve user |
| GET    | `/resume/:filename`   | Download resume      |

---

## 🗄️ Database Schema Summary

```
User         → username, email, password, role, status, skills, resumeUrl, jobId
Job          → title, company, location, qualification, experience, jobType
Application  → jobId (ref), jobSeekerId (ref), status, resumeUrl, appliedAt
Result       → jobId (ref), jobSeekerId (ref), status
Complain     → subject, description, submittedBy, status
Feedback     → userId (ref), role, message
Enquiry      → name, email, number, message
```

---

## 🔐 Auth Flow

```
Login (/api/auth/login)
    ↓
Verify email + bcrypt password check
    ↓
Return JWT token (1 day expiry) + user object
    ↓
Frontend saves token + role to localStorage
    ↓
ProtectedRoute checks role in App.jsx
    ↓
Admin  → /admin/dashboard
Seeker → /jobseeker/dashboard
    ↓
API calls include: Authorization: Bearer <token>
    ↓
auth.middleware.js verifies token on protected routes
```

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Connect GitHub repo to Vercel — auto deploys
```

### Backend → Render / Railway
```bash
# Set all .env variables in dashboard
# Start command: npm start
# Root directory: server/
```

> ⚠️ After deploying backend, update `src/config/api.js` in frontend with your live API URL.

---

## 🗺️ Frontend Route Map

| Route                     | Access       | Page                    |
|---------------------------|--------------|-------------------------|
| `/`                       | Public       | Home                    |
| `/services`               | Public       | Services                |
| `/enquiry`                | Public       | Enquiry Form            |
| `/viewjob`                | Public       | Browse Jobs             |
| `/login`                  | Public       | Login                   |
| `/register`               | Public       | Register                |
| `/forgot-password`        | Public       | Forgot Password         |
| `/reset-password/:token`  | Public       | Reset Password          |
| `/admin/dashboard`        | Admin only   | Admin Dashboard         |
| `/admin/jobs`             | Admin only   | Job Management          |
| `/admin/applications`     | Admin only   | Manage Applications     |
| `/admin/results`          | Admin only   | Result Management       |
| `/admin/jobseekers`       | Admin only   | Job Seeker Management   |
| `/admin/complaints`       | Admin only   | Complaint Management    |
| `/admin/feedback`         | Admin only   | Feedback Management     |
| `/admin/enquiries`        | Admin only   | Enquiry Management      |
| `/jobseeker/dashboard`    | Seeker only  | Dashboard               |
| `/jobseeker/search-job`   | Seeker only  | Search Jobs             |
| `/jobseeker/apply-job`    | Seeker only  | Apply For Job           |
| `/jobseeker/results`      | Seeker only  | View Results            |
| `/jobseeker/feedback`     | Seeker only  | Submit Feedback         |
| `/jobseeker/complain`     | Seeker only  | Submit Complaint        |

---

## 👨‍💻 Author

**Dipanshu**
- 🐙 GitHub: https://github.com/iamdipanshugupta
- 💼 LinkedIn: https://www.linkedin.com/in/dipanshu-kumar-sah-08302b331/
- 📧 Email: kumardipanshu983542@gmail.com

---

## 📄 License

This project is licensed under the **ISC License** — free to use and modify.

---

> ⭐ If you found this project helpful, please give it a star on GitHub!