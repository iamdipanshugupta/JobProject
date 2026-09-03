
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaTrash,
  FaInbox,
} from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reviewed, setReviewed] = useState({});

  // Fetch enquiries
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);

    try {
      const token = getToken();

      const res = await axios.get(
        `${API_BASE_URL}/users/enquiries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setEnquiries(res.data.data || []);
      } else {
        console.error(
          "Failed to fetch enquiries:",
          res.data?.message
        );
        setEnquiries([]);
      }
    } catch (error) {
      console.error(
        "Error fetching enquiries:",
        error.response?.data || error.message
      );

      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete enquiry
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();

      const res = await axios.delete(
        `${API_BASE_URL}/users/enquiry/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setEnquiries((prev) =>
          prev.filter((enquiry) => enquiry._id !== id)
        );

        // Remove reviewed status also
        setReviewed((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      } else {
        alert(
          res.data?.message || "Failed to delete enquiry"
        );
      }
    } catch (error) {
      console.error(
        "Error deleting enquiry:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Error deleting enquiry"
      );
    }
  };

  // Toggle reviewed status
  const toggleReviewed = (id) => {
    setReviewed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Search/filter
  const filtered = enquiries.filter((enquiry) => {
    const q = search.toLowerCase().trim();

    if (!q) return true;

    return (
      enquiry.name?.toLowerCase().includes(q) ||
      enquiry.email?.toLowerCase().includes(q) ||
      enquiry.message?.toLowerCase().includes(q) ||
      enquiry.number?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Enquiry Management
          </h2>

          <p className="text-sm text-gray-500 mt-0.5">
            {loading
              ? "Loading..."
              : `${enquiries.length} enquir${
                  enquiries.length === 1 ? "y" : "ies"
                } received`}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Loading */}
        {loading ? (
          <div className="p-10 text-center text-gray-500 text-sm">
            Loading enquiries...
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="p-12 flex flex-col items-center text-center text-gray-400">
            <FaInbox className="text-4xl mb-3" />

            <p className="text-sm">
              {search
                ? "No enquiries match your search."
                : "No enquiries yet. They'll show up here as visitors submit them."}
            </p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50 text-green-800 text-left">
                  <th className="p-3 font-semibold">
                    Contact
                  </th>

                  <th className="p-3 font-semibold">
                    Message
                  </th>

                  <th className="p-3 font-semibold">
                    Received
                  </th>

                  <th className="p-3 font-semibold text-center">
                    Reviewed
                  </th>

                  <th className="p-3 font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition align-top"
                  >
                    {/* Contact */}
                    <td className="p-3">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center">
                          {enquiry.name?.[0]?.toUpperCase() ||
                            "?"}
                        </span>

                        <div>
                          {/* Name */}
                          <p className="font-medium text-gray-900">
                            {enquiry.name || "Unknown"}
                          </p>

                          {/* Email */}
                          {enquiry.email && (
                            <a
                              href={`mailto:${enquiry.email}`}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600"
                            >
                              <FaEnvelope className="text-[10px]" />
                              {enquiry.email}
                            </a>
                          )}

                          {/* Phone */}
                          {enquiry.number && (
                            <a
                              href={`tel:${enquiry.number}`}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600"
                            >
                              <FaPhoneAlt className="text-[10px]" />
                              {enquiry.number}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="p-3 text-gray-600 max-w-sm">
                      <p className="break-words">
                        {enquiry.message || "No message"}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="p-3 text-gray-500 whitespace-nowrap">
                      {enquiry.createdAt
                        ? new Date(
                            enquiry.createdAt
                          ).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* Reviewed */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!reviewed[enquiry._id]}
                        onChange={() =>
                          toggleReviewed(enquiry._id)
                        }
                        className="accent-green-600 w-4 h-4 cursor-pointer"
                        title="Mark as reviewed"
                      />
                    </td>

                    {/* Delete */}
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(enquiry._id)
                        }
                        className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition text-xs font-medium"
                      >
                        <FaTrash className="text-[10px]" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries;

