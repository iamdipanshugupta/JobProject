import JobSeekerSidebar from "../jobseeker/JobSeekerSidebar.jsx";
import JobSeekerNavbar from "../jobseeker/JobSeekerNavbar.jsx";

const JobSeekerLayout = ({ sidebarOpen, toggleSidebar, children }) => (
  <div className="flex h-screen bg-gray-100">
    <JobSeekerSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="flex flex-col flex-1 overflow-hidden">
      <JobSeekerNavbar toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  </div>
);

export default JobSeekerLayout;