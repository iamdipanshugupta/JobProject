# 🌐 Job Portal — Frontend (Client)

A modern, responsive **React.js** frontend for a full-featured Job Portal application. It includes a public-facing website, an **Admin Dashboard**, and a **Job Seeker Dashboard** with full role-based access control.

---

## 🚀 Tech Stack

| Technology       | Purpose                              |
|------------------|--------------------------------------|
| React.js 18      | UI library                           |
| React Router v6  | Client-side routing & protected routes |
| Axios            | HTTP requests to backend API         |
| Tailwind CSS     | Utility-first CSS framework          |
| DaisyUI          | Tailwind component library           |
| Framer Motion    | Animations & transitions             |
| React Hot Toast  | Toast notifications                  |
| React Icons      | Icon library                         |
| Lucide React     | Additional icons                     |
| Vite             | Build tool & dev server              |

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── App.jsx                     # Root — all routes defined here
│   ├── main.jsx                    # React DOM entry point
│   ├── index.css                   # Global styles
│   │
│   ├── config/
│   │   └── api.js                  # API base URL (single source of truth)
│   │
│   ├── utils/
│   │   └── auth.js                 # localStorage helpers (save/clear/get auth data)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PublicLayout.jsx    # Wraps NavBar + Footer around public pages
│   │   │   ├── AdminLayout.jsx     # Wraps AdminSidebar + AdminNavbar
│   │   │   └── JobSeekerLayout.jsx # Wraps JobSeekerSidebar + JobSeekerNavbar
│   │   │
│   │   ├── common/
│   │   │   ├── NavBar.jsx          # Public navigation bar
│   │   │   ├── Footer.jsx          # Site footer with links & newsletter
│   │   │   └── Testimonials.jsx    # Draggable testimonials carousel
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx    # Admin navigation sidebar
│   │   │   └── AdminNavbar.jsx     # Admin top navbar with logout
│   │   │
│   │   └── jobseeker/
│   │       ├── JobSeekerSidebar.jsx # Job seeker navigation sidebar
│   │       └── JobSeekerNavbar.jsx  # Job seeker top navbar with logout
│   │
│   └── pages/
│       ├── auth/
│       │   ├── Login.jsx           # Login with role-based redirect
│       │   ├── Register.jsx        # New user registration with resume upload
│       │   ├── ForgotPassword.jsx  # Request password reset email
│       │   └── ResetPassword.jsx   # Set new password via token
│       │
│       ├── public/
│       │   ├── Home.jsx            # Landing page with hero, jobs, stats
│       │   ├── Services.jsx        # Services offered
│       │   ├── Enquiry.jsx         # Contact / enquiry form
│       │   ├── ImageGallery.jsx    # Photo gallery
│       │   └── ViewJob.jsx         # Browse all jobs (public)
│       │
│       ├── admin/
│       │   ├── Dashboard.jsx       # Admin overview & stats
│       │   ├── JobManagement.jsx   # Add / edit / delete jobs
│       │   ├── ResultManagement.jsx    # Declare job results
│       │   ├── FeedbackManagement.jsx  # View & delete feedback
│       │   ├── LoginInfo.jsx           # View user login history
│       │   ├── Enquiries.jsx           # View & delete enquiries
│       │   ├── ComplainManagement.jsx  # View & resolve complaints
│       │   ├── JobSeekerManagement.jsx # View & block/approve seekers
│       │   ├── AdminUsers.jsx          # Manage admin accounts
│       │   └── ManageApplications.jsx  # Review job applications
│       │
│       └── jobseeker/
│           ├── JobSeekerDashboard.jsx  # Overview dashboard
│           ├── SearchJob.jsx           # Filter & browse jobs
│           ├── ApplyJob.jsx            # Apply for a job
│           ├── Complain.jsx            # Submit a complaint
│           ├── Results.jsx             # View application results
│           └── Feedback.jsx            # Submit feedback
│
├── public/                         # Static assets (images, icons)
├── index.html
├── vite.config.js
├── tailwind.config.js
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Navigate to frontend folder
```bash
cd job-portal/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API URL
In `src/config/api.js`, set your backend URL:
```js
const API_BASE_URL = "http://localhost:8080/api";
export default API_BASE_URL;
```

### 4. Run the dev server
```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🗺️ Route Map

### Public Routes
| Path             | Page            |
|------------------|-----------------|
| `/`              | Home            |
| `/services`      | Services        |
| `/enquiry`       | Enquiry Form    |
| `/imagegallery`  | Image Gallery   |
| `/viewjob`       | View All Jobs   |

### Auth Routes
| Path                      | Page             |
|---------------------------|------------------|
| `/login`                  | Login            |
| `/register`               | Register         |
| `/forgot-password`        | Forgot Password  |
| `/reset-password/:token`  | Reset Password   |

### Admin Routes *(Protected — role: admin)*
| Path                      | Page                    |
|---------------------------|-------------------------|
| `/admin/dashboard`        | Dashboard               |
| `/admin/jobs`             | Job Management          |
| `/admin/results`          | Result Management       |
| `/admin/feedback`         | Feedback Management     |
| `/admin/login-info`       | Login Info              |
| `/admin/enquiries`        | Enquiry Management      |
| `/admin/complaints`       | Complaint Management    |
| `/admin/jobseekers`       | Job Seeker Management   |
| `/admin/users`            | Admin Users             |
| `/admin/applications`     | Manage Applications     |

### Job Seeker Routes *(Protected — role: jobseeker)*
| Path                      | Page             |
|---------------------------|------------------|
| `/jobseeker/dashboard`    | Dashboard        |
| `/jobseeker/search-job`   | Search Jobs      |
| `/jobseeker/apply-job`    | Apply For Job    |
| `/jobseeker/complain`     | Complain         |
| `/jobseeker/results`      | View Results     |
| `/jobseeker/feedback`     | Feedback         |

---

## 🔐 Authentication & Route Protection

```
User Logs In (/login)
    ↓
Token + role saved to localStorage via utils/auth.js
    ↓
App.jsx ProtectedRoute checks role
    ↓
role === "admin"     → /admin/dashboard
role === "jobseeker" → /jobseeker/dashboard
    ↓
Unauthorized access → redirected to /login
```

---

## 🧩 Key Components

### `utils/auth.js`
Central helper for all localStorage auth operations:
```js
saveAuthData(token, user)   // Save on login
clearAuthData()             // Clear on logout
getToken()                  // Get JWT token
getRole()                   // Get user role
getUserId()                 // Get user ID
```

### `config/api.js`
Single source of truth for API URL:
```js
const API_BASE_URL = "http://localhost:8080/api";
```
Change once → works everywhere in the app.

### `ProtectedRoute` (in App.jsx)
```jsx
<ProtectedRoute allowedRole="admin">
  <Dashboard />
</ProtectedRoute>
```
Redirects to `/login` if role doesn't match.

---

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 👨‍💻 Author

**Dipanshu**
- GitHub: https://github.com/iamdipanshugupta
- LinkedIn: https://www.linkedin.com/in/dipanshu-kumar-sah-08302b331

---

## 📄 License

This project is licensed under the **ISC License**.