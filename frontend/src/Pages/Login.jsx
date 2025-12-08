import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const { auth, setAuth } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [familyId, setFamilyId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, familyId, password }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Login successful!');
                setUsername('');
                setFamilyId('');
                setPassword('');

                const user = {
                    username: data.username,
                    userrole: data.userrole,
                    userfamily: data.userfamily,
                    token: data.token,
                };
                setAuth(user); //updates context & localStorage
                navigate("/events"); //redirect
            } else {
                setMessage('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-teal-50 to-purple-50 px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
            {/* background gradient shapes */}
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[72rem] max-w-none -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#FFB5A7] to-[#6A5ACD] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[115rem]"
                />
            </div>

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-gray-600 text-sm">Log in to continue</p>
                </div>

                {message && (
                    <div className={`mb-4 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium
                                    ${message.toLowerCase().includes("success") ? "bg-green-50 border-green-400 text-green-700" : "bg-red-50 border-red-400 text-red-700"
                        }`}>
                        <span className="text-xl">{message.toLowerCase().includes("success") ? <FontAwesomeIcon icon={['fa', 'tick']} /> : <FontAwesomeIcon icon={['fa', 'circle-exclamation']} />}</span>
                        <p>{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="inputUsername" className="block text-sm font-semibold text-gray-700">Username</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                id="inputUsername"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                placeholder="e.g. johndoe"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:outline-none"
                                required
                            />
                            <FontAwesomeIcon icon={['fa', 'user']} className="absolute right-3 top-2.5 w-4 h-4 text-teal-400" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="inputFamilyId" className="block text-sm font-semibold text-gray-700">Family ID</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                id="inputFamilyId"
                                name="familyId"
                                type="text"
                                value={familyId}
                                onChange={(e) => setFamilyId(e.target.value)}
                                placeholder="Enter your family ID"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:outline-none"
                                required
                            />
                            <FontAwesomeIcon icon={['fa', 'users']} className="absolute right-3 top-2.5 w-4 h-4 text-teal-400" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="inputPassword" className="block text-sm font-semibold text-gray-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                id="inputPassword"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:outline-none"
                                required
                            />
                            <FontAwesomeIcon icon={['fa', 'lock']} className="absolute right-3 top-2.5 w-4 h-4 text-teal-400" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full flex justify-center items-center gap-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 shadow-md transition active:scale-95 cursor-pointer">
                        {loading ? (<FontAwesomeIcon icon={['fa', 'spinner']} className="w-4 h-4" spin />) : <FontAwesomeIcon icon={['fa', 'right-to-bracket']} className="w-4 h-4" />} {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <a href="/register" className="font-semibold text-teal-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;