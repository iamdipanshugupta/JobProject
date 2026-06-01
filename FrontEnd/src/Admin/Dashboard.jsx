import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
      <p className="text-center text-gray-600 mb-6">
        Welcome to the Job Portal Admin Dashboard!
      </p>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-700">Total Jobs</h3>
          <p className="text-2xl font-semibold mt-2 text-green-700">1250</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-700">Complaints</h3>
          <p className="text-2xl font-semibold mt-2 text-red-600">42</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-700">Feedbacks</h3>
          <p className="text-2xl font-semibold mt-2 text-blue-600">78</p>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-700 mb-3">Recent Activities</h2>
        <ul id="activityFeed" className="space-y-2 text-gray-600">
          <li>User Rohan submitted a complaint</li>
          <li>New job posting added by Admin</li>
          <li>Feedback received from Sumit</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
