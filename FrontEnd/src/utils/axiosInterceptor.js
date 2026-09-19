import axios from "axios";
import { clearAuthData } from "./auth.js";

// Any axios call anywhere in the app that gets a 401 (invalid/expired token)
// or 403 (blocked/forbidden) automatically logs the user out and sends them
// back to /login — this is the safety net for a token expiring *during* an
// active session, not just on page load.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    // 401 = missing/invalid/expired token (our auth.middleware.js). 403 just means
    // "logged in but not allowed" (e.g. jobseeker hitting an admin route) — that's
    // not a session-expiry case, so it should NOT force a logout.
    if (status === 401) {
      clearAuthData();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
