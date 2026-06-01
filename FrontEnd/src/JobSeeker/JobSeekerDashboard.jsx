import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Job Seeker" }); // replace with real user data if available

  // Optional: fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      // Example: fetch("/api/user/me")
      // const data = await res.json();
      // setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome, {user.name}!
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div 
          className="bg-green-500 text-white p-6 rounded shadow cursor-pointer hover:bg-green-600"
          onClick={() => navigate("/jobseeker/search-job")}
        >
          <h2 className="text-xl font-bold mb-2">Search Jobs</h2>
          <p>Find jobs based on location, company, or qualification.</p>
        </div>

        <div 
          className="bg-green-500 text-white p-6 rounded shadow cursor-pointer hover:bg-green-600"
          onClick={() => navigate("/jobseeker/apply-job")}
        >
          <h2 className="text-xl font-bold mb-2">Apply Jobs</h2>
          <p>Apply to jobs you are interested in directly from the portal.</p>
        </div>

        <div 
          className="bg-green-500 text-white p-6 rounded shadow cursor-pointer hover:bg-green-600"
          onClick={() => navigate("/jobseeker/results")}
        >
          <h2 className="text-xl font-bold mb-2">View Results</h2>
          <p>Check the status of the jobs you have applied for.</p>
        </div>
      </div>

      {/* Additional Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-green-500 text-white p-6 rounded shadow cursor-pointer hover:bg-green-600"
          onClick={() => navigate("/jobseeker/feedback")}
        >
          <h2 className="text-xl font-bold mb-2">Feedback</h2>
          <p>Provide feedback about jobs or the portal experience.</p>
        </div>

        <div 
          className="bg-green-500 text-white p-6 rounded shadow cursor-pointer hover:bg-green-600"
          onClick={() => navigate("/jobseeker/complain")}
        >
          <h2 className="text-xl font-bold mb-2">Complaints</h2>
          <p>Raise complaints regarding jobs or application issues.</p>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
