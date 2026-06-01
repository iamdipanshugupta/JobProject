import React, { useEffect, useState } from "react";
import axios from "axios";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = () => {
    axios
      .get("http://localhost:8080/api/user/enquiries")
      .then((res) => {
        if (res.data.success) {
          setEnquiries(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching enquiries", err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await axios.delete(`http://localhost:8080/api/user/enquiry/${id}`);

      if (res.data.success) {
        alert("Enquiry deleted successfully!");
        setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id)); // remove from UI
      } else {
        alert(res.data.message || "Failed to delete enquiry");
      }
    } catch (error) {
      console.error("Error deleting enquiry", error);
      alert("Error deleting enquiry");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Enquiry Management
      </h2>

      <section className="bg-white p-4 shadow rounded-lg">
        <table className="w-full table-auto text-sm">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Query</th>
              <th className="p-2">Date</th>
              <th className="p-2">Handled</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-700">
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="border-t">
                <td className="p-2">{enquiry.name}</td>
                <td className="p-2">{enquiry.email}</td>
                <td className="p-2">{enquiry.message}</td>
                <td className="p-2">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <input type="checkbox" className="accent-green-600" />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Enquiries;
