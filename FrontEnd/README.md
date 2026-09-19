# 🌐 Jobify — Frontend (Client)

A modern, responsive **React.js** frontend for the Jobify job portal. It includes a public-facing website, an **Admin Dashboard**, and a **Job Seeker Dashboard**, all with role-based, JWT-protected access.

---

## 🚀 Tech Stack

| Technology       | Purpose                                |
|------------------|-----------------------------------------|
| React.js 18      | UI library                              |
| React Router v6  | Client-side routing & protected routes  |
| Axios / fetch    | HTTP requests to backend API            |
| Tailwind CSS 4   | Utility-first CSS framework             |
| DaisyUI          | Tailwind component library              |
| Framer Motion    | Animations & transitions                |
| React Hot Toast  | Toast notifications                     |
| React Icons      | Icon library (`react-icons/fa`)         |
| Lucide React     | Additional icons (auth pages)           |
| Vite             | Build tool & dev server                 |

---

## 📁 Folder Structure (actual)

```
FrontEnd/
├── src/
│   ├── App.jsx                     # Root — all routes + ProtectedRoute defined here
│   ├── main.jsx                    # React DOM entry point
│   ├── index.css                   # Global styles (Tailwind + daisyUI)
│   │
│   ├── config/
│   │   └── api.js                  # API_BASE_URL — single source of truth
│   │
│   ├── utils/
│   │   ├── auth.js                 # localStorage helpers (token, role, userId, user)
│   │   └── usePagination.js        # Reusable client-side pagination hook
│   │
│   ├── componants/                 # Shared components (note: folder name as in repo)
│   │   ├── NavBar.jsx              # Public navbar — mobile-responsive hamburger menu
│   │   ├── Footer.jsx              # Site footer (links, categories, newsletter)
│   │   ├── Testimonials.jsx        # Testimonials carousel
│   │   ├── AdminSidebar.jsx        # Admin navigation sidebar
│   │   ├── AdminNavbar.jsx         # Admin top navbar with logout
│   │   ├── JobOverview.jsx         # Small job summary widget
│   │   └── Pagination.jsx          # Reusable pagination control (pairs with usePagination)
│   │
│   ├── Layouts/
│   │   ├── PublicLayout.jsx        # NavBar + Footer wrapper (adds top padding for fixed navbar)
│   │   ├── AdminLayout.jsx         # AdminSidebar + AdminNavbar wrapper
│   │   └── JobSeekerLayout.jsx     # JobSeekerSidebar + JobSeekerNavbar wrapper
│   │
│   ├── pages/                      # Public + auth pages
│   │   ├── Home.jsx                # Landing page — live jobs, functional search, real stats
│   │   ├── Services.jsx            # Services offered (job-seeker focused)
│   │   ├── Enquiry.jsx             # Contact / enquiry form
│   │   ├── Imagegallery.jsx        # Photo gallery with lightbox
│   │   ├── Viewjob.jsx             # Browse & filter all live jobs (public)
│   │   ├── Login.jsx               # Split-screen login, role-based redirect
│   │   ├── Register.jsx            # Registration (account / personal / professional details)
│   │   ├── ForgotPassword.jsx      # Request password reset email
│   │   └── ResetPassword.jsx       # Set new password via emailed token
│   │
│   ├── Admin/                      # Admin-only pages
│   │   ├── Dashboard.jsx           # Live stats (jobs, applications, complaints, feedback, users) + recent activity
│   │   ├── JobManagement.jsx       # Add / edit / delete jobs (title, company, location, salary, category, type)
│   │   ├── ResultManagement.jsx    # Declare final application status per job (updates the same record job seekers see)
│   │   ├── FeedbackManagement.jsx  # View & delete feedback
│   │   ├── LoginInfo.jsx           # View & manage registered users (paginated)
│   │   ├── Enquiries.jsx           # View & delete enquiries
│   │   ├── ComplainManagement.jsx  # View & resolve complaints
│   │   ├── JobSeekerManagement.jsx # Approve / block job seekers
│   │   ├── AdminUsers.jsx          # View users + download resumes
│   │   └── ManageApplications.jsx  # Shortlist / Select / Reject applicants, view resume & cover letter (paginated)
│   │
│   └── JobSeeker/                  # Job-seeker-only pages
│       ├── JobSeekerDashboard.jsx  # Application pipeline visual, quick actions, recent applications
│       ├── SearchJob.jsx           # Filter & browse jobs, quick-apply
│       ├── ApplyJob.jsx            # Apply for a job — shows full job detail card before applying
│       ├── Profile.jsx             # View/edit profile, change password, re-upload resume
│       ├── Complain.jsx            # Submit a complaint
│       ├── Results.jsx             # View application status per job
│       └── Feedback.jsx            # Submit feedback
│
├── public/                         # Static assets (images, icons, jobify-icon.png)
├── index.html
├── vite.config.js
├── .gitignore
└── package.json
```

