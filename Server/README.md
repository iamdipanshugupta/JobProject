# 🖥️ Jobify — Backend (Server)

A **RESTful API** built with **Node.js**, **Express.js**, and **MongoDB** powering the Jobify job portal — authentication, job management, applications, results, complaints, feedback, and resume uploads, all with role-based access control.

---

## 🚀 Tech Stack

| Technology   | Purpose                              |
|--------------|---------------------------------------|
| Node.js      | JavaScript runtime                    |
| Express.js   | Web framework / routing               |
| MongoDB      | NoSQL database                        |
| Mongoose     | ODM for MongoDB                       |
| JWT          | Authentication & authorization        |
| Bcryptjs     | Password hashing                      |
| Multer       | Resume / file uploads                 |
| Brevo API    | Transactional email (password reset)  |
| Dotenv       | Environment variable management       |
| CORS         | Cross-origin resource sharing         |

> Password-reset emails are sent via the **Brevo HTTP API** (`utils/sendEmail.js`), not SMTP/Nodemailer.

---

## 📁 Folder Structure (actual)

```
Server/
├── index.js                      # Entry point — Express setup, route mounting, error handling
├── config/
│   └── db.js                     # MongoDB connection
├── middleware/
│   └── auth.middleware.js        # verifyToken (JWT check) + isAdmin (role check)
├── models/
│   ├── user.model.js
│   ├── job.model.js              # includes salary and category fields
│   ├── application.model.js
│   ├── result.model.js
│   ├── complain.model.js
│   ├── feedback.model.js
│   ├── enquiry.model.js
│   └── JobSeeker.model.js
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── job.controller.js
│   ├── application.controller.js # identity for apply/my-applications comes from the verified JWT
│   ├── result.controller.js
│   ├── complaint.controller.js
│   ├── feedbackController.js
│   └── admin.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── job.routes.js
│   ├── application.routes.js
│   ├── result.routes.js
│   ├── complain.routes.js        # note: file is complain.routes.js (matches index.js import)
│   ├── feedback.routes.js
│   ├── admin.routes.js
│   └── jobseeker.routes.js
├── scripts/
│   ├── createAdmin.js            # one-off script to seed an admin account
│   └── hashPasswords.js          # one-off migration script
├── utils/
│   ├── sendEmail.js              # Brevo API email helper
│   └── upload.js                 # Multer config — absolute path, auto-creates uploads/resumes/
├── uploads/
│   └── resumes/                  # Uploaded resume files (created automatically if missing)
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Navigate to the server folder
```bash
cd Server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env`
```bash
cp .env.example .env
```
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
CLIENT_URL=http://localhost:5173

BREVO_API_KEY=your_brevo_api_key
BREVO_FROM_EMAIL=your_sender_email
BREVO_FROM_NAME=your_sender_name
```

### 4. Run the server
```bash
npm run dev     # development (if a dev script is configured)
node index.js   # or run directly
```
Server runs at: `http://localhost:8080`

---

## 📡 API Endpoints

All protected endpoints require an `Authorization: Bearer <token>` header. **Admin** endpoints additionally require the token's role to be `admin`.

### 🔐 Auth — `/api/auth`
| Method | Endpoint                  | Description               | Auth |
|--------|----------------------------|---------------------------|:----:|
| POST   | `/register`                | Register new user         | ❌   |
| POST   | `/login`                   | Login user                | ❌   |
| POST   | `/forgot-password`         | Send password reset email | ❌   |
| POST   | `/reset-password/:token`   | Reset password             | ❌   |

### 👤 Users — `/api/users`
| Method | Endpoint        | Description                          | Auth        |
|--------|-----------------|---------------------------------------|:-----------:|
| GET    | `/me`           | Get current user profile              | ✅          |
| PUT    | `/me`           | Update profile + resume               | ✅          |
| POST   | `/enquiry`      | Submit an enquiry                     | ❌ (public) |
| GET    | `/enquiries`    | Get all enquiries                     | ✅ Admin    |
| DELETE | `/enquiry/:id`  | Delete an enquiry                     | ✅ Admin    |

### 💼 Jobs — `/api/jobs`
| Method | Endpoint | Description   | Auth        |
|--------|----------|---------------|:-----------:|
| GET    | `/`      | Get all jobs  | ❌ (public) |
| POST   | `/`      | Create job    | ✅ Admin    |
| PUT    | `/:id`   | Update job    | ✅ Admin    |
| DELETE | `/:id`   | Delete job    | ✅ Admin    |

### 👷 Job Seekers — `/api/jobseekers`
| Method | Endpoint       | Description                   | Auth      |
|--------|----------------|--------------------------------|:---------:|
| GET    | `/`            | Get all job seekers            | ✅ Admin  |
| PUT    | `/:id/status`  | Toggle Approved / Blocked      | ✅ Admin  |

