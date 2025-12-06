import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';

const App = () => {
    return (
        <div className="App font-sans min-h-screen">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {<Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />}
                    {/* <Route path="/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} /> */}
                    {/* <Route path="/edit-event/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} /> */}
                    <Route path="/register" element={<Register />} />
                    {<Route path="/login" element={<Login />} />}
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;