> Note: some component/file names differ slightly from typical conventions (e.g. `componants/` instead of `components/`, `Imagegallery.jsx`/`Viewjob.jsx` in lowercase) — kept as-is to match the existing codebase rather than renamed, to avoid unrelated import churn.

---

## ⚙️ Setup & Installation

### 1. Navigate to the frontend folder
```bash
cd FrontEnd
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080/api
```
`src/config/api.js` reads `VITE_API_BASE_URL` and falls back to `http://localhost:8080/api` if not set.

### 4. Run the dev server
```bash
npm run dev
```
App runs at: `http://localhost:5173`

### 5. Build for production
```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

---

## 🗺️ Route Map

### Public Routes
| Path             | Page          |
|------------------|---------------|
| `/`              | Home          |
| `/services`      | Services      |
| `/enquiry`       | Enquiry Form  |
| `/imagegallery`  | Image Gallery |
| `/viewjob`       | Browse Jobs   |

### Auth Routes
| Path                      | Page             |
|---------------------------|------------------|
| `/login`                  | Login            |
| `/register`               | Register         |
| `/forgot-password`        | Forgot Password  |
| `/reset-password/:token`  | Reset Password   |

### Admin Routes *(Protected — role: admin)*
| Path                   | Page                  |
|------------------------|-----------------------|
| `/admin/dashboard`     | Dashboard             |
| `/admin/jobs`          | Job Management        |
| `/admin/results`       | Result Management     |
| `/admin/feedback`      | Feedback Management   |
| `/admin/login-info`    | Login Info (Users)    |
| `/admin/enquiries`     | Enquiry Management    |
| `/admin/complaints`    | Complaint Management  |
| `/admin/jobseekers`    | Job Seeker Management |
| `/admin/users`         | Admin Users           |
| `/admin/applications`  | Manage Applications   |

### Job Seeker Routes *(Protected — role: jobseeker)*
| Path                     | Page          |
|--------------------------|---------------|
| `/jobseeker/dashboard`   | Dashboard     |
| `/jobseeker/search-job`  | Search Jobs   |
| `/jobseeker/apply-job`   | Apply For Job |
| `/jobseeker/profile`     | My Profile    |
| `/jobseeker/complain`    | Complain      |
| `/jobseeker/results`     | View Results  |
| `/jobseeker/feedback`    | Feedback      |

A set of legacy paths (e.g. `/dashboard`, `/job-management`, `/enquiries`) redirect to their `/admin/...` equivalents for backward compatibility.

---

## 🔐 Authentication & Route Protection

```
User logs in (/login)
    ↓
POST /api/auth/login → JWT token + user object returned
    ↓
saveAuthData(token, user) stores token, role, userId, email, status in localStorage
    ↓
ProtectedRoute (in App.jsx) checks role before rendering
    ↓
role === "admin"     → /admin/dashboard
role === "jobseeker" → /jobseeker/dashboard
    ↓
No token / wrong role → redirected to /login
    ↓
Every protected API call sends: Authorization: Bearer <token>
```

Identity for sensitive actions (applying for a job, viewing "my applications") is derived **server-side from the JWT**, not from any client-supplied ID — the frontend never needs to pass a job seeker's own ID for these calls.

---

## 🧩 Key Utilities

### `utils/auth.js`
```js
saveAuthData(token, user)   // Save on login
clearAuthData()             // Clear on logout
getToken()                  // Get JWT token
getRole()                   // Get user role ("admin" | "jobseeker")
getUserId()                 // Get user ID
getUser()                   // Get full stored user object
isLoggedIn()                // Boolean check
```

### `utils/usePagination.js` + `componants/Pagination.jsx`
Lightweight client-side pagination used on the larger admin lists (Jobs, Users, Applications):
```jsx
const { pageItems, ...pagination } = usePagination(items, 10);
...
<Pagination {...pagination} />
```

### `config/api.js`
Single source of truth for the API base URL:
```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
export default API_BASE_URL;
```

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

## 📄 License

ISC License.