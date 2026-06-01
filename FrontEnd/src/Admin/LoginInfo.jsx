import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginInfo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/user");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Approve / Block user
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/user/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updatedUser = await res.json();
      setUsers(users.map(u => (u._id === id ? updatedUser : u)));
      toast.success(`User ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-gray-100 text-black font-sans p-6 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login Info Panel
      </h2>

      <section className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-3">User Status</h3>

        {loading && <p className="text-center text-gray-700 mb-4">Loading users...</p>}

        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Login Status</th>
              <th className="px-4 py-2 border">Last Login</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="border p-3 text-center">No users found</td>
              </tr>
            )}

            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.name || "N/A"}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td
                  className={`px-4 py-2 border font-semibold ${
                    user.status === "Approved" ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {user.status}
                </td>
                <td className="px-4 py-2 border">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                </td>
                <td className="px-4 py-2 border">
                  {user.status === "Approved" ? (
                    <button
                      disabled={updatingId === user._id}
                      onClick={() => handleStatusChange(user._id, "Blocked")}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      {updatingId === user._id ? "Updating..." : "Block"}
                    </button>
                  ) : (
                    <button
                      disabled={updatingId === user._id}
                      onClick={() => handleStatusChange(user._id, "Approved")}
                      className="text-green-700 hover:underline disabled:opacity-50"
                    >
                      {updatingId === user._id ? "Updating..." : "Approve"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LoginInfo;
