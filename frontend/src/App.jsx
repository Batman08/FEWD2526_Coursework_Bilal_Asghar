import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './Providers/AuthProvider';
import AnonNavbar from './Components/AnonNavbar';
import AuthNavbar from './Components/AuthNavbar';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Pages/Home';
import Events from './Pages/Events';
import AddEvent from './Pages/AddEvent';
import EditEvent from './Pages/EditEvent';
import Register from './Pages/Register';
import Login from './Pages/Login';

const App = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="App font-sans min-h-screen">
            <BrowserRouter>
                {auth ? <AuthNavbar /> : <AnonNavbar />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                    <Route path="/events/add" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
                    <Route path="/events/edit/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;