import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ParticipantRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const isParticipant = user?.email !== adminEmail;

  return isParticipant ? children : <Navigate to="/" replace />;
};

export default ParticipantRoute;