### 📋 Applications — `/api/applications`
| Method | Endpoint         | Description                                              | Auth       |
|--------|------------------|-----------------------------------------------------------|:----------:|
| POST   | `/`              | Apply for a job (job seeker identity from JWT, not body)  | ✅         |
| GET    | `/my`            | Get my own applications (identity from JWT)               | ✅         |
| GET    | `/all`           | Get all applications                                       | ✅ Admin   |
| GET    | `/?jobId=`       | Get applicants for a specific job                          | ✅ Admin   |
| PUT    | `/:id/status`    | Update application status (applied/shortlisted/selected/rejected) | ✅ Admin |
| DELETE | `/:id`           | Delete an application                                       | ✅ Admin   |

### 📊 Results — `/api/results`
| Method | Endpoint               | Description               | Auth      |
|--------|------------------------|-----------------------------|:---------:|
| PUT    | `/`                    | Create or update a result   | ✅ Admin  |
| GET    | `/user/:jobSeekerId`   | Results by user              | ✅ Admin  |
| GET    | `/:jobId`              | Results by job                | ✅ Admin  |

> ⚠️ The job seeker's own "View Results" page reads status from **Application.status** (via `/api/applications/my`), not from this `Result` collection — this endpoint set exists for supplementary admin record-keeping.

### 📣 Complaints — `/api/complaints` *(mounted from `routes/complain.routes.js`)*
| Method | Endpoint  | Description         | Auth        |
|--------|-----------|----------------------|:-----------:|
| POST   | `/`       | Submit a complaint   | ❌ (public) |
| GET    | `/`       | Get all complaints   | ✅ Admin    |
| PUT    | `/:id`    | Update status        | ✅ Admin    |
| DELETE | `/:id`    | Delete complaint     | ✅ Admin    |

### 💬 Feedback — `/api/feedback`
| Method | Endpoint  | Description       | Auth      |
|--------|-----------|--------------------|:---------:|
| POST   | `/`       | Submit feedback     | ✅        |
| GET    | `/`       | Get all feedback    | ✅ Admin  |
| DELETE | `/:id`    | Delete feedback     | ✅ Admin  |

### 🛡️ Admin — `/api/admin`
| Method | Endpoint                 | Description           | Auth      |
|--------|---------------------------|------------------------|:---------:|
| GET    | `/users`                  | Get all users          | ✅ Admin  |
| GET    | `/jobseekers`             | Get all job seekers    | ✅ Admin  |
| PATCH  | `/users/:id/status`       | Block / Approve user   | ✅ Admin  |
| GET    | `/resume/:filename`       | Download a resume      | ✅ Admin  |

---

## 🗄️ Database Models

| Model       | Key Fields                                                                 |
|-------------|------------------------------------------------------------------------------|
| User        | username, email, password, role, status, mobile, qualification, institute, experience, skills, resumeUrl |
| Job         | title, company, location, **salary**, **category**, qualification, experience, jobType, description |
| Application | jobId (ref), jobSeekerId (ref), status, resumeUrl, coverLetter, appliedAt   |
| Result      | jobId (ref), jobSeekerId (ref), status                                      |
| Complain    | subject, description, submittedBy, status                                   |
| Feedback    | userId (ref), role, message                                                 |
| Enquiry     | name, email, number, message                                                |

`Job.category` enum: `IT & Software`, `Design`, `Marketing`, `Business`, `Engineering`, `Education`, `Other`.
`Application.status` enum: `applied`, `shortlisted`, `selected`, `rejected`.

---

## 🔒 Authentication & Security Notes

```
Login → POST /api/auth/login
    ↓
Server verifies email + bcrypt password
    ↓
Returns JWT (role + user id encoded)
    ↓
Client sends: Authorization: Bearer <token> on every protected request
    ↓
auth.middleware.js → verifyToken attaches req.userId & req.userRole
    ↓
isAdmin middleware blocks non-admin roles on admin-only routes
```

Key hardening applied to this API:
- **All create/update/delete and listing endpoints that expose other users' data require `verifyToken` (+ `isAdmin` where appropriate).** Only job browsing, complaint/enquiry submission, and auth endpoints are public by design.
- **Identity for sensitive actions is derived from the verified JWT (`req.userId`), never from a client-supplied field** — a job seeker cannot apply as, or view the applications of, another user by supplying a different ID.
- A global JSON error handler and 404 handler are registered last in `index.js`, so failures always return `{ success: false, message }` instead of an HTML error page.
- Resume uploads use an absolute path (independent of the process's working directory) and auto-create `uploads/resumes/` if missing, with a 5MB size limit and PDF/DOC/DOCX-only filter.

---

## 🌱 Environment Variables

| Variable            | Description                              |
|----------------------|--------------------------------------------|
| `MONGO_URI`          | MongoDB connection string                  |
| `JWT_SECRET`         | Secret key for JWT signing                 |
| `PORT`               | Port to run server (default 8080)          |
| `CLIENT_URL`         | Frontend URL (used for CORS + email links) |
| `BREVO_API_KEY`      | Brevo transactional email API key          |
| `BREVO_FROM_EMAIL`   | Sender email address                       |
| `BREVO_FROM_NAME`    | Sender display name                        |

---

## 👨‍💻 Author

**Dipanshu**
- GitHub: https://github.com/iamdipanshugupta
- LinkedIn: https://www.linkedin.com/in/dipanshu-kumar-sah-08302b331

## 📄 License

ISC License.