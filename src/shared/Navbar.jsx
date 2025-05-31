import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDashboardNavigate = () => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    if (user?.email === adminEmail) {
      navigate("/admin-dashboard");
    } else {
      navigate("/participant-dashboard");
    }
  };

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/available-camps">Available Camps</Link>
      </li>
      {user && (
        <li>
          <button onClick={handleDashboardNavigate}>Dashboard</button>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-[#fff]/70 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-[1440px] mx-auto px-4 py-2">
        {/* Small & Medium screen hamburger menu on left */}
        <div className="dropdown dropdown-start lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo & Name */}
        <div className="flex-1 flex items-center gap-2 font-bold text-xl">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="HealCoord Logo"
              className="w-8 h-8 md:hidden"
            />
            <p className="text-4xl font-black hidden md:block">
              Heal<span className="text-[#4b257d] font-bold">Coord</span>
            </p>
          </Link>
        </div>

        {/* Desktop Menu in center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium text-base text-gray-600">
            {navItems}
          </ul>
        </div>

        {/* Profile or Join Us on right */}
        <div className="flex-none">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar btn btn-ghost btn-circle">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default-user.png"} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="font-semibold">{user.displayName}</span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-[#4b257d] rounded-lg text-white btn-sm"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
