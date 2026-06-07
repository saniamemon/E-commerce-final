import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  if (auth.user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;