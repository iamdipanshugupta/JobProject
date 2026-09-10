import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUserCircle, FaFileUpload } from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";

const Profile = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    mobile: "",
    qualification: "",
    institute: "",
    experience: "",
    skills: "",
    password: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [currentResume, setCurrentResume] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const authHeaders = { Authorization: `Bearer ${getToken()}` };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/me`, { headers: authHeaders });
        const data = await res.json();
        if (data.success) {
          const p = data.profile;
          setForm({
            username: p.username || "",
            name: p.name || "",
            email: p.email || "",
            mobile: p.mobile || "",
            qualification: p.qualification || "",
            institute: p.institute || "",
            experience: p.experience || "",
            skills: Array.isArray(p.skills) ? p.skills.join(", ") : "",
            password: "",
          });
          setCurrentResume(p.resumeUrl || "");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Failed to load your profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "password" && !value) return; // don't send empty password
        formData.append(key, value);
      });
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PUT",
        headers: authHeaders, // don't set Content-Type manually — browser sets multipart boundary
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to update profile");

      toast.success("Profile updated successfully!");
      setForm((prev) => ({ ...prev, password: "" }));
      if (data.profile?.resumeUrl) setCurrentResume(data.profile.resumeUrl);
      setResumeFile(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading your profile…</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-right" />

      <div className="flex items-center gap-4 mb-6">
        <FaUserCircle className="text-6xl text-green-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{form.name || "My Profile"}</h2>
          <p className="text-sm text-gray-500">{form.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={form.email}
              disabled
              className="border p-2 w-full rounded bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="Mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="e.g. B.Tech CSE"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
            <input
              name="institute"
              value={form.institute}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="College / University"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="e.g. 2 years"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-900"
              placeholder="Leave blank to keep current"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="border p-2 w-full rounded text-gray-900"
            placeholder="React, Node.js, SQL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
          {currentResume && (
            <p className="text-xs text-gray-500 mb-2">
              Current file on record. Uploading a new one will replace it.
            </p>
          )}
          <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-green-400 transition">
            <FaFileUpload className="text-green-600" />
            <span className="text-sm text-gray-600">
              {resumeFile ? resumeFile.name : "Choose a PDF/DOC file to upload"}
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full bg-green-600 text-white py-2.5 rounded-lg font-medium transition ${
            saving ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
