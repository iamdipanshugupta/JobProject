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

export const isLoggedIn = () => !!getToken();