import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" />;
  }

  // NO ROLE CHECK NEEDED (if not provided)
  if (!allowedRoles) {
    return children;
  }

  // ROLE NOT ALLOWED
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}