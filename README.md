# 🏢 Jobify — Full Stack Job Portal

A complete **Full Stack Job Portal** built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. The platform supports three kinds of users — **public visitors**, **job seekers**, and **admins** — each with their own protected interface.

> 🔗 **Live Demo:** https://job-project-one.vercel.app
> 📁 **GitHub:** https://github.com/iamdipanshugupta/JobProject

---

## ✨ Features Overview

### 🌐 Public
- Browse and filter live jobs without logging in (keyword, location, category, job type)
- Submit enquiries / contact form
- View services and image gallery

### 👤 Job Seeker
- Register & log in with JWT authentication
- Maintain a profile — qualifications, experience, skills, resume
- Search and filter jobs; see full job detail (company, location, **salary**, category) before applying
- Apply for jobs with a resume and optional cover letter
- Track application status through a visual pipeline (Applied → Shortlisted → Selected/Rejected)
- Submit feedback and complaints

### 🛡️ Admin
- Dashboard with live stats (jobs, applications, complaints, feedback, users) and a real recent-activity feed
- Manage jobs — create, edit, delete, with salary and category
- Review applications: shortlist, select, or reject candidates; download resumes; read cover letters
- Declare final results per job (writes to the same record job seekers see — not a separate disconnected list)
- Approve / block job seekers and users
- Manage complaints, feedback, and enquiries
- Every admin-only endpoint requires a valid admin JWT — nothing sensitive is exposed publicly

---

## 🚀 Tech Stack

### Frontend
| Technology       | Purpose                     |
|-------------------|------------------------------|
| React.js 18       | UI library                   |
| React Router v6   | Routing & protected routes    |
| Axios / fetch     | API calls                     |
| Tailwind CSS 4    | Styling                       |
| DaisyUI           | UI components                 |
| Framer Motion     | Animations                    |
| React Hot Toast   | Notifications                 |
| React Icons / Lucide | Icons                       |
| Vite              | Build tool                    |

### Backend
| Technology   | Purpose                       |
|--------------|----------------------------------|
| Node.js      | JavaScript runtime                |
| Express.js   | Web framework                     |
| MongoDB      | Database                          |
| Mongoose     | ODM                                |
| JWT          | Authentication & role-based access|
| Bcryptjs     | Password hashing                  |
| Multer       | Resume uploads                    |
| Brevo API    | Password-reset emails             |

---

## 📁 Project Structure

```
JobProject/
│
├── 📂 Server/                          # Backend (Node.js + Express)
│   ├── index.js                        # Entry point — routes, error handling
│   ├── config/db.js
│   ├── middleware/auth.middleware.js   # verifyToken + isAdmin
│   ├── models/                         # user, job, application, result, complain, feedback, enquiry
│   ├── controllers/
│   ├── routes/                         # auth, user, job, application, result, complain, feedback, admin, jobseeker
│   ├── scripts/                        # createAdmin.js, hashPasswords.js
│   ├── utils/                          # sendEmail.js (Brevo), upload.js (Multer)
│   ├── uploads/resumes/
│   └── .env.example
│
└── 📂 FrontEnd/                        # Frontend (React.js + Vite)
    ├── src/
    │   ├── App.jsx                     # Root routes + ProtectedRoute
    │   ├── config/api.js                # API_BASE_URL
    │   ├── utils/                       # auth.js, usePagination.js
    │   ├── componants/                  # NavBar, Footer, AdminSidebar, AdminNavbar, Pagination, Testimonials
    │   ├── Layouts/                     # PublicLayout, AdminLayout, JobSeekerLayout
    │   ├── pages/                       # Home, Services, Enquiry, Imagegallery, Viewjob, Login, Register, ForgotPassword, ResetPassword
    │   ├── Admin/                       # Dashboard, JobManagement, ResultManagement, ManageApplications, ...
    │   └── JobSeeker/                   # Dashboard, SearchJob, ApplyJob, Profile, Results, Feedback, Complain
    └── .env.example
```

See `Server/README.md` and `FrontEnd/README.md` for full endpoint and route references.

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- A MongoDB connection string (Atlas or local)
- A Brevo account + API key (for password-reset emails)

### 1. Clone the repo
```bash
git clone https://github.com/iamdipanshugupta/JobProject.git
cd JobProject
```

