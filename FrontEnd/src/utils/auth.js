// Save user info to localStorage after login
export const saveAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role?.toLowerCase().trim());
  localStorage.setItem("userId", user.id || user._id);
  localStorage.setItem("jobSeekerId", user.id || user._id);
  localStorage.setItem("userEmail", user.email);
  localStorage.setItem("userStatus", user.status || "Approved");
  localStorage.setItem("user", JSON.stringify(user));
};

// Clear all auth data from localStorage
export const clearAuthData = () => {
  ["token", "role", "userId", "jobSeekerId", "userEmail", "userStatus", "user"].forEach(
    (key) => localStorage.removeItem(key)
  );
};

export const getToken    = () => localStorage.getItem("token");
export const getRole     = () => localStorage.getItem("role")?.toLowerCase().trim();
export const getUserId   = () => localStorage.getItem("userId");
export const getUserEmail = () => localStorage.getItem("userEmail");
export const getUserStatus = () => localStorage.getItem("userStatus");
export const getUser     = () => {
  try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
};

// Decode a JWT's payload without any external library (base64url -> JSON).
// Returns null if the token is missing or malformed.
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

// Checks the token's own "exp" claim against the current time — this is what
// actually detects an expired session, independent of whether a stale token
// is still sitting in localStorage.
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

export const isLoggedIn = () => !!getToken() && !isTokenExpired();