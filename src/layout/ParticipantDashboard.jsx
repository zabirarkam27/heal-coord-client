import { Outlet, NavLink } from "react-router-dom";
const ParticipantDashboard = () => {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-[#4b257d] text-white p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <NavLink
              to="/participant-dashboard/analytics"
              className="block hover:underline"
            >
              Analytics
            </NavLink>
            <NavLink
              to="/participant-dashboard/participant-profile"
              className="block hover:underline"
            >
              Participant Profile
            </NavLink>
            <NavLink
              to="/participant-dashboard/registered-camps"
              className="block hover:underline"
            >
              Registered Camps
            </NavLink>
            <NavLink
              to="/participant-dashboard/payment-history"
              className="block hover:underline"
            >
              Payment History
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

export default ParticipantDashboard;