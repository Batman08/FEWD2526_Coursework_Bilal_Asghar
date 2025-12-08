import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export default function LogoutButton() {
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        // clear auth state
        setAuth(null);
        window.location.href = "/";
    };

    return (
        <button type="button" onClick={handleLogout} className={`rounded-md px-3 py-2 text-sm font-medium shadow-md transition active:scale-95 cursor-pointer bg-red-700 hover:bg-red-800 text-white `}>
            Log out
        </button>
    );
}