### 2. Backend
```bash
cd Server
npm install
cp .env.example .env
```
Fill in `.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
CLIENT_URL=http://localhost:5173
BREVO_API_KEY=your_brevo_api_key
BREVO_FROM_EMAIL=your_sender_email
BREVO_FROM_NAME=your_sender_name
```
```bash
node index.js       # Starts on http://localhost:8080
```

### 3. Frontend
```bash
cd ../FrontEnd
npm install
cp .env.example .env
```
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080/api
```
```bash
npm run dev          # Starts on http://localhost:5173
```

---

## 🔐 Security Model (summary)

- **Public by design:** browsing jobs, submitting an enquiry or complaint, login/register/password-reset.
- **Authenticated (any logged-in user):** viewing/editing your own profile, applying for a job, viewing your own applications, submitting feedback.
- **Admin-only:** creating/editing/deleting jobs, viewing all users/applications/complaints/feedback, changing application status, downloading resumes.
- **Identity is never trusted from the client.** Actions like "apply for a job" or "view my applications" resolve the job seeker's identity from their verified JWT server-side — a request cannot act on behalf of a different user by passing a different ID.
- All errors are returned as JSON (`{ success, message }`) via a global error handler — never an HTML error page.

---

## 🚢 Deployment

### Frontend → Vercel / Netlify
```bash
cd FrontEnd
npm run build      # outputs dist/
```
Set `VITE_API_BASE_URL` to your deployed backend URL in the hosting provider's environment variables before building.

### Backend → Render / Railway
- Root directory: `Server/`
- Start command: `node index.js`
- Set all `.env` variables (see above) in the hosting dashboard.
- Note: on many free-tier hosts the filesystem is **ephemeral** — uploaded resumes in `uploads/resumes/` will be lost on redeploy/restart. For production use, move resume storage to a persistent service (e.g. Cloudinary, S3) rather than local disk.

> After deploying the backend, update `VITE_API_BASE_URL` in the frontend's environment and rebuild/redeploy.

---

## 🗺️ Full Route Map

| Route                       | Access       | Page                    |
|------------------------------|--------------|--------------------------|
| `/`                          | Public       | Home                     |
| `/services`                  | Public       | Services                 |
| `/enquiry`                   | Public       | Enquiry Form             |
| `/imagegallery`               | Public       | Image Gallery            |
| `/viewjob`                    | Public       | Browse Jobs              |
| `/login`                      | Public       | Login                    |
| `/register`                   | Public       | Register                 |
| `/forgot-password`            | Public       | Forgot Password          |
| `/reset-password/:token`      | Public       | Reset Password           |
| `/admin/dashboard`            | Admin only   | Dashboard                |
| `/admin/jobs`                 | Admin only   | Job Management           |
| `/admin/applications`         | Admin only   | Manage Applications      |
| `/admin/results`              | Admin only   | Result Management        |
| `/admin/jobseekers`           | Admin only   | Job Seeker Management    |
| `/admin/complaints`           | Admin only   | Complaint Management     |
| `/admin/feedback`             | Admin only   | Feedback Management      |
| `/admin/enquiries`            | Admin only   | Enquiry Management       |
| `/admin/login-info`           | Admin only   | Login Info (Users)       |
| `/admin/users`                | Admin only   | Admin Users              |
| `/jobseeker/dashboard`        | Seeker only  | Dashboard                |
| `/jobseeker/search-job`       | Seeker only  | Search Jobs              |
| `/jobseeker/apply-job`        | Seeker only  | Apply For Job            |
| `/jobseeker/profile`          | Seeker only  | My Profile               |
| `/jobseeker/results`          | Seeker only  | View Results             |
| `/jobseeker/feedback`         | Seeker only  | Submit Feedback          |
| `/jobseeker/complain`         | Seeker only  | Submit Complaint         |

---

## 👨‍💻 Author

**Dipanshu**
- 🐙 GitHub: https://github.com/iamdipanshugupta
- 💼 LinkedIn: https://www.linkedin.com/in/dipanshu-kumar-sah-08302b331/

## 📄 License

ISC License — free to use and modify.

---

> ⭐ If you found this project helpful, please give it a star on GitHub!