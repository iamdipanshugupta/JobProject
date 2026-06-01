import React, { useEffect, useState } from "react";

const JobsManagement = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    qualification: "",
    experience: "",
    jobType: "",
    description: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);

  // ✅ Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, [token]);

  // ✅ Handle input change
  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  // ✅ Add or Update Job
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingJobId
      ? `http://localhost:8080/api/jobs/${editingJobId}`
      : "http://localhost:8080/api/jobs";
    const method = editingJobId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(job),
      });
      const data = await res.json();

      setJobs((prev) =>
        editingJobId ? prev.map((j) => (j._id === data._id ? data : j)) : [...prev, data]
      );

      setJob({ title: "", company: "", location: "", qualification: "", experience: "", jobType: "", description: "" });
      setEditingJobId(null);
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  // ✅ Edit Job
  const handleEdit = (job) => {
    setJob(job);
    setEditingJobId(job._id);
  };

  // ✅ Delete Job
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-gray-900">
      <h2 className="text-green-500 font-bold text-xl mb-4">Jobs Management</h2>

      {/* ✅ Job Form */}
      <form className="space-y-2 mb-4" onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" className="border p-2 w-full" onChange={handleChange} value={job.title} />
        <input name="company" placeholder="Company" className="border p-2 w-full" onChange={handleChange} value={job.company} />
        <input name="location" placeholder="Location" className="border p-2 w-full" onChange={handleChange} value={job.location} />
        <input name="qualification" placeholder="Qualification" className="border p-2 w-full" onChange={handleChange} value={job.qualification} />
        <input name="experience" placeholder="Experience" className="border p-2 w-full" onChange={handleChange} value={job.experience} />
        <select name="jobType" className="border p-2 w-full" onChange={handleChange} value={job.jobType}>
          <option value="">Select Job Type</option>
          <option value="government">Government</option>
          <option value="private">Private</option>
        </select>
        <textarea name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange} value={job.description}></textarea>
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          {editingJobId ? "Update Job" : "Add Job"}
        </button>
      </form>

      {/* ✅ Job List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="border p-2">Title</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Qualification</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j._id}>
              <td className="border p-2">{j.title}</td>
              <td className="border p-2">{j.company}</td>
              <td className="border p-2">{j.location}</td>
              <td className="border p-2">{j.qualification}</td>
              <td className="border p-2 capitalize">{j.jobType}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(j)} className="bg-green-500 text-white p-1 rounded">Edit</button>
                <button onClick={() => handleDelete(j._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsManagement;
