import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    
    if (loading) {
        return (
          <p className="flex items-center justify-center h-screen">
            <span className="loading loading-ring loading-lg"></span>
          </p>
        );
    }

  const isAdmin = user?.email === adminEmail;

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
