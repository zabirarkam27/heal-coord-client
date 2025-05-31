import { Outlet, NavLink } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4b257d] text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Organizer Dashboard</h2>
        <nav className="space-y-2">
          <NavLink
            to="/admin-dashboard/profile"
            className="block hover:underline"
          >
            Organizer Profile
          </NavLink>
          <NavLink
            to="/admin-dashboard/add-camp"
            className="block hover:underline"
          >
            Add A Camp
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage-camps"
            className="block hover:underline"
          >
            Manage Camps
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage-registered"
            className="block hover:underline"
          >
            Manage Registered Camps
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;

