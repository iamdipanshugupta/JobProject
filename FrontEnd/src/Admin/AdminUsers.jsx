import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/admin/users`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                if (res.data.success) setUsers(res.data.users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDownloadResume = async (filename) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/resume/${filename}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading resume:", error);
            alert("Failed to download resume");
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Registered Users</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-green-600">
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Mobile</th>
                        <th className="border px-4 py-2">Qualification</th>
                        <th className="border px-4 py-2">Skills</th>
                        <th className="border px-4 py-2">Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border text-gray-900 px-4 py-2">{user.username}</td>
                            <td className="border text-gray-900 px-4 py-2">{user.email}</td>
                            <td className="border text-gray-900 px-4 py-2">{user.name}</td>
                            <td className="border text-gray-900 px-4 py-2">{user.mobile}</td>
                            <td className="border text-gray-900 px-4 py-2">{user.qualification}</td>
                            <td className="border text-gray-900 px-4 py-2">{user.skills?.join(", ")}</td>
                            <td className="border text-gray-900 px-4 py-2">
                                {user.resumeUrl ? (
                                    <button
                                        onClick={() => handleDownloadResume(user.resumeUrl)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Download
                                    </button>
                                ) : (
                                    "No Resume"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
