import AdminSidebar from "../componants/AdminSidebar.jsx";
import AdminNavbar from "../componants/AdminNavbar.jsx";

const AdminLayout = ({ sidebarOpen, toggleSidebar, children }) => (
  <div className="flex h-screen bg-gray-100">
    <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="flex flex-col flex-1 overflow-hidden">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
