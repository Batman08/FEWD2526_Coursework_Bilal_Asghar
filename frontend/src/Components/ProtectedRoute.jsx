import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    return user?.token ? children : <Navigate to="/login" replace />;
}