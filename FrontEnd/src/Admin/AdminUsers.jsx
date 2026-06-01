import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/admin/users");
                if (res.data.success) setUsers(res.data.users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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
                                    <a
                                        href={`http://localhost:8080/api/admin/users/resume/${user.resumeUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </a>


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
